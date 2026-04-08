'use client'

import React from 'react'

// ─── MonoBadge ────────────────────────────────────────────────────────────────

interface MonoBadgeProps {
  children: React.ReactNode
  color?: string
}

export function MonoBadge({ children, color = '#22D3EE' }: MonoBadgeProps) {
  return (
    <span
      style={{
        color,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.08em',
        background: `${color}18`,
        border: `1px solid ${color}30`,
        borderRadius: 3,
        padding: '2px 7px',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </span>
  )
}

// ─── StatusChip ───────────────────────────────────────────────────────────────

interface StatusChipProps {
  label: string
  color: string
}

export function StatusChip({ label, color }: StatusChipProps) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        color,
        letterSpacing: '0.1em',
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 6px ${color}`,
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  )
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

interface StatCardProps {
  label: string
  value: string
  sub?: string
  color?: string
}

export function StatCard({
  label,
  value,
  sub,
  color = '#4F7CFF',
}: StatCardProps) {
  return (
    <div
      style={{
        background: '#101827',
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
        {label}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 30,
            fontWeight: 700,
            color,
            lineHeight: 1,
          }}
        >
          {value}
        </span>
        {sub && (
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: '#64748B',
            }}
          >
            {sub}
          </span>
        )}
      </div>
    </div>
  )
}

// ─── RingGauge ────────────────────────────────────────────────────────────────

interface RingGaugeProps {
  value: number
  label?: string
  color?: string
  size?: number
}

export function RingGauge({
  value,
  label,
  color = '#22D3EE',
  size = 110,
}: RingGaugeProps) {
  const r = 40
  const circumference = 2 * Math.PI * r
  const fill = (value / 100) * circumference

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="#1E293B"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeDasharray={`${fill} ${circumference}`}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 18,
              fontWeight: 700,
              color,
            }}
          >
            {value}%
          </span>
          {label && (
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 8,
                color: '#64748B',
                letterSpacing: '0.1em',
              }}
            >
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function Divider() {
  return <div style={{ height: 1, background: '#1E293B' }} />
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  label: string
  action?: React.ReactNode
}

export function SectionHeader({ label, action }: SectionHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: '#4F7CFF',
          letterSpacing: '0.15em',
        }}
      >
        {label}
      </span>
      {action}
    </div>
  )
}

// ─── ConfidenceBadge ──────────────────────────────────────────────────────────

interface ConfidenceBadgeProps {
  value: string | number
  color?: string
}

export function ConfidenceBadge({
  value,
  color = '#4F7CFF',
}: ConfidenceBadgeProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 32,
          fontWeight: 700,
          color,
          lineHeight: 1,
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: '#64748B',
          letterSpacing: '0.12em',
          marginTop: 4,
        }}
      >
        CONFIDENCE
      </span>
    </div>
  )
}

// ─── NodeNetworkSVG ───────────────────────────────────────────────────────────

export function NodeNetworkSVG() {
  const nodes: [number, number][] = [
    [100, 40], [50, 20], [150, 20], [40, 60], [160, 60], [80, 65], [130, 15],
  ]
  const edges: [number, number, number, number][] = [
    [100, 40, 50, 20],
    [100, 40, 150, 20],
    [100, 40, 40, 60],
    [100, 40, 160, 60],
    [50, 20, 80, 65],
    [150, 20, 130, 15],
  ]

  return (
    <svg width="100%" height="80" viewBox="0 0 200 80">
      {edges.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#4F7CFF"
          strokeOpacity="0.2"
          strokeWidth="1"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 0 ? 5 : 3}
          fill={i === 0 ? '#4F7CFF' : '#22D3EE'}
          opacity={0.7}
        />
      ))}
    </svg>
  )
}