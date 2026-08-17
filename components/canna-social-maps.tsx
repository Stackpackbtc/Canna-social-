'use client'
import { useState } from 'react'

export default function CannaSocialMaps(){
 const [open,setOpen]=useState(false),[query,setQuery]=useState(''),[status,setStatus]=useState('')
 // Keep the existing Google Maps experience, but force every free-form search to be a Massachusetts cannabis-dispensary search.
 const dispensaryQuery=(term:string)=>{
  const clean=term.trim()
  if(!clean || /^(near me|my location)$/i.test(clean)) return 'cannabis dispensary near me, Massachusetts'
  return `cannabis dispensary near ${clean}, Massachusetts`
 }
 const search=(term:string)=>{
  const q=dispensaryQuery(term)
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,'_blank','noopener,noreferrer')
 }
 const useLocation=()=>{setStatus('Finding your location…');if(!navigator.geolocation){setStatus('Location is not supported on this device.');return}navigator.geolocation.getCurrentPosition(({coords})=>{const q=`cannabis dispensary near ${coords.latitude},${coords.longitude}, Massachusetts`;window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,'_blank','noopener,noreferrer');setStatus('Nearby dispensaries opened in Maps.');},()=>setStatus('Location permission was not granted. Search by city or ZIP instead.'),{enableHighAccuracy:true,timeout:10000,maximumAge:300000})}
 return <>
  <button className="canna-maps-launcher" onClick={()=>setOpen(true)} aria-label="Open Canna Social Maps"><img className="maps-launcher-logo" src="/canna-social-maps-logo.svg" alt=""/><span><b>CANNA SOCIAL</b><strong>MAPS</strong></span><em>FIND DISPENSARIES</em></button>
  {open&&<div className="canna-maps-backdrop" onClick={()=>setOpen(false)}><div className="canna-maps-modal" onClick={e=>e.stopPropagation()}>
   <button className="canna-maps-close" onClick={()=>setOpen(false)} aria-label="Close">×</button>
   <div className="canna-maps-header"><img className="maps-modal-logo" src="/canna-social-maps-logo.svg" alt="Canna Social Maps"/><div><p className="maps-eyebrow">CANNA SOCIAL</p><h2>MAPS</h2><p>Find a dispensary near you.</p></div></div>
   <div className="canna-maps-search"><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search(query)} placeholder="City, ZIP, neighborhood…" aria-label="Search dispensaries only"/><button onClick={()=>search(query)}>SEARCH</button></div>
   <button className="canna-maps-location" onClick={useLocation}>⌖ Use my current location <span>→</span></button>
   <div className="maps-quick"><button onClick={()=>search('Boston, MA')}>Boston</button><button onClick={()=>search('Cambridge, MA')}>Cambridge</button><button onClick={()=>search('Brookline, MA')}>Brookline</button><button onClick={()=>search('near me')}>Near me</button></div>
   <div className="canna-maps-panel"><div className="map-grid"><span>✦</span><span>⌖</span><span>✦</span><span>⌖</span><span>✦</span></div><div className="map-panel-copy"><b>LIVE DISPENSARY SEARCH</b><p>Search any Massachusetts city, ZIP code, neighborhood, or location. Results open in Google Maps with dispensaries only.</p><button onClick={()=>search(query||'near me')}>OPEN DISPENSARY MAPS →</button></div></div>
   <a className="ccc-link" href="https://masscannabiscontrol.com/where-to-buy/" target="_blank" rel="noreferrer">Massachusetts licensed retailer finder ↗</a>
   {status&&<div className="maps-status">{status}</div>}
   <small className="maps-age">21+ only. Verify local laws and retailer eligibility before purchasing.</small>
  </div></div>}
 </>
}
