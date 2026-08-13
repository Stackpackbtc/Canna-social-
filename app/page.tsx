'use client'

import { useState } from 'react'

const categories = ['Strains','Flower','Pre-Rolls','Edibles','Concentrates','Brands','Dispensaries','Growers']
const strains = [
  { name: 'Pink Runtz', brand: "Gibby’s Craft Cannabis", type: 'Hybrid', score: 92, votes: 1284, tag: 'Canna World Review', tone: 'pink', note: 'Sweet candy profile · fruity aroma · balanced hybrid' },
  { name: 'Root Beer Gummies', brand: 'Buzzy', type: 'Edible', score: 90, votes: 977, tag: 'Canna World Review', tone: 'gold', note: 'Root beer flavor · 5mg THC per serving' },
  { name: 'Pink Runtz', brand: 'SPARQ Cannabis Co.', type: 'Hybrid', score: 91, votes: 1108, tag: 'Canna World Review', tone: 'magenta', note: 'Sweet candy · fruity aroma · smooth smoke' },
  { name: 'Super Lemon Haze', brand: 'Gibby’s', type: 'Sativa', score: 94, votes: 1842, tag: 'Strain Review', tone: 'lime', note: 'Bright citrus · terp-forward · energetic profile' },
]

const polls: Record<string, { title: string; options: string[] }> = {
  Strains: { title: 'Which strain deserves the crown?', options: ['Pink Runtz','Super Lemon Haze','Jelly Donutz','Motor Breath'] },
  Flower: { title: 'Who has the best flower right now?', options: ['Small Batch','Craft Growers','Local Brands','Big Names'] },
  'Pre-Rolls': { title: 'Best pre-roll experience?', options: ['Infused','Full Flower','Hand Rolled','Mini Pre-Rolls'] },
  Edibles: { title: 'Best edible format?', options: ['Gummies','Chocolate','Drinks','Baked'] },
  Concentrates: { title: 'What makes a great concentrate?', options: ['Flavor','Texture','Potency','Clean Finish'] },
  Brands: { title: 'What should a cannabis brand be known for?', options: ['Quality','Consistency','Innovation','Community'] },
  Dispensaries: { title: 'What matters most at a dispensary?', options: ['Selection','Staff','Price','Experience'] },
  Growers: { title: 'What makes a grower stand out?', options: ['Craft','Genetics','Consistency','Sustainability'] },
}

export default function Home() {
  const [ageVerified, setAgeVerified] = useState(false)
  const [category, setCategory] = useState('Strains')
  const [votes, setVotes] = useState<Record<string, string>>({})
  const [showCard, setShowCard] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', age: '', favorite: '', strain: '', role: '', why: '', agree: false })

  const vote = (option: string) => setVotes(v => ({ ...v, [category]: option }))
  const update = (key: string, value: string | boolean) => setForm(f => ({ ...f, [key]: value }))

  if (!ageVerified) return <main className="gate"><div className="gate-card"><div className="leaf-mark">✦</div><p className="eyebrow">CANNA SOCIAL</p><h1>THE PEOPLE’S<br /><span>CANNABIS PLATFORM.</span></h1><p className="muted">Reviews. Rankings. Public votes. Cannabis culture. Built around the community.</p><div className="gate-actions"><button onClick={() => setAgeVerified(true)}>I’m 21+ — Enter Canna Social</button><span>Adults of legal age only. Information is not medical advice.</span></div></div></main>

  return <main>
    <nav className="nav shell"><button className="brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><span>✦</span> CANNA SOCIAL</button><div className="nav-links">{['Home','Reviews','Votes','Community','Learn'].map(x => <a key={x} href={x === 'Home' ? '#' : `#${x.toLowerCase()}`}>{x}</a>)}</div><button className="profile" onClick={() => setShowCard(true)}>CS</button></nav>

    <section className="hero shell"><div><p className="eyebrow">CANNA SOCIAL × CANNA WORLD REVIEWS</p><h1>The community<br /><span>decides.</span></h1><p className="hero-copy">We review the flower, pre-rolls, edibles and brands people are actually talking about — then put the power in the public’s hands.</p><div className="hero-actions"><button className="primary" onClick={() => document.getElementById('votes')?.scrollIntoView({ behavior: 'smooth' })}>Cast a vote →</button><button className="ghost" onClick={() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' })}>See our reviews</button></div></div><div className="hero-orb"><div className="orb-inner"><span>LIVE RANKING</span><strong>#01</strong><small>PUBLICLY VOTED</small></div></div></section>

    <section className="ticker"><div>● REAL REVIEWS</div><div>● PUBLIC VOTING</div><div>● CANNA CULTURE</div><div>● COMMUNITY POWERED</div><div>● 21+ ONLY</div></section>

    <section className="shell section" id="reviews"><div className="section-head"><div><p className="eyebrow">CANNABIS REVIEW ARCHIVE</p><h2>Our Reviews</h2></div><span className="live-pill">CANNA WORLD REVIEWS</span></div><p className="section-intro">You’ve seen the reviews. Now put them on the public scoreboard.</p><div className="review-grid">{strains.map((s, i) => <article className={`review-card ${s.tone}`} key={`${s.brand}-${i}`}><div className="review-art"><span className="art-label">{s.tag}</span><strong>{s.name}</strong><small>{s.brand}</small><div className="art-glow" /></div><div className="review-body"><div className="row"><div><p className="tiny">{s.type} · COMMUNITY REVIEW</p><h3>{s.brand}</h3></div><strong className="score">{s.score}<small>/10</small></strong></div><p className="note">{s.note}</p><div className="review-meta"><span>★ ★ ★ ★ ★</span><span>{s.votes.toLocaleString()} public votes</span></div><button className="card-link" onClick={() => document.getElementById('votes')?.scrollIntoView({ behavior: 'smooth' })}>Vote on this review →</button></div></article>)}</div></section>

    <section className="vote-zone" id="votes"><div className="shell"><div className="section-head"><div><p className="eyebrow">PUBLIC OPINION</p><h2>Canna Votes</h2></div><span className="live-pill">● LIVE</span></div><div className="category-tabs">{categories.map(c => <button key={c} className={category === c ? 'selected' : ''} onClick={() => setCategory(c)}>{c}</button>)}</div><div className="vote-layout"><div className="poll"><p className="tiny">CATEGORY · {category.toUpperCase()}</p><h3>{polls[category].title}</h3>{polls[category].options.map((o, i) => <button className={`poll-option ${votes[category] === o ? 'chosen' : ''}`} key={o} onClick={() => vote(o)}><span><b>{String.fromCharCode(65 + i)}</b>{o}</span><span>{votes[category] === o ? '✓ VOTED' : 'VOTE'}</span></button>)}<p className="poll-foot">Your vote helps shape the community ranking. One vote per category per community member.</p></div><div className="leaderboard"><p className="eyebrow">CURRENT SIGNAL</p><h3>{category} is community driven.</h3><div className="bars">{polls[category].options.map((o, i) => <div key={o}><div className="bar-label"><span>{o}</span><span>{[42,28,19,11][i]}%</span></div><div className="bar"><span style={{ width: `${[42,28,19,11][i]}%` }} /></div></div>)}</div></div></div></div></section>

    <section className="shell section card-banner" id="community"><div><p className="eyebrow">JOIN THE INNER CIRCLE</p><h2>Get your<br /><span>Canna Social Card.</span></h2><p>Fill out the intake. Tell us what you’re into. Leave your email. We’ll use it to send your card details and eligible community perks, including offers from participating partners such as Comm Ave Canna.</p><button className="primary" onClick={() => { setSubmitted(false); setShowCard(true) }}>Apply for your card →</button></div><div className="social-card"><div><span>CANNA SOCIAL</span><b>CS</b></div><strong>COMMUNITY<br />MEMBER</strong><small>YOUR VOICE. YOUR VOTE. YOUR CULTURE.</small></div></section>

    <section className="learn shell" id="learn"><div><p className="eyebrow">CANNA SOCIAL MEDIA</p><h2>Not just a feed.<br />A cannabis knowledge base.</h2></div><div className="learn-cards"><div><span>01</span><h3>Review</h3><p>Real-world product and strain reviews from Canna World Reviews.</p></div><div><span>02</span><h3>Vote</h3><p>Publicly rank categories, brands, products and strains.</p></div><div><span>03</span><h3>Connect</h3><p>Meet the people, growers, reviewers and brands shaping the culture.</p></div></div></section>

    <footer className="footer shell"><div><b>✦ CANNA SOCIAL</b><p>The people’s cannabis platform.</p></div><div className="footer-note">Community content is informational and not medical advice. Cannabis laws and age requirements vary by location. Adults of legal age only.</div></footer>

    {showCard && <div className="modal-backdrop" onClick={() => setShowCard(false)}><div className="modal" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setShowCard(false)}>×</button>{submitted ? <div className="success"><span>✓</span><h2>Application received.</h2><p>We’ve got your answers. Canna Social can use your email to send card details and eligible partner perks.</p><button className="primary" onClick={() => setShowCard(false)}>Back to Canna Social</button></div> : <><p className="eyebrow">CANNA SOCIAL CARD INTAKE</p><h2>Apply for membership.</h2><p className="muted">A short community intake — not a purchase form.</p><form onSubmit={e => { e.preventDefault(); if (form.agree) setSubmitted(true) }}><div className="form-grid"><label>Full name<input required value={form.name} onChange={e => update('name', e.target.value)} placeholder="Your name" /></label><label>Email<input required type="email" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@email.com" /></label><label>Age<input required type="number" min="21" value={form.age} onChange={e => update('age', e.target.value)} placeholder="21+" /></label><label>Favorite category<select required value={form.favorite} onChange={e => update('favorite', e.target.value)}><option value="">Choose one</option>{categories.map(c => <option key={c}>{c}</option>)}</select></label><label>Favorite strain / product<input value={form.strain} onChange={e => update('strain', e.target.value)} placeholder="Tell us your pick" /></label><label>Community role<select value={form.role} onChange={e => update('role', e.target.value)}><option value="">Choose one</option><option>Reviewer</option><option>Consumer</option><option>Grower</option><option>Brand</option><option>Industry / Media</option></select></label></div><label>What do you want Canna Social to become?<textarea rows={3} value={form.why} onChange={e => update('why', e.target.value)} placeholder="Your answer..." /></label><label className="check"><input type="checkbox" required checked={form.agree} onChange={e => update('agree', e.target.checked)} /> I confirm I am 21+ and agree to receive Canna Social membership information and eligible partner offers by email.</label><button className="primary wide" type="submit">Submit Canna Social Card Application →</button></form></>}</div></div>}
  </main>
}