'use client'

import { useEffect, useState } from 'react'
import { Menu } from 'lucide-react'
import type { PageId } from '@/types'
import { Sidebar } from './Sidebar'
import { TopBar, BottomBar } from './TopBar'
import { StatusChip } from '@/components/ui/primitives'
import { LandingPage } from '@/components/pages/LandingPage'
import { DashboardPage } from '@/components/pages/DashboardPage'
import { StrategyPage } from '@/components/pages/StrategyPage'
import { HistoryPage } from '@/components/pages/HistoryPage'
import { SettingsPage } from '@/components/pages/SettingsPage'

const PAGE_TITLES: Partial<Record<PageId, string>> = {
  dashboard: 'VECTRA AI',
  strategy: 'VECTRA AI',
  history: 'VECTRA AI',
  settings: 'ENVIRONMENT // SETTINGS',
}

export function VectraShell() {
  const [page, setPage] = useState<PageId>('landing')
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 900
      setIsMobile(mobile)
      if (!mobile) setMobileMenuOpen(false)
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const isLanding = page === 'landing'
  const currentTitle = PAGE_TITLES[page] ?? ''

  function renderPage() {
    switch (page) {
      case 'landing':
        return <LandingPage setPage={setPage} />
      case 'dashboard':
        return <DashboardPage setPage={setPage} />
      case 'strategy':
        return <StrategyPage />
      case 'history':
        return <HistoryPage setPage={setPage} />
      case 'settings':
        return <SettingsPage />
      default:
        return <LandingPage setPage={setPage} />
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
      {!isMobile && <Sidebar page={page} setPage={setPage} />}

      {isMobile && mobileMenuOpen && (
        <>
          <div
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              zIndex: 180,
            }}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: 220,
              zIndex: 200,
            }}
          >
            <Sidebar
              page={page}
              setPage={(id) => {
                setPage(id)
                setMobileMenuOpen(false)
              }}
            />
          </div>
        </>
      )}

      <div
        style={{
          marginLeft: isMobile ? 0 : 220,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          width: '100%',
          paddingBottom: 0,
        }}
      >
        {isMobile ? (
          <div
            style={{
              height: 52,
              padding: '0 16px',
              background: '#05070F',
              borderBottom: '1px solid #0A0C14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              zIndex: 120,
            }}
          >
            <button
              onClick={() => setMobileMenuOpen(true)}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
              }}
            >
              <Menu size={20} color="#E6EEF8" />
            </button>

            <span
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                color: '#4F7CFF',
              }}
            >
              {isLanding ? 'VECTRA AI' : currentTitle}
            </span>

            <button
              onClick={() => {
                const hasResult = localStorage.getItem('vectra-result')
                setPage(hasResult ? 'strategy' : 'dashboard')
              }}
              style={{
                padding: '7px 12px',
                background: 'transparent',
                border: '1px solid #4F7CFF',
                borderRadius: 5,
                color: '#4F7CFF',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                cursor: 'pointer',
                letterSpacing: '0.08em',
              }}
            >
              EXECUTE STRATEGY
            </button>
          </div>
        ) : !isLanding ? (
          <TopBar title={currentTitle} setPage={setPage} />
        ) : (
          <LandingTopBar setPage={setPage} isMobile={isMobile} />
        )}

        <div style={{ flex: 1 }}>{renderPage()}</div>

        {!isLanding && !isMobile && <BottomBar />}
      </div>
    </div>
  )
}

interface LandingTopBarProps {
  setPage: (id: PageId) => void
  isMobile: boolean
}

function LandingTopBar({ setPage, isMobile }: LandingTopBarProps) {
  return (
    <div
      style={{
        padding: isMobile ? '12px 16px' : '12px 28px',
        background: '#05070F',
        borderBottom: '1px solid #0A0C14',
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? 12 : 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isMobile ? 10 : 20,
          flexWrap: 'wrap',
        }}
      >
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
        onClick={() => {
          const hasResult = localStorage.getItem('vectra-result')
          setPage(hasResult ? 'strategy' : 'dashboard')
        }}
        style={{
          width: isMobile ? '100%' : 'auto',
          padding: '9px 18px',
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