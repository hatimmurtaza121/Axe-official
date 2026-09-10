'use client'

import { useEffect } from 'react'

export function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id) return
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    const navigation = performance.getEntriesByType('navigation')[0]
    const reloaded = navigation instanceof PerformanceNavigationTiming && navigation.type === 'reload'
    const frame = reloaded ? 0 : requestAnimationFrame(scrollToHash)
    const timeout = reloaded ? 0 : window.setTimeout(scrollToHash, 120)
    window.addEventListener('hashchange', scrollToHash)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      window.removeEventListener('hashchange', scrollToHash)
    }
  }, [])

  return null
}
