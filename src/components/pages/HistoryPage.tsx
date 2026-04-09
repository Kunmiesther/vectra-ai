'use client'

import { useState } from 'react'
import { Filter, Calendar, ArrowRight, Eye, ExternalLink, Activity, ShieldCheck } from 'lucide-react'
import { MonoBadge, StatusChip } from '@/components/ui/primitives'
import { HISTORY_CARDS } from '@/lib/mockData'
import { statusColor } from '@/lib/utils'
import type { HistoryCard } from '@/types'

type FilterOption = 'ALL RECORDS' | 'DEPLOYED' | 'ARCHIVED' | 'FAILED'

export function HistoryPage() {
  const [filter, setFilter] = useState<FilterOption>('ALL RECORDS')

  const filtered =
    filter === 'ALL RECORDS'
      ? HISTORY_CARDS
      : HISTORY_CARDS.filter(c => c.status === filter)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', minHeight: 'calc(100vh - 84px)' }}>

      {/* ── Main ── */}
      <div style={{ padding: 28, overflowY: 'auto' }}>

        {/* Page header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, color: '#E6EEF8' }}>Strategic Memory System</h1>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', letterSpacing: '0.12em', marginTop: 4 }}>
              OPERATIONAL HISTORY ARCHIVE / NODE: ALPHA-7
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            {[
              { label: 'TOTAL REPORTS', val: '1,248',  color: '#E6EEF8' },
              { label: 'EFFICIENCY',    val: '94.2%',  color: '#22D3EE' },
            ].map(({ label, val, color }) => (
              <div key={label} style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 8, padding: '12px 18px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', marginBottom: 4 }}>{label}</div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
          <Filter size={13} color="#4A5568" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', letterSpacing: '0.1em' }}>FILTERS:</span>
          {(['ALL RECORDS', 'DEPLOYED', 'ARCHIVED', 'FAILED'] as FilterOption[]).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '5px 14px',
                background: filter === f ? '#1E293B' : 'transparent',
                border: `1px solid ${filter === f ? '#4F7CFF' : '#1E293B'}`,
                borderRadius: 4,
                color: filter === f ? '#4F7CFF' : '#64748B',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                cursor: 'pointer', letterSpacing: '0.08em',
              }}
            >
              {f}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568' }}>SORT: CHRONOLOGICAL (DESC)</span>
            <Calendar size={13} color="#4A5568" />
          </div>
        </div>

        {/* Featured card */}
        {(filter === 'ALL RECORDS' || filter === 'DEPLOYED') && (
          <div style={{ background: '#05070F', border: '1px solid #1E3A5F', borderRadius: 10, padding: 24, marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                  <MonoBadge color="#22D3EE">PROJECT: OBSIDIAN PROTOCOL</MonoBadge>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568' }}>ID: VEC-2024-X9</span>
                </div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 20, fontWeight: 800, color: '#E6EEF8' }}>Market Liquidity Absorption Strategy</h2>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0, marginLeft: 16 }}>
                <StatusChip label="DEPLOYED" color="#10B981" />
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', marginTop: 6 }}>PROCESSED: 12MS AGO</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 18 }}>
              {[
                { label: 'CONFIDENCE SCORE', val: '98.4', unit: '%', color: '#22D3EE' },
                { label: 'FEASIBILITY INDEX', val: '0.92', unit: '',  color: '#E6EEF8' },
                { label: 'YIELD PROJECTION', val: '+14.2', unit: '%', color: '#E6EEF8' },
              ].map(({ label, val, unit, color }) => (
                <div key={label} style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 6, padding: 14 }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', marginBottom: 8 }}>{label}</div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 22, fontWeight: 700, color }}>
                    {val}<span style={{ fontSize: 12 }}>{unit}</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {['AI', 'SD', 'TX'].map(tag => <MonoBadge key={tag}>{tag}</MonoBadge>)}
              </div>
              <button
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '7px 16px', background: 'transparent',
                  border: '1px solid #1E293B', borderRadius: 5, color: '#4F7CFF',
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
                  cursor: 'pointer', letterSpacing: '0.1em',
                }}
              >
                EXPLORE FULL NARRATIVE <ArrowRight size={11} />
              </button>
            </div>
          </div>
        )}

        {/* Small cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {filtered.slice(1).map(card => (
            <SmallHistoryCard key={card.id} card={card} />
          ))}
        </div>
      </div>

      {/* ── Right Rail ── */}
      <div style={{ padding: '28px 20px', borderLeft: '1px solid #1E293B', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* System Health */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Activity size={13} color="#4F7CFF" />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em' }}>SYSTEM HEALTH</span>
          </div>
          {[
            { label: 'MEMORY LATENCY',    val: '12ms',   pct: 12,  color: '#22D3EE' },
            { label: 'INDEXING PRECISION', val: '99.98%', pct: 99,  color: '#4F7CFF' },
          ].map(({ label, val, pct, color }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B' }}>{label}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color }}>{val}</span>
              </div>
              <div style={{ height: 3, background: '#1E293B', borderRadius: 2 }}>
                <div
                  style={{
                    height: '100%', width: `${pct}%`,
                    background: color, borderRadius: 2,
                    boxShadow: `0 0 6px ${color}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Security */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 14 }}>SYSTEM STATUS</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 40, height: 40, background: '#0A0C14',
                border: '1px solid #1E293B', borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <ShieldCheck size={18} color="#4F7CFF" />
            </div>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, fontWeight: 700, color: '#E6EEF8' }}>AES-256 ACTIVE</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B' }}>END-TO-END ENCRYPTION</div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 14 }}>RECORD BREAKDOWN</div>
          {[
            { label: 'DEPLOYED',  count: 892, color: '#10B981' },
            { label: 'ARCHIVED',  count: 298, color: '#64748B' },
            { label: 'FAILED',    count:  58, color: '#EF4444' },
          ].map(({ label, count, color }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E293B' }}>
              <StatusChip label={label} color={color} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#94A3B8' }}>{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Small History Card ───────────────────────────────────────────────────────

function SmallHistoryCard({ card }: { card: HistoryCard }) {
  const color = statusColor(card.status)
  return (
    <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568' }}>ID: {card.id}</span>
        <StatusChip label={card.status} color={color} />
      </div>
      <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 700, color: '#E6EEF8', marginBottom: 10 }}>{card.title}</div>
      {card.confidence && (
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B' }}>CONFIDENCE </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: '#22D3EE' }}>{card.confidence}%</span>
        </div>
      )}
      {card.risk && (
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B' }}>RISK </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#10B981' }}>{card.risk}</span>
        </div>
      )}
      {card.note && (
        <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#64748B', lineHeight: 1.6, marginBottom: 10 }}>{card.note}</p>
      )}
      {card.statusLabel && (
        <div style={{ marginBottom: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B' }}>STATUS </span>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#10B981' }}>{card.statusLabel}</span>
        </div>
      )}
      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', marginTop: 10 }}>{card.date}</div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
        {card.status === 'FAILED'
          ? <button style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer' }}>DETAILS</button>
          : card.status === 'DEPLOYED'
          ? <Eye size={13} color="#4A5568" style={{ cursor: 'pointer' }} />
          : <ExternalLink size={13} color="#4A5568" style={{ cursor: 'pointer' }} />}
      </div>
    </div>
  )
}