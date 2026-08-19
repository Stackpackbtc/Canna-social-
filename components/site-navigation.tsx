'use client'

import { useEffect, useState } from 'react'

function scrollToTarget(kind: 'home' | 'vote' | 'strains' | 'reviews') {
  if (kind === 'home') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  const selectors = kind === 'vote'
    ? ['[aria-label*="live voter" i]', '.live-votes-shell', '.gibbys-live-vote-shell']
    : kind === 'strains'
      ? ['[aria-label*="strain library" i]', '.strain-library-shell', '.strain-library']
      : ['[aria-label*="community review" i]', '.community-reviews', '.reviews']
  const target = selectors.map(s => document.querySelector(s)).find(Boolean)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function SiteNavigation() {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const goMaps = () => {
    setOpen(false)
    document.querySelector<HTMLButtonElement>('.canna-maps-launcher')?.click()
  }

  const submitSearch = () => {
    const term = search.trim()
    if (!term) return
    const inputs = Array.from(document.querySelectorAll<HTMLInputElement>('input'))
    const strainInput = inputs.find(input => /search strains|search.*brands|terpenes/i.test(input.placeholder || input.getAttribute('aria-label') || ''))
    if (strainInput) {
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
      setter?.call(strainInput, term)
      strainInput.dispatchEvent(new Event('input', { bubbles: true }))
      strainInput.dispatchEvent(new Event('change', { bubbles: true }))
      strainInput.focus()
      strainInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
    } else scrollToTarget('strains')
    setSearch('')
    setOpen(false)
  }

  const nav = (kind: 'home' | 'vote' | 'strains' | 'reviews') => { setOpen(false); scrollToTarget(kind) }

  return <header className="canna-site-nav" aria-label="Canna Social main navigation">
    <button className="canna-nav-brand" type="button" aria-label="Canna Social home" onClick={() => nav('home')}>
      <span className="canna-nav-star">✦</span><span><b>CANNA</b><strong>SOCIAL</strong></span>
    </button>
    <nav className={`canna-nav-links ${open ? 'is-open' : ''}`} aria-label="Primary">
      <button type="button" onClick={() => nav('home')}>Home</button>
      <button type="button" onClick={() => nav('vote')}>Live Vote</button>
      <button type="button" onClick={() => nav('strains')}>Strain Library</button>
      <button type="button" onClick={goMaps}>Maps</button>
      <button type="button" onClick={() => nav('reviews')}>Reviews</button>
    </nav>
    <div className="canna-nav-search">
      <input value={search} onChange={e => setSearch(e.target.value)} onKeyDown={e => e.key === 'Enter' && submitSearch()} placeholder="Search strains…" aria-label="Search strains" />
      <button type="button" onClick={submitSearch} aria-label="Search">⌕</button>
    </div>
    <button className="canna-nav-menu" type="button" onClick={() => setOpen(v => !v)} aria-expanded={open} aria-label="Open navigation">☰</button>
  </header>
}
