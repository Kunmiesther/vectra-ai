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

function WalletButton({
  address,
  connected,
  onConnect,
  onDisconnect,
}: {
  address: string
  connected: boolean
  onConnect: (addr: string) => void
  onDisconnect: () => void
}) {
  const connect = async () => {
    try {
      const { solana } = window as any
      if (!solana?.isPhantom) {
        window.open('https://phantom.app/', '_blank')
        return
      }

      const response = await solana.connect()
      const addr = response.publicKey.toString()
      onConnect(addr)
    } catch {}
  }

  const disconnect = async () => {
    try {
      const { solana } = window as any
      await solana?.disconnect()
    } catch {}

    onDisconnect()
  }

  if (connected && address) {
    return (
      <button
        onClick={disconnect}
        style={{
          padding: '7px 14px',
          background: 'rgba(79,124,255,0.1)',
          border: '1px solid rgba(79,124,255,0.3)',
          borderRadius: 5,
          color: '#4F7CFF',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          cursor: 'pointer',
          letterSpacing: '0.06em',
          whiteSpace: 'nowrap',
        }}
      >
        {address.slice(0, 4)}...{address.slice(-4)} · DISCONNECT
      </button>
    )
  }

  return (
    <button
      onClick={connect}
      style={{
        padding: '7px 18px',
        background: '#4F7CFF',
        border: 'none',
        borderRadius: 5,
        color: '#fff',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        cursor: 'pointer',
        letterSpacing: '0.08em',
        whiteSpace: 'nowrap',
      }}
    >
      CONNECT WALLET
    </button>
  )
}

export function VectraShell() {
  const [page, setPage] = useState<PageId>('landing')
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const handleWalletConnect = (addr: string) => {
    setWalletAddress(addr)
    setIsWalletConnected(true)
  }

  const handleWalletDisconnect = () => {
    setWalletAddress('')
    setIsWalletConnected(false)
  }

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 900
      setIsMobile(mobile)

      if (!mobile) {
        setMobileMenuOpen(false)
      }
    }

    checkScreen()
    window.addEventListener('resize', checkScreen)

    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  useEffect(() => {
    const checkWallet = async () => {
      try {
        const { solana } = window as any
        if (solana?.isPhantom) {
          const response = await solana.connect({ onlyIfTrusted: true })
          const addr = response.publicKey.toString()
          setWalletAddress(addr)
          setIsWalletConnected(true)
        }
      } catch {
        setWalletAddress('')
        setIsWalletConnected(false)
      }
    }

    checkWallet()
  }, [])

  const isLanding = page === 'landing'
  const currentTitle = PAGE_TITLES[page] ?? ''

  function renderPage() {
  switch (page) {
    case 'landing':
      return <LandingPage setPage={setPage} />
    case 'dashboard':
      return <DashboardPage setPage={setPage} wallet={walletAddress} />
    case 'strategy':
      return <StrategyPage wallet={walletAddress} />
    case 'history':
      return <HistoryPage setPage={setPage} wallet={walletAddress} />
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
          isLanding ? (
            <LandingTopBar
              isMobile={isMobile}
              walletAddress={walletAddress}
              isWalletConnected={isWalletConnected}
              onWalletConnect={handleWalletConnect}
              onWalletDisconnect={handleWalletDisconnect}
              showMenuButton
              onOpenMenu={() => setMobileMenuOpen(true)}
            />
          ) : (
            <div
              style={{
                minHeight: 52,
                padding: '10px 16px',
                background: '#05070F',
                borderBottom: '1px solid #0A0C14',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
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
                  flexShrink: 0,
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
                  flex: 1,
                  textAlign: 'center',
                  minWidth: 0,
                }}
              >
                {currentTitle}
              </span>

              <div style={{ flexShrink: 0 }}>
                <WalletButton
                  address={walletAddress}
                  connected={isWalletConnected}
                  onConnect={handleWalletConnect}
                  onDisconnect={handleWalletDisconnect}
                />
              </div>
            </div>
          )
        ) : isLanding ? (
          <LandingTopBar
            isMobile={isMobile}
            walletAddress={walletAddress}
            isWalletConnected={isWalletConnected}
            onWalletConnect={handleWalletConnect}
            onWalletDisconnect={handleWalletDisconnect}
          />
        ) : (
          <TopBar
            title={currentTitle}
            setPage={setPage}
            walletAddress={walletAddress}
            isWalletConnected={isWalletConnected}
            onWalletConnect={handleWalletConnect}
            onWalletDisconnect={handleWalletDisconnect}
          />
        )}

        <div style={{ flex: 1 }}>{renderPage()}</div>

        {!isLanding && !isMobile && <BottomBar />}
      </div>
    </div>
  )
}

interface LandingTopBarProps {
  isMobile: boolean
  walletAddress: string
  isWalletConnected: boolean
  onWalletConnect: (addr: string) => void
  onWalletDisconnect: () => void
  showMenuButton?: boolean
  onOpenMenu?: () => void
}

function LandingTopBar({
  isMobile,
  walletAddress,
  isWalletConnected,
  onWalletConnect,
  onWalletDisconnect,
  showMenuButton = false,
  onOpenMenu,
}: LandingTopBarProps) {
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
        position: isMobile ? 'sticky' : 'static',
        top: isMobile ? 0 : undefined,
        zIndex: isMobile ? 120 : undefined,
      }}
    >
      {isMobile ? (
        <>
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <button
              onClick={onOpenMenu}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: showMenuButton ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 0,
                visibility: showMenuButton ? 'visible' : 'hidden',
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
                textAlign: 'center',
                flex: 1,
              }}
            >
              VECTRA AI
            </span>

            <div style={{ flexShrink: 0 }}>
              <WalletButton
                address={walletAddress}
                connected={isWalletConnected}
                onConnect={onWalletConnect}
                onDisconnect={onWalletDisconnect}
              />
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              flexWrap: 'wrap',
              width: '100%',
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
        </>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
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

          <div>
            <WalletButton
              address={walletAddress}
              connected={isWalletConnected}
              onConnect={onWalletConnect}
              onDisconnect={onWalletDisconnect}
            />
          </div>
        </>
      )}
    </div>
  )
}