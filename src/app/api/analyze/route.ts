import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { idea } = await req.json()

  if (!idea || idea.trim().length === 0) {
    return NextResponse.json({ error: 'No idea provided' }, { status: 400 })
  }

  try {
    // Get the agent ID first
    const agentsRes = await fetch('http://localhost:3001/api/agents')
    const agentsData = await agentsRes.json()
    const agentId = agentsData?.agents?.[0]?.id

    if (!agentId) {
      return NextResponse.json({ error: 'Agent not available' }, { status: 503 })
    }

    // Send message to agent
    const msgRes = await fetch(`http://localhost:3001/api/agents/${agentId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: idea,
        userId: 'vectra-user',
        userName: 'User'
      })
    })

    const msgData = await msgRes.json()
    const responseText = msgData?.[0]?.text || ''

    return NextResponse.json({ result: responseText })
  } catch (err) {
    return NextResponse.json({ error: 'Agent unreachable' }, { status: 503 })
  }
}