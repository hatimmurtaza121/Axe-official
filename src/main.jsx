import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import heroArtwork from './assets/axe-automation-hero.png'
import './styles.css'

const contactEmail = 'info@axe-official.com'
const instagramUrl = 'https://instagram.com/axe.0fficial'

function Mark({ light = false }) {
  return (
    <a className={`mark ${light ? 'mark--light' : ''}`} href="/" aria-label="Axe Official home">
      <span className="mark__symbol" aria-hidden="true"><i /><i /></span>
      <span>AXE<small>OFFICIAL</small></span>
    </a>
  )
}

function Arrow({ diagonal = false }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function Nav({ page = 'home' }) {
  const [open, setOpen] = useState(false)
  return (
    <header className="nav-shell">
      <nav className="nav wrap" aria-label="Main navigation">
        <Mark />
        <button className="menu-toggle" type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span /><span />
        </button>
        <div className={`nav__links ${open ? 'is-open' : ''}`}>
          <a href={page === 'home' ? '#services' : '/#services'} onClick={() => setOpen(false)}>What we build</a>
          <a href={page === 'home' ? '#work' : '/#work'} onClick={() => setOpen(false)}>Selected work</a>
          <a href="/careers.html">Careers</a>
          <a className="nav__cta" href={`mailto:${contactEmail}?subject=Workflow%20audit`}>
            Start a conversation <Arrow diagonal />
          </a>
        </div>
      </nav>
    </header>
  )
}

function WorkflowVisual() {
  const activities = [
    ['Client request received', '00:00'],
    ['Data verified & routed', '00:04'],
    ['Documents generated', '00:11'],
    ['Customer served', '< 00:20'],
  ]
  return (
    <div className="workflow-card" aria-label="Illustration of an automated customer workflow">
      <div className="workflow-card__top">
        <span><i className="live-dot" /> System live</span>
        <span className="mono">AXE / OPS-01</span>
      </div>
      <div className="workflow-card__metric">
        <span>AVERAGE SERVICE TIME</span>
        <strong>&lt;20<small>sec</small></strong>
        <em>From 4 minutes</em>
      </div>
      <div className="workflow-list">
        {activities.map(([label, time], index) => (
          <div className="workflow-row" key={label}>
            <span className="workflow-index">0{index + 1}</span>
            <span>{label}</span>
            <time>{time}</time>
          </div>
        ))}
      </div>
      <div className="workflow-card__footer">
        <span>Human touchpoints</span>
        <b>01</b>
        <span>Steps automated</span>
        <b>18</b>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Nav />
      <main>
        <section className="hero">
          <img className="hero__art" src={heroArtwork} alt="" />
          <div className="hero__wash" />
          <div className="wrap hero__grid">
            <div className="hero__copy reveal">
              <p className="eyebrow"><span>AI-FIRST SOFTWARE HOUSE</span><span>BUILDING GLOBALLY</span></p>
              <h1>Operations,<br /><em>engineered</em><br />to move.</h1>
              <p className="hero__lede">We turn manual, fragile workflows into secure software that runs fast, scales cleanly, and gives your team time back.</p>
              <div className="hero__actions">
                <a className="button button--lime" href={`mailto:${contactEmail}?subject=Free%20workflow%20audit`}>Find what to automate <Arrow /></a>
                <a className="text-link" href="#work">See the outcomes <Arrow diagonal /></a>
              </div>
              <p className="micro-proof"><i className="live-dot" /> Taking on select automation projects</p>
            </div>
            <div className="hero__visual reveal reveal--delay">
              <WorkflowVisual />
            </div>
          </div>
          <div className="wrap proof-bar">
            <span>AI AUTOMATION</span><i />
            <span>INTERNAL TOOLS</span><i />
            <span>CLIENT PORTALS</span><i />
            <span>PRODUCTION AI</span><i />
            <span>WEB EXPERIENCES</span>
          </div>
        </section>

        <section className="statement section">
          <div className="wrap statement__grid">
            <p className="section-label">01 / THE SHIFT</p>
            <div>
              <h2 className="display-copy reveal">Your best people should not be doing work a system can do <em>better.</em></h2>
              <p className="statement__body reveal">Every repetitive handoff adds cost, delay, and room for error. Axe studies how your business actually moves—then builds the operational layer that removes the drag.</p>
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="wrap">
            <div className="section-head">
              <p className="section-label">02 / WHAT WE BUILD</p>
              <p>Designed around your operation.<br />Built to outlast the workaround.</p>
            </div>
            <div className="service-grid">
              <article className="service-card service-card--accent reveal">
                <span className="service-card__number">01</span>
                <div className="service-card__icon flow-icon" aria-hidden="true"><i /><i /><i /></div>
                <h3>Workflow automation</h3>
                <p>Multi-step processes that validate, route, update, notify, and complete themselves—with human approval only where it matters.</p>
                <ul><li>Operations & finance</li><li>Documents & data entry</li><li>Cross-tool integrations</li></ul>
              </article>
              <article className="service-card reveal">
                <span className="service-card__number">02</span>
                <div className="service-card__icon window-icon" aria-hidden="true"><i /><i /><i /></div>
                <h3>Internal apps & portals</h3>
                <p>One calm, purpose-built workspace for your team, clients, sites, records, and approvals—without the spreadsheet sprawl.</p>
                <ul><li>Operations dashboards</li><li>Client & site portals</li><li>Role-based access</li></ul>
              </article>
              <article className="service-card reveal">
                <span className="service-card__number">03</span>
                <div className="service-card__icon spark-icon" aria-hidden="true"><i /><i /></div>
                <h3>Applied AI systems</h3>
                <p>Production AI that reads, reasons, and acts inside real workflows. Self-hosted when the data, latency, or economics demand it.</p>
                <ul><li>Document intelligence</li><li>Computer vision</li><li>Private AI infrastructure</li></ul>
              </article>
              <article className="service-card reveal">
                <span className="service-card__number">04</span>
                <div className="service-card__icon globe-icon" aria-hidden="true"><i /><i /></div>
                <h3>Digital products</h3>
                <p>Websites and software products with a sharp interface, conversion-aware thinking, and an architecture ready to grow.</p>
                <ul><li>Business websites</li><li>Custom web apps</li><li>Scalable foundations</li></ul>
              </article>
            </div>
          </div>
        </section>

        <section className="work section" id="work">
          <div className="wrap">
            <div className="section-head section-head--light">
              <p className="section-label">03 / SELECTED OUTCOMES</p>
              <h2>Less friction.<br /><em>More throughput.</em></h2>
            </div>
            <article className="case case--featured reveal">
              <div className="case__topline"><span>OPERATIONS AUTOMATION / CSR</span><span>CASE 001</span></div>
              <div className="case__content">
                <div className="case__metric">
                  <span>Average time to serve</span>
                  <strong>4:00</strong><i /><strong>&lt;0:20</strong>
                </div>
                <div className="case__story">
                  <h3>From waiting minutes<br />to moving in seconds.</h3>
                  <p>We rebuilt a CSR company’s operational and finance workflows around a custom internal app. Repetitive steps disappeared, handoffs tightened, and the average customer service time dropped by more than 90%.</p>
                  <div className="tag-row"><span>INTERNAL APP</span><span>FINANCE OPS</span><span>AUTOMATION</span></div>
                </div>
              </div>
            </article>
            <div className="case-grid">
              <article className="case case--small reveal">
                <div className="case__topline"><span>NOOR CHEMICAL</span><span>CASE 002</span></div>
                <h3>One operating system for sites, clients, and documents.</h3>
                <p>A full business portal that replaced manual entries and document preparation with connected, repeatable workflows.</p>
                <div className="case-diagram" aria-hidden="true">
                  <span>SITES</span><i /><span>AXE CORE</span><i /><span>CLIENTS</span>
                </div>
              </article>
              <article className="case case--small case--visual reveal">
                <div className="case__topline"><span>PRIVATE AI INFRASTRUCTURE</span><span>CASE 003</span></div>
                <h3>Computer vision,<br />kept close to the data.</h3>
                <p>A visual challenge-recognition system deployed on a client-managed local GPU for low-latency, private inference.</p>
                <div className="vision-grid" aria-hidden="true">{Array.from({ length: 24 }).map((_, i) => <i key={i} />)}</div>
              </article>
            </div>
          </div>
        </section>

        <section className="principles section">
          <div className="wrap">
            <div className="section-head">
              <p className="section-label">04 / BUILT FOR REALITY</p>
              <h2>Fast is useful.<br /><em>Durable is better.</em></h2>
            </div>
            <div className="principle-grid">
              {[
                ['01', 'Minimal touch', 'Automate the repeatable. Keep people in control of the decisions that carry risk or nuance.'],
                ['02', 'Secure by design', 'Access, data boundaries, auditability, and failure modes are designed before launch—not patched in later.'],
                ['03', 'Ready to scale', 'We build for the next order of magnitude, without burdening today’s project with needless complexity.'],
                ['04', 'Owned by you', 'Clear systems, documented logic, and no mystery layer between your business and the software running it.'],
              ].map(([n, title, text]) => (
                <article key={title} className="principle reveal">
                  <span>{n}</span><h3>{title}</h3><p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="process section" id="process">
          <div className="wrap process__grid">
            <div>
              <p className="section-label">05 / HOW WE MOVE</p>
              <h2>Prove the value.<br />Then <em>compound it.</em></h2>
              <p className="process__intro">No months of theatre before something works. We choose a meaningful workflow, ship the smallest complete system, measure it, and expand from evidence.</p>
              <a className="text-link" href={`mailto:${contactEmail}?subject=Map%20my%20workflow`}>Map your first workflow <Arrow /></a>
            </div>
            <ol className="process-list">
              {[
                ['Observe', 'Trace the work, bottlenecks, edge cases, and cost of the current process.'],
                ['Architect', 'Define the measurable outcome and design the leanest reliable system.'],
                ['Build', 'Ship in tight loops with working software visible from the start.'],
                ['Scale', 'Monitor, strengthen, and extend what proves its value.'],
              ].map(([title, text], i) => (
                <li key={title} className="reveal"><span>0{i + 1}</span><h3>{title}</h3><p>{text}</p></li>
              ))}
            </ol>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  )
}

const jobs = [
  {
    title: 'Forward Deployed Engineer',
    type: 'Engineering · Full-time',
    blurb: 'Work directly with clients, understand messy real-world operations, and turn them into reliable software at speed.',
    skills: ['Product thinking', 'Full-stack engineering', 'Client-facing ownership'],
  },
  {
    title: 'AI Automation Engineer',
    type: 'AI & Automation · Full-time',
    blurb: 'Design agents, integrations, and resilient workflows that move business data and decisions safely.',
    skills: ['LLM systems', 'Workflow orchestration', 'APIs & integrations'],
  },
  {
    title: 'QA Engineer',
    type: 'Quality · Full-time',
    blurb: 'Build the test strategy and safeguards that keep high-speed delivery stable in production.',
    skills: ['Automation testing', 'Risk-based QA', 'Release confidence'],
  },
  {
    title: 'Product Designer',
    type: 'Design · Full-time',
    blurb: 'Turn complex operational systems into interfaces that feel obvious, calm, and fast.',
    skills: ['Product UX', 'Visual systems', 'Prototyping'],
  },
]

function CareersPage() {
  return (
    <>
      <Nav page="careers" />
      <main>
        <section className="careers-hero">
          <div className="careers-orbit" aria-hidden="true"><i /><i /><i /><span>AXE</span></div>
          <div className="wrap careers-hero__content reveal">
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
            <div className="job-list">
              {jobs.map((job, index) => (
                <article className="job reveal" key={job.title}>
                  <span className="job__number">0{index + 1}</span>
                  <div className="job__main">
                    <p>{job.type}</p>
                    <h3>{job.title}</h3>
                    <p className="job__blurb">{job.blurb}</p>
                    <div className="tag-row">{job.skills.map(skill => <span key={skill}>{skill}</span>)}</div>
                  </div>
                  <a href={`mailto:careers@axe-official.com?subject=Application%20—%20${encodeURIComponent(job.title)}`} aria-label={`Apply for ${job.title}`}>Apply <Arrow diagonal /></a>
                </article>
              ))}
            </div>
            <p className="openings__note">Don’t see your exact role? If you can make Axe sharper, write to <a href="mailto:careers@axe-official.com">careers@axe-official.com</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Contact() {
  return (
    <section className="contact section" id="contact">
      <div className="contact__glow" />
      <div className="wrap contact__content reveal">
        <p className="section-label">YOUR NEXT BOTTLENECK</p>
        <h2>Show us the work<br />your team <em>hates doing.</em></h2>
        <p>We’ll help you identify the first workflow worth automating—based on time saved, risk removed, and value created.</p>
        <a className="button button--lime" href={`mailto:${contactEmail}?subject=Let%27s%20automate%20this&body=The%20workflow%20I%20want%20to%20improve%20is%3A%0A%0A`}>
          Start with one workflow <Arrow />
        </a>
        <span className="contact__reassurance">No hard sell. Just a useful first conversation.</span>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap footer__top">
        <Mark light />
        <p>AI-first software for<br />operations that refuse to stand still.</p>
        <div><span>START A PROJECT</span><a href={`mailto:${contactEmail}`}>{contactEmail} <Arrow diagonal /></a></div>
      </div>
      <div className="wrap footer__bottom">
        <span>© {new Date().getFullYear()} AXE OFFICIAL</span>
        <div><a href={instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM ↗</a><a href="/careers.html">CAREERS</a></div>
        <span>axe-official.com</span>
      </div>
    </footer>
  )
}

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return document.body.dataset.page === 'careers' ? <CareersPage /> : <HomePage />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
