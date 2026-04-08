'use client'

import { useState } from 'react'
import type { PageId } from '@/types'
import { Sidebar } from './Sidebar'
import { TopBar, BottomBar } from './TopBar'
import { StatusChip } from '@/components/ui/primitives'
import { LandingPage } from '@/components/pages/LandingPage'
import { DashboardPage } from '@/components/pages/DashboardPage'
import { StrategyPage } from '@/components/pages/StrategyPage'
import { HistoryPage } from '@/components/pages/HistoryPage'
import { ChecklistsPage } from '@/components/pages/ChecklistsPage'
import { SettingsPage } from '@/components/pages/SettingsPage'

// ─── Page title map ───────────────────────────────────────────────────────────

const PAGE_TITLES: Partial<Record<PageId, string>> = {
  dashboard:  'VECTRA AI',
  strategy:   'VECTRA AI',
  history:    'VECTRA AI',
  checklists: 'VECTRA AI',
  settings:   'ENVIRONMENT // SETTINGS',
}

// ─── Component ────────────────────────────────────────────────────────────────

export function VectraShell() {
  const [page, setPage] = useState<PageId>('landing')

  const isLanding = page === 'landing'

  function renderPage() {
    switch (page) {
      case 'landing':    return <LandingPage    setPage={setPage} />
      case 'dashboard':  return <DashboardPage  setPage={setPage} />
      case 'strategy':   return <StrategyPage   />
      case 'history':    return <HistoryPage    />
      case 'checklists': return <ChecklistsPage />
      case 'settings':   return <SettingsPage   />
      default:           return <LandingPage    setPage={setPage} />
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#05070F',
        fontFamily: "'Sora', sans-serif",
      }}
    >
      <Sidebar page={page} setPage={setPage} />

      <div
        style={{
          marginLeft: 220,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* Top bar for all pages */}
        {!isLanding ? (
          <TopBar title={PAGE_TITLES[page]} />
        ) : (
          <LandingTopBar />
        )}

        {/* Page content */}
        <div style={{ flex: 1 }}>{renderPage()}</div>

        {!isLanding && <BottomBar />}
      </div>
    </div>
  )
}

// ─── Landing-specific topbar strip ───────────────────────────────────────────

function LandingTopBar() {
  return (
    <div
      style={{
        padding: '12px 28px',
        background: '#05070F',
        borderBottom: '1px solid #0F172A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
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
    </div>
  )
}