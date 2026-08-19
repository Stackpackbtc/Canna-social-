'use client'

import { useEffect, useState } from 'react'
import CannaSocialMaps from '@/components/canna-social-maps'
import CannaEducation from '@/components/canna-education'
import CannaSocialCard from '@/components/canna-social-card'
import CommunityReviews from '@/components/community-reviews'
import CannaMascot from '@/components/canna-mascot'
import ThemeToggle from '@/components/theme-toggle'

/**
 * Keep the Live Voter + Strain Library first-load path clean.
 * Secondary widgets mount after the browser is idle so clicking/scrolling
 * cannot compete with the primary interactive feed for the main thread.
 */
export default function DeferredGlobalFeatures() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const mount = () => { if (!cancelled) setReady(true) }
    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback
    const cancel = (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback
    let id: number | undefined
    if (idle) id = idle(mount, { timeout: 1800 })
    else id = window.setTimeout(mount, 900)
    return () => {
      cancelled = true
      if (idle && id !== undefined) cancel?.(id)
      else if (id !== undefined) window.clearTimeout(id)
    }
  }, [])

  if (!ready) return null

  return (
    <>
      <CannaSocialMaps />
      <CannaEducation />
      <CannaSocialCard />
      <CommunityReviews />
      <CannaMascot />
      <ThemeToggle />
    </>
  )
}
