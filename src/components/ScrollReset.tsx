'use client'

import { useEffect } from 'react'

function isReload() {
  const entry = performance.getEntriesByType('navigation')[0]
  return entry instanceof PerformanceNavigationTiming && entry.type === 'reload'
}

function goToTop() {
  window.scrollTo(0, 0)
}

export function ScrollReset() {
  useEffect(() => {
    history.scrollRestoration = 'manual'

    if (!isReload()) return undefined

    goToTop()
    const frame = requestAnimationFrame(goToTop)
    const timeout = window.setTimeout(goToTop, 50)

    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted || isReload()) goToTop()
    }

    window.addEventListener('pageshow', onPageShow)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(timeout)
      window.removeEventListener('pageshow', onPageShow)
    }
  }, [])

  return null
}
