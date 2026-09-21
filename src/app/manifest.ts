import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Axe Official',
    short_name: 'Axe Official',
    description: 'Axe Official builds secure AI automation, internal tools, and scalable software.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#080b12',
    theme_color: '#080b12',
    icons: [
      {
        src: '/brand/pwa-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/brand/pwa-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
