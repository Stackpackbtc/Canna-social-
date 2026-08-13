'use client'

import { useState } from 'react'

const strains = [
  ['Super Lemon Haze','Sativa','94','1,842','Limonene · Caryophyllene','Bright citrus, energetic, community favorite'],
  ['Jelly Donutz','Hybrid','92','1,618','Caryophyllene · Limonene','Sweet, gassy, balanced'],
  ['Motor Breath','Indica','89','1,294','Myrcene · Caryophyllene','Gassy, heavy, night-time favorite'],
  ['Blue Dream','Hybrid','88','1,101','Myrcene · Pinene','Berry, floral, classic'],
  ['Permanent Marker','Hybrid','87','982','Limonene · Caryophyllene','Sharp, sweet, funky'],
  ['Gelato 41','Hybrid','86','844','Caryophyllene · Limonene','Creamy, dessert-like, potent'],
]

export default function StrainsPage(){
 const [q,setQ]=useState('')
 const [filter,setFilter]=useState('All')
 const [voted,setVoted]=useState<string[]>([])
 const visible=strains.filter(s=>(filter==='All'||s[1]===filter)&&s[0].toLowerCase().includes(q.toLowerCase()))
 return <main>
  <nav className="nav shell"><a className="brand" href="/">✦ CANNA SOCIAL</a><div className="nav-links"><a href="/">Home</a><a className="active" href="/strains">Strains</a><a href="/#vote">Votes</a><a href="/">Feed</a><a href="/">Learn</a></div><button className="profile">CS</button></nav>
  <section className="shell section">
   <p className="eyebrow">THE COMMUNITY DATABASE</p><h1 className="page-title">Find your<br/><span>next favorite.</span></h1>
   <p className="hero-copy">Explore community-ranked strains, terpene profiles and real public opinion. Rankings are built from community votes.</p>
   <div className="search-row"><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search strains..."/><div className="filters">{['All','Sativa','Hybrid','Indica'].map(x=><button className={filter===x?'selected':''} key={x} onClick={()=>setFilter(x)}>{x}</button>)}</div></div>
   <div className="strain-grid directory">{visible.map((s,i)=><article className="strain-card" key={s[0]}><div className="strain-image"><span>0{i+1}</span><b>{s[1]}</b></div><div className="strain-body"><div className="row"><div><p className="tiny">COMMUNITY RANK #{i+1}</p><h3>{s[0]}</h3></div><strong className="score">{s[2]}<small>/100</small></strong></div><p className="note">{s[5]}</p><p className="terps">{s[4]}</p><div className="vote-bar"><span style={{width:`${s[2]}%`}}/></div><div className="row"><span className="muted small">{s[3]} votes</span><button className="vote-btn" onClick={()=>setVoted(v=>v.includes(s[0])?v.filter(x=>x!==s[0]):[...v,s[0]])}>{voted.includes(s[0])?'Voted ✓':'Vote'}</button></div></div></article>)}</div>
   {visible.length===0&&<div className="empty">No strains found. Try another search.</div>}
  </section>
 </main>
}