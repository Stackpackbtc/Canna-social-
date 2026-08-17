import { NextResponse } from 'next/server'

const DESTINATION = 'Stackpackmedia@gmail.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const screenName = String(body?.screenName || '').trim().slice(0, 24)
    const email = String(body?.email || '').trim().toLowerCase().slice(0, 254)
    const strain = String(body?.strain || '').trim().slice(0, 100)
    const vote = String(body?.vote || '').trim().toUpperCase()
    const ageConfirmed = body?.ageConfirmed === true

    if (!screenName || !email || !strain || !['GAS', 'PASS'].includes(vote) || !ageConfirmed) {
      return NextResponse.json({ ok: false, error: 'Missing required voter information.' }, { status: 400 })
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!emailValid) return NextResponse.json({ ok: false, error: 'Please enter a valid email.' }, { status: 400 })

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      // Voting remains functional even before email delivery is configured.
      console.error('RESEND_API_KEY is not configured; voter submission email was not sent.')
      return NextResponse.json({ ok: true, delivered: false })
    }

    const from = process.env.VOTES_FROM_EMAIL || 'Canna Social <onboarding@resend.dev>'
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    const subject = `Canna Social Vote — ${vote} — ${strain}`
    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
        <h2>Canna Social — New Voter Submission</h2>
        <p><strong>Screen name:</strong> ${escapeHtml(screenName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Vote:</strong> ${escapeHtml(vote)}</p>
        <p><strong>Strain:</strong> ${escapeHtml(strain)}</p>
        <p><strong>Age confirmation:</strong> 21+ confirmed by voter</p>
        <p><strong>Submitted:</strong> ${escapeHtml(timestamp)} ET</p>
      </div>
    `

    const resend = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [DESTINATION], reply_to: email, subject, html }),
    })

    if (!resend.ok) {
      const detail = await resend.text()
      console.error('Resend voter email failed:', detail)
      return NextResponse.json({ ok: true, delivered: false })
    }

    return NextResponse.json({ ok: true, delivered: true })
  } catch (error) {
    console.error('Voter submission error:', error)
    return NextResponse.json({ ok: true, delivered: false })
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char] || char)
}
