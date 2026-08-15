'use client'

import { useEffect, useMemo, useState } from 'react'
import { newStrains } from '@/data/new-strains'

type Strain = readonly [string, string, string, string, string, string, string?]

// Use original/high-resolution Wikimedia files so the modal never enlarges a tiny thumbnail.
// These are reference cannabis-flower photos unless a strain has a dedicated Canna Social/brand asset.
const strainImages = [
  'https://commons.wikimedia.org/wiki/Special:FilePath/Cannabis%20flower.jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Cannabis%20Grapefruit%20(16540499793).jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Cannabis%20OG%20Kush%20(18458035712).jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Cannabis%20Holy%20Grail%20Kush%20(28209045193).jpg',
  'https://commons.wikimedia.org/wiki/Special:FilePath/Cannabis%20Closeup%2002.jpg',
]

const baseStrains: Strain[] = [
  ['Doob Cube · No.9 Collection','Collection','—','NEW','0','Variety of flavors · Multiple options · Community pick','/doob-cube-collection.svg'],
  ['Purple Runtz','Hybrid','24%','9.4','2.4K','Sweet berry · Candy · Vanilla'],
  ['Gelato 41','Hybrid','25%','9.2','2.1K','Creamy · Sweet · Citrus'],
  ['Zkittlez','Indica','22%','9.0','1.8K','Fruity · Tropical · Sweet'],
  ['MAC 1','Hybrid','24%','9.1','1.6K','Citrus · Pine · Earthy'],
  ['LA Kush Cake','Indica','23%','8.9','1.4K','Vanilla · Gas · Cream'],
  ['GMO Cookies','Indica','28%','9.3','1.3K','Garlic · Diesel · Earthy'],
  ['Pink Runtz','Hybrid','24%','9.2','1.2K','Candy · Fruit · Floral'],
  ['Blue Dream','Sativa','21%','8.8','1.1K','Berry · Herbal · Sweet'],
  ['Jelly Donutz','Hybrid','24%','9.0','986','Candy · Gas · Fruit'],
  ['Super Lemon Haze','Sativa','23%','8.7','912','Lemon · Citrus · Sweet'],
  ['Wedding Cake','Indica','24%','8.9','821','Vanilla · Pepper · Sweet'],
  ['OG Kush','Hybrid','22%','8.6','712','Diesel · Pine · Citrus'],
]

const expandedStrains: Strain[] = newStrains.map(([name,type,lineage,profile]) => [
  name, type, '—', 'NEW', '0', lineage ? `${lineage} · ${profile}` : profile,
])
const existingNames = new Set(baseStrains.map((strain) => strain[0]))
const strains: Strain[] = [...baseStrains, ...expandedStrains.filter((strain) => !existingNames.has(strain[0]))]

const strainBrands: Record<string,string> = {
  'Black Cherry Gelato': "Gibby’s Craft Cannabis",
}

const dedicatedImages: Record<string,string> = {
  // The exact uploaded Gibby's promotional artwork is not a repository asset, so use a high-resolution flower reference rather than a blurry generated thumbnail.
  'Black Cherry Gelato': 'https://commons.wikimedia.org/wiki/Special:FilePath/Cannabis%20Grapefruit%20(16540499793).jpg',
}

const descriptions: Record<string,string> = {
  'Doob Cube · No.9 Collection':'A No.9 Collection cannabis experience featuring a variety of flavor options. Explore the collection and cast your public vote to help the community rank it.',
  'Black Cherry Gelato':"Gibby’s Craft Cannabis Black Cherry Gelato. The listing identifies this cultivar at 24% THC with Black Cherry Pie × Acai Gelato lineage. Canna Social is opening this listing for community discovery and voting.",
  'Purple Runtz':'A hybrid profile known for sweet berry, candy and vanilla-style flavor notes. Community favorite with a strong 9.4 rating.',
  'Gelato 41':'A dessert-forward hybrid profile with creamy, sweet and citrus notes and a 9.2 community score.',
  'Zkittlez':'A fruit-forward profile with tropical and sweet notes. Listed as an indica profile in the Canna Social library.',
  'MAC 1':'A hybrid profile with citrus, pine and earthy notes and a 9.1 community score.',
  'LA Kush Cake':'A rich profile featuring vanilla, gas and cream notes. Listed as an indica profile.',
  'GMO Cookies':'A bold profile with garlic, diesel and earthy notes and a 9.3 community score.',
  'Pink Runtz':'A colorful hybrid profile with candy, fruit and floral notes.',
  'Blue Dream':'A sativa profile with berry, herbal and sweet notes.',
  'Jelly Donutz':'A hybrid profile with candy, gas and fruit notes.',
  'Super Lemon Haze':'A bright sativa profile featuring lemon, citrus and sweet notes.',
  'Wedding Cake':'A dessert-style indica profile with vanilla, pepper and sweet notes.',
  'OG Kush':'A classic hybrid profile with diesel, pine and citrus notes.',
}

const types = ['All','Sativa','Indica','Hybrid','Collection']
const sorts = ['Top Rated','Most Voted','A–Z']

export default function StrainLibrary(){
  const [query,setQuery] = useState('')
  const [type,setType] = useState('All')
  const [sort,setSort] = useState('Top Rated')
  const [voted,setVoted] = useState<string|null>(null)
  const [selected,setSelected] = useState<Strain|null>(null)

  useEffect(() => {
    if (!selected) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [selected])

  const filtered = useMemo(() => {
    const result = strains.filter((strain) => {
      const matchesType = type === 'All' || strain[1] === type
      const matchesQuery = strain.join(' ').toLowerCase().includes(query.toLowerCase())
      return matchesType && matchesQuery
    })
    return [...result].sort((a,b) => {
      if (sort === 'A–Z') return a[0].localeCompare(b[0])
      if (sort === 'Most Voted') return Number.parseFloat(b[4]) - Number.parseFloat(a[4])
      if (a[3] === 'NEW' && b[3] !== 'NEW') return -1
      if (a[3] !== 'NEW' && b[3] === 'NEW') return 1
      if (a[1] === 'Collection') return -1
      if (b[1] === 'Collection') return 1
      return Number.parseFloat(b[3]) - Number.parseFloat(a[3])
    })
  }, [query,type,sort])

  const getImage = (strain: Strain, index: number) => {
    if (dedicatedImages[strain[0]]) return dedicatedImages[strain[0]]
    return strain[6] || strainImages[index % strainImages.length]
  }

  const openPreview = (strain: Strain) => setSelected(strain)
  const vote = (name: string) => setVoted(name)
  const newCount = expandedStrains.filter((strain) => !existingNames.has(strain[0])).length

  return <section className="strain-library" id="strain-library">
    <aside className="strain-sidebar">
      <div className="side-brand"><div className="side-logo">✦</div><b>CANNA<br/><span>SOCIAL</span></b><p>ONE PLANT.<br/>MILLIONS OF VOICES.</p><strong>VOTE. RATE. BE HEARD.</strong></div>
      <nav><a className="selected">✧ Strain Library</a><a>☆ Top Rated</a><a>◉ New Strains</a><a>♧ Indica</a><a>♧ Sativa</a><a>◈ Hybrid</a><a>▣ Collections</a><a>☆ Reviews</a><a>＋ Submit Strain</a></nav>
      <div className="side-stats"><b>{strains.length}+<small>Strains & growing</small></b><b>2.4M+<small>Votes cast</small></b><b>45K+<small>Community reviews</small></b></div>
    </aside>

    <div className="strain-main">
      <div className="library-brand-lockup" aria-label="Canna Social Strain Library"><div className="library-brand-mark"/><div className="library-brand-copy"><b>CANNA SOCIAL</b><strong>STRAIN LIBRARY</strong><span>Community discovery · Public voting · Real opinions</span></div></div>
      <div className="strain-library-head"><div><p className="eyebrow">✦ CANNA SOCIAL · DISCOVERY</p><h2>STRAIN <span>LIBRARY</span></h2><p className="library-subtitle">Explore strains, collections and profiles.</p></div><div className="library-count"><strong>{strains.length}+</strong><span>STRAINS<br/>& GROWING</span></div></div>

      <div className="new-strains-banner"><div><span>✦</span><div><b>NEWLY ADDED</b><strong>{newCount}+ strains just landed</strong><small>Fresh additions to Canna Social · Now open for public voting</small></div></div><button type="button" onClick={()=>{setType('All');setSort('Top Rated');setQuery('')}}>Explore new strains ↓</button></div>

      <div className="featured-strain">
        <button type="button" className="featured-image" onClick={()=>openPreview(baseStrains[0])} aria-label="View Doob Cube photo and information">
          <img src="/doob-cube-collection.svg" alt="Doob Cube by No.9 Collection"/>
          <span className="featured-badge">★ NEW · PUBLIC VOTE</span>
        </button>
        <div className="featured-copy"><p className="tiny">FEATURED COLLECTION · NO.9 COLLECTION</p><h3>Doob Cube</h3><div className="featured-score"><strong>VOTE</strong><span>PUBLIC<br/><small>Community pick</small></span></div><p>A No.9 Collection experience featuring a variety of flavors and options for the community to discover and vote on.</p><div className="featured-tags"><span>COLLECTION</span><span>NO.9</span><span>VARIETY</span><span>PUBLIC VOTE</span></div><button type="button" className="library-vote featured-vote" onClick={()=>vote('Doob Cube · No.9 Collection')}>{voted==='Doob Cube · No.9 Collection'?'✓ VOTE RECORDED':'VOTE FOR DOOB CUBE →'}</button></div>
      </div>

      <div className="strain-controls"><label className="strain-search"><span>⌕</span><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search strains, brands, terpenes…"/></label><div className="type-chips">{types.map((item)=><button type="button" key={item} className={type===item?'active':''} onClick={()=>setType(item)}>{item}</button>)}</div><select value={sort} onChange={(e)=>setSort(e.target.value)} aria-label="Sort strains">{sorts.map((item)=><option key={item}>{item}</option>)}</select></div>
      <div className="library-toolbar"><div><strong>{filtered.length}</strong> listings showing</div><span>★ Community ratings · public votes update the rankings</span></div>

      <div className="library-grid">
        {filtered.map((strain,index)=>{
          const isCollection = strain[1] === 'Collection'
          const isNew = strain[3] === 'NEW' && !isCollection
          const image = getImage(strain,index)
          const brand = strainBrands[strain[0]]
          return <article className={`library-card ${isCollection?'collection-card':''} ${isNew?'new-strain-card':''}`} key={strain[0]}>
            <button type="button" className="strain-card-open" onClick={()=>openPreview(strain)} aria-label={`View ${strain[0]} photo and information`}>
              <div className="strain-photo">
                <img src={image} alt={`${strain[0]} cannabis flower`} loading="lazy" onError={(event)=>{event.currentTarget.onerror=null;event.currentTarget.src='/canna-social-strain-fallback.svg'}}/>
                <div className="card-brand"><span>✦</span> {brand||'CANNA SOCIAL'} <em>{brand?'PARTNER':'LIBRARY'}</em></div>
                <div className="rank-badge">{isCollection||isNew?'NEW':`#${index+1}`}</div>
                <div className="card-gradient"/>
                <div className="photo-overlay"><b>{strain[0]}</b><small>{brand||strain[1]}{strain[2]!=='—'?` · THC ${strain[2]}`:' · Profile'}</small><span>{strain[5]}</span></div>
              </div>
            </button>
            <div className="library-body"><div className="score-row"><div className="score"><strong>{isCollection?'★':isNew?'NEW':strain[3]}</strong><span><b>{isCollection||isNew?'PUBLIC VOTE':'COMMUNITY'}</b><small>{isCollection||isNew?'Be one of the first votes':`${strain[4]} votes`}</small></span></div><button type="button" className="library-vote" onClick={()=>vote(strain[0])}>{voted===strain[0]?'✓ VOTED':'VOTE'}</button></div>{!isCollection&&!isNew&&<div className="mini-bar"><span style={{width:`${Math.min(100,Number(strain[3])*10)}%`}}/></div>}<div className="card-links"><button type="button" onClick={()=>openPreview(strain)}>View details</button><button type="button" onClick={()=>openPreview(strain)}>Open →</button></div></div>
          </article>
        })}
      </div>

      {filtered.length===0&&<div className="strain-empty"><span>✦</span><h3>No strains found</h3><p>Try another name, type, or terpene.</p></div>}
      <p className="photo-credit">Canna Social library · Community voting and discovery.</p>
    </div>

    {selected&&(()=>{
      const selectedIndex = strains.findIndex((item)=>item[0]===selected[0])
      const image = getImage(selected,selectedIndex)
      const isCollection = selected[1] === 'Collection'
      const isNew = selected[3] === 'NEW' && !isCollection
      const brand = strainBrands[selected[0]]
      const [name,kind,thc,score,votes,profile] = selected
      const parts = profile.split(' · ')
      const lineage = parts.length > 1 ? parts[0] : ''
      const flavorNotes = parts.length > 1 ? parts.slice(1).join(' · ') : profile

      return <div className="strain-preview-backdrop" role="dialog" aria-modal="true" aria-label={`${name} photo and information`} onClick={()=>setSelected(null)}>
        <div className="strain-preview strain-preview-detailed" onClick={(event)=>event.stopPropagation()} style={{width:'min(980px,100%)',maxHeight:'92vh',gridTemplateColumns:'1.05fr .95fr'}}>
          <button type="button" className="strain-preview-close" onClick={()=>setSelected(null)} aria-label="Close preview">×</button>
          <div className="strain-preview-image" style={{minHeight:'520px',height:'100%',background:'#050705',display:'flex',alignItems:'center',justifyContent:'center',overflow:'hidden'}}>
            <img src={image} alt={`${name} cannabis flower full size`} style={{width:'100%',height:'100%',objectFit:'contain',padding:'18px',display:'block'}} onError={(event)=>{event.currentTarget.onerror=null;event.currentTarget.src='/canna-social-strain-fallback.svg'}}/>
            <div className="preview-image-label"><span>✦ CANNA SOCIAL</span><b>{isNew||isCollection?'NEW':'COMMUNITY PICK'}</b></div>
            <div className="preview-image-title">{name}</div>
          </div>
          <div className="strain-preview-content" style={{overflowY:'auto',maxHeight:'92vh'}}>
            <p className="eyebrow">✦ CANNA SOCIAL · {isCollection?'COLLECTION':'STRAIN PROFILE'}</p>
            <h3>{name}</h3>
            {brand&&<p className="tiny">PARTICIPATING BRAND · {brand}</p>}
            <div className="strain-preview-meta"><span>{kind}</span>{thc!=='—'&&<span>THC {thc}</span>}<span>{isNew||isCollection?'NEW · PUBLIC VOTE':`${votes} VOTES`}</span></div>
            <div className="strain-detail-grid"><div><small>TYPE</small><strong>{kind}</strong></div><div><small>THC</small><strong>{thc==='—'?'Not listed':thc}</strong></div><div><small>COMMUNITY SCORE</small><strong>{isCollection||isNew?'New':`${score}/10`}</strong></div><div><small>PUBLIC VOTES</small><strong>{isCollection||isNew?'Open now':votes}</strong></div></div>
            {lineage&&<div className="strain-detail-block"><b>GENETICS / LINEAGE</b><p>{lineage}</p></div>}
            <div className="strain-detail-block"><b>FLAVOR / PROFILE</b><p>{flavorNotes}</p></div>
            <p className="strain-preview-description">{descriptions[name]||`Canna Social profile for ${name}. This listing includes the available strain information and is open for community discovery and voting. Profile notes: ${profile}.`}</p>
            <div className="strain-preview-actions"><button type="button" className="library-vote" onClick={()=>vote(name)}>{voted===name?'✓ VOTED':'VOTE NOW'}</button><button type="button" className="preview-secondary" onClick={()=>setSelected(null)}>CLOSE</button></div>
            <small className="preview-disclaimer">Community reference information. Potency and characteristics can vary by producer and batch. Flower photos are reference images unless labeled as a dedicated brand asset.</small>
          </div>
        </div>
      </div>
    })()}
  </section>
}
