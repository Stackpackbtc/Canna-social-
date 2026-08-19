import LiveVotes from '@/components/live-votes'
import GibbysLemonHazeVote from '@/components/gibbys-lemon-haze-vote'
import StrainLibrary from '@/components/strain-library'

/**
 * Core discovery content is intentionally rendered immediately.
 * These are primary page sections, not optional/deferred widgets: visitors
 * should see the Live Voter and Strain Library on the first render.
 */
export default function DeferredSiteFeatures() {
  return (
    <>
      <LiveVotes />
      <GibbysLemonHazeVote />
      <StrainLibrary />
    </>
  )
}
