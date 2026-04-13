'use client'

import { useState, useEffect } from 'react'
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Send,
  XCircle,
  RefreshCw,
  Zap,
  Eye,
} from 'lucide-react'
import { MonoBadge, StatusChip } from '@/components/ui/primitives'
import { parseVectraOutput } from '@/lib/utils'

const stripMd = (text: string) =>
  text?.replace(/\*\*/g, '').replace(/\*/g, '').trim() || ''

const VERDICT_CONFIG = {
  EXECUTE: {
    color: '#10B981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.3)',
    icon: Zap,
  },
  RESTRUCTURE: {
    color: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.3)',
    icon: RefreshCw,
  },
  KILL: {
    color: '#EF4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.3)',
    icon: XCircle,
  },
}

const TELEGRAM_BOT = 'https://t.me/VectraStrategicBot'

interface StrategyPageProps {
  wallet?: string
}

export function StrategyPage({ wallet }: StrategyPageProps) {
  const [publishing, setPublishing] = useState(false)
  const [cid, setCid] = useState('')
  const [ipfsUrl, setIpfsUrl] = useState('')
  const [analysis, setAnalysis] = useState<ReturnType<typeof parseVectraOutput> | null>(null)
  const [idea, setIdea] = useState('')
  const [hasRealData, setHasRealData] = useState(false)
  const [rawOutput, setRawOutput] = useState('')
  const [analysisHash, setAnalysisHash] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    const key = wallet ? `vectra-result-${wallet}` : 'vectra-result'
    const ideaKey = wallet ? `vectra-idea-${wallet}` : 'vectra-idea'
    const hashKey = wallet ? `vectra-hash-${wallet}` : 'vectra-hash'

    const stored = localStorage.getItem(key)
    const storedIdea = localStorage.getItem(ideaKey)
    const storedHash = localStorage.getItem(hashKey)

    if (stored && stored.trim().length > 0) {
      try {
        const parsed = parseVectraOutput(stored)
        setAnalysis(parsed)
        setHasRealData(true)
        setRawOutput(stored.slice(0, 600))
      } catch {
        setAnalysis(null)
        setHasRealData(false)
      }
    }

    if (storedIdea) setIdea(storedIdea)
    if (storedHash) setAnalysisHash(storedHash)
  }, [wallet])

  const feasibilityScore = analysis?.feasibilityScore ?? 0
  const scoreVerdict = stripMd(analysis?.scoreVerdict ?? '')
  const strategicReading = stripMd(analysis?.strategicReading ?? '')
  const assumptions = analysis?.hiddenAssumptions ?? []
  const weaknesses = analysis?.criticalWeaknesses ?? []
  const rejectedPaths = analysis?.rejectedPaths ?? []
  const recommendedName = stripMd(analysis?.recommendedDirection?.name ?? '')
  const recommendedDesc = stripMd(analysis?.recommendedDirection?.description ?? '')
  const recommendedConf = analysis?.recommendedDirection?.confidence ?? 0
  const roadmap = analysis?.executionRoadmap ?? []
  const buildItems = analysis?.mvpScope?.build ?? []
  const skipItems = analysis?.mvpScope?.skip ?? []
  const verdict = analysis?.verdict ?? { value: '', reasons: [] }

  const verdictCfg = verdict.value
    ? VERDICT_CONFIG[verdict.value as keyof typeof VERDICT_CONFIG]
    : null
  const VerdictIcon = verdictCfg?.icon ?? Zap

  const dossierTitle = idea
    ? idea.slice(0, 50) + (idea.length > 50 ? '...' : '')
    : 'No analysis yet'

  const handleDownload = () => {
    const raw = localStorage.getItem(wallet ? `vectra-result-${wallet}` : 'vectra-result')
    if (!raw) return

    const blob = new Blob([raw], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `vectra-analysis-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleTelegram = () => {
    const param = encodeURIComponent(idea.slice(0, 100))
    window.open(`${TELEGRAM_BOT}?start=${param}`, '_blank')
  }

  const handlePublish = async () => {
    if (!hasRealData || publishing) return
    setPublishing(true)

    try {
      const raw = localStorage.getItem(
        wallet ? `vectra-result-${wallet}` : 'vectra-result'
      )

      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          result: raw,
          idea,
          score: feasibilityScore,
          verdict: verdict.value,
          wallet: wallet || '',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        console.error('Publish failed:', data)
        alert(data?.error || 'Failed to save report')
        return
      }

      if (data.cid) {
        setCid(data.cid)
        setIpfsUrl(data.ipfsUrl)

        const histKey = wallet ? `vectra-history-${wallet}` : 'vectra-history'
        const existing = JSON.parse(localStorage.getItem(histKey) || '[]')

        if (existing[0]) {
          existing[0].cid = data.cid
          existing[0].ipfsUrl = data.ipfsUrl
          localStorage.setItem(histKey, JSON.stringify(existing))
        }
      }
    } catch (err) {
      console.error('Publish failed:', err)
      alert('Failed to save report')
    } finally {
      setPublishing(false)
    }
  }

  if (!hasRealData) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 84px)',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <Eye size={32} color="#1E293B" />
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            color: '#4A5568',
            letterSpacing: '0.1em',
          }}
        >
          NO ANALYSIS FOUND
        </div>
        <div
          style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: 13,
            color: '#64748B',
          }}
        >
          Submit an idea from the Dashboard to generate a strategy report.
        </div>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '1fr 280px',
        minHeight: 'calc(100vh - 84px)',
      }}
    >
      {/* ── Main ── */}
      <div
        style={{
          padding: 28,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <MonoBadge color="#EF4444">CLASSIFIED</MonoBadge>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: '#4A5568',
              }}
            >
              DOSSIER ID: VCTR-{Math.random().toString(36).slice(2, 8).toUpperCase()}-X
            </span>
            <MonoBadge color="#10B981">LIVE ANALYSIS</MonoBadge>
          </div>

          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: 28,
              fontWeight: 800,
              color: '#E6EEF8',
              lineHeight: 1.2,
              marginBottom: 6,
            }}
          >
            {dossierTitle}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            {[
              { label: 'GENERATED BY', val: 'VECTRA STRATEGIC AI' },
              { label: 'MODEL', val: 'QWEN3.5-9B / NOSANA' },
              { label: 'STATUS', val: 'COMPLETE' },
            ].map(({ label, val }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#4A5568',
                    letterSpacing: '0.1em',
                    marginBottom: 2,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: '#94A3B8',
                  }}
                >
                  {val}
                </div>
              </div>
            ))}
          </div>

          {analysisHash && (
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginTop: 10,
                padding: '5px 12px',
                background: 'rgba(79,124,255,0.06)',
                border: '1px solid rgba(79,124,255,0.2)',
                borderRadius: 4,
              }}
            >
              <div
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#4F7CFF',
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
                ANALYSIS HASH:
              </span>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: '#4F7CFF',
                  letterSpacing: '0.08em',
                  wordBreak: 'break-all',
                }}
              >
                {analysisHash}
              </span>
            </div>
          )}
        </div>

        {/* 01 Strategic Reading */}
        {strategicReading && (
          <div
            style={{
              background: '#080C15',
              border: '1px solid #1E293B',
              borderRadius: 10,
              padding: 24,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#22D3EE',
                letterSpacing: '0.15em',
                marginBottom: 14,
              }}
            >
              01 / STRATEGIC READING
            </div>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 13,
                color: '#94A3B8',
                lineHeight: 1.8,
              }}
            >
              {strategicReading}
            </p>
          </div>
        )}

        {/* 02 Hidden Assumptions */}
        {assumptions.length > 0 && (
          <div
            style={{
              background: '#080C15',
              border: '1px solid #1E293B',
              borderRadius: 10,
              padding: 24,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#8B5CF6',
                letterSpacing: '0.15em',
                marginBottom: 14,
              }}
            >
              02 / HIDDEN ASSUMPTIONS
            </div>
            {assumptions.map(({ name, description }, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(139,92,246,0.1)',
                    border: '1px solid rgba(139,92,246,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 8,
                      color: '#8B5CF6',
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#E6EEF8',
                      marginBottom: 4,
                    }}
                  >
                    {name}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 11,
                      color: '#64748B',
                      lineHeight: 1.6,
                    }}
                  >
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 03 Failure Points */}
        {weaknesses.length > 0 && (
          <div
            style={{
              background: '#080C15',
              border: '1px solid #1E293B',
              borderRadius: 10,
              padding: 24,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#EF4444',
                letterSpacing: '0.15em',
                marginBottom: 14,
              }}
            >
              03 / FAILURE POINTS
            </div>
            {weaknesses.map(({ name, description }, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 14,
                  padding: '12px 14px',
                  background: 'rgba(239,68,68,0.04)',
                  border: '1px solid rgba(239,68,68,0.15)',
                  borderRadius: 6,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <AlertTriangle size={12} color="#EF4444" />
                  <span
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 12,
                      fontWeight: 600,
                      color: '#EF4444',
                    }}
                  >
                    {name}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 11,
                    color: '#64748B',
                    lineHeight: 1.6,
                  }}
                >
                  {description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 04 Rejected Paths */}
        {rejectedPaths.length > 0 && (
          <div
            style={{
              background: '#080C15',
              border: '1px solid #1E293B',
              borderRadius: 10,
              padding: 24,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#64748B',
                letterSpacing: '0.15em',
                marginBottom: 16,
              }}
            >
              04 / REJECTED PATHS
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${Math.min(rejectedPaths.length, 3)}, 1fr)`,
                gap: 14,
              }}
            >
              {rejectedPaths.slice(0, 3).map(({ name, reason }, i) => (
                <div key={i} style={{ opacity: 0.6 }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: '#64748B',
                      marginBottom: 6,
                      textDecoration: 'line-through',
                    }}
                  >
                    {name}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 11,
                      color: '#4A5568',
                      lineHeight: 1.6,
                    }}
                  >
                    {reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 05 Winning Direction */}
        {recommendedName && (
          <div
            style={{
              background: '#080C15',
              border: '1px solid #1E3A5F',
              borderRadius: 10,
              padding: 24,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: 'linear-gradient(90deg, #4F7CFF, #22D3EE)',
              }}
            />
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#4F7CFF',
                letterSpacing: '0.15em',
                marginBottom: 14,
              }}
            >
              05 / WINNING DIRECTION
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 20,
                    fontWeight: 800,
                    color: '#E6EEF8',
                    marginBottom: 10,
                  }}
                >
                  {recommendedName}
                </h2>
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 13,
                    color: '#94A3B8',
                    lineHeight: 1.7,
                    maxWidth: 440,
                  }}
                >
                  {recommendedDesc}
                </p>
              </div>
              {recommendedConf > 0 && (
                <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 24 }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: '#64748B',
                      marginBottom: 4,
                    }}
                  >
                    CONFIDENCE
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 28,
                      fontWeight: 700,
                      color: '#22D3EE',
                    }}
                  >
                    {recommendedConf}%
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 06 Execution Plan */}
        {roadmap.length > 0 && (
          <div
            style={{
              background: '#080C15',
              border: '1px solid #1E293B',
              borderRadius: 10,
              padding: 24,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#22D3EE',
                letterSpacing: '0.15em',
                marginBottom: 18,
              }}
            >
              06 / EXECUTION PLAN
            </div>
            {roadmap.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 16 }}>
                <div
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: '50%',
                    border: `2px solid ${i === 0 ? '#22D3EE' : '#1E293B'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    background: i === 0 ? 'rgba(34,211,238,0.08)' : 'transparent',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: i === 0 ? '#22D3EE' : '#4A5568',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div style={{ paddingTop: 4 }}>
                  <p
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 12,
                      color: i === 0 ? '#E6EEF8' : '#64748B',
                      lineHeight: 1.6,
                    }}
                  >
                    {step}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 07 MVP Scope */}
        {(buildItems.length > 0 || skipItems.length > 0) && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {buildItems.length > 0 && (
              <div
                style={{
                  background: '#080C15',
                  border: '1px solid #1E293B',
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#10B981',
                    letterSpacing: '0.12em',
                    marginBottom: 12,
                  }}
                >
                  BUILD THESE
                </div>
                {buildItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                    <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 12,
                        color: '#94A3B8',
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {skipItems.length > 0 && (
              <div
                style={{
                  background: '#080C15',
                  border: '1px solid #1E293B',
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#EF4444',
                    letterSpacing: '0.12em',
                    marginBottom: 12,
                  }}
                >
                  SKIP THESE
                </div>
                {skipItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                    <div
                      style={{
                        width: 13,
                        height: 13,
                        flexShrink: 0,
                        marginTop: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <div style={{ width: 8, height: 1, background: '#EF4444' }} />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 12,
                        color: '#4A5568',
                        textDecoration: 'line-through',
                      }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 08 VERDICT */}
        {verdict.value && verdictCfg && (
          <div
            style={{
              background: verdictCfg.bg,
              border: `2px solid ${verdictCfg.border}`,
              borderRadius: 10,
              padding: 28,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: verdictCfg.color,
                letterSpacing: '0.15em',
                marginBottom: 16,
              }}
            >
              08 / FINAL VERDICT
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 8,
                  background: `${verdictCfg.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <VerdictIcon size={24} color={verdictCfg.color} />
              </div>
              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 40,
                  fontWeight: 900,
                  color: verdictCfg.color,
                  letterSpacing: '-0.02em',
                }}
              >
                {verdict.value}
              </div>
            </div>
            {verdict.reasons.length > 0 && (
              <div style={{ marginBottom: 24 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#64748B',
                    letterSpacing: '0.1em',
                    marginBottom: 12,
                  }}
                >
                  WHY THIS VERDICT:
                </div>
                {verdict.reasons.map((reason, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                    <div
                      style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: verdictCfg.color,
                        flexShrink: 0,
                        marginTop: 6,
                      }}
                    />
                    <span
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 13,
                        color: '#94A3B8',
                        lineHeight: 1.6,
                      }}
                    >
                      {stripMd(reason)}
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div style={{ paddingTop: 20, borderTop: `1px solid ${verdictCfg.border}` }}>
              <button
                onClick={handleTelegram}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'transparent',
                  border: `1px solid ${verdictCfg.color}`,
                  borderRadius: 6,
                  padding: '12px 20px',
                  cursor: 'pointer',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: verdictCfg.color,
                  letterSpacing: '0.1em',
                }}
              >
                <Send size={13} /> CONTINUE EXECUTION IN TELEGRAM
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Right Rail ── */}
      <div
        style={{
          padding: '28px 20px',
          borderLeft: '1px solid #1E293B',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflowY: 'auto',
        }}
      >
        {/* Score ring */}
        <div
          style={{
            background: '#080C15',
            border: '1px solid #1E293B',
            borderRadius: 10,
            padding: 20,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#22D3EE',
              letterSpacing: '0.12em',
              marginBottom: 16,
            }}
          >
            FEASIBILITY SCORE
          </div>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                border: '3px solid #22D3EE',
                boxShadow: '0 0 20px rgba(34,211,238,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 22,
                    fontWeight: 800,
                    color: '#22D3EE',
                    textAlign: 'center',
                  }}
                >
                  {feasibilityScore}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 8,
                    color: '#64748B',
                    textAlign: 'center',
                  }}
                >
                  {scoreVerdict}
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleDownload}
            style={{
              width: '100%',
              padding: 10,
              background: 'transparent',
              border: '1px solid #1E293B',
              borderRadius: 5,
              color: '#94A3B8',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              cursor: 'pointer',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Download size={11} /> DOWNLOAD REPORT
          </button>
        </div>

        {!cid ? (
          <button
            onClick={handlePublish}
            disabled={publishing}
            style={{
              width: '100%',
              marginTop: 8,
              padding: 10,
              background: publishing ? 'rgba(139,92,246,0.05)' : 'transparent',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: 5,
              color: '#8B5CF6',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              cursor: publishing ? 'not-allowed' : 'pointer',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {publishing ? 'SAVING REPORT...' : 'SAVE REPORT PERMANENTLY'}
          </button>
        ) : (
          <div
            style={{
              marginTop: 8,
              padding: 10,
              background: 'rgba(139,92,246,0.08)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: 5,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#8B5CF6',
                marginBottom: 6,
              }}
            >
              REPORT SAVED — PERMANENT LINK
            </div>
            <div
              onClick={() => window.open(ipfsUrl, '_blank')}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8,
                color: '#64748B',
                cursor: 'pointer',
                wordBreak: 'break-all',
                lineHeight: 1.6,
              }}
            >
              View report →
            </div>
          </div>
        )}

        {/* Verdict quick view */}
        {verdict.value && verdictCfg && (
          <div
            style={{
              background: verdictCfg.bg,
              border: `1px solid ${verdictCfg.border}`,
              borderRadius: 10,
              padding: 18,
              textAlign: 'center',
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
              VERDICT
            </div>
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 26,
                fontWeight: 900,
                color: verdictCfg.color,
              }}
            >
              {verdict.value}
            </div>
          </div>
        )}

        {/* Execution flags */}
        <div
          style={{
            background: '#080C15',
            border: '1px solid #1E293B',
            borderRadius: 10,
            padding: 18,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#64748B',
              letterSpacing: '0.12em',
              marginBottom: 12,
            }}
          >
            EXECUTION FLAGS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <StatusChip label="ANALYSIS COMPLETE" color="#10B981" />
            <StatusChip label="WEAK PATHS REJECTED" color="#EF4444" />
            <StatusChip label="EXECUTION PATH SELECTED" color="#4F7CFF" />
            {verdict.value === 'EXECUTE' && (
              <StatusChip label="CLEARED FOR EXECUTION" color="#10B981" />
            )}
            {verdict.value === 'RESTRUCTURE' && (
              <StatusChip label="RESTRUCTURE REQUIRED" color="#F59E0B" />
            )}
            {verdict.value === 'KILL' && (
              <StatusChip label="IDEA REJECTED" color="#EF4444" />
            )}
          </div>
        </div>

        {/* Raw output */}
        {hasRealData && rawOutput && (
          <div
            style={{
              background: '#080C15',
              border: '1px solid #1E293B',
              borderRadius: 10,
              padding: 18,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#64748B',
                letterSpacing: '0.12em',
                marginBottom: 12,
              }}
            >
              RAW AGENT OUTPUT
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#4A5568',
                lineHeight: 1.7,
                maxHeight: 180,
                overflowY: 'auto',
                background: '#05070F',
                padding: 10,
                borderRadius: 5,
                border: '1px solid #1E293B',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {rawOutput}...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}