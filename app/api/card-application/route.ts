import { NextResponse } from 'next/server'

const DESTINATION = 'stackpackmedia@gmail.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, age, favorite, strain, role, why } = body

    if (!name?.trim() || !email?.trim() || Number(age) < 21 || !favorite?.trim() || !body.agree) {
      return NextResponse.json({ error: 'Please complete the required 21+ application fields.' }, { status: 400 })
    }

    const html = `
      <div style="font-family:Arial,sans-serif;background:#090909;color:#fff;padding:32px">
        <h1>✦ CANNA SOCIAL CARD APPLICATION</h1>
        <p>New community membership application.</p>
        <hr style="border-color:#333"/>
        <p><b>Name:</b> ${escapeHtml(name)}</p>
        <p><b>Email:</b> ${escapeHtml(email)}</p>
        <p><b>Age:</b> ${escapeHtml(String(age))}</p>
        <p><b>Favorite category:</b> ${escapeHtml(favorite)}</p>
        <p><b>Favorite strain/product:</b> ${escapeHtml(strain || 'Not provided')}</p>
        <p><b>Community role:</b> ${escapeHtml(role || 'Not provided')}</p>
        <p><b>What they want Canna Social to become:</b></p>
        <p>${escapeHtml(why || 'Not provided')}</p>
      </div>`

    const resendKey = process.env.RESEND_API_KEY

    // Use Resend when configured for production delivery.
    if (resendKey) {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: process.env.CANNA_SOCIAL_FROM_EMAIL || 'Canna Social <onboarding@resend.dev>',
          to: [DESTINATION],
          reply_to: email,
          subject: `Canna Social Card Application — ${name}`,
          html,
        }),
      })

      if (response.ok) return NextResponse.json({ ok: true, delivered: 'resend' })
      console.error('Resend delivery failed:', await response.text())
    }

    // No API key? Use FormSubmit as a zero-setup fallback so applications can still reach the inbox.
    const form = new URLSearchParams({
      name,
      email,
      age: String(age),
      favorite,
      strain: strain || 'Not provided',
      role: role || 'Not provided',
      why: why || 'Not provided',
      _subject: `Canna Social Card Application — ${name}`,
      _replyto: email,
      _template: 'table',
      _captcha: 'false',
    })

    const fallback = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(DESTINATION)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: form.toString(),
    })

    if (fallback.ok) return NextResponse.json({ ok: true, delivered: 'fallback' })

    console.error('Fallback delivery failed:', await fallback.text())
    return NextResponse.json({
      error: 'We received your application request, but email delivery is temporarily unavailable. Please try again shortly.'
    }, { status: 503 })
  } catch (error) {
    console.error('Card application error:', error)
    return NextResponse.json({ error: 'We could not process the application. Please try again.' }, { status: 400 })
  }
}

function escapeHtml(value: string) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char] || char)
}
