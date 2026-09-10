import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms for using the Axe Official website and information about project engagements.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms — Axe Official',
    description: 'Terms for using the Axe Official website and information about project engagements.',
    url: '/terms',
  },
}

export default function Page() {
  return <LegalPage type="terms" />
}
