'use client'

import { useMemo, useState } from 'react'

const strains = [
  { name: 'Super Lemon Haze', type: 'Sativa', score: 94, votes: 1842, terps: 'Limonene · Caryophyllene', note: 'Bright citrus · energetic' },
  { name: 'Jelly Donutz', type: 'Hybrid', score: 92, votes: 1618, terps: 'Caryophyllene · Limonene', note: 'Sweet gas · balanced' },
  { name: 'Motor Breath', type: 'Indica', score: 89, votes: 1294, terps: 'Myrcene · Caryophyllene', note: 'Gassy · heavy' },
]

const polls = [
  { q: 'Best cannabis product category right now?', options: ['Flower', 'Pre-Rolls', 'Edibles', 'Concentrates'], votes: [42, 31, 17, 10] },
  { q: 'What matters most when you pick a strain?', options: ['Flavor', 'Effects', 'Terpenes', 'Potency'], votes: [29, 38, 21, 12] },
]

export default function Home() {
  const [selected, setSelected] = useState<Record<string, number>>({})
  const [ageVerified, setAgeVerified] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')
  const [liked, setLiked] = useState<number[]>([])
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => strains.filter(s => s.name.toLowerCase().includes(search.toLowerCase())), [search])

  if (!ageVerified) return (
    <main className="gate">
      <div className="gate-card">
        <div className="leaf-mark">✦</div>
        <p className="eyebrow">CANNA SOCIAL</p>
        <h1>THE PEOPLE’S<br /><span>CANNABIS PLATFORM.</span></h1>
        <p className="muted">A community for strain discovery, public voting, reviews, culture and cannabis education.</p>
        <div className="gate-actions"><button onClick={() => setAgeVerified(true)}>I’m 21+ — Enter</button><span>For adults of legal age only.</span></div>
      </div>
    </main>
  )

  return (
    <main>
      <nav className="nav shell">
        <button className="brand" onClick={() => setActiveNav('Home')}><span>✦</span> CANNA SOCIAL</button>
        <div className="nav-links">{['Home','Strains','Votes','Feed','Learn'].map(item => <button key={item} className={activeNav === item ? 'active' : ''} onClick={() => setActiveNav(item)}>{item}</button>)}</div>
        <button className="profile" onClick={() => setActiveNav('Profile')}>CS</button>
      </nav>

      <section className="hero shell">
        <div>
          <p className="eyebrow">THE PEOPLE’S CANNABIS PLATFORM</p>
          <h1>What’s the<br /><span>best strain?</span></h1>
          <p className="hero-copy">No gatekeepers. No paid rankings. Just the cannabis community deciding what deserves the crown.</p>
          <div className="hero-actions"><button className="primary" onClick={() => document.getElementById('vote')?.scrollIntoView({ behavior: 'smooth' })}>Vote on strains →</button><button className="ghost" onClick={() => setActiveNav('Strains')}>Explore strains</button></div>
        </div>
        <div className="hero-orb"><div className="orb-inner"><span>LIVE</span><strong>#01</strong><small>COMMUNITY RANKED</small></div></div>
      </section>

      <section className="ticker"><div>● LIVE COMMUNITY VOTES</div><div>● STRAIN REVIEWS</div><div>● CANNABIS CULTURE</div><div>● NO PAID RANKINGS</div></section>

      <section className="shell section" id="vote">
        <div className="section-head"><div><p className="eyebrow">COMMUNITY RANKINGS</p><h2>Strain of the Week</h2></div><span className="live-pill">● LIVE</span></div>
        <div className="strain-grid">
          {filtered.map((s, i) => <article className={'strain-card ' + (i === 0 ? 'featured' : '')} key={s.name}>
            <div className="strain-image"><span>{i === 0 ? '01' : `0${i + 1}`}</span><b>{s.type}</b></div>
            <div className="strain-body"><div className="row"><div><p className="tiny">#{i + 1} COMMUNITY RANK</p><h3>{s.name}</h3></div><strong className="score">{s.score}<small>/100</small></strong></div><p className="note">{s.note}</p><p className="terps">{s.terps}</p><div className="vote-bar"><span style={{ width: `${s.score}%` }} /></div><div className="row"><span className="muted small">{s.votes.toLocaleString()} votes</span><button className="vote-btn" onClick={() => setSelected({ ...selected, [s.name]: (selected[s.name] || 0) + 1 })}>{selected[s.name] ? 'Voted ✓' : 'Vote'}</button></div></div>
          </article>)}
        </div>
      </section>

      <section className="shell section two-col">
        <div><div className="section-head"><div><p className="eyebrow">PUBLIC OPINION</p><h2>Canna Votes</h2></div></div>{polls.map((poll, pi) => <article className="poll" key={poll.q}><h3>{poll.q}</h3>{poll.options.map((option, oi) => <button className="poll-option" key={option} onClick={() => setSelected({ ...selected, [`poll-${pi}`]: oi })}><span>{option}</span><span>{poll.votes[oi]}%</span></button>)}</article>)}</div>
        <aside className="feed-panel"><p className="eyebrow">CANNA FEED</p><h2>What the community is saying.</h2><div className="post"><div className="avatar">JP</div><div><b>@jordanpacks</b><p>Jelly Donutz is having a serious week. Flavor is crazy.</p><span>♥ 184 · 26 comments</span></div><button onClick={() => setLiked(liked.includes(1) ? liked.filter(x => x !== 1) : [...liked, 1])}>{liked.includes(1) ? '♥' : '♡'}</button></div><div className="post"><div className="avatar">MC</div><div><b>@marycanna</b><p>What strain are y’all taking into the weekend?</p><span>♥ 91 · 18 comments</span></div><button onClick={() => setLiked(liked.includes(2) ? liked.filter(x => x !== 2) : [...liked, 2])}>{liked.includes(2) ? '♥' : '♡'}</button></div><button className="wide-ghost" onClick={() => setActiveNav('Feed')}>Open Canna Feed →</button></aside>
      </section>

      <section className="learn shell"><div><p className="eyebrow">CANNA SOCIAL MEDIA</p><h2>More than a ranking.<br />Build the cannabis knowledge base.</h2></div><div className="learn-cards"><div><span>01</span><h3>Learn</h3><p>Strain profiles, terpene guides, effects and cannabis education.</p></div><div><span>02</span><h3>Review</h3><p>Share honest community reviews and discover what people actually think.</p></div><div><span>03</span><h3>Connect</h3><p>Follow people, brands and conversations shaping cannabis culture.</p></div></div></section>

      <footer className="footer shell"><div><b>✦ CANNA SOCIAL</b><p>The people’s cannabis platform.</p></div><div className="footer-note">Community content is informational and not medical advice. Cannabis laws vary by location. Adults of legal age only.</div></footer>
    </main>
  )
}