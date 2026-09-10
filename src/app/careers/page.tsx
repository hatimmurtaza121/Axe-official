import type { Metadata } from 'next'
import { CareersPage } from '@/components/CareersPage'

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Join Axe Official and build reliable AI automation and software that changes how businesses operate.',
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers at Axe Official',
    description: 'Join an AI-first software house building automation and internal products for real business operations.',
    url: '/careers',
  },
  twitter: {
    title: 'Careers at Axe Official',
    description: 'For people who move fast, think deeply, and want ownership of real operational problems.',
  },
}

export default function Page() {
  return <CareersPage />
}
