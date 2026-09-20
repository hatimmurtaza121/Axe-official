import type { Metadata } from 'next'
import { ProductsPage } from '@/components/ProductsPage'

export const metadata: Metadata = {
  title: 'Products',
  description: 'Axe-built products, separate from custom software-house services. Start with Vendor Axe, a subscription ERP for inventory, orders, and operations.',
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'Products from Axe Official',
    description: 'Ready-to-use products built and operated by Axe Official—distinct from custom client work.',
    url: '/products',
  },
  twitter: {
    title: 'Products from Axe Official',
    description: 'Axe-owned products you can subscribe to, separate from custom software services.',
  },
}

export default function Page() {
  return <ProductsPage />
}
