import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { idea } = await req.json()

  const encoder = new TextEncoder()

  const stream = new ReadableStream({
    async start(controller) {
      const send = (data: string) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: data })}\n\n`))
      }

      try {
        const agentsRes = await fetch('http://localhost:3001/api/agents')
        const agentsData = await agentsRes.json()
        const agentId = agentsData?.agents?.[0]?.id

        if (!agentId) {
          send('ERROR: Agent not available')
          controller.close()
          return
        }

        const msgRes = await fetch(`http://localhost:3001/api/agents/${agentId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: idea, userId: 'vectra-user', userName: 'User' })
        })

        const msgData = await msgRes.json()
        const text = msgData?.[0]?.text || ''

        // Stream word by word for effect
        const words = text.split(' ')
        for (const word of words) {
          send(word + ' ')
          await new Promise(r => setTimeout(r, 30))
        }
      } catch {
        send('ERROR: Agent unreachable')
      }

      controller.close()
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    }
  })
}