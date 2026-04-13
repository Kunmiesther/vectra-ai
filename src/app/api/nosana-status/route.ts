import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const res = await fetch(
      'https://5i8frj7ann99bbw9gzpprvzj2esugg39hxbb4unypskq.node.k8s.prd.nos.ci/v1/models',
      { next: { revalidate: 60 } }
    )

    if (res.ok) {
      return NextResponse.json({
        nodes: '247+',
        jobs: '1.2K+',
        status: 'ACTIVE',
        model: 'Qwen3.5-9B-FP8',
        latency: '< 30s'
      })
    } else {
      return NextResponse.json({
        nodes: '247+',
        jobs: '1.2K+',
        status: 'INITIALIZING',
        model: 'Qwen3.5-9B-FP8',
        latency: '—'
      })
    }
  } catch {
    return NextResponse.json({
      nodes: '247+',
      jobs: '1.2K+',
      status: 'INITIALIZING',
      model: 'Qwen3.5-9B-FP8',
      latency: '—'
    })
  }
}