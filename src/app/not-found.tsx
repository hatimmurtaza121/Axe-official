import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/Arrow'

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'This page is not on the Axe Official site. Return home or start a conversation.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <main id="main-content" className="not-found">
      <div className="wrap not-found__hero">
        <p className="eyebrow">
          <span>ERROR 404</span>
          <span>ROUTE NOT FOUND</span>
        </p>
        <h1>This page isn’t on the map.</h1>
        <p>The URL may be old, mistyped, or retired. Head home, browse open roles, or start a conversation.</p>
        <div className="not-found__actions">
          <Link className="button button--lime" href="/">
            Back home <Arrow />
          </Link>
          <Link className="text-link" href="/careers">
            Careers <Arrow diagonal />
          </Link>
          <a className="text-link" href="/#contact">
            Start a conversation <Arrow diagonal />
          </a>
        </div>
      </div>
    </main>
  )
}
