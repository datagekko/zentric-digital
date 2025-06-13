import type { Metadata } from 'next'
import './globals.css'
import Providers from './providers'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Zentric Digital - Make Noise. Stay Zentric.',
  description: "Transform under-performing funnels into compounding profit engines in 30 days — or you don't pay. DTC ecommerce growth through CRO, Meta Ads, and Lifecycle Email.",
  keywords: 'ecommerce growth, CRO, conversion rate optimization, Meta ads, DTC brands, lifecycle email',
  metadataBase: new URL('https://zentric.digital'),
  icons: {
    icon: '/images/favicon.png',
  },
  openGraph: {
    title: 'Zentric Digital - Make Noise. Stay Zentric.',
    description: "Transform under-performing funnels into compounding profit engines in 30 days — or you don't pay.",
    url: 'https://zentric.digital',
    siteName: 'Zentric Digital',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Zentric Digital',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 