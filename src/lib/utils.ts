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

  const scoreRaw = extract('FEASIBILITY SCORE')
  const scoreMatch = scoreRaw.match(/(\d+)\/100/)
  const scoreVerdict = scoreRaw.split('—')[1]?.trim() || 'VIABLE'

  const weaknesses = extract('CRITICAL WEAKNESSES')
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

  const rejectedPaths = extract('REJECTED PATHS')
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

  const dirRaw = extract('RECOMMENDED DIRECTION')
  const dirLines = dirRaw.split('\n')
  const dirFirstLine = dirLines[0] || ''
  const dirParts = dirFirstLine.split(' — ')
  const confMatch = dirRaw.match(/Confidence:\s*(\d+)%/)

  return {
    feasibilityScore: scoreMatch ? parseInt(scoreMatch[1]) : 0,
    scoreVerdict,
    strategicReading: extract('STRATEGIC READING'),
    criticalWeaknesses: weaknesses,
    recommendedDirection: {
      name: dirParts[0]?.trim() || '',
      description: dirParts.slice(1).join(' — ')?.trim() || dirLines.slice(1).join(' ').trim(),
      confidence: confMatch ? parseInt(confMatch[1]) : 0
    },
    rejectedPaths,
    executionRoadmap: extract('EXECUTION ROADMAP')
      .split('\n')
      .filter(l => l.match(/^\d+\./))
      .map(l => l.replace(/^\d+\.\s*/, '').trim()),
    mvpScope: {
      build: extract('MVP SCOPE').match(/BUILD:\s*(.+)/)?.[1]?.split(', ').map(s => s.trim()) || [],
      skip: extract('MVP SCOPE').match(/SKIP:\s*(.+)/)?.[1]?.split(', ').map(s => s.trim()) || []
    },
    rawText: text
  }
}