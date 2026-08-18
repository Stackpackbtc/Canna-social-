'use client'

import { useEffect, useState } from 'react'

export default function AgeGate(){
  const [mode,setMode]=useState<'gate'|'loading'|'done'>('gate')
  const [progress,setProgress]=useState(0)
  const [message,setMessage]=useState('WELCOME TO CANNA SOCIAL')

  useEffect(()=>{
    if(mode!=='loading') return
    const messages=['WELCOME TO CANNA SOCIAL','PREPARING LIVE VOTES','PREPARING STRAIN LIBRARY','ENTERING CANNA SOCIAL']
    const started=Date.now()
    const duration=850
    const timer=window.setInterval(()=>{
      const pct=Math.min(100,Math.round(((Date.now()-started)/duration)*100))
      setProgress(pct)
      setMessage(messages[Math.min(messages.length-1,Math.floor(pct/26))])
      if(pct>=100){window.clearInterval(timer);window.setTimeout(()=>setMode('done'),80)}
    },40)
    return()=>window.clearInterval(timer)
  },[mode])

  if(mode==='done') return null

  return <div className={`entry-screen ${mode}`} role="dialog" aria-modal="true">
    {mode==='gate' ? <div className="entry-card">
      <div className="entry-orbit"><span>✦</span></div>
      <div className="entry-brand">CANNA <b>SOCIAL</b></div>
      <div className="entry-line">ONE PLANT. ONE COMMUNITY. ONE CULTURE.</div>
      <div className="entry-age">21+</div>
      <h2>WELCOME TO THE COMMUNITY</h2>
      <p>You must be 21 or older to enter Canna Social.</p>
      <button onClick={()=>setMode('loading')}>I'M 21+ — ENTER</button>
      <small>By entering, you confirm you are of legal age in your location.</small>
    </div> : <div className="loading-cinematic">
      <div className="loading-stars"><i/><i/><i/><i/><i/></div>
      <div className="loading-logo"><span>✦</span><strong>CANNA <em>SOCIAL</em></strong></div>
      <div className="loading-copy">{message}</div>
      <div className="loading-sub">THE PEOPLE'S CANNABIS PLATFORM</div>
      <div className="loading-bar"><span style={{width:`${progress}%`}}/></div>
      <div className="loading-percent">{progress}%</div>
      <div className="loading-tags"><span>STRAINS</span><span>VOTES</span><span>REVIEWS</span><span>COMMUNITY</span></div>
    </div>}
  </div>
}