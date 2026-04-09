'use client'

import {
  LayoutDashboard,
  PlusCircle,
  TrendingUp,
  History,
  CheckSquare,
  Settings,
  LifeBuoy,
  Terminal,
  type LucideIcon,
} from 'lucide-react'
import type { PageId } from '@/types'
import { Divider } from '@/components/ui/primitives'

// ─── Nav config ───────────────────────────────────────────────────────────────

interface NavItem {
  id: PageId
  label: string
  Icon: LucideIcon
}

const NAV_ITEMS: NavItem[] = [
  { id: 'landing',    label: 'Dashboard',       Icon: LayoutDashboard },
  { id: 'dashboard',  label: 'New Analysis',    Icon: PlusCircle },
  { id: 'strategy',   label: 'Strategy Output', Icon: TrendingUp },
  { id: 'history',    label: 'History',         Icon: History },
  { id: 'checklists', label: 'Checklists',      Icon: CheckSquare },
  { id: 'settings',   label: 'Settings',        Icon: Settings },
]

// ─── Props ────────────────────────────────────────────────────────────────────

interface SidebarProps {
  page: PageId
  setPage: (id: PageId) => void
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Sidebar({ page, setPage }: SidebarProps) {
  return (
    <aside
      style={{
        width: 220,
        minHeight: '100vh',
        background: '#05070F',
        borderRight: '1px solid #0A0C14',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '22px 20px 18px',
          borderBottom: '1px solid #0A0C14',
        }}
      >
        <div
          style={{
            fontFamily: "'Sora', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: '#E6EEF8',
            letterSpacing: '0.02em',
          }}
        >
          Vectra Strategic AI
        </div>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 9,
            color: '#4F7CFF',
            letterSpacing: '0.18em',
            marginTop: 3,
          }}
        >
          DIGITAL SOVEREIGN MODE
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = page === id
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 11,
                padding: '11px 20px',
                background: active ? '#0A0C14' : 'transparent',
                borderLeft: active ? '2px solid #4F7CFF' : '2px solid transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={15} color={active ? '#4F7CFF' : '#4A5568'} />
              <span
                style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: 12,
                  fontWeight: active ? 600 : 400,
                  color: active ? '#E6EEF8' : '#64748B',
                  letterSpacing: '0.02em',
                }}
              >
                {label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* CTA */}
      <div style={{ padding: '0 14px 16px' }}>
        <button
          onClick={() => setPage('dashboard')}
          style={{
            width: '100%',
            padding: '11px 0',
            background: 'linear-gradient(135deg, #4F7CFF, #3B5BDB)',
            border: 'none',
            borderRadius: 6,
            color: '#fff',
            fontFamily: "'Sora', sans-serif",
            fontSize: 12,
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.04em',
          }}
        >
          + NEW ANALYSIS
        </button>
      </div>

      <Divider />

      {/* Footer nav */}
      <div style={{ padding: '10px 0' }}>
        {[
          {
            label: 'Support',
            Icon: LifeBuoy,
            onClick: () => window.open('https://t.me/VectraStrategicBot', '_blank'),
          },
          {
            label: 'Logs',
            Icon: Terminal,
            onClick: () => setPage('history'),
          },
        ].map(({ label, Icon, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              padding: '10px 20px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Icon size={14} color="#4A5568" />
            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 12,
                color: '#4A5568',
              }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </aside>
  )
}