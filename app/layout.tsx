import type { Metadata } from 'next'
import './globals.css'
import './upgrade.css'
import './review-images.css'

export const metadata: Metadata = {
  title: 'Canna Social — The People’s Cannabis Platform',
  description: 'Discover, vote, review, and connect around cannabis culture and strain knowledge.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>
}