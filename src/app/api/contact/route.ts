import { NextResponse } from 'next/server'
import { emailPattern, isValidPhone, type ContactIntent, type ContactPayload } from '@/lib/contact'
import { site, volumeOptions } from '@/lib/site'

export const runtime = 'nodejs'

const volumeSet = new Set<string>(volumeOptions)

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export async function POST(request: Request) {
  const workerUrl = process.env.CONTACT_WORKER_URL
  const workerSecret = process.env.CONTACT_WORKER_SECRET

  if (!workerUrl || !workerSecret) {
    return NextResponse.json({ error: 'Contact delivery is not configured yet.' }, { status: 503 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json() as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Please submit a valid project brief.' }, { status: 400 })
  }

  if (asString(body.website)) {
    return NextResponse.json({ ok: true })
  }

  const intent: ContactIntent = body.intent === 'calendar' ? 'calendar' : 'brief'
  const payload: ContactPayload = {
    name: asString(body.name),
    email: asString(body.email),
    phone: asString(body.phone),
    company: asString(body.company),
    volume: asString(body.volume) || 'Not sure yet',
    bottleneck: asString(body.bottleneck),
    intent,
  }

  if (!payload.name || !payload.email || !payload.company) {
    return NextResponse.json({ error: 'Please complete your name, work email, and company.' }, { status: 400 })
  }
  if (!emailPattern.test(payload.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }
  if (payload.phone && !isValidPhone(payload.phone)) {
    return NextResponse.json({ error: 'Please enter a valid phone number.' }, { status: 400 })
  }
  if (!volumeSet.has(payload.volume)) {
    return NextResponse.json({ error: 'Please choose a monthly volume option.' }, { status: 400 })
  }
  if (intent === 'brief' && !payload.bottleneck) {
    return NextResponse.json({ error: 'Tell us briefly which workflow you want to improve.' }, { status: 400 })
  }
  if (payload.name.length > 120 || payload.company.length > 160 || payload.phone.length > 24 || payload.bottleneck.length > 4000) {
    return NextResponse.json({ error: 'Please shorten the brief and try again.' }, { status: 400 })
  }

  const response = await fetch(workerUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-contact-secret': workerSecret,
    },
    body: JSON.stringify({
      ...payload,
      to: site.contactEmail,
    }),
  })

  if (!response.ok) {
    const result = await response.json().catch(() => ({})) as { error?: string }
    return NextResponse.json(
      { error: result.error || 'We could not send the brief. Please try again in a moment.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
