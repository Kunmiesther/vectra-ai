import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { result, idea, score, verdict, wallet } = await req.json()

  if (!result) {
    return NextResponse.json({ error: 'No analysis to publish' }, { status: 400 })
  }

  if (!process.env.PINATA_JWT) {
    return NextResponse.json(
      { error: 'PINATA_JWT is missing from environment variables' },
      { status: 500 }
    )
  }

  const report = {
    version: '1.0',
    agent: 'Vectra Strategic AI',
    model: 'Qwen3.5-9B-FP8',
    network: 'Nosana Decentralized GPU',
    timestamp: new Date().toISOString(),
    wallet: wallet || 'anonymous',
    idea,
    feasibilityScore: score,
    verdict,
    analysis: result,
  }

  try {
    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
      body: JSON.stringify({
        pinataContent: report,
        pinataMetadata: { name: `vectra-${Date.now()}` },
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      console.error('Pinata error response:', data)
      return NextResponse.json(
        { error: data?.error?.reason || data?.message || 'Pinata request failed' },
        { status: res.status }
      )
    }

    if (!data.IpfsHash) {
      console.error('Pinata success response missing IpfsHash:', data)
      return NextResponse.json(
        { error: 'Pinata did not return an IPFS hash' },
        { status: 500 }
      )
    }

    const cid = data.IpfsHash
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${cid}`

    return NextResponse.json({ cid, ipfsUrl })
  } catch (err) {
    console.error('Publish error:', err)
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : 'Failed to save report',
      },
      { status: 500 }
    )
  }
}