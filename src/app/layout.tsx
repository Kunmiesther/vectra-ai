import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vectra Strategic AI',
  description: 'Autonomous AI strategy agent. Evaluate ideas, identify flaws, and generate sovereign execution plans.',
  keywords: ['AI', 'strategy', 'sovereign', 'autonomous', 'execution'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}