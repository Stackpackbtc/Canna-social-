'use client'

import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Review = { id:string; display_name:string; rating:number; review:string; created_at:string }

export default function CommunityReviews(){
  const [reviews,setReviews]=useState<Review[]>([]),[open,setOpen]=useState(false),[name,setName]=useState(''),[email,setEmail]=useState(''),[rating,setRating]=useState(5),[text,setText]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('')
  const load=async()=>{const {data}=await supabase.from('canna_social_public_reviews').select('id,display_name,rating,review,created_at').order('created_at',{ascending:false}).limit(12);setReviews((data as Review[])||[])}
  useEffect(()=>{load()},[])
  const submit=async(e:FormEvent)=>{e.preventDefault();setBusy(true);setMessage('');const {error}=await supabase.from('canna_social_reviews').insert({display_name:name.trim(),email:email.trim().toLowerCase(),rating,review:text.trim()});if(error){setMessage(error.message)}else{setName('');setEmail('');setRating(5);setText('');setMessage('Review posted — thank you for helping shape Canna Social.');setOpen(false);await load()}setBusy(false)}
  return <section className="community-reviews" aria-label="Canna Social community reviews">
    <div className="community-reviews-head"><div><p className="eyebrow">THE COMMUNITY</p><h2>What people think.</h2><p className="community-sub">Real feedback from the people using Canna Social.</p></div><button className="review-write" onClick={()=>setOpen(true)}>★ Leave a review</button></div>
    <div className="community-summary"><strong>{reviews.length ? (reviews.reduce((a,r)=>a+r.rating,0)/reviews.length).toFixed(1) : '5.0'}</strong><span>★★★★★</span><small>{reviews.length} community reviews</small></div>
    <div className="community-list">{reviews.slice(0,4).map(r=><article key={r.id} className="community-review"><div className="review-stars">{'★'.repeat(r.rating)}<span>{'★'.repeat(5-r.rating)}</span></div><div className="community-review-row"><b>{r.display_name}</b><time>{new Date(r.created_at).toLocaleDateString()}</time></div><p>{r.review}</p></article>)}</div>
    {message&&<p className="community-message">{message}</p>}
    {open&&<div className="review-modal-backdrop" onClick={()=>setOpen(false)}><div className="review-modal" onClick={e=>e.stopPropagation()}><button className="review-close" onClick={()=>setOpen(false)}>×</button><p className="eyebrow">COMMUNITY REVIEW</p><h3>Tell us what you think.</h3><p className="muted">Your email is required to submit a review and is never displayed publicly.</p><form onSubmit={submit}><input required maxLength={80} value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Your email"/><div className="star-picker" aria-label="Rating">{[1,2,3,4,5].map(n=><button type="button" key={n} className={n<=rating?'picked':''} onClick={()=>setRating(n)}>★</button>)}</div><textarea required minLength={5} maxLength={1000} value={text} onChange={e=>setText(e.target.value)} placeholder="What do you think about Canna Social?" rows={5}/><button className="primary wide" disabled={busy}>{busy?'Posting…':'Post my review →'}</button></form></div></div>}
  </section>
}
