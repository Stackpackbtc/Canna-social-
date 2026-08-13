import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, age, favorite, strain, role, why } = body

    if (!name || !email || Number(age) < 21 || !favorite) {
      return NextResponse.json({ error: 'Please complete the required 21+ application fields.' }, { status: 400 })
    }

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) {
      return NextResponse.json({
        error: 'Email delivery is not configured yet. Add RESEND_API_KEY in Vercel to activate applications.'
      }, { status: 503 })
    }

    const html = `
      <div style="font-family:Arial,sans-serif;background:#090909;color:#fff;padding:32px">
        <h1 style="margin:0 0 8px">✦ CANNA SOCIAL CARD APPLICATION</h1>
        <p style="color:#aaa">New community membership application.</p>
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

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: process.env.CANNA_SOCIAL_FROM_EMAIL || 'Canna Social <onboarding@resend.dev>',
        to: ['stackpackmedia@gmail.com'],
        reply_to: email,
        subject: `Canna Social Card Application — ${name}`,
        html,
      }),
    })

    if (!response.ok) {
      const detail = await response.text()
      console.error('Resend error:', detail)
      return NextResponse.json({ error: 'Application could not be delivered. Please try again.' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'Invalid application request.' }, { status: 400 })
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char] || char)
}