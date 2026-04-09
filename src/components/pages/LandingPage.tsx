'use client'

import {
  ArrowRight, Brain, Shield, Target, BarChart3, CheckCircle2, XCircle,
} from 'lucide-react'
import type { PageId } from '@/types'
import { MonoBadge, StatusChip } from '@/components/ui/primitives'
import { BottomBar } from '@/components/layout/TopBar'

interface LandingPageProps {
  setPage: (id: PageId) => void
}

export function LandingPage({ setPage }: LandingPageProps) {
  return (
    <div style={{ minHeight: '100vh', background: '#05070F' }}>
      {/* ── Hero ── */}
      <section
        style={{
          padding: '80px 60px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Grid overlay */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backgroundImage:
              'linear-gradient(rgba(79,124,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,124,255,0.03) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }}
        />
        {/* Radial glow */}
        <div
          style={{
            position: 'absolute', top: '40%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600, height: 300,
            background: 'radial-gradient(ellipse, rgba(79,124,255,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative' }}>
          {/* Status pill */}
          <div
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#0A0C14', border: '1px solid #1E293B',
              borderRadius: 20, padding: '5px 14px', marginBottom: 32,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981', display: 'block' }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: '#94A3B8', letterSpacing: '0.12em' }}>
              PROTOCOL ACTIVE: STRATEGIC AUTONOMY ENABLED
            </span>
          </div>

          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 52, fontWeight: 800, color: '#E6EEF8', lineHeight: 1.1, marginBottom: 8, letterSpacing: '-0.02em' }}>
            Turn any idea into an
          </h1>
          <h1 style={{ fontFamily: "'Sora', sans-serif", fontSize: 52, fontWeight: 800, color: '#4F7CFF', lineHeight: 1.1, marginBottom: 28, letterSpacing: '-0.02em' }}>
            execution strategy.
          </h1>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, color: '#94A3B8', maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Vectra analyzes raw ideas, identifies flaws, evaluates feasibility, and generates structured execution plans using enterprise-grade sovereign AI.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
            <button
              onClick={() => setPage('dashboard')}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '13px 28px',
                background: 'linear-gradient(135deg, #4F7CFF, #3B5BDB)',
                border: 'none', borderRadius: 6, color: '#fff',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                letterSpacing: '0.1em', cursor: 'pointer',
                boxShadow: '0 0 24px rgba(79,124,255,0.3)',
              }}
            >
              INITIALIZE CORE ANALYSIS <ArrowRight size={14} />
            </button>
            <button
              style={{
                padding: '13px 24px', background: 'transparent',
                border: '1px solid #1E293B', borderRadius: 6, color: '#64748B',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                letterSpacing: '0.1em', cursor: 'pointer',
              }}
            >
              VIEW SAMPLE LOGS
            </button>
          </div>
        </div>
      </section>

      {/* ── Workflow Steps ── */}
      <div
        style={{
          margin: '0 60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          background: '#0A0C14',
        }}
      >
        {[
          { step: 'STEP 01', title: 'Ingest Idea', desc: 'Feed raw concepts or complex project briefs into the sovereign engine.' },
          { step: 'STEP 02', title: 'Analyze Assumptions', desc: 'Detect logical fallacies and hidden resource dependencies instantly.' },
          { step: 'STEP 03', title: 'Select Strategy', desc: 'Choose between aggressive, balanced, or conservative execution paths.' },
          { step: 'STEP 04', title: 'Generate Plan', desc: 'Receive a fully structured roadmap with technical benchmarks.' },
        ].map(({ step, title, desc }, i) => (
          <div
            key={i}
            style={{
              background: '#05070F',
              padding: '28px 24px',
              borderRight: i < 3 ? '1px solid #1E293B' : 'none',
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', letterSpacing: '0.15em', marginBottom: 12 }}>{step}</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700, color: '#E6EEF8', marginBottom: 10 }}>{title}</div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#64748B', lineHeight: 1.6 }}>{desc}</div>
            <ArrowRight size={14} color="#4F7CFF" style={{ marginTop: 16 }} />
          </div>
        ))}
      </div>

      {/* ── Engine Capabilities ── */}
      <section style={{ padding: '60px' }}>
        <div style={{ marginBottom: 36 }}>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 28, fontWeight: 700, color: '#E6EEF8', marginBottom: 8 }}>Engine Capabilities</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: '#64748B' }}>Advanced multi-agent reasoning for complex strategy formulation.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
          {[
            { Icon: Brain,    title: 'Idea Deconstruction', desc: 'Our engine strips away the fluff to find the core value proposition. We identify the Atomic Components of your strategy before evaluating them individually for viability and scale potential.' },
            { Icon: Shield,   title: 'Risk Detection',      desc: 'Real-time identification of fatal flaws, market saturation markers, and technical debt bottlenecks before you write a single line of code.' },
            { Icon: Target,   title: 'Scope Control',       desc: 'Automated pruning of non-essential features. Vectra forces focus on the minimal viable execution path to ensure speed-to-market.' },
            { Icon: BarChart3, title: 'Feasibility Analysis', desc: 'Deep-dive technical audits that cross-reference your requirements against current API constraints, infrastructure costs, and talent availability metrics.' },
          ].map(({ Icon, title, desc }, i) => (
            <div
              key={i}
              style={{
                background: '#05070F', border: '1px solid #1E293B',
                borderRadius: 10, padding: '28px',
              }}
            >
              <div
                style={{
                  width: 40, height: 40, background: '#0A0C14',
                  border: '1px solid #1E293B', borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 18,
                }}
              >
                <Icon size={18} color="#4F7CFF" />
              </div>
              <h3 style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: '#E6EEF8', marginBottom: 12 }}>{title}</h3>
              <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#64748B', lineHeight: 1.7 }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stop Generating / Start Evaluating ── */}
      <section
        style={{
          margin: '0 60px', padding: '60px',
          background: '#05070F', border: '1px solid #1E293B',
          borderRadius: 12, display: 'grid',
          gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center',
        }}
      >
        <div>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800, color: '#E6EEF8', marginBottom: 4 }}>Stop generating.</h2>
          <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 32, fontWeight: 800, color: '#4F7CFF', marginBottom: 20 }}>Start evaluating.</h2>
          <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, color: '#64748B', lineHeight: 1.7, marginBottom: 28 }}>
            Generative AI is a commodity. Strategic evaluation is a superpower. Vectra provides the critical oversight layer that current LLMs lack, ensuring your plans are not just creative, but executable.
          </p>
          {[
            { Icon: CheckCircle2, label: 'Autonomous Validation', desc: 'Cross-agent consensus checks on all generated strategies.', color: '#10B981' },
            { Icon: Shield,       label: 'Zero-Bias Architecture', desc: 'The system is programmed to find reasons your idea will fail.', color: '#4F7CFF' },
          ].map(({ Icon, label, desc, color }, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 18 }}>
              <Icon size={18} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 13, fontWeight: 600, color: '#E6EEF8', marginBottom: 3 }}>{label}</div>
                <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 12, color: '#64748B' }}>{desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mock strategy card */}
        <div
          style={{
            background: '#05070F', border: '1px solid #1E293B',
            borderRadius: 8, padding: 24,
          }}
        >
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', letterSpacing: '0.12em', marginBottom: 12 }}>ANALYSIS ENGINE V4.2.0-RUNTIME</div>
          <div
            style={{
              background: '#0A0C14', border: '1px solid #4F7CFF',
              borderRadius: 6, padding: '12px 16px', marginBottom: 16,
            }}
          >
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B', marginBottom: 4 }}>RECOMMENDED PATH</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 700, color: '#E6EEF8' }}>Aggressive Market Entry [Tier 1]</span>
              <MonoBadge color="#10B981">56.4% CONFIDENCE</MonoBadge>
            </div>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 8 }}>REJECTED PATH ANALYSIS</div>
          {['Conservative Slow-Roll', 'External API Dependency Plan'].map((path, i) => (
            <div
              key={i}
              style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: '1px solid #1E293B',
              }}
            >
              <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 11, color: '#4A5568', textDecoration: 'line-through' }}>{path}</span>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568' }}>{i === 0 ? 'LOW PROBABILITY' : 'REC: BOTTLENECK'}</span>
            </div>
          ))}
          <div style={{ marginTop: 16, background: '#05070F', border: '1px solid #1E293B', borderRadius: 6, padding: 12 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#64748B' }}>
              &ldquo;Strategy finalized. Recommendation: Focus on immediate liquidity over long-term scaling in Q1...&rdquo;
            </span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '80px 60px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Sora', sans-serif", fontSize: 34, fontWeight: 800, color: '#E6EEF8', marginBottom: 12 }}>Initialize Digital Sovereignty.</h2>
        <p style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, color: '#64748B', marginBottom: 32 }}>
          Gain exclusive access to the Vectra Command Center. Our systems are currently in high-demand phased rollout.
        </p>
        <button
          style={{
            padding: '14px 36px',
            background: 'linear-gradient(135deg, #4F7CFF, #3B5BDB)',
            border: 'none', borderRadius: 6, color: '#fff',
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            letterSpacing: '0.12em', cursor: 'pointer',
            boxShadow: '0 0 30px rgba(79,124,255,0.25)',
          }}
        >
          REQUEST ACCESS TOKEN
        </button>
        <div style={{ marginTop: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <StatusChip label="CURRENT NETWORK LATENCY: 12MS" color="#4A5568" />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: '#4A5568' }}>ENCRYPTION: AES-256</span>
        </div>
      </section>

      <BottomBar />
    </div>
  )
}