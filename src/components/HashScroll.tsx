'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

let pendingHash = ''

export function setPendingHash(id: string) {
  pendingHash = id.startsWith('#') ? id : `#${id}`
}

function takePendingHash() {
  const id = pendingHash
  pendingHash = ''
  return id
}

function scrollToHash() {
  const pending = takePendingHash()
  if (pending && window.location.hash !== pending) {
    history.replaceState(null, '', pending)
  }
  const id = decodeURIComponent((window.location.hash || pending).slice(1))
  if (!id) return false
  const node = document.getElementById(id)
  if (!node) {
    if (pending) pendingHash = pending
    return false
  }
  node.scrollIntoView({ behavior: 'smooth', block: 'start' })
  return true
}

export function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const delays = [0, 80, 200, 400]
    const timers = delays.map((delay) => window.setTimeout(scrollToHash, delay))
    const frame = requestAnimationFrame(scrollToHash)
    window.addEventListener('hashchange', scrollToHash)

    return () => {
      cancelAnimationFrame(frame)
      timers.forEach(window.clearTimeout)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [pathname])

  return null
}
