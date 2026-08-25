import LiveVotes from '@/components/live-votes'
import GibbysLemonHazeVote from '@/components/gibbys-lemon-haze-vote'
import StrainLibrary from '@/components/strain-library'
import CannaSocialMaps from '@/components/canna-social-maps'
import CannaEducation from '@/components/canna-education'
import CannaSocialCard from '@/components/canna-social-card'
import CommunityReviews from '@/components/community-reviews'
import CannaMascot from '@/components/canna-mascot'
import ThemeToggle from '@/components/theme-toggle'

/**
 * Primary site features are mounted in the initial React tree. Do not defer
 * these sections: navigation, voting, the feed and the library depend on
 * their DOM being present immediately after first paint.
 */
export default function InstantSiteFeatures() {
  return (
    <>
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
  )
}
