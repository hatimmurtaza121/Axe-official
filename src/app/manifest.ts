import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: 'Axe Official',
    description: 'AI automation, internal tools, and scalable software for operations that refuse to stand still.',
    start_url: '/',
    display: 'standalone',
    background_color: '#080b12',
    theme_color: '#080b12',
    icons: [
      {
        src: '/brand/app-icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/brand/app-icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
