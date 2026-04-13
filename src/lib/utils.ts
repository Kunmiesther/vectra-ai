const stripMd = (text: string) =>
  text?.replace(/\*\*/g, '').replace(/\*/g, '').trim() || ''

export function parseVectraOutput(text: string) {
  const normalized = text?.replace(/\r\n/g, '\n') || ''

  // Handles BOTH "## SECTION NAME" and "SECTION NAME" (no ##)
  const extract = (section: string) => {
    const escaped = section.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    // Try with ## first, then without
    const withHash = new RegExp(
      `(?:^|\\n)##\\s+${escaped}\\s*\\n([\\s\\S]*?)(?=\\n##\\s+[A-Z]|$)`,
      'i'
    )
    const withoutHash = new RegExp(
      `(?:^|\\n)${escaped}\\s*\\n([\\s\\S]*?)(?=\\n[A-Z][A-Z ]{2,}\\s*\\n|\\n##|$)`,
      'i'
    )
    return (
      normalized.match(withHash)?.[1]?.trim() ||
      normalized.match(withoutHash)?.[1]?.trim() ||
      ''
    )
  }

  // Score — handle "0/100 — WEAK" or "72/100 — STRONG" etc
  const scoreRaw = extract('FEASIBILITY SCORE')
  const scoreMatch = scoreRaw.match(/(\d+)\s*\/\s*100/i)
  const scoreVerdictMatch = scoreRaw.match(/\/\s*100\s*[—\-–]\s*([A-Z]+)/i)

  // Strategic reading
  const strategicReading = stripMd(extract('STRATEGIC READING'))

  // Hidden assumptions
  const assumptionsRaw = extract('HIDDEN ASSUMPTIONS')
  const assumptions = assumptionsRaw
    .split('\n')
    .filter(l => l.trim().match(/^\d+[\.\)]/))
    .map(l => {
      const clean = l.replace(/^\d+[\.\)]\s*/, '').trim()
      const parts = clean.split(/\s+[—\-–]\s+/)
      return {
        name: stripMd(parts[0]?.trim() || ''),
        description: stripMd(parts.slice(1).join(' — ').trim() || ''),
      }
    })
    .filter(a => a.name)

  // Failure points
  const weaknessesRaw = extract('FAILURE POINTS') || extract('CRITICAL WEAKNESSES')
  const weaknesses = weaknessesRaw
    .split('\n')
    .filter(l => l.trim().match(/^\d+[\.\)]/))
    .map(l => {
      const clean = l.replace(/^\d+[\.\)]\s*/, '').trim()
      const parts = clean.split(/\s+[—\-–]\s+/)
      return {
        name: stripMd(parts[0]?.trim() || ''),
        description: stripMd(parts.slice(1).join(' — ').trim() || ''),
      }
    })
    .filter(w => w.name)

  // Rejected paths
  const rejectedRaw = extract('REJECTED PATHS')
  const rejectedPaths = rejectedRaw
    .split('\n')
    .filter(l => l.trim().startsWith('-') || l.trim().match(/^\*/))
    .map(l => {
      const clean = l.replace(/^[-*]\s*/, '').trim()
      const colonIdx = clean.indexOf(': ')
      return {
        name: stripMd(colonIdx > -1 ? clean.slice(0, colonIdx).trim() : clean),
        reason: stripMd(colonIdx > -1 ? clean.slice(colonIdx + 2).trim() : ''),
      }
    })
    .filter(r => r.name)

  // Winning direction
  const directionRaw = extract('WINNING DIRECTION') || extract('RECOMMENDED DIRECTION')
  const dirLines = directionRaw.split('\n').filter(Boolean)
  const dirFirstLine = dirLines[0] || ''
  const dirParts = dirFirstLine.split(/\s+[—\-–]\s+/)
  const confMatch = directionRaw.match(/Confidence:\s*(\d+)%/i)

  // Execution plan
  const roadmapRaw = extract('EXECUTION PLAN') || extract('EXECUTION ROADMAP')
  const roadmap = roadmapRaw
    .split('\n')
    .filter(l => l.trim().match(/^\d+[\.\)]/))
    .map(l => stripMd(l.replace(/^\d+[\.\)]\s*/, '').trim()))
    .filter(Boolean)

  // MVP scope
  const mvpRaw = extract('MVP SCOPE')
  const buildMatch = mvpRaw.match(/BUILD(?:\s+THESE)?:\s*(.+)/i)?.[1]
  const skipMatch  = mvpRaw.match(/SKIP(?:\s+THESE)?:\s*(.+)/i)?.[1]

  // Verdict — find EXECUTE/RESTRUCTURE/KILL anywhere in verdict section
  const verdictRaw = extract('VERDICT')
  const verdictLines = verdictRaw.split('\n').map(l => l.trim()).filter(Boolean)

  // Look for the verdict word — could be on first line or after "WHY:"
  let verdictValue = ''
  for (const line of verdictLines) {
    const match = line.match(/^(EXECUTE|RESTRUCTURE|KILL)$/i)
    if (match) { verdictValue = match[1].toUpperCase(); break }
  }
  // Also search full raw text if not found in section
  if (!verdictValue) {
    const fullMatch = normalized.match(/\bVERDICT[:\s]*\n?\s*(EXECUTE|RESTRUCTURE|KILL)/i)
    if (fullMatch) verdictValue = fullMatch[1].toUpperCase()
  }

  const whyLines = verdictLines
    .filter(l => l.startsWith('-') || l.startsWith('•'))
    .map(l => stripMd(l.replace(/^[-•]\s*/, '')))
    .filter(Boolean)

  return {
    feasibilityScore: scoreMatch ? parseInt(scoreMatch[1], 10) : 0,
    scoreVerdict: stripMd(scoreVerdictMatch?.[1] || ''),
    strategicReading,
    hiddenAssumptions: assumptions,
    criticalWeaknesses: weaknesses,
    recommendedDirection: {
      name: stripMd(dirParts[0]?.trim() || ''),
      description: stripMd(
        dirParts.slice(1).join(' — ').trim() || dirLines.slice(1).join(' ').trim()
      ),
      confidence: confMatch ? parseInt(confMatch[1], 10) : 0,
    },
    rejectedPaths,
    executionRoadmap: roadmap,
    mvpScope: {
      build: buildMatch ? buildMatch.split(',').map(s => stripMd(s.trim())).filter(Boolean) : [],
      skip:  skipMatch  ? skipMatch.split(',').map(s => stripMd(s.trim())).filter(Boolean)  : [],
    },
    verdict: {
      value: verdictValue as 'EXECUTE' | 'RESTRUCTURE' | 'KILL' | '',
      reasons: whyLines,
    },
    rawText: normalized,
  }
}

export function cx(...args: (string | undefined | false | null)[]): string {
  return args.filter(Boolean).join(' ')
}

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    DEPLOYED: '#10B981',
    ARCHIVED: '#64748B',
    FAILED: '#EF4444',
    ACTIVE: '#22D3EE',
    EXECUTE: '#10B981',
    RESTRUCTURE: '#F59E0B',
    KILL: '#EF4444',
    COMPLETE: '#22D3EE',
  }
  return map[status] ?? '#94A3B8'
}

export function formatPct(n: number): string {
  return `${n.toFixed(1)}%`
}