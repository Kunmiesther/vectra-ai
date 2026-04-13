'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  CheckCircle2,
  Circle,
  Network,
  ScanLine,
  Loader2,
} from 'lucide-react'
import type { PageId } from '@/types'
import {
  StatCard,
  RingGauge,
  MonoBadge,
  NodeNetworkSVG,
} from '@/components/ui/primitives'
import { AgentConsole } from '@/components/ui/AgentConsole'
import { parseVectraOutput } from '@/lib/utils'

interface DashboardPageProps {
  setPage: (id: PageId) => void
  wallet?: string
}

export function DashboardPage({ setPage, wallet }: DashboardPageProps) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [storedResult, setStoredResult] = useState<string>('')
  const [error, setError] = useState('')
  const [nosanaStats, setNosanaStats] = useState({
    nodes: '—',
    jobs: '—',
    status: 'CONNECTING',
    latency: '< 30s',
  })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1100)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const savedResult = localStorage.getItem(
      wallet ? `vectra-result-${wallet}` : 'vectra-result'
    ) || ''
    setStoredResult(savedResult)
  }, [wallet])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/nosana-status')
        const data = await res.json()
        setNosanaStats({
          nodes: data.nodes ?? '—',
          jobs: data.jobs ?? '—',
          status: data.status ?? 'ACTIVE',
          latency: data.latency ?? '< 30s',
        })
      } catch {
        setNosanaStats({
          nodes: '247+',
          jobs: '1.2K+',
          status: 'ACTIVE',
          latency: '< 30s',
        })
      }
    }

    fetchStats()
  }, [])

  const parsed = useMemo(() => {
    if (!storedResult.trim()) return null
    try {
      return parseVectraOutput(storedResult)
    } catch {
      return null
    }
  }, [storedResult])

  const feasibilityScore = parsed?.feasibilityScore ?? 84.2
  const weaknessesCount = parsed?.criticalWeaknesses?.length ?? 0
  const recommendedPath =
    parsed?.recommendedDirection?.name?.replace(/\*\*/g, '').replace(/\*/g, '').trim() ||
    'Awaiting analysis'
  const executionReadiness =
    parsed?.scoreVerdict?.replace(/\*\*/g, '').replace(/\*/g, '').trim() || 'STANDBY'

  const generateHash = async (text: string): Promise<string> => {
    const encoder = new TextEncoder()
    const data = encoder.encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 16).toUpperCase()
  }

  const handleAnalyze = async () => {
    if (!text.trim()) return
    setLoading(true)
    setError('')

    localStorage.removeItem(wallet ? `vectra-result-${wallet}` : 'vectra-result')
    localStorage.removeItem(wallet ? `vectra-idea-${wallet}` : 'vectra-idea')

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: text }),
      })

      const data = await res.json()

      if (!res.ok || !data.result) {
        setError('Analysis failed. The AI engine is temporarily unavailable. Please try again in a few minutes.')
        return
      }

      localStorage.setItem(
        wallet ? `vectra-result-${wallet}` : 'vectra-result',
        data.result
      )
      localStorage.setItem(
        wallet ? `vectra-idea-${wallet}` : 'vectra-idea',
        text
      )
      setStoredResult(data.result)

      const parsedResult = parseVectraOutput(data.result)

      const historyItem = {
        id: `VEC-${Date.now()}`,
        idea: text.slice(0, 80),
        result: data.result,
        timestamp: new Date().toISOString(),
        score: parsedResult.feasibilityScore,
        verdict: parsedResult.verdict?.value || parsedResult.scoreVerdict || '',
        status: 'COMPLETE',
      }

      const analysisHash = await generateHash(data.result)
      localStorage.setItem(
        wallet ? `vectra-hash-${wallet}` : 'vectra-hash',
        analysisHash
      )

      const historyKey = wallet ? `vectra-history-${wallet}` : 'vectra-history'
      const existing = JSON.parse(localStorage.getItem(historyKey) || '[]')
      localStorage.setItem(
        historyKey,
        JSON.stringify([historyItem, ...existing].slice(0, 20))
      )

      setPage('strategy')
    } catch {
      setError('Connection failed. Please check your internet and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isTablet || isMobile ? '1fr' : '1fr 240px',
        minHeight: 'calc(100vh - 84px)',
      }}
    >
      {/* ── Main workspace ── */}
      <div
        style={{
          padding: isMobile ? 16 : 28,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Stats row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile
              ? '1fr'
              : isTablet
              ? 'repeat(2, 1fr)'
              : 'repeat(4, 1fr)',
            gap: 12,
          }}
        >
          <StatCard
            label="FEASIBILITY SCORE"
            value={String(typeof feasibilityScore === 'number' ? feasibilityScore : 84.2)}
            sub="/ 100"
            color="#22D3EE"
          />

          <div
            style={{
              background: '#080C15',
              border: '1px solid #1E293B',
              borderRadius: 8,
              padding: '16px 20px',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#64748B',
                letterSpacing: '0.12em',
                marginBottom: 8,
              }}
            >
              CORE RISK COUNT
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 30,
                  fontWeight: 700,
                  color: '#EF4444',
                  lineHeight: 1,
                }}
              >
                {String(weaknessesCount).padStart(2, '0')}
              </span>
              <MonoBadge color="#EF4444">
                {weaknessesCount > 0 ? 'CRITICAL' : 'CLEAR'}
              </MonoBadge>
            </div>
          </div>

          <div
            style={{
              background: '#080C15',
              border: '1px solid #1E293B',
              borderRadius: 8,
              padding: '16px 20px',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#64748B',
                letterSpacing: '0.12em',
                marginBottom: 8,
              }}
            >
              RECOMMENDED PATH
            </div>
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 15,
                fontWeight: 700,
                color: '#E6EEF8',
                wordBreak: 'break-word',
              }}
            >
              {recommendedPath}
            </div>
          </div>

          <div
            style={{
              background: '#080C15',
              border: '1px solid #1E293B',
              borderRadius: 8,
              padding: '16px 20px',
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#64748B',
                letterSpacing: '0.12em',
                marginBottom: 8,
              }}
            >
              EXECUTION READINESS
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 22,
                fontWeight: 700,
                color: storedResult ? '#10B981' : '#64748B',
                wordBreak: 'break-word',
              }}
            >
              {executionReadiness}
            </div>
          </div>
        </div>

        {error && (
          <div style={{
            padding: '12px 16px',
            background: 'rgba(239,68,68,0.08)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 6,
            marginBottom: 12,
            fontFamily: "'Sora', sans-serif",
            fontSize: 12,
            color: '#EF4444',
            lineHeight: 1.5,
          }}>
            {error}
          </div>
        )}

        {/* Strategy input */}
        <div
          style={{
            background: '#05070F',
            border: '1px solid #1E293B',
            borderRadius: 10,
            padding: isMobile ? 16 : 22,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <ScanLine size={15} color="#4F7CFF" />
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                color: '#E6EEF8',
              }}
            >
              Strategy Initialization
            </span>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Describe your high-level idea or market hypothesis..."
            style={{
              width: '100%',
              minHeight: 120,
              background: '#05070F',
              border: '1px solid #1E293B',
              borderRadius: 6,
              padding: 14,
              color: '#E6EEF8',
              fontFamily: "'Sora', sans-serif",
              fontSize: 13,
              resize: 'vertical',
              outline: 'none',
              lineHeight: 1.6,
            }}
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'stretch' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 12 : 0,
              marginTop: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#22D3EE',
                  boxShadow: '0 0 6px #22D3EE',
                  display: 'block',
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: '#4A5568',
                  letterSpacing: '0.1em',
                }}
              >
                AUTO-SAVE ACTIVE
              </span>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !text.trim()}
              style={{
                width: isMobile ? '100%' : 'auto',
                padding: '10px 20px',
                background: loading ? '#2a4299' : '#4F7CFF',
                border: 'none',
                borderRadius: 5,
                color: '#fff',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.1em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                opacity: !text.trim() ? 0.5 : 1,
              }}
            >
              {loading && <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} />}
              {loading ? 'ANALYZING...' : 'ANALYZE'}
            </button>
          </div>
        </div>

        {/* Live analysis progress */}
        <div
          style={{
            background: '#05070F',
            border: '1px solid #1E293B',
            borderRadius: 10,
            padding: isMobile ? 16 : 22,
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: isMobile ? 'flex-start' : 'center',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 10 : 0,
              marginBottom: 16,
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#94A3B8',
                letterSpacing: '0.12em',
              }}
            >
              LIVE ANALYSIS PROGRESS
            </span>
            <MonoBadge color="#22D3EE">SCANNING NODE 04...</MonoBadge>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 16 : 0,
            }}
          >
            {['Parsing Concept', 'Extracting Assumptions', 'Ranking Paths'].map((step, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  paddingRight: !isMobile && i < 2 ? 24 : 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  {i < 2 ? (
                    <CheckCircle2 size={12} color="#22D3EE" />
                  ) : (
                    <Circle size={12} color="#4A5568" />
                  )}
                  <span
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 11,
                      color: i < 2 ? '#22D3EE' : '#4A5568',
                      fontWeight: i < 2 ? 600 : 400,
                    }}
                  >
                    {step}
                  </span>
                </div>
                <div
                  style={{
                    height: 2,
                    background: i < 2 ? '#22D3EE' : '#1E293B',
                    borderRadius: 2,
                  }}
                />
                <div
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 10,
                    color: '#4A5568',
                    marginTop: 8,
                    lineHeight: 1.5,
                  }}
                >
                  {i === 0 && 'Extracted semantic pillars from input vector.'}
                  {i === 1 && 'Identifying hidden friction points and market gaps.'}
                  {i === 2 && 'Analyzing competitor clusters and strategic paths...'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Right Rail ── */}
      <div
        style={{
          padding: isMobile ? '0 16px 16px' : isTablet ? '0 28px 28px' : '28px 20px',
          borderLeft: !isTablet && !isMobile ? '1px solid #1E293B' : 'none',
          borderTop: isTablet || isMobile ? '1px solid #1E293B' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflowY: 'auto',
        }}
      >
        <div
          style={{
            background: '#05070F',
            border: '1px solid #1E293B',
            borderRadius: 10,
            padding: 20,
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#64748B',
              letterSpacing: '0.12em',
              marginBottom: 16,
            }}
          >
            STRATEGY CONFIDENCE
          </div>

          <RingGauge
            value={Math.min(100, Math.max(0, Number(feasibilityScore) || 0))}
            label={storedResult ? 'OPTIMIZED' : 'STANDBY'}
            color="#22D3EE"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: '#64748B',
                  marginBottom: 4,
                }}
              >
                RISK SURFACE
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#E6EEF8',
                }}
              >
                {weaknessesCount > 0 ? weaknessesCount / 10 : '0.00'}
              </div>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: '#64748B',
                  marginBottom: 4,
                }}
              >
                READINESS
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 16,
                  fontWeight: 700,
                  color: storedResult ? '#10B981' : '#64748B',
                }}
              >
                {storedResult ? 'High' : 'Idle'}
              </div>
            </div>
          </div>
        </div>

        <AgentConsole />

        {/* Nosana Network Status */}
        <div style={{
          background: '#05070F',
          border: '1px solid #1E293B',
          borderRadius: 10,
          padding: 16,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em' }}>
              NOSANA NETWORK
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: nosanaStats.status === 'ACTIVE' ? '#10B981' : '#F59E0B',
                boxShadow: nosanaStats.status === 'ACTIVE' ? '0 0 6px #10B981' : '0 0 6px #F59E0B',
              }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: nosanaStats.status === 'ACTIVE' ? '#10B981' : '#F59E0B' }}>
                {nosanaStats.status}
              </span>
            </div>
          </div>

          {[
            { label: 'ACTIVE NODES', val: nosanaStats.nodes },
            { label: 'JOBS PROCESSED', val: nosanaStats.jobs },
            { label: 'MODEL', val: 'Qwen3.5-9B' },
            { label: 'INFERENCE', val: nosanaStats.latency ?? '< 30s' },
          ].map(({ label, val }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #0C1018' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568' }}>{label}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#94A3B8' }}>{val}</span>
            </div>
          ))}

          <div style={{ marginTop: 10, padding: '6px 10px', background: 'rgba(79,124,255,0.05)', border: '1px solid rgba(79,124,255,0.1)', borderRadius: 4 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#4A5568', lineHeight: 1.6 }}>
              Vectra inference runs on Nosana&apos;s decentralized GPU network — no centralized cloud providers.
            </span>
          </div>
        </div>

        <div
          style={{
            background: '#05070F',
            border: '1px solid #1E293B',
            borderRadius: 10,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              background: '#0C1018',
              padding: '8px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Network size={11} color="#4F7CFF" />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#94A3B8',
                letterSpacing: '0.1em',
              }}
            >
              NODE TOPOLOGY
            </span>
          </div>

          <div style={{ background: '#05070F', height: 80 }}>
            <NodeNetworkSVG />
          </div>

          <div style={{ padding: '8px 14px' }}>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#64748B',
              }}
            >
              Mainnet Cluster Alpha
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}