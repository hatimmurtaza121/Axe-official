'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Arrow } from './Arrow'
import { Mark } from './Mark'

function NavForPath({ pathname }: { pathname: string }) {
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open || !menuRef.current || !navRef.current || !toggleRef.current) return undefined

    const background = document.querySelectorAll<HTMLElement>('main, footer')
    const focusable = [...navRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')]
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
      if (event.key === 'Tab') {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.body.classList.add('menu-open')
    background.forEach((element) => element.setAttribute('inert', ''))
    menuRef.current.querySelector('a')?.focus()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('menu-open')
      background.forEach((element) => element.removeAttribute('inert'))
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <header className="nav-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav
        ref={navRef}
        className="nav wrap"
        aria-label={open ? 'Site menu' : 'Main navigation'}
        role={open ? 'dialog' : undefined}
        aria-modal={open || undefined}
      >
        <Mark />
        <button
          ref={toggleRef}
          className={`menu-toggle ${open ? 'is-open' : ''}`}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-controls="site-menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
        <div id="site-menu" ref={menuRef} className={`nav__links ${open ? 'is-open' : ''}`}>
          <a href={isHome ? '#services' : '/#services'} onClick={() => setOpen(false)}>What we build</a>
          <a href={isHome ? '#work' : '/#work'} onClick={() => setOpen(false)}>Selected work</a>
          <Link href="/careers" onClick={() => setOpen(false)}>Careers</Link>
          <a className="nav__cta" href={isHome ? '#contact' : '/#contact'} onClick={() => setOpen(false)}>
            Start a conversation <Arrow diagonal />
          </a>
        </div>
      </nav>
    </header>
  )
}

export function Nav() {
  const pathname = usePathname()
  return <NavForPath key={pathname} pathname={pathname} />
}
