import { NextResponse } from 'next/server'

export async function POST(req:Request){
 try{
  const body=await req.json()
  const required=['brand','contact','email','category','goal','message']
  for(const key of required) if(!body[key]?.trim()) return NextResponse.json({error:`Missing ${key}`},{status:400})
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return NextResponse.json({error:'Please enter a valid email.'},{status:400})
  const key=process.env.RESEND_API_KEY
  if(!key) return NextResponse.json({error:'Email service is not configured yet.'},{status:503})
  const html=`<h2>Canna Social Brand Collaboration Inquiry</h2><p><b>Brand:</b> ${escapeHtml(body.brand)}</p><p><b>Contact:</b> ${escapeHtml(body.contact)}</p><p><b>Email:</b> ${escapeHtml(body.email)}</p><p><b>Website / Instagram:</b> ${escapeHtml(body.website||'Not provided')}</p><p><b>Category:</b> ${escapeHtml(body.category)}</p><p><b>Interested in:</b> ${escapeHtml(body.goal)}</p><p><b>Budget:</b> ${escapeHtml(body.budget||'Not provided')}</p><p><b>Message:</b><br/>${escapeHtml(body.message).replace(/\n/g,'<br/>')}</p>`
  const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.CANNA_SOCIAL_FROM_EMAIL||'Canna Social <onboarding@resend.dev>',to:['tyrelle@commavecanna.com'],reply_to:body.email,subject:`Canna Social Brand Collab — ${body.brand}`,html})})
  if(!r.ok)return NextResponse.json({error:'Could not send inquiry.'},{status:502})
  return NextResponse.json({ok:true})
 }catch{return NextResponse.json({error:'Invalid request.'},{status:400})}
}
function escapeHtml(s:string){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))}