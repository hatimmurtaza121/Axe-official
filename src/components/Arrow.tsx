export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}
