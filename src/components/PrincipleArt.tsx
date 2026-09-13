const arts = {
  control: (
    <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <rect x="4" y="16" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="20" cy="28" r="4" fill="var(--ink)" />
      <path d="M36 28h7c7 0 9 10 16 10h7" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="58" cy="38" r="6" fill="var(--blue)" />
      <path d="M58 32v-7M54.6 33.6 50 29.8M61.4 33.6 66 29.8" stroke="var(--blue)" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="50" y="52" width="34" height="22" rx="3" fill="var(--blue-wash)" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="67" cy="63" r="3.5" fill="var(--blue)" />
      <path d="M20 40v10c0 7 8 12 22 12" stroke="currentColor" strokeWidth="1.4" strokeDasharray="3 3" />
    </svg>
  ),
  secure: (
    <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <path d="M44 8 14 22v24c0 21 13 33 30 38 17-5 30-17 30-38V22L44 8Z" fill="var(--blue-wash)" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <rect x="33" y="40" width="22" height="18" rx="2.5" fill="var(--paper)" stroke="currentColor" strokeWidth="1.6" />
      <path d="M38 40v-6a6 6 0 0 1 12 0v6" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="44" cy="49" r="2.2" fill="var(--blue)" />
    </svg>
  ),
  tested: (
    <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <rect x="8" y="12" width="72" height="48" rx="5" fill="var(--blue-wash)" stroke="currentColor" strokeWidth="1.6" />
      <path d="M16 46 30 30l11 12 16-22 9 12" stroke="var(--blue)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="30" cy="30" r="2.4" fill="var(--ink)" />
      <circle cx="57" cy="20" r="2.4" fill="var(--blue)" />
      <path d="M30 70h28M38 70v8M50 70v8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="72" cy="72" r="12" fill="var(--blue)" />
      <path d="M66 72.5 70 76.5 79 67" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  owned: (
    <svg viewBox="0 0 88 88" fill="none" aria-hidden="true">
      <rect x="10" y="16" width="40" height="54" rx="3" fill="var(--blue-wash)" stroke="currentColor" strokeWidth="1.6" />
      <path d="M18 30h24M18 40h20M18 50h22" stroke="currentColor" strokeWidth="1.6" />
      <rect x="38" y="26" width="40" height="50" rx="3" fill="var(--paper)" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="58" cy="46" r="8" stroke="var(--blue)" strokeWidth="1.8" />
      <path d="M58 54v14l5-3.5 5 3.5V61" stroke="var(--blue)" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  ),
} as const

export type PrincipleArtKind = keyof typeof arts

export function PrincipleArt({ kind }: { kind: PrincipleArtKind }) {
  return <div className="principle__art">{arts[kind]}</div>
}
