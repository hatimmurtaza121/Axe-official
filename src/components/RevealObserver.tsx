'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function RevealObserver({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [pathname])

  return children
}
