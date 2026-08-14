'use client'
import {useState} from 'react'
export default function AgeGate(){const [open,setOpen]=useState(true);if(!open)return null;return <div className="age-gate" role="dialog" aria-modal="true"><div className="age-gate-card"><div className="age-star">✦</div><p className="eyebrow">CANNA SOCIAL</p><h2>21+ COMMUNITY</h2><p>You must be 21 or older to enter Canna Social. Please confirm your age to continue.</p><button onClick={()=>setOpen(false)}>I'M 21+ — ENTER</button><small>By entering, you confirm you are of legal age in your location.</small></div></div>}
