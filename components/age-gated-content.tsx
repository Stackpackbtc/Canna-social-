'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const LiveVotes = dynamic(() => import('@/components/live-votes'), { ssr: false })
const GibbysLemonHazeVote = dynamic(() => import('@/components/gibbys-lemon-haze-vote'), { ssr: false })
const StrainLibrary = dynamic(() => import('@/components/strain-library'), { ssr: false })
const CannaSocialMaps = dynamic(() => import('@/components/canna-social-maps'), { ssr: false })
const CannaEducation = dynamic(() => import('@/components/canna-education'), { ssr: false })
const CannaSocialCard = dynamic(() => import('@/components/canna-social-card'), { ssr: false })
const CommunityReviews = dynamic(() => import('@/components/community-reviews'), { ssr: false })
const CannaMascot = dynamic(() => import('@/components/canna-mascot'), { ssr: false })
const ThemeToggle = dynamic(() => import('@/components/theme-toggle'), { ssr: false })

const AGE_KEY = 'canna-social-age-confirmed'

export default function AgeGatedContent() {
  const [allowed,setAllowed] = useState(false)

  useEffect(() => {
    const read = () => {
      try { setAllowed(window.localStorage.getItem(AGE_KEY) === '21+') } catch { setAllowed(false) }
    }
    read()
    window.addEventListener('storage', read)
    window.addEventListener('canna-social-age-confirmed', read)
    return () => {
      window.removeEventListener('storage', read)
      window.removeEventListener('canna-social-age-confirmed', read)
    }
  }, [])

  if (!allowed) return null

  return <>
    <LiveVotes />
    <GibbysLemonHazeVote />
    <StrainLibrary />
    <CannaSocialMaps />
    <CannaEducation />
    <CannaSocialCard />
    <CommunityReviews />
    <CannaMascot />
    <ThemeToggle />
  </>
}
