import { legalContent, type LegalType } from '@/lib/site'

export function LegalPage({ type }: { type: LegalType }) {
  const content = legalContent[type]
  return (
    <main id="main-content" className="legal">
      <div className="wrap legal__hero">
        <p className="eyebrow"><span>{content.eyebrow}</span><span>LAST UPDATED 10 SEPTEMBER 2026</span></p>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
      </div>
      <div className="wrap legal__body">
        {content.sections.map(([title, text], index) => (
          <section key={title}><span>0{index + 1}</span><div><h2>{title}</h2><p>{text}</p></div></section>
        ))}
      </div>
    </main>
  )
}
