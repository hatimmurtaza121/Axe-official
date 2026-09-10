import Image from 'next/image'
import Link from 'next/link'

export function Mark({ light = false }: { light?: boolean }) {
  return (
    <Link className={`mark ${light ? 'mark--light' : ''}`} href="/">
      <Image className="mark__symbol" src="/brand/axe-icon.webp" alt="" width={38} height={32} />
      <span>AXE<small>OFFICIAL</small></span>
    </Link>
  )
}
