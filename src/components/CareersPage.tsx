import { jobs } from '@/lib/site'
import { ApplyForm } from './ApplyForm'
import { Arrow } from './Arrow'
import { HashScroll } from './HashScroll'

export function CareersPage() {
  return (
    <main id="main-content">
      <HashScroll />
      <section className="careers-hero">
        <div className="careers-orbit" aria-hidden="true">
          <div className="careers-orbit__ring"><i /><i /><i /></div>
          <div className="careers-orbit__core"><span>AXE</span></div>
        </div>
        <div className="wrap careers-hero__content">
          <p className="eyebrow"><span>CAREERS AT AXE</span><span>BUILD WHAT MOVES BUSINESS</span></p>
          <h1>For people who<br />move <em>fast</em> and<br />think <em>deep.</em></h1>
          <p>Join an AI-first software house where the distance between a hard problem and a working solution is deliberately short.</p>
          <a className="button button--lime" href="#openings">View open roles <Arrow /></a>
        </div>
      </section>

      <section className="career-manifesto section">
        <div className="wrap statement__grid">
          <p className="section-label">THE OPERATING IDEA</p>
          <div>
            <h2 className="display-copy">High agency.<br />Low ego.<br /><em>Real ownership.</em></h2>
            <p className="statement__body">We care about speed, but never confuse it with rushing. The standard is simple: understand the problem, make the call, build the thing, and leave the system stronger than you found it.</p>
          </div>
        </div>
        <div className="wrap culture-grid">
          {[
            ['01', 'Own the outcome', 'You are trusted with the problem, not handed a checklist.'],
            ['02', 'Stay close to reality', 'Talk to users. Watch the workflow. Test assumptions early.'],
            ['03', 'Build for day 400', 'Fast delivery and durable engineering belong in the same sentence.'],
          ].map(([n, title, text]) => (
            <article key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="openings section" id="openings">
        <div className="wrap">
          <div className="section-head section-head--light openings__head">
            <p className="section-label">OPEN POSITIONS / 04</p>
            <h2>Find your<br /><em>sharp edge.</em></h2>
          </div>
          <p className="openings__context">Location is on each role. Engagement terms are confirmed before the first interview.</p>
          <div className="job-list">
            {jobs.map((job, index) => (
              <article className="job reveal" key={job.title}>
                <span className="job__number">0{index + 1}</span>
                <div className="job__main">
                  <p>{job.type}<span className="job__place">{job.location}</span></p>
                  <h3>{job.title}</h3>
                  <p className="job__blurb">{job.blurb}</p>
                  <div className="tag-row">{job.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
                </div>
                <details className="job__details">
                  <summary>Role details <span>+</span></summary>
                  <div>
                    <section>
                      <h4>What you’ll do</h4>
                      <ul>{job.responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                    <section>
                      <h4>You’ll thrive here if</h4>
                      <ul>{job.profile.map((item) => <li key={item}>{item}</li>)}</ul>
                    </section>
                  </div>
                </details>
                <a className="job__apply" href={`/careers?role=${encodeURIComponent(job.title)}#apply`} aria-label={`Apply for ${job.title}`}>
                  Apply <Arrow />
                </a>
              </article>
            ))}
          </div>
          <div className="apply-panel" id="apply">
            <p className="section-label">APPLY</p>
            <h3>Tell us how you’d make Axe sharper.</h3>
            <p>Name, email, a role, your CV, and a short note. Add a portfolio or LinkedIn if you have one.</p>
            <ApplyForm />
          </div>
        </div>
      </section>
    </main>
  )
}
