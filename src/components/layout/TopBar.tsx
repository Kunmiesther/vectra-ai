'use client'

import { Bell, User, Lock } from 'lucide-react'
import { StatusChip } from '@/components/ui/primitives'

// ─── TopBar ───────────────────────────────────────────────────────────────────

interface TopBarProps {
  title?: string
}

export function TopBar({ title }: TopBarProps) {
  return (
    <header
      style={{
        height: 52,
        background: '#05070F',
        borderBottom: '1px solid #0A0C14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        {title && (
          <span
            style={{
              fontFamily: "'Sora', sans-serif",
              fontWeight: 600,
              fontSize: 13,
              color: '#4F7CFF',
              letterSpacing: '0.04em',
            }}
          >
            {title}
          </span>
        )}
        <StatusChip label="STRATEGIC ENGINE ACTIVE" color="#4F7CFF" />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#4A5568',
            letterSpacing: '0.1em',
          }}
        >
          ANALYSIS READY
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#4A5568',
            letterSpacing: '0.1em',
          }}
        >
          AGENT SYNCED
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button
          style={{
            padding: '7px 18px',
            background: 'transparent',
            border: '1px solid #4F7CFF',
            borderRadius: 5,
            color: '#4F7CFF',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            cursor: 'pointer',
            letterSpacing: '0.1em',
          }}
        >
          EXECUTE STRATEGY
        </button>
        <Bell size={16} color="#4A5568" style={{ cursor: 'pointer' }} />
        <User size={16} color="#4A5568" style={{ cursor: 'pointer' }} />
      </div>
    </header>
  )
}

// ─── BottomBar ────────────────────────────────────────────────────────────────

export function BottomBar() {
  return (
    <footer
      style={{
        height: 32,
        background: '#05070F',
        borderTop: '1px solid #0A0C14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#4A5568',
            letterSpacing: '0.1em',
          }}
        >
          VECTRA STRATEGIC AI COMMAND
        </span>
        <StatusChip label="99.98% UPTIME" color="#10B981" />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#4A5568',
          }}
        >
          12MS LATENCY
        </span>
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#4A5568',
          }}
        >
          AES-256 ENCRYPTED
        </span>
      </div>
      <Lock size={10} color="#4A5568" />
    </footer>
  )
}