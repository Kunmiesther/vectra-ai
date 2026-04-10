'use client'

import { useEffect, useState } from 'react'
import {
  Filter,
  Calendar,
  ArrowRight,
  Activity,
  ShieldCheck,
} from 'lucide-react'
import { MonoBadge, StatusChip } from '@/components/ui/primitives'
import { HISTORY_CARDS } from '@/lib/mockData'
import { statusColor } from '@/lib/utils'
import type { PageId } from '@/types'

type FilterOption = 'ALL RECORDS' | 'DEPLOYED' | 'ARCHIVED' | 'FAILED'

interface HistoryPageProps {
  setPage: (id: PageId) => void
}

export function HistoryPage({ setPage }: HistoryPageProps) {
  const [filter, setFilter] = useState<FilterOption>('ALL RECORDS')
  const [history, setHistory] = useState<any[]>([])
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('vectra-history')
    if (stored) {
      try {
        setHistory(JSON.parse(stored))
      } catch {}
    }
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

  const displayHistory = history.length > 0 ? history : HISTORY_CARDS

  const filtered =
    filter === 'ALL RECORDS'
      ? displayHistory
      : displayHistory.filter((c: any) => (c.status || '').toUpperCase() === filter)

  const featuredCard = filtered.length > 0 ? filtered[0] : null
  const smallCards = filtered.length > 1 ? filtered.slice(1) : []

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: isMobile || isTablet ? '1fr' : '1fr 260px',
        minHeight: 'calc(100vh - 84px)',
      }}
    >
      {/* ── Main ── */}
      <div style={{ padding: isMobile ? 16 : 28, overflowY: 'auto' }}>
        {/* Page header */}
        <div
          style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? 16 : 0,
            marginBottom: 24,
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: isMobile ? 22 : 26,
                fontWeight: 800,
                color: '#E6EEF8',
              }}
            >
              Strategic Memory System
            </h1>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#4A5568',
                letterSpacing: '0.12em',
                marginTop: 4,
              }}
            >
              OPERATIONAL HISTORY ARCHIVE / NODE: ALPHA-7
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 16,
              width: isMobile ? '100%' : 'auto',
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            {[
              { label: 'TOTAL REPORTS', val: String(displayHistory.length), color: '#E6EEF8' },
              { label: 'EFFICIENCY', val: '94.2%', color: '#22D3EE' },
            ].map(({ label, val, color }) => (
              <div
                key={label}
                style={{
                  background: '#05070F',
                  border: '1px solid #1E293B',
                  borderRadius: 8,
                  padding: '12px 18px',
                  textAlign: 'center',
                  flex: isMobile ? 1 : 'unset',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#64748B',
                    marginBottom: 4,
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 18,
                    fontWeight: 700,
                    color,
                  }}
                >
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div
          style={{
            display: 'flex',
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: 10,
            marginBottom: 24,
            flexWrap: 'wrap',
            flexDirection: isMobile ? 'column' : 'row',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <Filter size={13} color="#4A5568" />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#4A5568',
                letterSpacing: '0.1em',
              }}
            >
              FILTERS:
            </span>

            {(['ALL RECORDS', 'DEPLOYED', 'ARCHIVED', 'FAILED'] as FilterOption[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '5px 14px',
                  background: filter === f ? '#1E293B' : 'transparent',
                  border: `1px solid ${filter === f ? '#4F7CFF' : '#1E293B'}`,
                  borderRadius: 4,
                  color: filter === f ? '#4F7CFF' : '#64748B',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  cursor: 'pointer',
                  letterSpacing: '0.08em',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div
            style={{
              marginLeft: isMobile ? 0 : 'auto',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#4A5568',
              }}
            >
              SORT: CHRONOLOGICAL (DESC)
            </span>
            <Calendar size={13} color="#4A5568" />
          </div>
        </div>

        {/* Featured card */}
        {featuredCard && (filter === 'ALL RECORDS' || filter === 'DEPLOYED') && (
          <div
            style={{
              background: '#05070F',
              border: '1px solid #1E3A5F',
              borderRadius: 10,
              padding: isMobile ? 16 : 24,
              marginBottom: 16,
              cursor: featuredCard.result ? 'pointer' : 'default',
            }}
            onClick={() => {
              if (featuredCard.result) {
                localStorage.setItem('vectra-result', featuredCard.result)
                localStorage.setItem('vectra-idea', featuredCard.idea || '')
                setPage('strategy')
              }
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'flex-start',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 12 : 0,
                marginBottom: 16,
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <MonoBadge color="#22D3EE">
                    {featuredCard.project
                      ? `PROJECT: ${featuredCard.project.toUpperCase()}`
                      : 'PROJECT: OBSIDIAN PROTOCOL'}
                  </MonoBadge>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: '#4A5568',
                    }}
                  >
                    ID: {featuredCard.id || 'VEC-ARCHIVE'}
                  </span>
                </div>

                <h2
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: isMobile ? 17 : 20,
                    fontWeight: 800,
                    color: '#E6EEF8',
                    lineHeight: 1.4,
                  }}
                >
                  {featuredCard.idea || featuredCard.title || 'Archived Strategy'}
                </h2>
              </div>

              <div
                style={{
                  textAlign: isMobile ? 'left' : 'right',
                  flexShrink: 0,
                  marginLeft: isMobile ? 0 : 16,
                }}
              >
                <StatusChip
                  label={featuredCard.status || 'DEPLOYED'}
                  color={statusColor(featuredCard.status || 'DEPLOYED')}
                />
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#4A5568',
                    marginTop: 6,
                  }}
                >
                  {featuredCard.timestamp
                    ? new Date(featuredCard.timestamp).toLocaleString()
                    : featuredCard.date || 'ARCHIVED'}
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                gap: 16,
                marginBottom: 18,
              }}
            >
              {[
                {
                  label: 'CONFIDENCE SCORE',
                  val: featuredCard.score ?? featuredCard.confidence ?? '—',
                  unit: typeof featuredCard.score === 'number' ? '' : featuredCard.confidence ? '%' : '',
                  color: '#22D3EE',
                },
                {
                  label: 'FEASIBILITY INDEX',
                  val: featuredCard.score ?? '0.92',
                  unit: '',
                  color: '#E6EEF8',
                },
                {
                  label: 'STATUS',
                  val: featuredCard.status || featuredCard.statusLabel || 'DEPLOYED',
                  unit: '',
                  color: '#E6EEF8',
                },
              ].map(({ label, val, unit, color }) => (
                <div
                  key={label}
                  style={{
                    background: '#05070F',
                    border: '1px solid #1E293B',
                    borderRadius: 6,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: '#64748B',
                      marginBottom: 8,
                    }}
                  >
                    {label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 22,
                      fontWeight: 700,
                      color,
                      wordBreak: 'break-word',
                    }}
                  >
                    {val}
                    <span style={{ fontSize: 12 }}>{unit}</span>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                flexDirection: isMobile ? 'column' : 'row',
                gap: isMobile ? 12 : 0,
              }}
            >
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['AI', 'SD', 'TX'].map((tag) => (
                  <MonoBadge key={tag}>{tag}</MonoBadge>
                ))}
              </div>

              <button
                style={{
                  width: isMobile ? '100%' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  padding: '7px 16px',
                  background: 'transparent',
                  border: '1px solid #1E293B',
                  borderRadius: 5,
                  color: '#4F7CFF',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  cursor: 'pointer',
                  letterSpacing: '0.1em',
                }}
              >
                EXPLORE FULL NARRATIVE <ArrowRight size={11} />
              </button>
            </div>
          </div>
        )}

        {/* Small cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {smallCards.map((item: any, i: number) => (
            <div
              key={item.id || i}
              style={{
                background: '#080C15',
                border: '1px solid #1E293B',
                borderRadius: 8,
                padding: 20,
                cursor: item.result ? 'pointer' : 'default',
              }}
              onClick={() => {
                if (item.result) {
                  localStorage.setItem('vectra-result', item.result)
                  localStorage.setItem('vectra-idea', item.idea || item.title || '')
                  setPage('strategy')
                }
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  gap: 10,
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#4F7CFF',
                  }}
                >
                  {item.id || item.project || 'VEC-ARCHIVE'}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#64748B',
                  }}
                >
                  {item.timestamp
                    ? new Date(item.timestamp).toLocaleDateString()
                    : item.date}
                </span>
              </div>

              <div
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#E6EEF8',
                  marginBottom: 8,
                  lineHeight: 1.5,
                }}
              >
                {item.idea || item.title}
              </div>

              {item.note && !item.result && (
                <p
                  style={{
                    fontFamily: "'Sora', sans-serif",
                    fontSize: 11,
                    color: '#64748B',
                    lineHeight: 1.6,
                    marginBottom: 10,
                  }}
                >
                  {item.note}
                </p>
              )}

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: '#64748B',
                    }}
                  >
                    SCORE
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 14,
                      fontWeight: 700,
                      color: '#22D3EE',
                    }}
                  >
                    {item.score || item.confidence || '—'}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: '#64748B',
                    }}
                  >
                    STATUS
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: '#10B981',
                    }}
                  >
                    {item.status || item.statusLabel || 'DEPLOYED'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
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
        }}
      >
        {/* System Health */}
        <div
          style={{
            background: '#05070F',
            border: '1px solid #1E293B',
            borderRadius: 10,
            padding: 18,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Activity size={13} color="#4F7CFF" />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#94A3B8',
                letterSpacing: '0.12em',
              }}
            >
              SYSTEM HEALTH
            </span>
          </div>

          {[
            { label: 'MEMORY LATENCY', val: '12ms', pct: 12, color: '#22D3EE' },
            { label: 'INDEXING PRECISION', val: '99.98%', pct: 99, color: '#4F7CFF' },
          ].map(({ label, val, pct, color }) => (
            <div key={label} style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: 6,
                  gap: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9,
                    color: '#64748B',
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color,
                  }}
                >
                  {val}
                </span>
              </div>
              <div style={{ height: 3, background: '#1E293B', borderRadius: 2 }}>
                <div
                  style={{
                    height: '100%',
                    width: `${pct}%`,
                    background: color,
                    borderRadius: 2,
                    boxShadow: `0 0 6px ${color}`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Security */}
        <div
          style={{
            background: '#05070F',
            border: '1px solid #1E293B',
            borderRadius: 10,
            padding: 18,
          }}
        >
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#94A3B8',
              letterSpacing: '0.12em',
              marginBottom: 14,
            }}
          >
            SYSTEM STATUS
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 40,
                height: 40,
                background: '#0A0C14',
                border: '1px solid #1E293B',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={18} color="#4F7CFF" />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  fontWeight: 700,
                  color: '#E6EEF8',
                }}
              >
                AES-256 ACTIVE
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9,
                  color: '#64748B',
                }}
              >
                END-TO-END ENCRYPTION
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div
          style={{
            background: '#05070F',
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
              marginBottom: 14,
            }}
          >
            RECORD BREAKDOWN
          </div>
          {[
            {
              label: 'DEPLOYED',
              count: filtered.filter((x: any) => (x.status || '').toUpperCase() === 'DEPLOYED').length,
              color: '#10B981',
            },
            {
              label: 'ARCHIVED',
              count: filtered.filter((x: any) => (x.status || '').toUpperCase() === 'ARCHIVED').length,
              color: '#64748B',
            },
            {
              label: 'FAILED',
              count: filtered.filter((x: any) => (x.status || '').toUpperCase() === 'FAILED').length,
              color: '#EF4444',
            },
          ].map(({ label, count, color }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: '1px solid #1E293B',
                gap: 8,
              }}
            >
              <StatusChip label={label} color={color} />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#94A3B8',
                }}
              >
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}