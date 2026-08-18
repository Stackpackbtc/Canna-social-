'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const LiveVotes = dynamic(() => import('@/components/live-votes'), { ssr: false })
const GibbysLemonHazeVote = dynamic(() => import('@/components/gibbys-lemon-haze-vote'), { ssr: false })
const StrainLibrary = dynamic(() => import('@/components/strain-library'), { ssr: false })

export default function DeferredSiteFeatures() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const start = () => setReady(true)
    const idle = 'requestIdleCallback' in window
      ? window.setTimeout(() => (window as any).requestIdleCallback(start, { timeout: 900 }), 120)
      : window.setTimeout(start, 220)
    return () => window.clearTimeout(idle)
  }, [])

  if (!ready) return null

  return <>
    <LiveVotes />
    <GibbysLemonHazeVote />
    <StrainLibrary />
  </>
}
