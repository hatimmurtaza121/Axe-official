'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function RevealObserver({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal')
    if (!elements.length) return undefined

    const reveal = (element: Element) => element.classList.add('is-visible')
    const failOpen = window.setTimeout(() => {
      elements.forEach(reveal)
    }, 1500)

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          reveal(entry.target)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.01 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => {
      window.clearTimeout(failOpen)
      observer.disconnect()
    }
  }, [pathname])

  return children
}
