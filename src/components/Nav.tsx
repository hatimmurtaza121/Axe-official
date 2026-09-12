'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Arrow } from './Arrow'
import { Mark } from './Mark'

export function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [open, setOpen] = useState(false)
  const [menuPath, setMenuPath] = useState(pathname)
  const [solid, setSolid] = useState(false)
  const [hash, setHash] = useState('')
  const [active, setActive] = useState('')
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const lineRef = useRef<HTMLSpanElement>(null)
  const servicesRef = useRef<HTMLAnchorElement>(null)
  const workRef = useRef<HTMLAnchorElement>(null)
  const careersRef = useRef<HTMLAnchorElement>(null)
  const lockRef = useRef('')

  if (menuPath !== pathname) {
    setMenuPath(pathname)
    setOpen(false)
  }

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash)
    const syncSolid = () => setSolid(window.scrollY > 16)
    syncHash()
    syncSolid()
    window.addEventListener('hashchange', syncHash)
    window.addEventListener('scroll', syncSolid, { passive: true })
    return () => {
      window.removeEventListener('hashchange', syncHash)
      window.removeEventListener('scroll', syncSolid)
    }
  }, [pathname])

  useEffect(() => {
    if (pathname !== '/') {
      setActive('')
      return undefined
    }

    const sections = ['services', 'work', 'contact']
      .map((id) => document.getElementById(id))
      .filter((node): node is HTMLElement => Boolean(node))
    if (!sections.length) return undefined

    let frame = 0
    const syncActive = () => {
      frame = 0
      if (lockRef.current) return
      const marker = 100
      let next = ''
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= marker) next = `#${section.id}`
      }
      setActive((current) => (current === next ? current : next))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(syncActive)
    }

    syncActive()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  useEffect(() => {
    const main = document.getElementById('main-content')
    const footer = document.querySelector('footer')
    const lock = (node: Element | null, locked: boolean) => {
      if (!node) return
      if (locked) node.setAttribute('inert', '')
      else node.removeAttribute('inert')
    }

    lock(main, open)
    lock(footer, open)

    return () => {
      lock(main, false)
      lock(footer, false)
    }
  }, [open])

  useEffect(() => {
    if (!open || !menuRef.current || !toggleRef.current) return undefined

    const focusable = [toggleRef.current, ...menuRef.current.querySelectorAll('a')]
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
    menuRef.current.querySelector('a')?.focus()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const closeMenu = () => setOpen(false)
  const mark = (id: string) => {
    lockRef.current = id
    setActive(id)
    closeMenu()
    document.getElementById(id.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.setTimeout(() => {
      if (lockRef.current === id) lockRef.current = ''
    }, 900)
  }
  const current = active || hash
  const isCareers = pathname === '/careers'
  const isServices = isHome && current === '#services'
  const isWork = isHome && current === '#work'
  const isContact = isHome && current === '#contact'

  useEffect(() => {
    const line = lineRef.current
    const menu = menuRef.current
    const target = isCareers ? careersRef.current : isWork ? workRef.current : isServices ? servicesRef.current : null
    if (!line || !menu) return undefined

    const place = (animate: boolean) => {
      if (!target || open) {
        line.style.opacity = '0'
        return
      }
      const menuBox = menu.getBoundingClientRect()
      const box = target.getBoundingClientRect()
      if (!animate) line.style.transition = 'none'
      line.style.width = `${box.width}px`
      line.style.transform = `translateX(${box.left - menuBox.left}px)`
      line.style.opacity = '1'
      if (!animate) {
        line.getBoundingClientRect()
        line.style.transition = ''
      }
    }

    place(Boolean(line.dataset.ready))
    line.dataset.ready = 'true'
    const onResize = () => place(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [isCareers, isServices, isWork, open, pathname])

  return (
    <header className={`nav-shell${solid || open ? ' is-solid' : ''}`}>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="nav wrap" aria-label="Main navigation">
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
        <div
          id="site-menu"
          ref={menuRef}
          className={`nav__links ${open ? 'is-open' : ''}`}
          role={open ? 'dialog' : undefined}
          aria-modal={open || undefined}
          aria-label={open ? 'Site menu' : undefined}
        >
          <span className="nav__line" ref={lineRef} aria-hidden="true" />
          <Link
            ref={servicesRef}
            href="/#services"
            scroll={false}
            className={isServices ? 'is-current' : undefined}
            aria-current={isServices ? 'location' : undefined}
            onClick={() => mark('#services')}
          >
            What we build
          </Link>
          <Link
            ref={workRef}
            href="/#work"
            scroll={false}
            className={isWork ? 'is-current' : undefined}
            aria-current={isWork ? 'location' : undefined}
            onClick={() => mark('#work')}
          >
            Selected work
          </Link>
          <Link
            ref={careersRef}
            href="/careers"
            className={isCareers ? 'is-current' : undefined}
            aria-current={isCareers ? 'page' : undefined}
            onClick={closeMenu}
          >
            Careers
          </Link>
          <Link
            className={`nav__cta${isContact ? ' is-current' : ''}`}
            href="/#contact"
            scroll={false}
            aria-current={isContact ? 'location' : undefined}
            onClick={() => mark('#contact')}
          >
            Start a conversation <Arrow diagonal />
          </Link>
        </div>
      </nav>
    </header>
  )
}
