import type { Metadata } from 'next'
import './globals.css'
import './upgrade.css'
import './review-images.css'
import './community-reviews.css'
import './admin/admin.css'
import './brand-partners.css'
import './theme.css'
import CommunityReviews from '@/components/community-reviews'
import BrandPartners from '@/components/brand-partners'
import ThemeToggle from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'Canna Social — The People’s Cannabis Platform',
  description: 'Discover, vote, review, and connect around cannabis culture and strain knowledge.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}<CommunityReviews /><BrandPartners /><ThemeToggle /></body></html>
}