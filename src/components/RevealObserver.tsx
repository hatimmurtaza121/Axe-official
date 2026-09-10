'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function RevealObserver({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal')
    if (!elements.length) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.classList.remove('is-pending')
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )

    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * .92) {
        element.classList.add('is-visible')
        return
      }
      element.classList.add('is-pending')
      observer.observe(element)
    })

    const fallback = window.setTimeout(() => {
      elements.forEach((element) => {
        element.classList.remove('is-pending')
        element.classList.add('is-visible')
      })
      observer.disconnect()
    }, 2000)

    return () => {
      window.clearTimeout(fallback)
      observer.disconnect()
      elements.forEach((element) => element.classList.remove('is-pending'))
    }
  }, [pathname])

  return children
}
