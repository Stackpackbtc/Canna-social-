import CannaSocialMaps from '@/components/canna-social-maps'
import CannaEducation from '@/components/canna-education'
import CannaSocialCard from '@/components/canna-social-card'
import CommunityReviews from '@/components/community-reviews'
import CannaMascot from '@/components/canna-mascot'
import ThemeToggle from '@/components/theme-toggle'

/** Core site chrome/widgets render with the first page so there is no blank gap. */
export default function DeferredGlobalFeatures() {
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
