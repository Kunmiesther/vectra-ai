'use client'

import { CheckCircle2, AlertTriangle, RefreshCw, Circle, Terminal } from 'lucide-react'
import { CHECKLIST_SECTIONS, SYSTEM_LOGS } from '@/lib/mockData'
import type { ChecklistItem } from '@/types'

export function ChecklistsPage() {
  return (
    <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 28, minHeight: 'calc(100vh - 84px)' }}>

      {/* ── Main ── */}
      <div>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4F7CFF', letterSpacing: '0.15em', marginBottom: 8 }}>
            PROTOCOL: DEPLOYMENT INTEGRITY LAYER
          </div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, color: '#E6EEF8', marginBottom: 10 }}>
            Integrity Readiness Protocol
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: '#64748B', lineHeight: 1.6, maxWidth: 600 }}>
            Sovereign-level validation sequence for strategic assets. Ensure all operational facets meet high-fidelity threshold before final execution.
          </p>
        </div>

        {/* Checklist cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {CHECKLIST_SECTIONS.map((section, si) => (
            <div
              key={si}
              style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 20 }}
            >
              {/* Card header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700, color: '#E6EEF8' }}>
                  {section.num}. {section.title}
                </span>
                <div
                  style={{
                    background: `${section.pctColor}20`,
                    border: `1px solid ${section.pctColor}40`,
                    borderRadius: 4, padding: '2px 8px',
                  }}
                >
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: section.pctColor }}>
                    {section.pct}{typeof section.pct === 'number' ? '%' : ''}
                  </span>
                </div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 16 }}>
                {section.label}
              </div>

              {/* Items */}
              {section.items.map((item, ii) => (
                <ChecklistItemCard key={ii} item={item} />
              ))}
            </div>
          ))}
        </div>

        {/* System activity log terminal */}
        <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, overflow: 'hidden' }}>
          <div
            style={{
              padding: '12px 18px', borderBottom: '1px solid #1E293B',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Terminal size={12} color="#4A5568" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em' }}>
                SYSTEM ACTIVITY LOGS
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#F59E0B' }} />
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
            </div>
          </div>
          <div style={{ padding: '14px 18px' }}>
            {SYSTEM_LOGS.map((log, i) => (
              <div
                key={i}
                style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, lineHeight: 2 }}
              >
                <span style={{ color: '#4A5568' }}>[{log.time}] </span>
                <span style={{ color: log.warn ? '#F59E0B' : '#64748B' }}>{log.type}: </span>
                <span style={{ color: log.warn ? '#F59E0B' : '#94A3B8' }}>{log.text}</span>
              </div>
            ))}
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#4F7CFF', marginTop: 4 }}>
              _LOADING DATA STREAM_
              <span style={{ animation: 'blink 1.2s step-end infinite' }}>|</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right: Final Submission ── */}
      <div>
        <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 24, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: '#E6EEF8', marginBottom: 8 }}>
            04. Final Submission
          </div>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#64748B', lineHeight: 1.6, marginBottom: 24 }}>
            Seal the integrity layer and commit to the live sovereign deployment environment.
          </p>
          <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 6, padding: '14px 16px', marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.1em' }}>READINESS STATUS</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: '#22D3EE' }}>READY TO COMMIT</span>
            </div>
          </div>
          <button
            style={{
              width: '100%', padding: 14,
              background: 'linear-gradient(135deg, #22D3EE, #06B6D4)',
              border: 'none', borderRadius: 6, color: '#000',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
              fontWeight: 700, cursor: 'pointer', letterSpacing: '0.1em',
              boxShadow: '0 0 20px rgba(34,211,238,0.3)',
            }}
          >
            INITIATE DEPLOYMENT
          </button>
        </div>

        {/* Progress summary */}
        <div style={{ background: '#0A0F1C', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 14 }}>READINESS SUMMARY</div>
          {[
            { label: 'Build Architecture', pct: 88,  color: '#22D3EE' },
            { label: 'Scope Alignment',    pct: 40,  color: '#EF4444' },
            { label: 'Demo Protocol',      pct: 60,  color: '#64748B' },
          ].map(({ label, pct, color }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#94A3B8' }}>{label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color }}>{pct}%</span>
              </div>
              <div style={{ height: 3, background: '#1E293B', borderRadius: 2 }}>
                <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Checklist Item Card ──────────────────────────────────────────────────────

function ChecklistItemCard({ item }: { item: ChecklistItem }) {
  const isWarning = item.status === 'warning'
  const icon = (() => {
    if (item.status === 'verified') return <CheckCircle2 size={14} color="#10B981" />
    if (item.status === 'warning')  return <AlertTriangle size={14} color="#F59E0B" />
    if (item.status === 'progress') return <RefreshCw size={14} color="#22D3EE" />
    return <Circle size={14} color="#4A5568" />
  })()

  const noteColor =
    item.status === 'warning' ? '#F59E0B' :
    item.status === 'verified' ? '#10B981' :
    '#4A5568'

  return (
    <div
      style={{
        background: isWarning ? '#F59E0B08' : '#05070F',
        border: `1px solid ${isWarning ? '#F59E0B30' : '#1E293B'}`,
        borderRadius: 6, padding: '10px 12px', marginBottom: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
        {icon}
        <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, fontWeight: 600, color: '#E6EEF8' }}>{item.label}</span>
      </div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: noteColor, letterSpacing: '0.08em' }}>
        {item.note}
      </div>
    </div>
  )
}