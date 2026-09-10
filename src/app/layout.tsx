import type { Metadata, Viewport } from 'next'
import { DM_Mono, Manrope } from 'next/font/google'
import { Footer } from '@/components/Footer'
import { Nav } from '@/components/Nav'
import { RevealObserver } from '@/components/RevealObserver'
import { ScrollReset } from '@/components/ScrollReset'
import { site } from '@/lib/site'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-manrope',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-dm-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Axe Official — Operations, engineered to move.',
    template: '%s — Axe Official',
  },
  description: 'Axe Official builds secure AI automation, internal tools, and scalable software that turn slow operations into high-speed systems.',
  applicationName: site.name,
  alternates: { canonical: '/' },
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [
      { url: '/brand/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/brand/favicon-64.png', sizes: '64x64', type: 'image/png' },
    ],
    shortcut: [{ url: '/brand/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/brand/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: 'Axe Official — Operations, engineered to move.',
    description: 'Secure AI automation, internal tools, and scalable software built around how your business actually works.',
    url: '/',
    images: [{
      url: '/brand/axe-social-1200x630.png',
      width: 1200,
      height: 630,
      type: 'image/png',
      alt: 'Axe Official — Operations, engineered to move.',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Axe Official — Operations, engineered to move.',
    description: 'Secure AI automation, internal tools, and scalable software for operations that refuse to stand still.',
    images: [{
      url: '/brand/axe-social-1200x630.png',
      width: 1200,
      height: 630,
      alt: 'Axe Official — Operations, engineered to move.',
    }],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#080b12',
  width: 'device-width',
  initialScale: 1,
}

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: `${site.url}/`,
  logo: `${site.url}/brand/app-icon-512.png`,
  email: site.contactEmail,
  sameAs: [site.instagramUrl],
  description: 'AI-first software house building workflow automation, internal applications, portals, and production AI.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${dmMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <ScrollReset />
        <RevealObserver>
          <Nav />
          {children}
          <Footer />
        </RevealObserver>
      </body>
    </html>
  )
}
