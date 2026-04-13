'use client'

import { Lock } from 'lucide-react'
import { StatusChip } from '@/components/ui/primitives'
import type { PageId } from '@/types'

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

interface TopBarProps {
  title: string
  setPage: (id: PageId) => void
  walletAddress: string
  isWalletConnected: boolean
  onWalletConnect: (addr: string) => void
  onWalletDisconnect: () => void
}

export function TopBar({
  title,
  setPage,
  walletAddress,
  isWalletConnected,
  onWalletConnect,
  onWalletDisconnect,
}: TopBarProps) {
  return (
    <header
      style={{
        background: '#05070F',
        borderBottom: '1px solid #0A0C14',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        flexWrap: 'wrap',
        gap: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
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

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexWrap: 'wrap',
        }}
      >
        <WalletButton
          address={walletAddress}
          connected={isWalletConnected}
          onConnect={onWalletConnect}
          onDisconnect={onWalletDisconnect}
        />
      </div>
    </header>
  )
}

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