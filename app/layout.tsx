import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'
import './upgrade.css'
import './review-images.css'
import './community-reviews.css'
import './admin/admin.css'
import './brand-partners.css'
import './theme.css'
import './live-votes.css'
import './strain-library.css'
import './strain-library-desktop.css'
import './strain-library-laptop.css'
import './canna-card.css'
import './motion.css'
import './canna-branding.css'
import './layout-polish.css'
import './mascot-inline.css'
import './gas-pass.css'
import './canna-education.css'
import './star-pulse.css'
import './futuristic-polish.css'
import './daily-polish.css'
import './mass-craft-partner.css'
import './noticeable-upgrade.css'
import './live-community-visuals.css'
import './live-feed-readability.css'
import './canna-social-maps.css'
import './canna-social-maps-logo.css'
import './final-ui-fix.css'
import './premium-ui-fix.css'
import './voter-experience.css'

const CommunityReviews = dynamic(() => import('@/components/community-reviews'), { ssr: false })
const ThemeToggle = dynamic(() => import('@/components/theme-toggle'), { ssr: false })
const LiveVotes = dynamic(() => import('@/components/live-votes'), { ssr: false })
const StrainLibrary = dynamic(() => import('@/components/strain-library'), { ssr: false })
const CannaSocialCard = dynamic(() => import('@/components/canna-social-card'), { ssr: false })
const CannaBranding = dynamic(() => import('@/components/canna-branding'), { ssr: false })
const CannaMascot = dynamic(() => import('@/components/canna-mascot'), { ssr: false })
const CannaEducation = dynamic(() => import('@/components/canna-education'), { ssr: false })
const CannaSocialMaps = dynamic(() => import('@/components/canna-social-maps'), { ssr: false })
const AgeGate = dynamic(() => import('@/components/age-gate'), { ssr: false })

export const metadata: Metadata = { title: 'Canna Social — The People’s Cannabis Platform', description: 'Discover, vote, review, and connect around cannabis culture and strain knowledge.' }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
 return <html lang="en"><body><CannaBranding />{children}<LiveVotes /><StrainLibrary /><CannaEducation /><CannaSocialCard /><CommunityReviews /><CannaMascot /><CannaSocialMaps /><ThemeToggle /><AgeGate /></body></html>
}
