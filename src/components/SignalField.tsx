import type { CSSProperties } from 'react'

const paths = [
  'M-80 190 C120 40 260 340 460 180 S760 40 980 210',
  'M-80 230 C130 80 280 370 480 220 S770 80 980 250',
  'M-80 270 C140 120 300 400 500 260 S790 120 980 290',
  'M-80 310 C150 160 320 430 520 300 S810 160 980 330',
  'M-80 350 C160 200 340 460 540 340 S830 200 980 370',
  'M-80 390 C170 240 360 490 560 380 S850 240 980 410',
]

export function SignalField() {
  return (
    <svg className="signal-field" viewBox="0 0 900 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="signal-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2268ff" />
          <stop offset="52%" stopColor="#68a6ff" />
          <stop offset="100%" stopColor="#dfff64" />
        </linearGradient>
      </defs>
      <g>
        {paths.map((path, index) => (
          <path key={path} d={path} style={{ '--line': index } as CSSProperties} />
        ))}
      </g>
    </svg>
  )
}
