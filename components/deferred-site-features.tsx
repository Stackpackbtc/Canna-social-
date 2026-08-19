'use client'

import { lazy, Suspense, useEffect, useState } from 'react'

const LiveVotes = lazy(() => import('@/components/live-votes'))
const GibbysLemonHazeVote = lazy(() => import('@/components/gibbys-lemon-haze-vote'))
const StrainLibrary = lazy(() => import('@/components/strain-library'))

export default function DeferredSiteFeatures() {
  const [stage, setStage] = useState(0)

  useEffect(() => {
    let cancelled = false
    let timer = 0
    let scrolling = false
    let scrollStop = 0

    const schedule = () => {
      window.clearTimeout(timer)
      if (cancelled || scrolling) return
      timer = window.setTimeout(() => {
        if (!cancelled && !scrolling) setStage(1)
      }, 2600)
    }

    const onScroll = () => {
      scrolling = true
      window.clearTimeout(scrollStop)
      scrollStop = window.setTimeout(() => {
        scrolling = false
        schedule()
      }, 900)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    const start = () => schedule()
    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      window.clearTimeout(scrollStop)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('load', start)
    }
  }, [])

  useEffect(() => {
    if (stage !== 1) return
    const t = window.setTimeout(() => setStage(2), 700)
    return () => window.clearTimeout(t)
  }, [stage])

  useEffect(() => {
    if (stage !== 2) return
    const t = window.setTimeout(() => setStage(3), 1400)
    return () => window.clearTimeout(t)
  }, [stage])

  return (
    <Suspense fallback={null}>
      {stage >= 1 && <LiveVotes />}
      {stage >= 2 && <GibbysLemonHazeVote />}
      {stage >= 3 && <StrainLibrary />}
    </Suspense>
  )
}
