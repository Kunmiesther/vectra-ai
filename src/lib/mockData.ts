import type {
  AgentLog,
  HistoryCard,
  SystemLog,
  StrategyMode,
} from '@/types'

// ─── Agent Console Logs ───────────────────────────────────────────────────────

export const AGENT_LOGS: AgentLog[] = [
  { time: '14:02:11', text: 'System initializing... All agents synced.', highlight: true },
  { time: '14:02:15', text: 'Scanning market sentiment for "Obsidian Stack".', highlight: false },
  { time: '14:02:18', text: 'Cross-referencing regulatory hurdles in 48 jurisdictions.', highlight: false },
  { time: '14:02:22', text: 'INSIGHT: Early-mover advantage detected in SEA markets.', highlight: true },
  { time: '14:02:25', text: 'Synthesizing roadmap step 04: "Regulatory Shield" protocol.', highlight: false },
  { time: '14:02:30', text: 'Query the AI Command...', muted: true },
]

// ─── History Cards ────────────────────────────────────────────────────────────

export const HISTORY_CARDS: HistoryCard[] = [
  {
    id: 'VEC-2024-X9',
    project: 'PROJECT: OBSIDIAN PROTOCOL',
    title: 'Market Liquidity Absorption Strategy',
    status: 'DEPLOYED',
    confidence: 98.4,
    feasibility: 0.92,
    yield: '+14.2',
    tags: ['AI', 'SD', 'TX'],
    date: '12MS AGO',
  },
  {
    id: 'VEC-2024-K2',
    title: 'Supply Chain Resilience Audit',
    status: 'ARCHIVED',
    confidence: 82,
    risk: 'Low',
    date: 'OCT 14, 2024',
  },
  {
    id: 'VEC-2024-F4',
    title: 'Recursive Neural...',
    status: 'FAILED',
    note: 'Autonomous attempt failed due to hardware ceiling and floating-point overflow in layer 12.',
    date: 'OCT 12, 2024',
  },
  {
    id: 'VEC-2024-D1',
    title: 'Geopolitical Signal Mapping',
    status: 'DEPLOYED',
    confidence: 91,
    statusLabel: 'Active',
    date: 'OCT 08, 2024',
  },
]

// ─── System Logs ──────────────────────────────────────────────────────────────

export const SYSTEM_LOGS: SystemLog[] = [
  { time: '14:22:01', type: 'AUTH',    text: 'User session validated via Obsidian Protocol.' },
  { time: '14:22:05', type: 'SYNC',    text: 'Integrity Layer fetching build architecture components...' },
  { time: '14:22:09', type: 'PROCESS', text: 'Deployment hash calculated (0x7F2B...E192)' },
  { time: '14:22:15', type: 'WARN',    text: 'Scope Alignment requires manual parameter lock.', warn: true },
  { time: '14:23:44', type: 'SYSTEM',  text: "AI agent 'Vectra-01' processing confidence scores: 99.4%" },
]

// ─── Strategy Modes ───────────────────────────────────────────────────────────

export const STRATEGY_MODES: StrategyMode[] = [
  {
    label: 'Fast Scan',
    desc: 'Surface level pattern recognition for rapid triaging.',
    latency: '12MS',
  },
  {
    label: 'Strategic Review',
    desc: 'Balanced depth with cross-sector variable mapping.',
    latency: '180MS',
  },
  {
    label: 'Critical Mode',
    desc: 'Exhaustive logic testing for high-stakes decisions.',
    latency: '1.2S',
  },
  {
    label: 'Competitive Mode',
    desc: 'Zero-sum game theory and adversary profiling.',
    latency: '450MS',
  },
]

// ─── Dashboard Stats ──────────────────────────────────────────────────────────

export const DASHBOARD_STATS = {
  feasibility: '84.2',
  riskCount: '03',
  recommendedPath: 'Obsidian Protocol',
  executionReadiness: 'HIGH',
}

// ─── Roadmap Steps ────────────────────────────────────────────────────────────

export const ROADMAP_STEPS = [
  {
    n: '01',
    color: '#22D3EE',
    label: 'PROTOCOL SCAFFOLDING',
    desc: 'Deploy core smart contracts to testnet for logic stress testing.',
  },
  {
    n: '02',
    color: '#94A3B8',
    label: 'RISK SURFACE AUDIT',
    desc: 'Third-party penetration testing for private key management.',
  },
  {
    n: '03',
    color: '#94A3B8',
    label: 'ALPHA STAKEHOLDER SYNC',
    desc: 'Distribute beta access to top-tier institutional partners.',
  },
]