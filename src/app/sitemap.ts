import type { MetadataRoute } from 'next'
import { site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, priority: 1 },
    { url: `${site.url}/careers`, priority: 0.8 },
    { url: `${site.url}/privacy`, priority: 0.3 },
    { url: `${site.url}/terms`, priority: 0.3 },
  ]
}
