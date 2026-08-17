'use client'
import { useState } from 'react'

export default function CannaSocialMaps(){
 const [open,setOpen]=useState(false),[query,setQuery]=useState(''),[status,setStatus]=useState('')
 const search=(term:string)=>{const q=term.trim()||'cannabis dispensary near me';window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,'_blank','noopener,noreferrer')}
 const useLocation=()=>{setStatus('Finding your location…');if(!navigator.geolocation){setStatus('Location is not supported on this device.');return}navigator.geolocation.getCurrentPosition(({coords})=>{const q=`cannabis dispensary near ${coords.latitude},${coords.longitude}`;window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`,'_blank','noopener,noreferrer');setStatus('Nearby dispensaries opened in Maps.');},()=>setStatus('Location permission was not granted. Search by city or ZIP instead.'),{enableHighAccuracy:true,timeout:10000,maximumAge:300000})}
 return <>
  <button className="canna-maps-launcher" onClick={()=>setOpen(true)} aria-label="Open Canna Social Maps"><span className="maps-pin">⌖</span><span><b>CANNA SOCIAL</b><strong>MAPS</strong></span><em>FIND DISPENSARIES</em></button>
  {open&&<div className="canna-maps-backdrop" onClick={()=>setOpen(false)}><div className="canna-maps-modal" onClick={e=>e.stopPropagation()}>
   <button className="canna-maps-close" onClick={()=>setOpen(false)} aria-label="Close">×</button>
   <div className="canna-maps-header"><div className="maps-logo">✦</div><div><p className="maps-eyebrow">CANNA SOCIAL</p><h2>MAPS</h2><p>Find a dispensary near you.</p></div></div>
   <div className="canna-maps-search"><input value={query} onChange={e=>setQuery(e.target.value)} onKeyDown={e=>e.key==='Enter'&&search(query)} placeholder="City, ZIP, neighborhood…" aria-label="Search dispensaries"/><button onClick={()=>search(query)}>SEARCH</button></div>
   <button className="canna-maps-location" onClick={useLocation}>⌖ Use my current location <span>→</span></button>
   <div className="maps-quick"><button onClick={()=>search('cannabis dispensary near Boston, MA')}>Boston</button><button onClick={()=>search('cannabis dispensary near Cambridge, MA')}>Cambridge</button><button onClick={()=>search('cannabis dispensary near Brookline, MA')}>Brookline</button><button onClick={()=>search('cannabis dispensary near me')}>Near me</button></div>
   <div className="canna-maps-panel"><div className="map-grid"><span>✦</span><span>⌖</span><span>✦</span><span>⌖</span><span>✦</span></div><div className="map-panel-copy"><b>LIVE DISPENSARY SEARCH</b><p>Search results open in Maps so you can see current locations, hours, directions and available shopping options.</p><button onClick={()=>search(query||'cannabis dispensary near me')}>OPEN MAP RESULTS →</button></div></div>
   <a className="ccc-link" href="https://masscannabiscontrol.com/where-to-buy/" target="_blank" rel="noreferrer">Massachusetts licensed retailer finder ↗</a>
   {status&&<div className="maps-status">{status}</div>}
   <small className="maps-age">21+ only. Verify local laws and retailer eligibility before purchasing.</small>
  </div></div>}
 </>
}
