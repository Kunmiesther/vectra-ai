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

  const scoreMatch = extract('FEASIBILITY SCORE').match(/(\d+)\/100/)
  
  return {
    feasibilityScore: scoreMatch ? parseInt(scoreMatch[1]) : 0,
    strategicReading: extract('STRATEGIC READING'),
    criticalWeaknesses: extract('CRITICAL WEAKNESSES')
      .split('\n')
      .filter(l => l.trim())
      .map(l => {
        const [name, ...desc] = l.replace(/^\d+\.\s*/, '').split(' — ')
        return { name: name?.trim(), description: desc.join(' — ')?.trim() }
      }),
    recommendedDirection: extract('RECOMMENDED DIRECTION'),
    rejectedPaths: extract('REJECTED PATHS')
      .split('\n')
      .filter(l => l.startsWith('-'))
      .map(l => l.replace('- ', '').split(': '))
      .map(([name, reason]) => ({ name, reason })),
    executionRoadmap: extract('EXECUTION ROADMAP')
      .split('\n')
      .filter(l => l.trim())
      .map(l => l.replace(/^\d+\.\s*/, '')),
    mvpScope: {
      build: extract('MVP SCOPE').match(/BUILD: (.+)/)?.[1]?.split(', ') || [],
      skip: extract('MVP SCOPE').match(/SKIP: (.+)/)?.[1]?.split(', ') || []
    }
  }
}