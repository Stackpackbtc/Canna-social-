'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const CannaSocialMaps = dynamic(() => import('@/components/canna-social-maps'), { ssr: false })
const CannaEducation = dynamic(() => import('@/components/canna-education'), { ssr: false })
const CannaSocialCard = dynamic(() => import('@/components/canna-social-card'), { ssr: false })
const CommunityReviews = dynamic(() => import('@/components/community-reviews'), { ssr: false })
const CannaMascot = dynamic(() => import('@/components/canna-mascot'), { ssr: false })
const ThemeToggle = dynamic(() => import('@/components/theme-toggle'), { ssr: false })

export default function DeferredGlobalFeatures(){
 const [ready,setReady]=useState(false)
 useEffect(()=>{
  const id=window.setTimeout(()=>setReady(true),180)
  return()=>window.clearTimeout(id)
 },[])
 if(!ready)return null
 return <>
  <CannaSocialMaps />
  <CannaEducation />
  <CannaSocialCard />
  <CommunityReviews />
  <CannaMascot />
  <ThemeToggle />
 </>
}
