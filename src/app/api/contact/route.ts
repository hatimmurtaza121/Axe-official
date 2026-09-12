import { NextResponse } from 'next/server'
import { emailPattern, inspectCv, isValidPhone, type ContactAttachment, type ContactIntent, type ContactPayload } from '@/lib/contact'
import { jobs, site, volumeOptions } from '@/lib/site'

export const runtime = 'nodejs'

const volumeSet = new Set<string>(volumeOptions)

function asString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

async function readRequest(request: Request) {
  const contentType = request.headers.get('content-type') || ''
  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData()
    const cv = form.get('cv')
    return {
      body: {
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        company: form.get('company'),
        volume: form.get('volume'),
        bottleneck: form.get('bottleneck'),
        role: form.get('role'),
        portfolio: form.get('portfolio'),
        website: form.get('website'),
        intent: form.get('intent'),
      } as Record<string, unknown>,
      file: cv instanceof File && cv.size > 0 ? cv : null,
    }
  }

  return {
    body: await request.json() as Record<string, unknown>,
    file: null,
  }
}

export async function POST(request: Request) {
  const workerUrl = process.env.CONTACT_WORKER_URL
  const workerSecret = process.env.CONTACT_WORKER_SECRET

  if (!workerUrl || !workerSecret) {
    return NextResponse.json({ error: 'Contact delivery is not configured yet.' }, { status: 503 })
  }

  let body: Record<string, unknown>
  let file: File | null
  try {
    ;({ body, file } = await readRequest(request))
  } catch {
    return NextResponse.json({ error: 'Please submit a valid project brief.' }, { status: 400 })
  }

  if (asString(body.website)) {
    return NextResponse.json({ ok: true })
  }

  const intent: ContactIntent = body.intent === 'calendar'
    ? 'calendar'
    : body.intent === 'application'
      ? 'application'
      : 'brief'
  const roleOptions = new Set<string>(['General / other', ...jobs.map((job) => job.title)])
  const payload: ContactPayload = {
    name: asString(body.name),
    email: asString(body.email),
    phone: asString(body.phone),
    company: asString(body.company),
    volume: asString(body.volume) || 'Not sure yet',
    bottleneck: asString(body.bottleneck),
    role: asString(body.role),
    portfolio: asString(body.portfolio),
    intent,
  }

  if (!payload.name || !payload.email) {
    return NextResponse.json({ error: 'Please complete your name and email.' }, { status: 400 })
  }
  if (!emailPattern.test(payload.email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  if (intent === 'application') {
    if (!payload.role || !roleOptions.has(payload.role)) {
      return NextResponse.json({ error: 'Please choose a role.' }, { status: 400 })
    }
    if (payload.portfolio && !/^https?:\/\/\S+$/i.test(payload.portfolio)) {
      return NextResponse.json({ error: 'Please enter a valid portfolio URL.' }, { status: 400 })
    }
    if (!payload.bottleneck) {
      return NextResponse.json({ error: 'Tell us briefly why this role fits.' }, { status: 400 })
    }
    if (!file) {
      return NextResponse.json({ error: 'Please attach a CV or resume.' }, { status: 400 })
    }
    const bytes = new Uint8Array(await file.arrayBuffer())
    const inspected = inspectCv(file, bytes)
    if ('error' in inspected) {
      return NextResponse.json({ error: inspected.error }, { status: 400 })
    }
    const attachment: ContactAttachment = {
      filename: inspected.filename,
      contentType: inspected.contentType,
      content: Buffer.from(bytes).toString('base64'),
    }
    payload.attachment = attachment
  } else {
    if (!payload.company) {
      return NextResponse.json({ error: 'Please complete your name, work email, and company.' }, { status: 400 })
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
  }

  if (payload.name.length > 120 || payload.company.length > 160 || payload.phone.length > 24 || payload.role.length > 120 || payload.portfolio.length > 400 || payload.bottleneck.length > 4000) {
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
      to: intent === 'application' ? site.careersEmail : site.contactEmail,
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
