import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'
import { Arrow } from './Arrow'

export function Footer() {
  return (
    <footer>
      <div className="wrap footer__top">
        <Link href="/" aria-label="Axe Official">
          <Image className="footer-logo" src="/brand/axe-full.webp" alt="Axe Official — Automation for real growth" width={380} height={354} />
        </Link>
        <p>AI-first software for<br />operations that refuse to stand still.</p>
        <div className="footer__contacts">
          <span>START A PROJECT</span><Link href="/#contact">{site.contactEmail} <Arrow diagonal /></Link>
          <span>CLIENT SUPPORT</span><a href={`mailto:${site.supportEmail}`}>{site.supportEmail} <Arrow diagonal /></a>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <span>© {site.copyrightYear} AXE OFFICIAL</span>
        <div>
          <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer">INSTAGRAM / axe.0fficial ↗</a>
          <nav className="footer__links" aria-label="Footer">
            <Link href="/products">PRODUCTS</Link>
            <Link href="/careers">CAREERS</Link>
            <Link href="/privacy">PRIVACY</Link>
            <Link href="/terms">TERMS</Link>
          </nav>
        </div>
        <span>{site.domain}</span>
      </div>
    </footer>
  )
}
