import { EmailMessage } from 'cloudflare:email'

const allowedTypes = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

function encodeHeader(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim()
}

function toBase64Utf8(value) {
  return btoa(unescape(encodeURIComponent(value)))
}

function foldBase64(value) {
  return String(value).replace(/\s+/g, '').match(/.{1,76}/g)?.join('\r\n') || ''
}

function readAttachment(data) {
  const raw = data.attachment
  if (!raw || typeof raw !== 'object') return null

  const filename = encodeHeader(String(raw.filename || '')).replace(/["\\]/g, '')
  const contentType = encodeHeader(String(raw.contentType || ''))
  const content = String(raw.content || '').replace(/\s+/g, '')

  if (!filename || !allowedTypes.has(contentType) || !/^[A-Za-z0-9+/]+=*$/.test(content)) return null
  if (content.length > Math.ceil((3 * 1024 * 1024 * 4) / 3) + 8) return null
  return { filename, contentType, content }
}

function buildRawEmail({ from, to, replyTo, subject, body, attachment }) {
  const headers = [
    `From: ${encodeHeader(from)}`,
    `To: ${encodeHeader(to)}`,
    `Reply-To: ${encodeHeader(replyTo)}`,
    `Subject: =?UTF-8?B?${toBase64Utf8(subject)}?=`,
    'MIME-Version: 1.0',
  ]

  if (!attachment) {
    return [
      ...headers,
      'Content-Type: text/plain; charset=UTF-8',
      'Content-Transfer-Encoding: 8bit',
      '',
      body,
    ].join('\r\n')
  }

  const boundary = `axe_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
  return [
    ...headers,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    '',
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    body,
    `--${boundary}`,
    `Content-Type: ${attachment.contentType}; name="${attachment.filename}"`,
    'Content-Transfer-Encoding: base64',
    `Content-Disposition: attachment; filename="${attachment.filename}"`,
    '',
    foldBase64(attachment.content),
    `--${boundary}--`,
  ].join('\r\n')
}

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 })
    }

    if (request.headers.get('x-contact-secret') !== env.CONTACT_SECRET) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let data
    try {
      data = await request.json()
    } catch {
      return Response.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const to = env.TO_ADDRESS
    const from = env.FROM_ADDRESS
    const name = String(data.name || '').trim()
    const email = String(data.email || '').trim()
    const company = String(data.company || '').trim()
    const phone = String(data.phone || '').trim()
    const volume = String(data.volume || 'Not sure yet').trim()
    const bottleneck = String(data.bottleneck || '').trim()
    const role = String(data.role || '').trim()
    const portfolio = String(data.portfolio || '').trim()
    const intent = data.intent === 'calendar'
      ? 'calendar'
      : data.intent === 'application'
        ? 'application'
        : 'brief'
    const attachment = readAttachment(data)

    if (data.attachment && !attachment) {
      return Response.json({ error: 'The attached file could not be sent. Please try a PDF or Word file under 3 MB.' }, { status: 400 })
    }

    const subject = intent === 'calendar'
      ? `Calendar request — ${company}`
      : intent === 'application'
        ? `Application — ${role || 'General'}`
        : `Project brief — ${company}`

    const contactLines = intent === 'application'
      ? [
          `Name: ${name}`,
          `Email: ${email}`,
          `Role: ${role || 'General / other'}`,
          ...(portfolio ? [`Portfolio: ${portfolio}`] : []),
          ...(attachment ? [`CV: ${attachment.filename}`] : ['CV: not attached']),
        ]
      : [
          `Name: ${name}`,
          `Company: ${company}`,
          `Work email: ${email}`,
          ...(phone ? [`Phone: ${phone}`] : []),
          `Approximate monthly volume: ${volume}`,
        ]

    const body = intent === 'calendar'
      ? [
          'A visitor requested a calendar link.',
          '',
          ...contactLines,
        ].join('\n')
      : intent === 'application'
        ? [
            'New application from axeofficial.com/careers',
            '',
            ...contactLines,
            '',
            'Why this role:',
            bottleneck,
          ].join('\n')
        : [
            'New project brief from axeofficial.com',
            '',
            ...contactLines,
            '',
            'Workflow or bottleneck:',
            bottleneck,
          ].join('\n')

    const message = new EmailMessage(
      from,
      to,
      buildRawEmail({
        from: `Axe Official Website <${from}>`,
        to,
        replyTo: email,
        subject,
        body,
        attachment,
      }),
    )

    try {
      await env.SEB.send(message)
    } catch (error) {
      const detail = error instanceof Error ? error.message : 'Email send failed'
      return Response.json({ error: detail }, { status: 502 })
    }

    return Response.json({ ok: true })
  },
}
