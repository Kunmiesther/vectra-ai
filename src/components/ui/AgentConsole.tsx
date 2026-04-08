'use client'

import { ChevronRight, Maximize2 } from 'lucide-react'
import { AGENT_LOGS } from '@/lib/mockData'

export function AgentConsole() {
  return (
    <div
      style={{
        background: '#0A0F1C',
        border: '1px solid #1E293B',
        borderRadius: 8,
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '10px 14px',
          borderBottom: '1px solid #1E293B',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#10B981',
              boxShadow: '0 0 8px #10B981',
              display: 'block',
            }}
          />
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9,
              color: '#94A3B8',
              letterSpacing: '0.12em',
            }}
          >
            AGENT CONSOLE
          </span>
        </div>
        <Maximize2 size={11} color="#4A5568" />
      </div>

      {/* Log lines */}
      <div style={{ padding: '12px 14px' }}>
        {AGENT_LOGS.map((log, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 9,
                color: '#4A5568',
              }}
            >
              [{log.time}]
            </span>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                color: log.muted
                  ? '#4A5568'
                  : log.highlight
                  ? '#22D3EE'
                  : '#94A3B8',
                marginTop: 2,
              }}
            >
              {log.text}
            </div>
          </div>
        ))}
      </div>

      {/* Command input stub */}
      <div
        style={{
          borderTop: '1px solid #1E293B',
          padding: '8px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <ChevronRight size={10} color="#4F7CFF" />
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            color: '#4A5568',
          }}
        >
          Query the AI Command...
        </span>
      </div>
    </div>
  )
}