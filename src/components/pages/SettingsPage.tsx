'use client'

import { useState } from 'react'
import { Gauge, User } from 'lucide-react'
import { MonoBadge, StatusChip } from '@/components/ui/primitives'
import { STRATEGY_MODES } from '@/lib/mockData'

export function SettingsPage() {
  const [activeMode, setActiveMode]   = useState('Strategic Review')
  const [depth, setDepth]             = useState(8.4)
  const [adversarial, setAdversarial] = useState(true)
  const [bias, setBias]               = useState(false)

  return (
    <div style={{ padding: 28, display: 'grid', gridTemplateColumns: '1fr 280px', gap: 28, minHeight: 'calc(100vh - 84px)' }}>

      {/* ── Main ── */}
      <div>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#10B981', letterSpacing: '0.15em', marginBottom: 8 }}>SYSTEM ONLINE</div>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 26, fontWeight: 800, color: '#E6EEF8', marginBottom: 12 }}>
            Agent Behavior Controls
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: '#64748B', lineHeight: 1.6, maxWidth: 580 }}>
            Configure the cognitive parameters for the digital sovereign intelligence layer. These settings dictate the operational threshold for all upcoming strategic analyses.
          </p>
        </div>

        {/* Mode cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
          {STRATEGY_MODES.map(({ label, desc, latency }) => {
            const active = activeMode === label
            return (
              <button
                key={label}
                onClick={() => setActiveMode(label)}
                style={{
                  background: active ? '#0A0C14' : '#05070F',
                  border: `1px solid ${active ? '#4F7CFF' : '#1E293B'}`,
                  borderRadius: 10, padding: 18, cursor: 'pointer',
                  textAlign: 'left', position: 'relative',
                }}
              >
                {active && (
                  <div style={{ position: 'absolute', top: 8, right: 8, background: '#4F7CFF', borderRadius: 3, padding: '2px 6px' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#fff' }}>ACTIVE</span>
                  </div>
                )}
                <Gauge size={18} color={active ? '#4F7CFF' : '#4A5568'} style={{ marginBottom: 12 }} />
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 700, color: active ? '#E6EEF8' : '#94A3B8', marginBottom: 8 }}>{label}</div>
                <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 10, color: '#64748B', lineHeight: 1.5, marginBottom: 12 }}>{desc}</p>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: active ? '#4F7CFF' : '#4A5568' }}>
                  LATENCY: {latency}
                </div>
              </button>
            )
          })}
        </div>

        {/* Cognitive precision parameters */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 24, marginBottom: 16 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.15em', marginBottom: 22 }}>
            COGNITIVE PRECISION PARAMETERS
          </div>

          {/* Analysis Depth */}
          <SliderControl
            title="Analysis Depth"
            desc="Recursive processing cycles for data points"
            value={`${depth.toFixed(1)} / 10`}
            valueColor="#4F7CFF"
            min={1} max={10} step={0.1}
            current={depth}
            onChange={setDepth}
            ticks={['LINEAR', 'HOLISTIC', 'RECURSIVE']}
          />

          {/* Output Density */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#E6EEF8', marginBottom: 4 }}>Output Density</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#64748B' }}>Volume of evidence and citation requirements</div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#8B5CF6' }}>LITE</div>
            </div>
            <div style={{ height: 3, background: '#1E293B', borderRadius: 2 }}>
              <div style={{ height: '100%', width: '25%', background: '#8B5CF6', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              {['EXECUTIVE SUMMARY', 'STANDARD REPORT', 'RAW DATA DUMP'].map(l => (
                <span key={l} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#4A5568' }}>{l}</span>
              ))}
            </div>
          </div>

          {/* Speculative Tolerance */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#E6EEF8', marginBottom: 4 }}>Speculative Tolerance</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#64748B' }}>Willingness to project future trends with lower confidence</div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#22D3EE' }}>MODERATE</div>
            </div>
            <div style={{ height: 3, background: '#1E293B', borderRadius: 2 }}>
              <div style={{ height: '100%', width: '55%', background: '#22D3EE', borderRadius: 2 }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
              {['DETERMINISTIC', 'PROBABILISTIC', 'SPECULATIVE'].map(l => (
                <span key={l} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#4A5568' }}>{l}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Toggles */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <ToggleCard
            label="Real-time Adversarial Sync"
            desc="Monitor market shifts during generation"
            value={adversarial}
            onToggle={() => setAdversarial(v => !v)}
          />
          <ToggleCard
            label="Bias Neutralization"
            desc="Active scrubbing of internal confirmation bias"
            value={bias}
            onToggle={() => setBias(v => !v)}
          />
        </div>
      </div>

      {/* ── Right Rail ── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* Simulation preview */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em' }}>SIMULATION PREVIEW</span>
            <MonoBadge color="#22D3EE">99.4% CONFIDENCE</MonoBadge>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', marginBottom: 4 }}>CURRENT TONE</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, fontWeight: 700, color: '#E6EEF8', marginBottom: 16 }}>DIPLOMATIC / CALCULATED</div>
          <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 6, padding: 14, marginBottom: 14 }}>
            <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#94A3B8', fontStyle: 'italic', lineHeight: 1.7 }}>
              &ldquo;Based on current parameters, the agent will prioritize structural stability over aggressive expansion in the next report.&rdquo;
            </p>
          </div>
          {/* Waveform visual */}
          <div style={{ height: 80, background: '#05070F', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(79,124,255,0.08), transparent 70%)' }} />
            <svg width="100%" height="80" viewBox="0 0 200 80" style={{ opacity: 0.6 }}>
              <polyline
                points="0,50 20,35 40,45 60,25 80,40 100,30 120,38 140,20 160,32 180,28 200,40"
                fill="none" stroke="#22D3EE" strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>

        {/* Security protocol */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 20 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 16 }}>SECURITY PROTOCOL</div>
          {[
            { label: 'Identity Mode', val: 'SOVEREIGN_ID', color: '#94A3B8' },
            { label: 'Audit Logging', val: 'ACTIVE',       color: '#10B981' },
          ].map(({ label, val, color }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #1E293B' }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B' }}>{label}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color }}>{val}</span>
            </div>
          ))}
          <button
            style={{
              width: '100%', marginTop: 14, padding: 8,
              background: 'transparent', border: '1px solid #1E293B',
              borderRadius: 4, color: '#64748B',
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9,
              cursor: 'pointer', letterSpacing: '0.1em',
            }}
          >
            REVOKE ACCESS TOKENS
          </button>
        </div>

        {/* User card */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'linear-gradient(135deg, #4F7CFF, #8B5CF6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <User size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, fontWeight: 700, color: '#E6EEF8' }}>V. STRATEGIST</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4F7CFF' }}>LVL 4 ACCESS</div>
          </div>
        </div>

        {/* System mode status chips */}
        <div style={{ background: '#05070F', border: '1px solid #1E293B', borderRadius: 10, padding: 18 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', letterSpacing: '0.12em', marginBottom: 12 }}>ACTIVE FLAGS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <StatusChip label="STRATEGIC MODE ACTIVE" color="#4F7CFF" />
            <StatusChip label={adversarial ? 'ADVERSARIAL SYNC ON' : 'ADVERSARIAL SYNC OFF'} color={adversarial ? '#22D3EE' : '#4A5568'} />
            <StatusChip label={bias ? 'BIAS SCRUB ON' : 'BIAS SCRUB OFF'} color={bias ? '#10B981' : '#4A5568'} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Slider Control ───────────────────────────────────────────────────────────

interface SliderControlProps {
  title: string
  desc: string
  value: string
  valueColor: string
  min: number
  max: number
  step: number
  current: number
  onChange: (v: number) => void
  ticks: string[]
}

function SliderControl({ title, desc, value, valueColor, min, max, step, current, onChange, ticks }: SliderControlProps) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: '#E6EEF8', marginBottom: 4 }}>{title}</div>
          <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#64748B' }}>{desc}</div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 16, fontWeight: 700, color: valueColor }}>{value}</div>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={current}
        onChange={e => onChange(parseFloat(e.target.value))}
        style={{ width: '100%', accentColor: valueColor }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
        {ticks.map(l => (
          <span key={l} style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: '#4A5568' }}>{l}</span>
        ))}
      </div>
    </div>
  )
}

// ─── Toggle Card ──────────────────────────────────────────────────────────────

interface ToggleCardProps {
  label: string
  desc: string
  value: boolean
  onToggle: () => void
}

function ToggleCard({ label, desc, value, onToggle }: ToggleCardProps) {
  return (
    <div
      style={{
        background: '#05070F', border: '1px solid #1E293B',
        borderRadius: 10, padding: 20,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}
    >
      <div>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600, color: '#E6EEF8', marginBottom: 4 }}>{label}</div>
        <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#64748B' }}>{desc}</div>
      </div>
      <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0, marginLeft: 12 }}>
        <div
          style={{
            width: 44, height: 24, borderRadius: 12,
            background: value ? '#4F7CFF' : '#1E293B',
            border: '1px solid #2D3748', position: 'relative',
            transition: 'background 0.2s',
          }}
        >
          <div
            style={{
              position: 'absolute', top: 3,
              left: value ? 22 : 3,
              width: 16, height: 16, borderRadius: '50%',
              background: value ? '#fff' : '#4A5568',
              transition: 'left 0.2s',
              boxShadow: value ? '0 0 8px rgba(79,124,255,0.6)' : 'none',
            }}
          />
        </div>
      </button>
    </div>
  )
}