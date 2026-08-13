import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL||'https://jwxhidzextctbwitvred.supabase.co',process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY||'sb_publishable_O48SK14bv1ywkTikPhvKfw_Gr3-bMaz')
export async function POST(req:Request){
 try{
  const body=await req.json()
  const required=['brand','contact','email','category','goal','message']
  for(const key of required) if(!body[key]?.trim()) return NextResponse.json({error:`Missing ${key}`},{status:400})
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) return NextResponse.json({error:'Please enter a valid email.'},{status:400})
  const {error:dbError}=await supabase.from('brand_partner_inquiries').insert({brand_name:body.brand.trim(),contact_name:body.contact.trim(),email:body.email.trim().toLowerCase(),website:body.website?.trim()||null,category:body.category,goal:body.goal,budget:body.budget?.trim()||null,message:body.message.trim()})
  if(dbError) return NextResponse.json({error:'Could not save your inquiry.'},{status:500})
  const key=process.env.RESEND_API_KEY
  if(key){
   const html=`<h2>Canna Social Brand Collaboration Inquiry</h2><p><b>Brand:</b> ${escapeHtml(body.brand)}</p><p><b>Contact:</b> ${escapeHtml(body.contact)}</p><p><b>Email:</b> ${escapeHtml(body.email)}</p><p><b>Website / Instagram:</b> ${escapeHtml(body.website||'Not provided')}</p><p><b>Category:</b> ${escapeHtml(body.category)}</p><p><b>Interested in:</b> ${escapeHtml(body.goal)}</p><p><b>Budget:</b> ${escapeHtml(body.budget||'Not provided')}</p><p><b>Message:</b><br/>${escapeHtml(body.message).replace(/\n/g,'<br/>')}</p>`
   await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.CANNA_SOCIAL_FROM_EMAIL||'Canna Social <onboarding@resend.dev>',to:['tyrelle@commavecanna.com'],reply_to:body.email,subject:`Canna Social Brand Collab — ${body.brand}`,html})})
  }
  return NextResponse.json({ok:true})
 }catch{return NextResponse.json({error:'Invalid request.'},{status:400})}
}
function escapeHtml(s:string){return s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!))}