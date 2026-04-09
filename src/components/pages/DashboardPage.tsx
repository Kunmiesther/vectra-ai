'use client'

import { useState } from 'react'
import {
  CheckCircle2, Circle, AlertTriangle, AlertCircle, XCircle,
  Target, Slash, Network, ScanLine, Plus, Loader2,
} from 'lucide-react'
import type { PageId } from '@/types'
import {
  StatCard, RingGauge, MonoBadge, StatusChip, NodeNetworkSVG,
} from '@/components/ui/primitives'
import { AgentConsole } from '@/components/ui/AgentConsole'
import { DASHBOARD_STATS, ROADMAP_STEPS } from '@/lib/mockData'

interface DashboardPageProps {
  setPage: (id: PageId) => void
}

export function DashboardPage({ setPage }: DashboardPageProps) {
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)

const handleAnalyze = async () => {
  if (!text.trim()) return
  setLoading(true)
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idea: text }),
    })
    const data = await res.json()
    localStorage.setItem('vectra-result', data.result ?? '')
    localStorage.setItem('vectra-idea', text)
    setPage('strategy')
  } catch {
    console.error('Analysis failed')
  } finally {
    setLoading(false)
  }
}

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', minHeight: 'calc(100vh - 84px)' }}>
      {/* ── Main workspace ── */}
      <div style={{ padding: 28, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          <StatCard label="FEASIBILITY SCORE" value="84.2" sub="/ 100" color="#22D3EE" />
          <div style={{ background: '#080C15', border: '1px solid #1E293B', borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 8 }}>CORE RISK COUNT</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 30, fontWeight: 700, color: '#EF4444', lineHeight: 1 }}>03</span>
              <MonoBadge color="#EF4444">CRITICAL</MonoBadge>
            </div>
          </div>
          <div style={{ background: '#080C15', border: '1px solid #1E293B', borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 8 }}>RECOMMENDED PATH</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: '#E6EEF8' }}>{DASHBOARD_STATS.recommendedPath}</div>
          </div>
          <div style={{ background: '#080C15', border: '1px solid #1E293B', borderRadius: 8, padding: '16px 20px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 8 }}>EXECUTION READINESS</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: '#10B981' }}>HIGH <span style={{ fontSize: 14 }}>↑</span></div>
          </div>
        </div>

        {/* Strategy input */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <ScanLine size={15} color="#4F7CFF" />
            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700, color: '#E6EEF8' }}>Strategy Initialization</span>
          </div>
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Describe your high-level idea or market hypothesis..."
            style={{
              width: '100%', minHeight: 120,
              background: '#05070F', border: '1px solid #1E293B',
              borderRadius: 6, padding: 14, color: '#E6EEF8',
              fontFamily: "'Sora', sans-serif", fontSize: 13,
              resize: 'vertical', outline: 'none', lineHeight: 1.6,
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22D3EE', boxShadow: '0 0 6px #22D3EE', display: 'block' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', letterSpacing: '0.1em' }}>AUTO-SAVE ACTIVE</span>
            </div>
            <button
  onClick={handleAnalyze}
  disabled={loading || !text.trim()}
  style={{
    padding: '8px 20px', 
    background: loading ? '#2a4299' : '#4F7CFF',
    border: 'none', borderRadius: 5, color: '#fff',
    fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
    cursor: loading ? 'not-allowed' : 'pointer', letterSpacing: '0.1em',
    display: 'flex', alignItems: 'center', gap: 6,
    opacity: !text.trim() ? 0.5 : 1,
  }}
>
  {loading && <Loader2 size={11} style={{ animation: 'spin 1s linear infinite' }} />}
  {loading ? 'ANALYZING...' : 'ANALYZE'}
</button>
          </div>
        </div>

        {/* Live analysis progress */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em' }}>LIVE ANALYSIS PROGRESS</span>
            <MonoBadge color="#22D3EE">SCANNING NODE 04...</MonoBadge>
          </div>
          <div style={{ display: 'flex', gap: 0 }}>
            {['Parsing Concept', 'Extracting Assumptions', 'Ranking Paths'].map((step, i) => (
              <div key={i} style={{ flex: 1, paddingRight: i < 2 ? 24 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  {i < 2
                    ? <CheckCircle2 size={12} color="#22D3EE" />
                    : <Circle size={12} color="#4A5568" />}
                  <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: i < 2 ? '#22D3EE' : '#4A5568', fontWeight: i < 2 ? 600 : 400 }}>{step}</span>
                </div>
                <div style={{ height: 2, background: i < 2 ? '#22D3EE' : '#1E293B', borderRadius: 2 }} />
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 10, color: '#4A5568', marginTop: 8 }}>
                  {i === 0 && 'Extracted 14 semantic pillars from input vector.'}
                  {i === 1 && 'Identifying hidden friction points and market gaps.'}
                  {i === 2 && 'Analyzing 1,200+ competitor clusters...'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strategic interpretation + Critical weaknesses */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: '#E6EEF8', marginBottom: 4 }}>Strategic Interpretation</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#64748B' }}>Complexity: High-Order Systems</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.1em', marginBottom: 4 }}>CONFIDENCE</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color: '#22D3EE' }}>92.4%</div>
              </div>
            </div>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#94A3B8', lineHeight: 1.7 }}>
              The proposed sovereign protocol integrates seamlessly with existing decentralized identity layers. Primary value extraction lies in the{' '}
              <span style={{ color: '#4F7CFF', textDecoration: 'underline' }}>automated compliance logic</span>.
            </p>
          </div>

          <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 14 }}>CRITICAL WEAKNESSES</div>
            {[
              { Icon: AlertTriangle, color: '#EF4444', bg: '#EF444415', title: 'CAPITAL LEAKAGE', desc: 'Inefficient gas routing during peak volatility could erode margins by 12%.' },
              { Icon: AlertCircle,   color: '#F59E0B', bg: '#F59E0B15', title: 'ADOPTION FRICTION', desc: 'User onboarding requires 4 distinct wallet signatures. Abandonment risk: Moderate.' },
            ].map(({ Icon, color, bg, title, desc }, i) => (
              <div
                key={i}
                style={{
                  background: bg, border: `1px solid ${color}30`,
                  borderRadius: 6, padding: '12px 14px', marginBottom: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <Icon size={13} color={color} />
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color, letterSpacing: '0.08em' }}>{title}</span>
                </div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#94A3B8', lineHeight: 1.5 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Winning path banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #08090F 0%, #080C15 100%)',
            border: '1px solid #1E3A5F', borderRadius: 10, padding: 28,
            position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, #4F7CFF, #22D3EE)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#4F7CFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={12} color="#fff" />
            </div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 800, color: '#E6EEF8', fontStyle: 'italic' }}>
              THE WINNING PATH: OBSIDIAN STACK
            </span>
          </div>
          <blockquote
            style={{
              fontFamily: "'Sora', sans-serif", fontSize: 14, color: '#94A3B8',
              fontStyle: 'italic', lineHeight: 1.7, marginBottom: 20,
              borderLeft: '3px solid #4F7CFF', paddingLeft: 16,
            }}
          >
            &ldquo;Aggressive vertical integration of the middleware layer to bypass legacy API bottlenecks, yielding a 40x speed advantage over incumbent solutions.&rdquo;
          </blockquote>
          <div style={{ display: 'flex', gap: 32 }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 4 }}>TIME TO MARKET</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: '#22D3EE' }}>14 Days</div>
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 4 }}>PROJECTED ROI</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: '#10B981' }}>420% (Yr 1)</div>
            </div>
          </div>
        </div>

        {/* Core MVP + Do Not Build */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Target size={13} color="#22D3EE" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#22D3EE', letterSpacing: '0.15em' }}>CORE MVP BUILD</span>
            </div>
            {['Unified Liquidity Aggregator Core', 'Zero-Knowledge Proof Verification', 'Tactical Execution Dashboard'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <CheckCircle2 size={13} color="#10B981" />
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#E6EEF8' }}>{item}</span>
              </div>
            ))}
          </div>
          <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Slash size={13} color="#EF4444" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#EF4444', letterSpacing: '0.15em' }}>DO NOT BUILD</span>
            </div>
            {['Social Integration Layer', 'Cross-Chain Fast-Confirms', 'Mobile-Native Companion App'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <XCircle size={13} color="#4A5568" />
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#4A5568', textDecoration: 'line-through' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 7-step roadmap */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 22 }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: '#E6EEF8', marginBottom: 20 }}>7-Step Strategic Roadmap</div>
          {ROADMAP_STEPS.map(({ n, color, label, desc }, i) => (
            <div key={i} style={{ display: 'flex', gap: 16, marginBottom: 18 }}>
              <div
                style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#080C15', border: `1px solid ${color}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color }}>{n}</span>
              </div>
              <div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4F7CFF', letterSpacing: '0.1em', marginBottom: 4 }}>{label}</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#64748B' }}>{desc}</div>
              </div>
            </div>
          ))}
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4A5568', marginTop: 4 }}>STEPS 04-07 SECURED...</div>
        </div>
      </div>

      {/* ── Right Rail ── */}
      <div
        style={{
          padding: '28px 20px',
          borderLeft: '1px solid #1E293B',
          display: 'flex', flexDirection: 'column', gap: 16,
          overflowY: 'auto',
        }}
      >
        {/* Strategy Confidence gauge */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 20, textAlign: 'center' }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 16 }}>STRATEGY CONFIDENCE</div>
          <RingGauge value={91} label="OPTIMIZED" color="#22D3EE" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', marginBottom: 4 }}>RISK SURFACE</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: '#E6EEF8' }}>0.08</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', marginBottom: 4 }}>READINESS</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: '#10B981' }}>High</div>
            </div>
          </div>
        </div>

        <AgentConsole />

        {/* Node topology */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, overflow: 'hidden' }}>
          <div style={{ background: '#0C1018', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <Network size={11} color="#4F7CFF" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em' }}>NODE TOPOLOGY</span>
          </div>
          <div style={{ background: '#05070F', height: 80 }}>
            <NodeNetworkSVG />
          </div>
          <div style={{ padding: '8px 14px' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B' }}>Mainnet Cluster Alpha</div>
          </div>
        </div>

        {/* Rejected paths */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 14 }}>
          {[
            { label: 'AGGREGATOR MODEL', tag: 'TOO BROAD',  color: '#F59E0B' },
            { label: 'DIRECT-TO-USER',  tag: 'LOW DIFF',   color: '#4A5568' },
            { label: 'OPEN SOURCE ONLY', tag: 'NO MOAT',   color: '#EF4444' },
          ].map(({ label, tag, color }, i) => (
            <div
              key={i}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '8px 0', borderBottom: i < 2 ? '1px solid #1E293B' : 'none',
              }}
            >
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#64748B', textDecoration: 'line-through' }}>{label}</span>
              <MonoBadge color={color}>{tag}</MonoBadge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
