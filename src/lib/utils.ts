// ─── Class Name Merger ────────────────────────────────────────────────────────

export function cx(...args: (string | undefined | false | null)[]): string {
  return args.filter(Boolean).join(' ')
}

// ─── Status Color Map ─────────────────────────────────────────────────────────

export function statusColor(status: string): string {
  const map: Record<string, string> = {
    DEPLOYED: '#10B981',
    ARCHIVED: '#64748B',
    FAILED:   '#EF4444',
    ACTIVE:   '#22D3EE',
  }
  return map[status] ?? '#94A3B8'
}

// ─── Number Formatting ────────────────────────────────────────────────────────

export function formatPct(n: number): string {
  return `${n.toFixed(1)}%`
}

export function parseVectraOutput(text: string) {
  const extract = (section: string) => {
    const regex = new RegExp(`## ${section}\\n([\\s\\S]*?)(?=\\n## |$)`)
    return text.match(regex)?.[1]?.trim() || ''
  }

  // Try both old and new section names
  const scoreRaw = extract('FEASIBILITY SCORE')
  const scoreMatch = scoreRaw.match(/(\d+)\/100/)
  const scoreVerdict = scoreRaw.split('—')[1]?.trim().split('\n')[0]?.trim() || 'VIABLE'

  const strategicReading = extract('WHAT THIS IS REALLY ABOUT') || extract('STRATEGIC READING')
  const weaknessesRaw = extract('WHAT COULD GO WRONG') || extract('CRITICAL WEAKNESSES')
  const directionRaw = extract('THE BEST DIRECTION TO TAKE') || extract('RECOMMENDED DIRECTION')
  const rejectedRaw = extract('PATHS THAT WON\'T WORK') || extract('REJECTED PATHS')
  const roadmapRaw = extract('HOW TO EXECUTE THIS') || extract('EXECUTION ROADMAP')
  const mvpRaw = extract('WHAT TO BUILD FIRST') || extract('MVP SCOPE')

  const weaknesses = weaknessesRaw
    .split('\n')
    .filter(l => l.match(/^\d+\./))
    .map(l => {
      const clean = l.replace(/^\d+\.\s*/, '')
      const parts = clean.split(' — ')
      return {
        name: parts[0]?.trim() || '',
        description: parts.slice(1).join(' — ')?.trim() || ''
      }
    })

  const rejectedPaths = rejectedRaw
    .split('\n')
    .filter(l => l.startsWith('-'))
    .map(l => {
      const clean = l.replace(/^-\s*/, '')
      const colonIdx = clean.indexOf(': ')
      return {
        name: colonIdx > -1 ? clean.slice(0, colonIdx).trim() : clean,
        reason: colonIdx > -1 ? clean.slice(colonIdx + 2).trim() : ''
      }
    })

  const dirLines = directionRaw.split('\n')
  const dirFirstLine = dirLines[0] || ''
  const dirParts = dirFirstLine.split(' — ')
  const confMatch = directionRaw.match(/Confidence:\s*(\d+)%/)

  return {
    feasibilityScore: scoreMatch ? parseInt(scoreMatch[1]) : 0,
    scoreVerdict: stripMd(scoreVerdict),
    strategicReading: stripMd(strategicReading),
    criticalWeaknesses: weaknesses.map(w => ({
      name: stripMd(w.name),
      description: stripMd(w.description)
    })),
    recommendedDirection: {
      name: stripMd(dirParts[0]?.trim() || ''),
      description: stripMd(dirParts.slice(1).join(' — ')?.trim() || dirLines.slice(1).join(' ').trim()),
      confidence: confMatch ? parseInt(confMatch[1]) : 0
    },
    rejectedPaths: rejectedPaths.map(r => ({
      name: stripMd(r.name),
      reason: stripMd(r.reason)
    })),
    executionRoadmap: roadmapRaw
      .split('\n')
      .filter(l => l.match(/^\d+\./))
      .map(l => stripMd(l.replace(/^\d+\.\s*/, '').trim())),
    mvpScope: {
      build: (mvpRaw.match(/BUILD(?:\s+THESE)?:\s*(.+)/)?.[1]?.split(',') || []).map(s => stripMd(s.trim())),
      skip: (mvpRaw.match(/SKIP(?:\s+THESE)?:\s*(.+)/)?.[1]?.split(',') || []).map(s => stripMd(s.trim()))
    },
    rawText: text
  }
}

const stripMd = (text: string) => text?.replace(/\*\*/g, '').replace(/\*/g, '').trim() || ''