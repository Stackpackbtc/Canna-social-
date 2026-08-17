import type { Metadata } from 'next'
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
import CannaBranding from '@/components/canna-branding'
import AgeGate from '@/components/age-gate'

export const metadata: Metadata = {
  title: 'Canna Social — The People’s Cannabis Platform',
  description: 'Discover, vote, review, and connect around cannabis culture and strain knowledge.'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><CannaBranding />{children}<AgeGate /></body></html>
}
