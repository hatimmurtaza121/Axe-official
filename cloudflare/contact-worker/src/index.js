import { EmailMessage } from 'cloudflare:email'

function encodeHeader(value) {
  return String(value).replace(/[\r\n]+/g, ' ').trim()
}

function toBase64Utf8(value) {
  return btoa(unescape(encodeURIComponent(value)))
}

function buildRawEmail({ from, to, replyTo, subject, body }) {
  return [
    `From: ${encodeHeader(from)}`,
    `To: ${encodeHeader(to)}`,
    `Reply-To: ${encodeHeader(replyTo)}`,
    `Subject: =?UTF-8?B?${toBase64Utf8(subject)}?=`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    '',
    body,
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
    const intent = data.intent === 'calendar' ? 'calendar' : 'brief'

    const subject = intent === 'calendar'
      ? `Calendar request — ${company}`
      : `Project brief — ${company}`

    const contactLines = [
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
