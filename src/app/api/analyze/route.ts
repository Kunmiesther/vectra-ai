import { NextRequest, NextResponse } from 'next/server'

const NOSANA_URL = 'https://5i8frj7ann99bbw9gzpprvzj2esugg39hxbb4unypskq.node.k8s.prd.nos.ci/v1/chat/completions'
const MODEL = 'Qwen3.5-9B-FP8'

const SYSTEM_PROMPT = `You are Vectra, an elite autonomous AI strategy agent. Your sole purpose is to transform raw ideas into precise, actionable execution strategies.

When a user describes an idea, analyze it and respond in this EXACT structured format:

## FEASIBILITY SCORE
[Number from 0-100]/100 — [STRONG/VIABLE/RISKY/WEAK]

## STRATEGIC READING
[2-3 sentences analyzing the idea's core premise, market context, and structural logic]

## CRITICAL WEAKNESSES
1. [WEAKNESS NAME] — [One sentence explanation]
2. [WEAKNESS NAME] — [One sentence explanation]
3. [WEAKNESS NAME] — [One sentence explanation]

## RECOMMENDED DIRECTION
[Direction name in caps] — [One sentence describing the recommended execution path]
Confidence: [percentage]%

## REJECTED PATHS
- [PATH NAME]: [Why it was dismissed in one sentence]
- [PATH NAME]: [Why it was dismissed in one sentence]

## EXECUTION ROADMAP
1. [PHASE NAME] — [What to do, timeframe]
2. [PHASE NAME] — [What to do, timeframe]
3. [PHASE NAME] — [What to do, timeframe]

## MVP SCOPE
BUILD: [comma-separated list of 3 core features]
SKIP: [comma-separated list of 3 things to avoid]

Be direct, honest, and tactical. Every output must be specific to the idea submitted.`

export async function POST(req: NextRequest) {
  const { idea } = await req.json()

  if (!idea?.trim()) {
    return NextResponse.json({ error: 'No idea provided' }, { status: 400 })
  }

  try {
    const res = await fetch(NOSANA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer nosana',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: idea }
        ],
        max_tokens: 2000,
        stream: false,
        chat_template_kwargs: { enable_thinking: false }
      }),
    })

    const data = await res.json()
    const text = data?.choices?.[0]?.message?.content || ''

    if (!text) {
      return NextResponse.json({ error: 'No response from model' }, { status: 500 })
    }

    return NextResponse.json({ result: text })
  } catch (err) {
    return NextResponse.json({ error: 'Analysis failed' }, { status: 500 })
  }
}