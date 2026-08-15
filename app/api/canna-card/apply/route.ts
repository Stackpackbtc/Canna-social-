import { NextResponse } from 'next/server'
import crypto from 'crypto'

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!))

export async function POST(req: Request) {
  try {
    const b = await req.json()
    if (!b.name?.trim() || !b.email?.trim() || !b.why?.trim()) {
      return NextResponse.json({ error: 'Please complete the required fields.' }, { status: 400 })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) {
      return NextResponse.json({ error: 'Please enter a valid email.' }, { status: 400 })
    }

    const secret = process.env.CANNA_CARD_APPROVAL_SECRET
    const origin = new URL(req.url).origin
    let approve = ''

    if (secret) {
      const payload = Buffer.from(JSON.stringify({ n: b.name, e: b.email, f: b.favorite || '', t: Date.now() })).toString('base64url')
      const sig = crypto.createHmac('sha256', secret).update(payload).digest('base64url')
      approve = `${origin}/api/canna-card/approve?token=${payload}.${sig}`
    }

    const summary = `New Canna Social Card Application\n\nName: ${b.name}\nEmail: ${b.email}\nFavorite: ${b.favorite || 'Not provided'}\nWhy they want to join:\n${b.why}\n\n${approve ? `APPROVE: ${approve}` : 'Approval link will be available after the email service is configured.'}`

    // Preferred path: Resend when its environment variables are available.
    const key = process.env.RESEND_API_KEY
    if (key && secret) {
      const html = `<h2>New Canna Social Card Application</h2><p><b>Name:</b> ${esc(b.name)}</p><p><b>Email:</b> ${esc(b.email)}</p><p><b>Favorite:</b> ${esc(b.favorite || 'Not provided')}</p><p><b>Why:</b><br/>${esc(b.why).replace(/\n/g, '<br/>')}</p><p><a href="${approve}">APPROVE &amp; EMAIL CARD TO APPLICANT</a></p>`
      const r = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CANNA_SOCIAL_FROM_EMAIL || 'Canna Social <onboarding@resend.dev>',
          to: ['stackpackmedia@gmail.com'],
          reply_to: b.email,
          subject: `Canna Social Card Application — ${b.name}`,
          html,
        }),
      })
      if (r.ok) return NextResponse.json({ ok: true })
    }

    // Fallback: no Resend setup required. FormSubmit forwards the application to the inbox.
    // This keeps the application from failing while the production email service is being configured.
    const fallback = await fetch('https://formsubmit.co/ajax/stackpackmedia@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams({
        _subject: `Canna Social Card Application — ${b.name}`,
        _replyto: b.email,
        _captcha: 'false',
        name: b.name,
        email: b.email,
        favorite: b.favorite || 'Not provided',
        why: b.why,
        application_summary: summary,
      }),
    })

    if (!fallback.ok) return NextResponse.json({ error: 'Could not send application.' }, { status: 502 })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid application.' }, { status: 400 })
  }
}
