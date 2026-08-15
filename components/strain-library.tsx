'use client'

import { useMemo, useState } from 'react'

const strainImages = [
  'https://commons.wikimedia.org/wiki/Special:FilePath/Cannabis%20Colors%20Macro.jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Cannabis%20macro.JPG',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Macro%20cannabis%20bud.jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Cannabis%20Closeup%2001.jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Cannabis%20Closeup%2002.jpg',
]

const strains = [
  ['Doob Cube · No.9 Collection', 'Collection', '—', 'NEW', '0', 'Variety of flavors · Multiple options · Community pick', '/doob-cube-collection.svg'],
  ['Purple Runtz', 'Hybrid', '24%', '9.4', '2.4K', 'Sweet berry · Candy · Vanilla'],
  ['Gelato 41', 'Hybrid', '25%', '9.2', '2.1K', 'Creamy · Sweet · Citrus'],
  ['Zkittlez', 'Indica', '22%', '9.0', '1.8K', 'Fruity · Tropical · Sweet'],
  ['MAC 1', 'Hybrid', '24%', '9.1', '1.6K', 'Citrus · Pine · Earthy'],
  ['LA Kush Cake', 'Indica', '23%', '8.9', '1.4K', 'Vanilla · Gas · Cream'],
  ['GMO Cookies', 'Indica', '28%', '9.3', '1.3K', 'Garlic · Diesel · Earthy'],
  ['Pink Runtz', 'Hybrid', '24%', '9.2', '1.2K', 'Candy · Fruit · Floral'],
  ['Blue Dream', 'Sativa', '21%', '8.8', '1.1K', 'Berry · Herbal · Sweet'],
  ['Jelly Donutz', 'Hybrid', '24%', '9.0', '986', 'Candy · Gas · Fruit'],
  ['Super Lemon Haze', 'Sativa', '23%', '8.7', '912', 'Lemon · Citrus · Sweet'],
  ['Wedding Cake', 'Indica', '24%', '8.9', '821', 'Vanilla · Pepper · Sweet'],
  ['OG Kush', 'Hybrid', '22%', '8.6', '712', 'Diesel · Pine · Citrus'],
]

const descriptions: Record<string, string> = {
  'Doob Cube · No.9 Collection': 'A No.9 Collection cannabis experience featuring a variety of flavor options. Explore the collection and cast your public vote to help the community rank it.',
  'Purple Runtz': 'A hybrid profile known for sweet berry, candy and vanilla-style flavor notes. Community favorite with a strong 9.4 rating.',
  'Gelato 41': 'A dessert-forward hybrid profile with creamy, sweet and citrus notes and a 9.2 community score.',
  'Zkittlez': 'A fruit-forward profile with tropical and sweet notes. Listed as an indica profile in the Canna Social library.',
  'MAC 1': 'A hybrid profile with citrus, pine and earthy notes and a 9.1 community score.',
  'LA Kush Cake': 'A rich profile featuring vanilla, gas and cream notes. Listed as an indica profile.',
  'GMO Cookies': 'A bold profile with garlic, diesel and earthy notes and a 9.3 community score.',
  'Pink Runtz': 'A colorful hybrid profile with candy, fruit and floral notes.',
  'Blue Dream': 'A sativa profile with berry, herbal and sweet notes.',
  'Jelly Donutz': 'A hybrid profile with candy, gas and fruit notes.',
  'Super Lemon Haze': 'A bright sativa profile featuring lemon, citrus and sweet notes.',
  'Wedding Cake': 'A dessert-style indica profile with vanilla, pepper and sweet notes.',
  'OG Kush': 'A classic hybrid profile with diesel, pine and citrus notes.',
}

const types = ['All', 'Sativa', 'Indica', 'Hybrid', 'Collection']
const sorts = ['Top Rated', 'Most Voted', 'A–Z']

export default function StrainLibrary() {
  const [query, setQuery] = useState('')
  const [type, setType] = useState('All')
  const [sort, setSort] = useState('Top Rated')
  const [voted, setVoted] = useState<string | null>(null)
  const [selected, setSelected] = useState<(typeof strains)[number] | null>(null)

  const filtered = useMemo(() => {
    const result = strains.filter((strain) => {
      const matchesType = type === 'All' || strain[1] === type
      const matchesQuery = strain.join(' ').toLowerCase().includes(query.toLowerCase())
      return matchesType && matchesQuery
    })
    return [...result].sort((a, b) => {
      if (sort === 'A–Z') return a[0].localeCompare(b[0])
      if (sort === 'Most Voted') return Number.parseFloat(b[4].replace('K', '')) - Number.parseFloat(a[4].replace('K', ''))
      if (a[1] === 'Collection') return -1
      if (b[1] === 'Collection') return 1
      return Number.parseFloat(b[3]) - Number.parseFloat(a[3])
    })
  }, [query, type, sort])

  const vote = (name: string) => setVoted(name)
  const getImage = (strain: (typeof strains)[number], index: number) => strain[6] || strainImages[(index - 1 + strainImages.length) % strainImages.length]

  return (
    <section className="strain-library" id="strain-library">
      <aside className="strain-sidebar">
        <div className="side-brand"><div className="side-logo">✦</div><b>CANNA<br /><span>SOCIAL</span></b><p>ONE PLANT.<br />MILLIONS OF VOICES.</p><strong>VOTE. RATE. BE HEARD.</strong></div>
        <nav><a className="selected">✧ Strain Library</a><a>☆ Top Rated</a><a>◉ New Strains</a><a>♧ Indica</a><a>♧ Sativa</a><a>◈ Hybrid</a><a>▣ Collections</a><a>☆ Reviews</a><a>＋ Submit Strain</a></nav>
        <div className="side-stats"><b>100+<small>Strains & growing</small></b><b>2.4M+<small>Votes cast</small></b><b>45K+<small>Community reviews</small></b></div>
      </aside>

      <div className="strain-main">
        <div className="library-brand-lockup" aria-label="Canna Social Strain Library"><div className="library-brand-mark" aria-hidden="true" /><div className="library-brand-copy"><b>CANNA SOCIAL</b><strong>STRAIN LIBRARY</strong><span>Community discovery · Public voting · Real opinions</span></div></div>
        <div className="strain-library-head"><div><p className="eyebrow">✦ CANNA SOCIAL · DISCOVERY</p><h2>STRAIN <span>LIBRARY</span></h2><p className="library-subtitle">Explore strains, collections and profiles. See what the community is voting for.</p></div><div className="library-count"><strong>100+</strong><span>STRAINS<br />& GROWING</span></div></div>

        <div className="featured-strain"><div className="featured-image"><img src="/doob-cube-collection.svg" alt="Doob Cube by No.9 Collection" /><span className="featured-badge">★ NEW · PUBLIC VOTE</span></div><div className="featured-copy"><p className="tiny">FEATURED COLLECTION · NO.9 COLLECTION</p><h3>Doob Cube</h3><div className="featured-score"><strong>VOTE</strong><span>PUBLIC<br /><small>Community pick</small></span></div><p>A No.9 Collection experience featuring a variety of flavors and options for the community to discover and vote on.</p><div className="featured-tags"><span>COLLECTION</span><span>NO.9</span><span>VARIETY</span><span>PUBLIC VOTE</span></div><button className="library-vote featured-vote" onClick={() => vote('Doob Cube · No.9 Collection')}>{voted === 'Doob Cube · No.9 Collection' ? '✓ VOTE RECORDED' : 'VOTE FOR DOOB CUBE →'}</button></div></div>

        <div className="strain-controls"><label className="strain-search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search strains, brands, terpenes…" /></label><div className="type-chips">{types.map((item) => <button key={item} className={type === item ? 'active' : ''} onClick={() => setType(item)}>{item}</button>)}</div><select value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Sort strains"><option>{sorts[0]}</option><option>{sorts[1]}</option><option>{sorts[2]}</option></select></div>
        <div className="library-toolbar"><div><strong>{filtered.length}</strong> listings showing</div><span>★ Community ratings · public votes update the rankings</span></div>

        <div className="library-grid">
          {filtered.map((strain, index) => {
            const isCollection = strain[1] === 'Collection'
            const image = getImage(strain, index)
            return <article className={`library-card ${isCollection ? 'collection-card' : ''}`} key={strain[0]}>
              <button className="strain-card-open" onClick={() => setSelected(strain)} aria-label={`Preview ${strain[0]}`}>
                <div className="strain-photo"><img src={image} alt={`${strain[0]} cannabis collection`} loading="lazy" /><div className="card-brand"><span>✦</span> CANNA <em>SOCIAL</em></div><div className="rank-badge">{isCollection ? 'NEW' : `#${index + 1}`}</div><div className="card-gradient" /><div className="photo-overlay"><b>{strain[0]}</b><small>{strain[1]}{strain[2] !== '—' ? ` · THC ${strain[2]}` : ' · Variety of flavors'}</small><span>{strain[5]}</span></div></div>
              </button>
              <div className="library-body"><div className="score-row"><div className="score"><strong>{isCollection ? '★' : strain[3]}</strong><span><b>{isCollection ? 'PUBLIC VOTE' : 'COMMUNITY'}</b><small>{isCollection ? 'Be one of the first votes' : `${strain[4]} votes`}</small></span></div><button className="library-vote" onClick={() => vote(strain[0])}>{voted === strain[0] ? '✓ VOTED' : 'VOTE'}</button></div>{!isCollection && <div className="mini-bar"><span style={{ width: `${Math.min(100, Number(strain[3]) * 10)}%` }} /></div>}<div className="card-links"><button onClick={() => setSelected(strain)}>View {isCollection ? 'collection' : 'strain'}</button><button onClick={() => setSelected(strain)}>{isCollection ? 'Preview →' : 'Info →'}</button></div></div>
            </article>
          })}
        </div>
        {filtered.length === 0 && <div className="strain-empty"><span>✦</span><h3>No strains found</h3><p>Try another name, type, or terpene.</p></div>}
        <p className="photo-credit">Canna Social library · Community voting and discovery.</p>
      </div>

      {selected && (() => {
        const selectedIndex = strains.findIndex((item) => item[0] === selected[0])
        const selectedImage = getImage(selected, selectedIndex)
        const isCollection = selected[1] === 'Collection'
        return <div className="strain-preview-backdrop" role="dialog" aria-modal="true" aria-label={`${selected[0]} preview`} onClick={() => setSelected(null)}>
          <div className="strain-preview" onClick={(event) => event.stopPropagation()}>
            <button className="strain-preview-close" onClick={() => setSelected(null)} aria-label="Close preview">×</button>
            <div className="strain-preview-image"><img src={selectedImage} alt={selected[0]} /></div>
            <div className="strain-preview-content">
              <p className="eyebrow">✦ CANNA SOCIAL · {isCollection ? 'COLLECTION' : 'STRAIN PROFILE'}</p>
              <h3>{selected[0]}</h3>
              <div className="strain-preview-meta"><span>{selected[1]}</span>{selected[2] !== '—' && <span>THC {selected[2]}</span>}<span>{isCollection ? 'PUBLIC VOTE' : `${selected[4]} VOTES`}</span></div>
              <p className="strain-preview-description">{descriptions[selected[0]]}</p>
              <div className="strain-preview-flavors"><b>PROFILE</b><span>{selected[5]}</span></div>
              {!isCollection && <div className="strain-preview-score"><strong>{selected[3]}</strong><span>/10 community score</span></div>}
              <div className="strain-preview-actions"><button className="library-vote" onClick={() => vote(selected[0])}>{voted === selected[0] ? '✓ VOTED' : 'VOTE NOW'}</button><button className="preview-secondary" onClick={() => setSelected(null)}>CLOSE</button></div>
            </div>
          </div>
        </div>
      })()}
    </section>
  )
}
