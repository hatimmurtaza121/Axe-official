import type { Metadata } from 'next'
import { LegalPage } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy',
  description: 'How Axe Official handles information shared through its website and email.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy — Axe Official',
    description: 'How Axe Official handles information shared through its website and email.',
    url: '/privacy',
  },
}

export default function Page() {
  return <LegalPage type="privacy" />
}
