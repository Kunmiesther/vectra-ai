'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Clock } from 'lucide-react'
import type { PageId } from '@/types'
import { statusColor } from '@/lib/utils'

interface HistoryPageProps {
  setPage: (id: PageId) => void
  wallet?: string
}

const VERDICT_COLORS: Record<string, string> = {
  EXECUTE: '#10B981',
  RESTRUCTURE: '#F59E0B',
  KILL: '#EF4444',
}

export function HistoryPage({ setPage, wallet }: HistoryPageProps) {
  const [history, setHistory] = useState<any[]>([])

  const historyKey = wallet ? `vectra-history-${wallet}` : 'vectra-history'
  const resultKey  = wallet ? `vectra-result-${wallet}`  : 'vectra-result'
  const ideaKey    = wallet ? `vectra-idea-${wallet}`    : 'vectra-idea'

  useEffect(() => {
    const stored = localStorage.getItem(historyKey)
    if (stored) {
      try { setHistory(JSON.parse(stored)) }
      catch { setHistory([]) }
    }
  }, [historyKey])

  return (
    <div style={{ padding: 28, overflowY: 'auto', maxHeight: 'calc(100vh - 84px)' }}>

      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 700, color: '#E6EEF8', letterSpacing: '-0.02em', marginBottom: 4 }}>
          Strategic Memory
        </h1>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4A5568', letterSpacing: '0.1em' }}>
          {wallet ? `WALLET: ${wallet.slice(0,6)}...${wallet.slice(-4)}` : 'SESSION MEMORY'} · {history.length} ANALYSES
        </div>
      </div>

      {history.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 300, gap: 12 }}>
          <Clock size={32} color="#1E293B" />
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#4A5568', letterSpacing: '0.1em' }}>NO ANALYSES YET</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: '#64748B' }}>Submit an idea from the Dashboard to start building your strategic memory.</div>
          <button
            onClick={() => setPage('dashboard')}
            style={{ marginTop: 8, padding: '10px 20px', background: '#4F7CFF', border: 'none', borderRadius: 6, color: '#fff', fontFamily: "'JetBrains Mono', monospace", fontSize: 10, cursor: 'pointer', letterSpacing: '0.08em' }}
          >
            START NEW ANALYSIS
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {history.map((item, i) => {
            const verdictColor = VERDICT_COLORS[item.verdict] || '#94A3B8'
            const date = item.timestamp ? new Date(item.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''

            return (
              <div
                key={item.id || i}
                onClick={() => {
                  if (item.result) {
                    localStorage.setItem(resultKey, item.result)
                    localStorage.setItem(ideaKey, item.idea || '')
                    setPage('strategy')
                  }
                }}
                style={{
                  background: '#080C15',
                  border: '1px solid #1E293B',
                  borderRadius: 8,
                  padding: '18px 20px',
                  cursor: 'pointer',
                  transition: 'border-color 0.15s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#2D3748')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#1E293B')}
              >
                {/* Verdict color stripe */}
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: verdictColor, borderRadius: '8px 0 0 8px' }} />

                <div style={{ paddingLeft: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 4 }}>
                        {item.id}
                      </div>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#E6EEF8', lineHeight: 1.4, maxWidth: 500 }}>
                        {item.idea}
                      </div>
                    </div>
                    {item.verdict && (
                      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, color: verdictColor, flexShrink: 0, marginLeft: 16 }}>
                        {item.verdict}
                      </div>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    {item.score > 0 && (
                      <div>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568' }}>SCORE </span>
                        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 600, color: '#22D3EE' }}>{item.score}</span>
                      </div>
                    )}
                    {date && (
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568' }}>{date}</div>
                    )}
                    {item.cid && (
                      <div
                        onClick={e => { e.stopPropagation(); window.open(item.ipfsUrl, '_blank') }}
                        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#8B5CF6', cursor: 'pointer' }}
                      >
                        PERMANENT LINK →
                      </div>
                    )}
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4, color: '#4F7CFF', fontFamily: "'JetBrains Mono', monospace", fontSize: 9 }}>
                      OPEN <ArrowRight size={11} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}