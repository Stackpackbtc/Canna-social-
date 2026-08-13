'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Review={id:string;display_name:string;email:string;rating:number;review:string;created_at:string}

export default function AdminReviews(){
 const [email,setEmail]=useState(''),[logged,setLogged]=useState(false),[sent,setSent]=useState(false),[reviews,setReviews]=useState<Review[]>([]),[error,setError]=useState('')
 const load=async()=>{const {data}=await supabase.from('canna_social_reviews').select('id,display_name,email,rating,review,created_at').order('created_at',{ascending:false});setReviews((data as Review[])||[])}
 useEffect(()=>{supabase.auth.getUser().then(({data})=>{if(data.user?.email==='stackpackmedia@gmail.com'){setLogged(true);load()}})},[])
 const login=async()=>{setError('');const {error}=await supabase.auth.signInWithOtp({email:email.trim().toLowerCase(),options:{emailRedirectTo:typeof window!=='undefined'?`${window.location.origin}/admin/reviews`:undefined}});if(error)setError(error.message);else setSent(true)}
 const remove=async(id:string)=>{if(!confirm('Delete this review?'))return;const {error}=await supabase.from('canna_social_reviews').delete().eq('id',id);if(error)setError(error.message);else setReviews(r=>r.filter(x=>x.id!==id))}
 if(!logged)return <main className="admin-page"><div className="admin-card"><p className="eyebrow">CANNA SOCIAL ADMIN</p><h1>Review control.</h1><p>Sign in with the owner email to manage community reviews.</p><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Admin email"/><button className="primary" onClick={login}>Email me a secure sign-in link →</button>{sent&&<p className="admin-note">Check your email and open the secure sign-in link.</p>}{error&&<p className="admin-error">{error}</p>}</div></main>
 return <main className="admin-page"><div className="admin-shell"><div className="admin-head"><div><p className="eyebrow">CANNA SOCIAL ADMIN</p><h1>Community reviews</h1><p>Delete anything you don't want displayed publicly.</p></div><button className="ghost" onClick={()=>supabase.auth.signOut().then(()=>setLogged(false))}>Sign out</button></div><div className="admin-list">{reviews.map(r=><article className="admin-review" key={r.id}><div><div className="admin-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div><b>{r.display_name}</b><small>{r.email} · {new Date(r.created_at).toLocaleString()}</small><p>{r.review}</p></div><button className="delete-review" onClick={()=>remove(r.id)}>Delete</button></article>)}{!reviews.length&&<p>No community reviews yet.</p>}</div>{error&&<p className="admin-error">{error}</p>}</div></main>
}
