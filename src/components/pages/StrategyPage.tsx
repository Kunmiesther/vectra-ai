'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, Radio, CheckCircle2, Download } from 'lucide-react'
import { MonoBadge, StatusChip } from '@/components/ui/primitives'
import { parseVectraOutput } from '@/lib/utils'

// ─── Mock fallbacks ───────────────────────────────────────────────────────────

const MOCK_WEAKNESSES = [
  { name: 'CAPITAL LEAKAGE', description: 'Inefficient gas routing during peak volatility could erode margins by 12%.' },
  { name: 'ADOPTION FRICTION', description: 'User onboarding requires 4 distinct wallet signatures. Abandonment risk: Moderate.' },
]

const MOCK_BUILD = ['Unified Liquidity Aggregator Core', 'Zero-Knowledge Proof Verification', 'Tactical Execution Dashboard']
const MOCK_SKIP  = ['Social Integration Layer', 'Cross-Chain Fast-Confirms', 'Mobile-Native Companion App']

const MOCK_TIMELINE = [
  { phase: 'Phase Alpha: Initial Infiltration',  period: 'Weeks 1–4: Edge node deployment and baseline establish.',         active: true  },
  { phase: 'Phase Beta: Protocol Escalation',    period: 'Weeks 5–12: Full market saturation and competitor suppression.',   active: false },
  { phase: 'Phase Omega: Total Hegemony',        period: 'Weeks 13+: Final systemic lock and perpetual optimization loop.',  active: false },
]

const MOCK_REJECTED = [
  { name: 'CLOUD-NATIVE HYBRID',  reason: 'Vulnerable to third-party vendor lock-in and high-latency bias. Dismissed for lack of sovereignty.' },
  { name: 'DECENTRALIZED MESH',   reason: 'Inefficient throughput for real-time strategic maneuvers. Complexity increases execution risk.' },
  { name: 'LEGACY API WRAP',      reason: 'Fails Core Performance requirements. Risk of key systems failure under load.' },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function StrategyPage() {
  const [analysis, setAnalysis] = useState<ReturnType<typeof parseVectraOutput> | null>(null)
  const [idea, setIdea] = useState('')
  const [hasRealData, setHasRealData] = useState(false)

  useEffect(() => {
    const stored    = localStorage.getItem('vectra-result')
    const storedIdea = localStorage.getItem('vectra-idea')
    if (stored && stored.trim().length > 0) {
      try {
        const parsed = parseVectraOutput(stored)
        setAnalysis(parsed)
        setHasRealData(true)
      } catch {
        // fall through to mock data
      }
    }
    if (storedIdea) setIdea(storedIdea)
  }, [])

  // ── derived display values ──────────────────────────────────────────────────

  const feasibilityScore   = analysis?.feasibilityScore ?? 84
  const scoreVerdict       = analysis?.scoreVerdict ?? 'VIABLE'
  const strategicReading   = analysis?.strategicReading ?? `The current market topography indicates a significant structural deficit in high-latency defense mechanisms. Competitor activity is localized to standardized SaaS architectures, creating a strategic vacuum within sovereign data processing layers.\n\nDeployment of the Obsidian Protocol will prioritize the encapsulation of legacy assets while simultaneously deploying parallel-processed edge nodes. This allows for total market saturation with zero detectable overhead.`
  const recommendedName    = analysis?.recommendedDirection?.name ?? 'Sovereign Edge Deployment'
  const recommendedDesc    = analysis?.recommendedDirection?.description ?? 'Autonomous infrastructure that self-heals and optimizes without human intervention. Built for high-stakes environments where latency is the only metric of failure.'
  const recommendedConf    = analysis?.recommendedDirection?.confidence ?? 98
  const weaknesses         = (analysis?.criticalWeaknesses?.length && analysis.criticalWeaknesses[0]?.name) ? analysis.criticalWeaknesses : MOCK_WEAKNESSES
  const rejectedPaths      = (analysis?.rejectedPaths?.length && analysis.rejectedPaths[0]?.name) ? analysis.rejectedPaths : MOCK_REJECTED
  const buildItems         = analysis?.mvpScope?.build?.length ? analysis.mvpScope.build : MOCK_BUILD
  const skipItems          = analysis?.mvpScope?.skip?.length  ? analysis.mvpScope.skip  : MOCK_SKIP
  const roadmap            = analysis?.executionRoadmap?.length
    ? analysis.executionRoadmap.map((step, i) => ({ phase: step, period: '', active: i === 0 }))
    : MOCK_TIMELINE

  const dossierTitle    = idea ? idea.slice(0, 40) + (idea.length > 40 ? '...' : '') : 'Project Obsidian'
  const dossierSubtitle = hasRealData ? 'Strategic Intelligence Report' : 'Market Dominance Protocol'

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', minHeight: 'calc(100vh - 84px)' }}>

      {/* ── Main ── */}
      <div style={{ padding: 28, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Dossier header */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <MonoBadge color="#EF4444">CLASSIFIED</MonoBadge>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4A5568' }}>
              DOSSIER ID: VCTR-{Math.random().toString(36).slice(2, 7).toUpperCase()}-X
            </span>
            {hasRealData && (
              <MonoBadge color="#10B981">LIVE ANALYSIS</MonoBadge>
            )}
          </div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 34, fontWeight: 800, color: '#E6EEF8', lineHeight: 1.1 }}>
            {dossierTitle}
          </h1>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 24, fontWeight: 600, color: '#4F7CFF', lineHeight: 1.2, marginBottom: 12 }}>
            {dossierSubtitle}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {[
              { label: 'GENERATED BY', val: 'VECTRA STRATEGIC AI CORE' },
              { label: 'MODEL',        val: 'QWEN3.5-9B-FP8 / NOSANA' },
              { label: 'CYCLE TIME',   val: '< 30S' },
            ].map(({ label, val }) => (
              <div key={label}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 2 }}>{label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#94A3B8', letterSpacing: '0.08em' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic reading */}
        <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 24 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#22D3EE', letterSpacing: '0.15em', marginBottom: 14 }}>01 / STRATEGIC READING</div>
          {strategicReading.split('\n\n').map((para, i) => (
            <p key={i} style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: '#94A3B8', lineHeight: 1.8, marginBottom: i < strategicReading.split('\n\n').length - 1 ? 16 : 0 }}>
              {para}
            </p>
          ))}
          {/* Bar chart viz */}
          <div style={{ marginTop: 18, height: 80, background: '#05070F', borderRadius: 6, display: 'flex', alignItems: 'flex-end', gap: 3, padding: '0 12px 12px', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 30% 50%, rgba(79,124,255,0.1), transparent 60%)' }} />
            {[35, 55, 28, 70, 42, 88, 50, 62, 38, 75, 45, 90, 55, 68, 40, 82, 48, 72, 35, 65].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1, borderRadius: '2px 2px 0 0',
                  background: `rgba(79,124,255,${0.2 + (h / 100) * 0.6})`,
                  height: `${h}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Recommended build direction */}
        <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 24 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.15em', marginBottom: 14 }}>02 / RECOMMENDED BUILD DIRECTION</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 22, fontWeight: 800, color: '#E6EEF8', marginBottom: 12 }}>{recommendedName}</h2>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#64748B', lineHeight: 1.7, maxWidth: 420 }}>{recommendedDesc}</p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 24 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', marginBottom: 4 }}>CONFIDENCE</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 26, fontWeight: 700, color: '#22D3EE' }}>{recommendedConf}%</div>
            </div>
          </div>
        </div>

        {/* Differentiation + Critical weaknesses */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#22D3EE', letterSpacing: '0.15em', marginBottom: 14 }}>03 / DIFFERENTIATION STRATEGY</div>
            <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: '#E6EEF8', marginBottom: 10 }}>The Moat Principle</h3>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#64748B', lineHeight: 1.7, marginBottom: 18 }}>
              Unlike competitors focusing on UI/UX, the recommended protocol builds deep integration layers into existing infrastructure stacks, making switching costs insurmountable.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'LEVERAGE', val: '8.4x Structural' },
                { label: 'ENTROPY',  val: '0.02% Residual' },
              ].map(({ label, val }) => (
                <div key={label} style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#E6EEF8' }}>{val}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#EF4444', letterSpacing: '0.15em', marginBottom: 14 }}>04 / CRITICAL WEAKNESSES</div>
            {weaknesses.slice(0, 3).map(({ name, description }, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  {i === 0
                    ? <AlertTriangle size={13} color="#EF4444" />
                    : <Radio size={13} color="#F59E0B" />
                  }
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600, color: '#E6EEF8' }}>{name}</span>
                </div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#64748B', lineHeight: 1.5 }}>{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Rejected alternatives */}
        <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.15em', marginBottom: 16 }}>05 / REJECTED ALTERNATIVES (STRATEGIC DISMISSAL)</div>
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(rejectedPaths.length, 3)}, 1fr)`, gap: 16 }}>
            {rejectedPaths.slice(0, 3).map(({ name, reason }, i) => (
              <div key={i} style={{ opacity: 0.55 }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.1em', marginBottom: 8, textDecoration: 'line-through' }}>{name}</div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#4A5568', lineHeight: 1.6 }}>{reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Execution timeline + MVP scope */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#22D3EE', letterSpacing: '0.15em', marginBottom: 18 }}>06 / EXECUTION TIMELINE</div>
            {roadmap.slice(0, 4).map(({ phase, period, active }, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
                <div
                  style={{
                    width: 12, height: 12, borderRadius: '50%', flexShrink: 0, marginTop: 3,
                    background: active ? '#22D3EE' : '#1E293B',
                    border: `2px solid ${active ? '#22D3EE' : '#4A5568'}`,
                    boxShadow: active ? '0 0 8px #22D3EE' : 'none',
                  }}
                />
                <div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 600, color: active ? '#E6EEF8' : '#64748B', marginBottom: 4 }}>{phase}</div>
                  {period && <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#4A5568' }}>{period}</div>}
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#22D3EE', letterSpacing: '0.15em', marginBottom: 16 }}>07 / MVP SCOPE</div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#10B981', letterSpacing: '0.1em', marginBottom: 10 }}>BUILD</div>
              {buildItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <CheckCircle2 size={13} color="#10B981" style={{ flexShrink: 0, marginTop: 2 }} />
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#94A3B8' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#EF4444', letterSpacing: '0.1em', marginBottom: 10 }}>SKIP</div>
              {skipItems.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 13, height: 13, flexShrink: 0, marginTop: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 8, height: 1, background: '#EF4444' }} />
                  </div>
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#4A5568', textDecoration: 'line-through' }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 6, padding: 12 }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#EF4444', letterSpacing: '0.1em', marginBottom: 8 }}>CRITICAL FAILURE POINTS</div>
              {weaknesses.slice(0, 3).map(({ name }, i) => (
                <div key={i} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', lineHeight: 1.8 }}>
                  {`> 0${i + 1}. ${name?.toUpperCase()}`}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Rail ── */}
      <div style={{ padding: '28px 20px', borderLeft: '1px solid #1E293B', display: 'flex', flexDirection: 'column', gap: 16, overflowY: 'auto' }}>

        {/* Feasibility verdict */}
        <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 20 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#22D3EE', letterSpacing: '0.12em', marginBottom: 16 }}>FEASIBILITY VERDICT</div>
          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <div
              style={{
                width: 80, height: 80, borderRadius: '50%',
                border: '3px solid #22D3EE',
                boxShadow: '0 0 20px rgba(34,211,238,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto',
              }}
            >
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 800, color: '#22D3EE', textAlign: 'center' }}>
                  {feasibilityScore}
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#64748B', textAlign: 'center' }}>{scoreVerdict}</div>
              </div>
            </div>
          </div>
          {[
            { label: 'RESOURCE LOAD',    val: 'OPTIMAL',       color: '#10B981' },
            { label: 'MARKET ENTRY',     val: 'HIGH VELOCITY', color: '#22D3EE' },
            { label: 'RISK COEFFICIENT', val: '0.12 NEGATIVE', color: '#EF4444' },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E293B' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B' }}>{label}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color }}>{val}</span>
            </div>
          ))}
          <button
            style={{
              width: '100%', marginTop: 14, padding: 10,
              background: 'transparent', border: '1px solid #1E293B',
              borderRadius: 5, color: '#94A3B8',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
              cursor: 'pointer', letterSpacing: '0.1em',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            <Download size={11} /> DOWNLOAD RAW INTELLIGENCE
          </button>
        </div>

        {/* Core strengths */}
        <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 12 }}>CORE STRENGTHS</div>
          {['Neural Asymmetry', 'Total Resource Isolation', 'Sovereign Infrastructure'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 5, height: 5, background: '#4F7CFF', borderRadius: 1 }} />
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#94A3B8' }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Status chips */}
        <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 12 }}>EXECUTION FLAGS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <StatusChip label="ANALYSIS COMPLETE"      color="#10B981" />
            <StatusChip label="SCOPE RISK DETECTED"    color="#F59E0B" />
            <StatusChip label="WEAK PATH REJECTED"     color="#EF4444" />
            <StatusChip label="EXECUTION PATH SELECTED" color="#4F7CFF" />
          </div>
        </div>

        {/* Raw output preview — only when real data exists */}
        {hasRealData && (
          <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 12 }}>RAW AGENT OUTPUT</div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568',
                lineHeight: 1.7, maxHeight: 200, overflowY: 'auto',
                background: '#05070F', padding: 10, borderRadius: 5, border: '1px solid #1E293B',
                whiteSpace: 'pre-wrap', wordBreak: 'break-word',
              }}
            >
              {localStorage.getItem('vectra-result')?.slice(0, 500)}...
            </div>
          </div>
        )}
      </div>
    </div>
  )
}