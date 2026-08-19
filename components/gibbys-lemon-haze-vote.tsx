'use client'

import { useState } from 'react'

export default function GibbysLemonHazeVote(){
 const [voted,setVoted]=useState<'GAS'|'PASS'|null>(null)
 const [gate,setGate]=useState(false)
 const [pending,setPending]=useState<'GAS'|'PASS'|null>(null)
 const [name,setName]=useState('')
 const [age,setAge]=useState(false)
 const [gas,setGas]=useState(50)
 const vote=(type:'GAS'|'PASS')=>{if(voted)return;if(!age||!name.trim()){setPending(type);setGate(true);return}setVoted(type);if(type==='GAS')setGas(v=>Math.min(99,v+1))}
 const confirm=()=>{if(!pending||!age||!name.trim())return;const type=pending;setGate(false);setPending(null);setVoted(type);if(type==='GAS')setGas(v=>Math.min(99,v+1))}
 return <section className="gibbys-live-vote-shell" aria-label="Gibby's Lemon Haze OG live vote"><div className="gibbys-live-vote-card"><div className="gibbys-live-badge">● LIVE · FEATURED DROP</div><div className="gibbys-live-art"><img src="/gibbys-lemon-haze-og.svg" alt="Gibby's Craft Cannabis Lemon Haze OG" loading="lazy"/><span>✦ CANNA SOCIAL</span></div><div className="gibbys-live-info"><div className="gibbys-brand">GIBBY'S CRAFT CANNABIS</div><h2>LEMON HAZE OG</h2><p>Featured community vote · Canna World Reviews</p><div className="gibbys-signal"><span style={{width:`${gas}%`}}/><b>{gas}% GAS</b></div><div className="gibbys-actions"><button type="button" disabled={!!voted} onClick={()=>vote('GAS')}>🔥 GAS <b>{gas}%</b></button><button type="button" disabled={!!voted} onClick={()=>vote('PASS')}>✕ PASS <b>{100-gas}%</b></button></div>{voted&&<div className="gibbys-counted">✓ YOUR {voted} VOTE IS COUNTED</div>}</div></div>{gate&&!voted&&<div className="gibbys-gate"><div className="gibbys-gate-card"><b>VOTER ACCESS</b><h3>Confirm before you vote.</h3><input autoFocus value={name} maxLength={24} onChange={e=>setName(e.target.value.replace(/[<>]/g,''))} placeholder="Enter a screen name"/><label><input type="checkbox" checked={age} onChange={e=>setAge(e.target.checked)}/> I confirm that I am 21 or older.</label><button type="button" disabled={!name.trim()||!age} onClick={confirm}>CONFIRM 21+ &amp; VOTE →</button></div></div>}</section>
}
