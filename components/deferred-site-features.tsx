'use client'

import { lazy, Suspense, useEffect, useState } from 'react'

const LiveVotes = lazy(() => import('@/components/live-votes'))
const GibbysLemonHazeVote = lazy(() => import('@/components/gibbys-lemon-haze-vote'))
const StrainLibrary = lazy(() => import('@/components/strain-library'))

export default function DeferredSiteFeatures() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 250)
    return () => window.clearTimeout(timer)
  }, [])

  if (!ready) return null

  return (
    <Suspense fallback={null}>
      <LiveVotes />
      <GibbysLemonHazeVote />
      <StrainLibrary />
    </Suspense>
  )
}
