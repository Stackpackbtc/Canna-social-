'use client'
import { useEffect, useState } from 'react'

export default function ThemeToggle(){
 const [light,setLight]=useState(false)
 useEffect(()=>{const saved=localStorage.getItem('canna-theme');const isLight=saved==='light';setLight(isLight);document.documentElement.classList.toggle('light-theme',isLight)},[])
 const toggle=()=>{const next=!light;setLight(next);document.documentElement.classList.toggle('light-theme',next);localStorage.setItem('canna-theme',next?'light':'dark')}
 return <button className="theme-toggle" onClick={toggle} aria-label={light?'Switch to dark mode':'Switch to light mode'} title={light?'Dark mode':'Light mode'}><span>{light?'☾':'☀'}</span><b>{light?'DARK':'LIGHT'}</b></button>
}