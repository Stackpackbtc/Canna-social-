'use client'

import { lazy, Suspense, useEffect, useState } from 'react'

const LiveVotes = lazy(() => import('@/components/live-votes'))
const GibbysLemonHazeVote = lazy(() => import('@/components/gibbys-lemon-haze-vote'))
const StrainLibrary = lazy(() => import('@/components/strain-library'))

export default function DeferredSiteFeatures() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    let cancelled = false
    let timers: number[] = []

    const start = () => {
      if (cancelled) return
      // Let the homepage paint and become interactive before requesting the
      // large voting/library chunks. This is especially important on desktop
      // browsers where the large strain dataset can otherwise compete with the
      // first render and scrolling.
      setStage(1)
      timers.push(window.setTimeout(() => !cancelled && setStage(2), 900))
      timers.push(window.setTimeout(() => !cancelled && setStage(3), 1800))
    }

    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2200 })
      return () => {
        cancelled = true
        window.cancelIdleCallback?.(id)
        timers.forEach(window.clearTimeout)
      }
    }

    const timer = window.setTimeout(start, 1200)
    return () => {
      cancelled = true
      window.clearTimeout(timer)
      timers.forEach(window.clearTimeout)
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
