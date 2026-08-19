'use client'

import { lazy, Suspense, useEffect, useState } from 'react'

const LiveVotes = lazy(() => import('@/components/live-votes'))
const GibbysLemonHazeVote = lazy(() => import('@/components/gibbys-lemon-haze-vote'))
const StrainLibrary = lazy(() => import('@/components/strain-library'))

export default function DeferredSiteFeatures() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    let cancelled = false
    const start = () => {
      if (cancelled) return
      setStage(1)
      window.setTimeout(() => !cancelled && setStage(2), 180)
      window.setTimeout(() => !cancelled && setStage(3), 420)
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 1400 })
      return () => {
        cancelled = true
        window.cancelIdleCallback?.(id)
      }
    }

    const timer = window.setTimeout(start, 700)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [])

  return (
    <Suspense fallback={null}>
      {stage >= 1 && <LiveVotes />}
      {stage >= 2 && <GibbysLemonHazeVote />}
      {stage >= 3 && <StrainLibrary />}
    </Suspense>
  )
}
