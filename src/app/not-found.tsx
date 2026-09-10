import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The requested page could not be found. Return to Axe Official or start a conversation.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <div className="not-found__signal" aria-hidden="true">404</div>
      <div className="wrap not-found__content">
        <p className="section-label">SIGNAL LOST / 404</p>
        <h1>This route stopped.<br />Your operation <em>doesn’t have to.</em></h1>
        <p>The page may have moved or the address may be incomplete. Choose a clear route back into Axe Official.</p>
        <div className="not-found__actions">
          <Link className="button button--lime" href="/">Return home <Arrow /></Link>
          <Link className="text-link" href="/#contact">Start a conversation <Arrow diagonal /></Link>
          <Link className="text-link" href="/careers">Explore careers <Arrow /></Link>
        </div>
      </div>
    </main>
  )
}
