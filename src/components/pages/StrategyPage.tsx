'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Radio, CheckCircle2, Download } from 'lucide-react'
import { MonoBadge, StatusChip } from '@/components/ui/primitives'
import { parseVectraOutput } from '@/lib/utils'

const stripMd = (text: string) => text.replace(/\*\*/g, '').replace(/\*/g, '').trim()

export function StrategyPage() {
  const [analysis, setAnalysis] = useState<ReturnType<typeof parseVectraOutput> | null>(null)
  const [idea, setIdea] = useState('')
  const [hasRealData, setHasRealData] = useState(false)
  const [rawOutput, setRawOutput] = useState('')
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('vectra-result')
    const storedIdea = localStorage.getItem('vectra-idea')

    if (stored && stored.trim().length > 0) {
      try {
        const parsed = parseVectraOutput(stored)
        setAnalysis(parsed)
        setHasRealData(true)
        setRawOutput(stored.slice(0, 500))
      } catch {
        setHasRealData(false)
      }
    }

    if (storedIdea) setIdea(storedIdea)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1100)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const feasibilityScore = analysis?.feasibilityScore ?? 0
  const scoreVerdict = stripMd(analysis?.scoreVerdict ?? 'NO REPORT')
  const strategicReading = stripMd(analysis?.strategicReading ?? '')
  const recommendedName = stripMd(analysis?.recommendedDirection?.name ?? '')
  const recommendedDesc = stripMd(analysis?.recommendedDirection?.description ?? '')
  const recommendedConf = analysis?.recommendedDirection?.confidence ?? 0

  const weaknesses =
    analysis?.criticalWeaknesses?.length && analysis.criticalWeaknesses[0]?.name
      ? analysis.criticalWeaknesses.map((w) => ({
          name: stripMd(w.name),
          description: stripMd(w.description),
        }))
      : []

  const rejectedPaths =
    analysis?.rejectedPaths?.length && analysis.rejectedPaths[0]?.name
      ? analysis.rejectedPaths.map((r) => ({
          name: stripMd(r.name),
          reason: stripMd(r.reason),
        }))
      : []

  const buildItems = analysis?.mvpScope?.build?.length
    ? analysis.mvpScope.build.map(stripMd)
    : []

  const skipItems = analysis?.mvpScope?.skip?.length
    ? analysis.mvpScope.skip.map(stripMd)
    : []

  const roadmap = analysis?.executionRoadmap?.length
    ? analysis.executionRoadmap.map((step, i) => ({
        phase: stripMd(step),
        period: '',
        active: i === 0,
      }))
    : []

  const dossierTitle = idea ? idea.slice(0, 40) + (idea.length > 40 ? '...' : '') : 'Strategy Report'
  const dossierSubtitle = hasRealData ? 'Strategic Intelligence Report' : 'Awaiting Analysis'

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 280px',
        minHeight: 'calc(100vh - 84px)',
      }}
    >
      {/* ── Main ── */}
      <div
        style={{
          padding: isMobile ? 16 : 28,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        {/* Dossier header */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: isMobile ? 'flex-start' : 'center',
              flexWrap: 'wrap',
              gap: 12,
              marginBottom: 8,
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            <MonoBadge color="#EF4444">CLASSIFIED</MonoBadge>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: '#4A5568',
                wordBreak: 'break-word',
              }}
            >
              DOSSIER ID: VCTR-{Math.random().toString(36).slice(2, 7).toUpperCase()}-X
            </span>
            {hasRealData ? (
              <MonoBadge color="#10B981">LIVE ANALYSIS</MonoBadge>
            ) : (
              <MonoBadge color="#64748B">NO REPORT</MonoBadge>
            )}
          </div>

          <h1
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: isMobile ? 26 : 34,
              fontWeight: 800,
              color: '#E6EEF8',
              lineHeight: 1.1,
            }}
          >
            {dossierTitle}
          </h1>

          <h2
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: isMobile ? 18 : 24,
              fontWeight: 600,
              color: '#4F7CFF',
              lineHeight: 1.2,
              marginBottom: 12,
            }}
          >
            {dossierSubtitle}
          </h2>
        </div>

        {!hasRealData ? (
          <div
            style={{
              background: '#05070F',
              border: '1px solid #1E293B',
              borderRadius: 12,
              padding: isMobile ? 20 : 28,
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#64748B',
                letterSpacing: '0.15em',
                marginBottom: 14,
              }}
            >
              REPORT STATUS
            </div>

            <h3
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: isMobile ? 20 : 24,
                fontWeight: 800,
                color: '#E6EEF8',
                marginBottom: 10,
              }}
            >
              No strategy report yet
            </h3>

            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 13,
                color: '#94A3B8',
                lineHeight: 1.7,
                maxWidth: 620,
                marginBottom: 18,
              }}
            >
              Run an analysis from the dashboard to generate a real strategy report. This page only shows actual output after analysis has been completed.
            </p>

            <div
              style={{
                background: '#0A0C14',
                border: '1px solid #1E293B',
                borderRadius: 8,
                padding: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  color: '#64748B',
                  lineHeight: 1.8,
                }}
              >
                {`> 01. Open dashboard`}
                <br />
                {`> 02. Enter your idea or hypothesis`}
                <br />
                {`> 03. Run analysis`}
                <br />
                {`> 04. Return here for the full report`}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Strategic reading */}
            {strategicReading && (
              <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: isMobile ? 16 : 24 }}>
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

                {strategicReading.split('\n\n').map((para, i, arr) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: 13,
                      color: '#94A3B8',
                      lineHeight: 1.8,
                      marginBottom: i < arr.length - 1 ? 16 : 0,
                    }}
                  >
                    {stripMd(para)}
                  </p>
                ))}
              </div>
            )}

            {/* Recommended build direction */}
            {(recommendedName || recommendedDesc) && (
              <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: isMobile ? 16 : 24 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#64748B',
                    letterSpacing: '0.15em',
                    marginBottom: 14,
                  }}
                >
                  02 / RECOMMENDED BUILD DIRECTION
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? 16 : 0,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h2
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: isMobile ? 18 : 22,
                        fontWeight: 800,
                        color: '#E6EEF8',
                        marginBottom: 12,
                      }}
                    >
                      {recommendedName}
                    </h2>
                    <p
                      style={{
                        fontFamily: "'Sora', sans-serif",
                        fontSize: 12,
                        color: '#64748B',
                        lineHeight: 1.7,
                        maxWidth: 420,
                      }}
                    >
                      {recommendedDesc}
                    </p>
                  </div>

                  <div style={{ textAlign: isMobile ? 'left' : 'right', flexShrink: 0, marginLeft: isMobile ? 0 : 24 }}>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', marginBottom: 4 }}>
                      CONFIDENCE
                    </div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, color: '#22D3EE' }}>
                      {recommendedConf}%
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Critical weaknesses */}
            {weaknesses.length > 0 && (
              <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: isMobile ? 16 : 22 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#EF4444',
                    letterSpacing: '0.15em',
                    marginBottom: 14,
                  }}
                >
                  03 / CRITICAL WEAKNESSES
                </div>

                {weaknesses.slice(0, 3).map(({ name, description }, i) => (
                  <div key={i} style={{ marginBottom: 14 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      {i === 0 ? <AlertTriangle size={13} color="#EF4444" /> : <Radio size={13} color="#F59E0B" />}
                      <span
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontSize: 12,
                          fontWeight: 600,
                          color: '#E6EEF8',
                        }}
                      >
                        {name}
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#64748B', lineHeight: 1.5 }}>
                      {description}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Rejected alternatives */}
            {rejectedPaths.length > 0 && (
              <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: isMobile ? 16 : 22 }}>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#64748B',
                    letterSpacing: '0.15em',
                    marginBottom: 16,
                  }}
                >
                  04 / REJECTED ALTERNATIVES
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : `repeat(${Math.min(rejectedPaths.length, 3)}, 1fr)`,
                    gap: 16,
                  }}
                >
                  {rejectedPaths.slice(0, 3).map(({ name, reason }, i) => (
                    <div key={i} style={{ opacity: 0.55 }}>
                      <div
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 9,
                          color: '#64748B',
                          letterSpacing: '0.1em',
                          marginBottom: 8,
                          textDecoration: 'line-through',
                        }}
                      >
                        {name}
                      </div>
                      <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#4A5568', lineHeight: 1.6 }}>
                        {reason}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Execution timeline + MVP scope */}
            {(roadmap.length > 0 || buildItems.length > 0 || skipItems.length > 0) && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 1fr',
                  gap: 16,
                }}
              >
                {roadmap.length > 0 && (
                  <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: isMobile ? 16 : 22 }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        color: '#22D3EE',
                        letterSpacing: '0.15em',
                        marginBottom: 18,
                      }}
                    >
                      05 / EXECUTION TIMELINE
                    </div>

                    {roadmap.slice(0, 4).map(({ phase, period, active }, i) => (
                      <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
                        <div
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            flexShrink: 0,
                            marginTop: 3,
                            background: active ? '#22D3EE' : '#1E293B',
                            border: `2px solid ${active ? '#22D3EE' : '#4A5568'}`,
                            boxShadow: active ? '0 0 8px #22D3EE' : 'none',
                          }}
                        />
                        <div>
                          <div
                            style={{
                              fontFamily: "'Sora', sans-serif",
                              fontSize: 12,
                              fontWeight: 600,
                              color: active ? '#E6EEF8' : '#64748B',
                              marginBottom: 4,
                            }}
                          >
                            {phase}
                          </div>
                          {period && <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#4A5568', lineHeight: 1.5 }}>{period}</div>}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {(buildItems.length > 0 || skipItems.length > 0) && (
                  <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: isMobile ? 16 : 22 }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: 9,
                        color: '#22D3EE',
                        letterSpacing: '0.15em',
                        marginBottom: 16,
                      }}
                    >
                      06 / MVP SCOPE
                    </div>

                    {buildItems.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 9,
                            color: '#10B981',
                            letterSpacing: '0.1em',
                            marginBottom: 10,
                          }}
                        >
                          BUILD
                        </div>

                        {buildItems.map((item, i) => (
                          <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                            <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#94A3B8' }}>{item}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {skipItems.length > 0 && (
                      <div style={{ marginBottom: 16 }}>
                        <div
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 9,
                            color: '#EF4444',
                            letterSpacing: '0.1em',
                            marginBottom: 10,
                          }}
                        >
                          SKIP
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
              </div>
            )}
          </>
        )}
      </div>

      {/* ── Right Rail ── */}
      <div
        style={{
          padding: isMobile ? '0 16px 16px' : isTablet ? '0 28px 28px' : '28px 20px',
          borderLeft: !isMobile && !isTablet ? '1px solid #1E293B' : 'none',
          borderTop: isMobile || isTablet ? '1px solid #1E293B' : 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          overflowY: 'auto',
        }}
      >
        {/* Feasibility verdict */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 20 }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#22D3EE',
              letterSpacing: '0.12em',
              marginBottom: 16,
            }}
          >
            FEASIBILITY VERDICT
          </div>

          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                border: '3px solid #22D3EE',
                boxShadow: '0 0 20px rgba(34,211,238,0.3)',
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
                  {hasRealData ? feasibilityScore : '—'}
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
            onClick={() => {
              const raw = localStorage.getItem('vectra-result')
              if (!raw) return

              const blob = new Blob([raw], { type: 'text/plain' })
              const url = URL.createObjectURL(blob)
              const a = document.createElement('a')
              a.href = url
              a.download = `vectra-analysis-${Date.now()}.txt`
              a.click()
              URL.revokeObjectURL(url)
            }}
            disabled={!hasRealData}
            style={{
              width: '100%',
              marginTop: 14,
              padding: 10,
              background: 'transparent',
              border: '1px solid #1E293B',
              borderRadius: 5,
              color: hasRealData ? '#94A3B8' : '#4A5568',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              cursor: hasRealData ? 'pointer' : 'not-allowed',
              letterSpacing: '0.1em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <Download size={11} /> DOWNLOAD RAW INTELLIGENCE
          </button>
        </div>

        {/* Status chips */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
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
            <StatusChip label={hasRealData ? 'ANALYSIS COMPLETE' : 'NO ANALYSIS YET'} color={hasRealData ? '#10B981' : '#4A5568'} />
            {hasRealData && weaknesses.length > 0 && <StatusChip label="RISK SIGNALS DETECTED" color="#F59E0B" />}
            {hasRealData && recommendedName && <StatusChip label="EXECUTION PATH SELECTED" color="#4F7CFF" />}
          </div>
        </div>

        {/* Raw output preview */}
        {hasRealData && (
          <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
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
                maxHeight: 200,
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