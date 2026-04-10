// ─── Navigation ──────────────────────────────────────────────────────────────

export type PageId =
  | 'landing'
  | 'dashboard'
  | 'strategy'
  | 'history'
  | 'settings'

// ─── Data Models ─────────────────────────────────────────────────────────────

export interface NavItem {
  id: PageId
  label: string
  icon: string // lucide icon name
}

export interface AgentLog {
  time: string
  text: string
  highlight?: boolean
  muted?: boolean
}

export interface HistoryCard {
  id: string
  project?: string
  title: string
  status: 'DEPLOYED' | 'ARCHIVED' | 'FAILED' | 'ACTIVE'
  confidence?: number
  feasibility?: number
  yield?: string
  tags?: string[]
  date: string
  risk?: string
  note?: string
  statusLabel?: string
}

export interface SystemLog {
  time: string
  type: string
  text: string
  warn?: boolean
}

export interface StrategyMode {
  label: string
  desc: string
  latency: string
}