import { jobs, site } from '@/lib/site'
import { Arrow } from './Arrow'

export function CareersPage() {
  return (
    <main id="main-content">
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
          <div className="section-head section-head--light">
            <p className="section-label">OPEN POSITIONS / 04</p>
            <h2>Find your<br /><em>sharp edge.</em></h2>
          </div>
          <p className="openings__context">Role location and engagement terms vary by project and are confirmed before the first interview.</p>
          <div className="job-list">
            {jobs.map((job, index) => (
              <article className="job reveal" key={job.title}>
                <span className="job__number">0{index + 1}</span>
                <div className="job__main">
                  <p>{job.type}</p>
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
                <a href={`mailto:${site.careersEmail}?subject=Application%20—%20${encodeURIComponent(job.title)}&body=Please%20include%20your%20CV%20or%20portfolio%20and%20a%20short%20note%20about%20why%20this%20role%20fits.`} aria-label={`Apply for ${job.title}`}>Apply <Arrow diagonal /></a>
              </article>
            ))}
          </div>
          <p className="openings__note">Don’t see your exact role? If you can make Axe sharper, write to <a href={`mailto:${site.careersEmail}`}>{site.careersEmail}</a>.</p>
        </div>
      </section>
    </main>
  )
}
