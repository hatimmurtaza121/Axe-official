import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-500.css'
import '@fontsource/manrope/latin-600.css'
import '@fontsource/manrope/latin-700.css'
import '@fontsource/dm-mono/latin-400.css'
import '@fontsource/dm-mono/latin-500.css'
import heroArtwork from './assets/axe-automation-hero.webp'
import vendorAxeScreenshot from './assets/vendor-axe-erp.webp'
import vendorAxeModules from './assets/vendor-axe-modules.webp'
import './styles.css'

const contactEmail = 'info@axeofficial.com'
const supportEmail = 'support@axeofficial.com'
const careersEmail = 'careers@axeofficial.com'
const instagramUrl = 'https://instagram.com/axe.0fficial'

function Mark({ light = false }) {
  return (
    <a className={`mark ${light ? 'mark--light' : ''}`} href="/">
      <img className="mark__symbol" src="/brand/axe-icon.webp" alt="" />
      <span>AXE<small>OFFICIAL</small></span>
    </a>
  )
}

function Arrow({ diagonal = false }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function Nav({ page = 'home' }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const toggleRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const focusable = [toggleRef.current, ...menuRef.current.querySelectorAll('a')]
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        setOpen(false)
        toggleRef.current.focus()
      }
      if (event.key === 'Tab') {
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first.focus()
        }
      }
    }

    document.body.classList.add('menu-open')
    menuRef.current.querySelector('a')?.focus()
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.classList.remove('menu-open')
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <header className="nav-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <nav className="nav wrap" aria-label="Main navigation">
        <Mark />
        <button
          ref={toggleRef}
          className={`menu-toggle ${open ? 'is-open' : ''}`}
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-controls="site-menu"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
        <div id="site-menu" ref={menuRef} className={`nav__links ${open ? 'is-open' : ''}`}>
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

function SignalField() {
  const paths = [
    'M-80 190 C120 40 260 340 460 180 S760 40 980 210',
    'M-80 230 C130 80 280 370 480 220 S770 80 980 250',
    'M-80 270 C140 120 300 400 500 260 S790 120 980 290',
    'M-80 310 C150 160 320 430 520 300 S810 160 980 330',
    'M-80 350 C160 200 340 460 540 340 S830 200 980 370',
    'M-80 390 C170 240 360 490 560 380 S850 240 980 410',
  ]
  return (
    <svg className="signal-field" viewBox="0 0 900 560" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="signal-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2268ff" />
          <stop offset="52%" stopColor="#68a6ff" />
          <stop offset="100%" stopColor="#dfff64" />
        </linearGradient>
      </defs>
      <g>{paths.map((path, index) => <path key={path} d={path} style={{ '--line': index }} />)}</g>
    </svg>
  )
}

function WorkflowVisual() {
  const activities = [
    ['Client request received', '00:00', 'PT0S'],
    ['Data verified & routed', '00:04', 'PT4S'],
    ['Documents generated', '00:11', 'PT11S'],
    ['Customer served', '< 00:20', 'PT20S'],
  ]
  return (
    <div className="workflow-card" role="group" aria-label="Illustration of an automated customer workflow">
      <div className="workflow-card__top">
        <span><i className="live-dot" /> Verified case result</span>
        <span className="mono">CSR / CASE 001</span>
      </div>
      <div className="workflow-card__metric">
        <span>AVERAGE SERVICE TIME</span>
        <strong>&lt;20<small>sec</small></strong>
        <em>From 4 minutes</em>
      </div>
      <div className="workflow-list">
        {activities.map(([label, time, dateTime], index) => (
          <div className="workflow-row" key={label}>
            <span className="workflow-index">0{index + 1}</span>
            <span>{label}</span>
            <time dateTime={dateTime}>{time}</time>
          </div>
        ))}
      </div>
      <div className="workflow-card__footer">
        <span>Previous average</span>
        <b>4m</b>
        <span>New average</span>
        <b>&lt;20s</b>
      </div>
    </div>
  )
}

function HomePage() {
  return (
    <>
      <Nav />
      <main id="main-content">
        <section className="hero">
          <img className="hero__art" src={heroArtwork} alt="" width="1280" height="720" fetchPriority="high" />
          <SignalField />
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
              <p className="statement__body reveal">Every repetitive handoff adds cost, delay, and room for error. Axe studies how your business actually moves—then builds the operational layer that saves time, lowers operating cost, and removes the drag.</p>
            </div>
          </div>
          <div className="wrap fit-strip reveal">
            <span>BEST FIT</span>
            <p>Manufacturers & distributors</p>
            <p>Service businesses</p>
            <p>Operations-heavy teams</p>
            <p>Startups outgrowing spreadsheets</p>
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
                <h3>Remove repetitive operations</h3>
                <p>Multi-step processes that validate, route, update, notify, and complete themselves—with human approval only where it matters.</p>
                <ul><li>Operations & finance</li><li>Documents & data entry</li><li>Cross-tool integrations</li></ul>
              </article>
              <article className="service-card reveal">
                <span className="service-card__number">02</span>
                <div className="service-card__icon window-icon" aria-hidden="true"><i /><i /><i /></div>
                <h3>Replace spreadsheet operations</h3>
                <p>One calm, purpose-built workspace for your team, clients, sites, records, and approvals—without the spreadsheet sprawl.</p>
                <ul><li>Operations dashboards</li><li>Client & site portals</li><li>Role-based access</li></ul>
              </article>
              <article className="service-card reveal">
                <span className="service-card__number">03</span>
                <div className="service-card__icon spark-icon" aria-hidden="true"><i /><i /></div>
                <h3>Automate document & visual work</h3>
                <p>Production AI that reads, reasons, and acts inside real workflows. Self-hosted when the data, latency, or economics demand it.</p>
                <ul><li>Document intelligence</li><li>Computer vision</li><li>Private AI infrastructure</li></ul>
              </article>
              <article className="service-card reveal">
                <span className="service-card__number">04</span>
                <div className="service-card__icon globe-icon" aria-hidden="true"><i /><i /></div>
                <h3>Launch software customers use</h3>
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
              <div className="case__topline"><span>ANONYMIZED CLIENT / CUSTOMER SERVICE BUSINESS</span><span>CASE 001</span></div>
              <div className="case__content">
                <div className="case__metric">
                  <span>Average time to serve</span>
                  <strong>4:00</strong><i /><strong>&lt;0:20</strong>
                </div>
                <div className="case__story">
                  <h3>From waiting minutes<br />to moving in seconds.</h3>
                  <dl className="case-facts">
                    <div><dt>Problem</dt><dd>Manual operations and finance steps held average customer service time at four minutes.</dd></div>
                    <div><dt>Solution</dt><dd>A custom internal app connected the workflow and removed repetitive handoffs.</dd></div>
                    <div><dt>Timeline</dt><dd>Not publicly disclosed.</dd></div>
                    <div><dt>Measured result</dt><dd>Average service time fell to under 20 seconds—a reduction of more than 90%.</dd></div>
                  </dl>
                  <div className="tag-row"><span>INTERNAL APP</span><span>FINANCE OPS</span><span>AUTOMATION</span></div>
                </div>
              </div>
            </article>
            <div className="case-grid">
              <article className="case case--small reveal">
                <div className="case__topline"><span>NOOR CHEMICALS / WATERPROOFING</span><span>CASE 002</span></div>
                <h3>One operating system for sites, clients, and documents.</h3>
                <dl className="case-facts">
                  <div><dt>Problem</dt><dd>Site, client, data-entry, and document work was spread across manual processes.</dd></div>
                  <div><dt>Solution</dt><dd>A full internal portal connected site and client management with automated entries and document generation.</dd></div>
                  <div><dt>Timeline</dt><dd>Not publicly disclosed.</dd></div>
                  <div><dt>Outcome</dt><dd>One repeatable operating flow with fewer manual steps and faster document handling.</dd></div>
                </dl>
                <a className="case-link" href="https://noorchemical.com/" target="_blank" rel="noreferrer">Visit Noor Chemicals <Arrow diagonal /></a>
                <div className="case-diagram" aria-hidden="true">
                  <span>SITES</span><i /><span>AXE CORE</span><i /><span>CLIENTS</span>
                </div>
              </article>
              <article className="case case--small case--visual reveal">
                <div className="case__topline"><span>ANONYMIZED CLIENT / PRIVATE AI INFRASTRUCTURE</span><span>CASE 003</span></div>
                <h3>Computer vision,<br />kept close to the data.</h3>
                <p>A visual challenge-recognition system deployed on a client-managed local GPU for private, low-latency inference. Its public description intentionally excludes third-party access-control bypass details.</p>
                <div className="vision-grid" aria-hidden="true">{Array.from({ length: 24 }).map((_, i) => <i key={i} />)}</div>
              </article>
            </div>
            <article className="case case--product reveal">
              <div className="case__topline"><span>VENDOR AXE / SUBSCRIPTION ERP</span><span>CASE 004</span></div>
              <div className="case-product">
                <div className="case-product__story">
                  <p className="section-label">AXE-BUILT PRODUCT</p>
                  <h3>Major ERP workflows.<br />One calm subscription.</h3>
                  <dl className="case-facts">
                    <div><dt>Problem</dt><dd>Shops, distributors, and makers need shared control of stock, orders, manufacturing, and money without assembling disconnected tools.</dd></div>
                    <div><dt>Solution</dt><dd>A multi-tenant ERP spanning inventory, sales and purchasing, accounts, transactions, orders, returns, manufacturing, ledgers, reports, exports, and white-labeling.</dd></div>
                    <div><dt>Delivery</dt><dd>An ongoing subscription product with guided onboarding and configurable modules.</dd></div>
                    <div><dt>Outcome</dt><dd>A production PWA sold in Essentials, Complete, and Tailored plans, with tenant data isolated through row-level security.</dd></div>
                  </dl>
                  <a className="case-link" href="https://vendoraxe.com/" target="_blank" rel="noreferrer">Explore Vendor Axe <Arrow diagonal /></a>
                </div>
                <figure>
                  <div className="case-gallery">
                    <img src={vendorAxeScreenshot} alt="Vendor Axe product website showing its inventory command center" width="1440" height="900" loading="lazy" decoding="async" />
                    <img src={vendorAxeModules} alt="Vendor Axe subscription plans listing ERP modules" width="1440" height="800" loading="lazy" decoding="async" />
                  </div>
                  <figcaption>Live Vendor Axe product pages · September 2026</figcaption>
                </figure>
              </div>
            </article>
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
                ['01', 'Controlled automation', 'Automate the repeatable. Keep people in control of decisions that carry risk, money, or nuance.'],
                ['02', 'Secure & confidential', 'Access, data boundaries, auditability, and agreed confidentiality controls are designed before launch.'],
                ['03', 'Tested & monitored', 'Critical paths get automated checks, release review, monitoring, and recovery-ready backups where required.'],
                ['04', 'Owned & supported', 'Documented logic, handover-ready systems, no mystery lock-in, and an option for ongoing post-launch support.'],
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
              <div className="engagement-paths" aria-label="Ways to work with Axe">
                <span>Workflow audit</span><span>Focused automation</span><span>Internal platform</span><span>Ongoing automation partner</span>
              </div>
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
    type: 'Engineering',
    blurb: 'Work directly with clients, understand messy real-world operations, and turn them into reliable software at speed.',
    skills: ['Product thinking', 'Full-stack engineering', 'Client-facing ownership'],
    responsibilities: ['Map real client workflows and identify the highest-leverage build.', 'Ship full-stack solutions and stay close through production rollout.', 'Translate technical decisions into clear business trade-offs.'],
    profile: ['You move comfortably between users, systems, and code.', 'You can make progress with incomplete information without hiding risk.'],
  },
  {
    title: 'AI Automation Engineer',
    type: 'AI & Automation',
    blurb: 'Design agents, integrations, and resilient workflows that move business data and decisions safely.',
    skills: ['LLM systems', 'Workflow orchestration', 'APIs & integrations'],
    responsibilities: ['Build multi-step automations across client tools and data.', 'Design evaluations, guardrails, retries, and human approval points.', 'Monitor reliability, cost, and output quality after launch.'],
    profile: ['You understand where deterministic software should replace AI.', 'You treat edge cases and observability as product features.'],
  },
  {
    title: 'QA Engineer',
    type: 'Quality',
    blurb: 'Build the test strategy and safeguards that keep high-speed delivery stable in production.',
    skills: ['Automation testing', 'Risk-based QA', 'Release confidence'],
    responsibilities: ['Turn critical workflows into practical test strategies.', 'Build repeatable automated checks across UI, API, and integration layers.', 'Make failures easy to reproduce, prioritize, and prevent.'],
    profile: ['You test around business risk, not only acceptance criteria.', 'You communicate precisely and challenge assumptions constructively.'],
  },
  {
    title: 'Designer',
    type: 'Product Design',
    blurb: 'Turn complex operational systems into interfaces that feel obvious, calm, and fast.',
    skills: ['Product UX', 'Visual systems', 'Prototyping'],
    responsibilities: ['Observe workflows and turn complexity into clear interaction models.', 'Prototype, test, and refine internal tools and customer experiences.', 'Build visual systems that remain coherent as products grow.'],
    profile: ['Your portfolio shows decisions and outcomes, not only polished screens.', 'You can collaborate directly with engineers and business users.'],
  },
]

function CareersPage() {
  return (
    <>
      <Nav page="careers" />
      <main id="main-content">
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
            <p className="openings__context">Role location and engagement terms vary by project and are confirmed before the first interview.</p>
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
                  <details className="job__details">
                    <summary>Role details <span>+</span></summary>
                    <div>
                      <section>
                        <h4>What you’ll do</h4>
                        <ul>{job.responsibilities.map(item => <li key={item}>{item}</li>)}</ul>
                      </section>
                      <section>
                        <h4>You’ll thrive here if</h4>
                        <ul>{job.profile.map(item => <li key={item}>{item}</li>)}</ul>
                      </section>
                    </div>
                  </details>
                  <a href={`mailto:${careersEmail}?subject=Application%20—%20${encodeURIComponent(job.title)}&body=Please%20include%20your%20CV%20or%20portfolio%20and%20a%20short%20note%20about%20why%20this%20role%20fits.`} aria-label={`Apply for ${job.title}`}>Apply <Arrow diagonal /></a>
                </article>
              ))}
            </div>
            <p className="openings__note">Don’t see your exact role? If you can make Axe sharper, write to <a href={`mailto:${careersEmail}`}>{careersEmail}</a>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function Contact() {
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = [
      `Name: ${data.get('name')}`,
      `Company: ${data.get('company')}`,
      `Work email: ${data.get('email')}`,
      `Approximate monthly volume: ${data.get('volume')}`,
      '',
      'Workflow or bottleneck:',
      data.get('bottleneck'),
    ].join('\n')

    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(`Project brief — ${data.get('company')}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="contact section" id="contact">
      <div className="contact__glow" />
      <div className="wrap contact__grid">
        <div className="contact__content reveal">
          <p className="section-label">YOUR NEXT BOTTLENECK</p>
          <h2>Show us the work<br />your team <em>hates doing.</em></h2>
          <p>We’ll help identify the first workflow worth automating—based on time saved, risk removed, and value created.</p>
          <div className="contact__promise">
            <span>01</span><p>We review the workflow and volume</p>
            <span>02</span><p>A short call clarifies constraints and value</p>
            <span>03</span><p>You receive a free workflow opportunity map</p>
          </div>
        </div>
        <form className="brief-form reveal" onSubmit={handleSubmit}>
          <div className="field-row">
            <label>Name<input name="name" autoComplete="name" required /></label>
            <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
          </div>
          <label>Company<input name="company" autoComplete="organization" required /></label>
          <label>Approximate monthly volume
            <select name="volume" defaultValue="Not sure yet">
              <option>Under 100 items</option><option>100–1,000 items</option><option>1,000–10,000 items</option>
              <option>More than 10,000 items</option><option>Not sure yet</option>
            </select>
          </label>
          <label>Describe the workflow
            <textarea name="bottleneck" rows="4" placeholder="What happens today, and where does it slow down?" required />
          </label>
          <button className="button button--lime" type="submit">Prepare project brief <Arrow /></button>
          <p className="brief-form__note">This opens your email app with the brief prepared. Nothing is uploaded or tracked.</p>
          <a className="brief-form__calendar" href={`mailto:${contactEmail}?subject=Send%20me%20a%20calendar%20link`}>Prefer to choose a time? Request the calendar link <Arrow diagonal /></a>
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer>
      <div className="wrap footer__top">
        <a href="/" aria-label="Axe Official"><img className="footer-logo" src="/brand/axe-full.webp" alt="Axe Official — Automation for real growth" /></a>
        <p>AI-first software for<br />operations that refuse to stand still.</p>
        <div className="footer__contacts">
          <span>START A PROJECT</span><a href={`mailto:${contactEmail}`}>{contactEmail} <Arrow diagonal /></a>
          <span>CLIENT SUPPORT</span><a href={`mailto:${supportEmail}`}>{supportEmail} <Arrow diagonal /></a>
        </div>
      </div>
      <div className="wrap footer__bottom">
        <span>© {new Date().getFullYear()} AXE OFFICIAL</span>
        <div><a href={instagramUrl} target="_blank" rel="noreferrer">INSTAGRAM / axe.0fficial ↗</a><a href="/careers.html">CAREERS</a><a href="/privacy.html">PRIVACY</a><a href="/terms.html">TERMS</a></div>
        <span>axeofficial.com</span>
      </div>
    </footer>
  )
}

const legalContent = {
  privacy: {
    eyebrow: 'PRIVACY',
    title: 'Clear systems need clear boundaries.',
    intro: 'This notice explains what happens when you visit Axe Official online or contact us about a project.',
    sections: [
      ['Information you choose to share', 'When you email Axe Official, you may provide your name, work email, company, project details, CV, or portfolio. We use that information only to respond, evaluate the request, and continue the conversation you initiated.'],
      ['Website data', 'This website does not currently use advertising trackers, analytics cookies, or an on-site database for inquiry forms. The project brief opens your own email application; it does not upload form content to the website. Our hosting provider may process standard security and access logs.'],
      ['How information is handled', 'Access is limited to the people who need it for project or recruitment conversations. We retain correspondence only as long as it remains useful for that purpose or is required for legitimate business and legal records.'],
      ['External services', 'Links to Instagram and client websites take you to third-party services governed by their own privacy terms. Axe Official does not control those services.'],
      ['Your choices', `You can ask about, correct, or request deletion of information you sent us by writing to ${supportEmail}.`],
    ],
  },
  terms: {
    eyebrow: 'TERMS',
    title: 'The website is the introduction—not the contract.',
    intro: 'These terms cover use of the Axe Official website. Project work is governed by a separate written agreement.',
    sections: [
      ['Website use', 'You may use this website to learn about Axe Official, review open roles, and contact us. Do not attempt to disrupt the site, misuse its content, or access systems without authorization.'],
      ['Project information', 'Services, processes, and outcomes shown here describe our capabilities and selected past work. Every engagement depends on scope, data, integrations, and operating conditions. A proposal or project agreement defines the actual deliverables.'],
      ['Case-study outcomes', 'Results are presented from the information available for the relevant project and should not be treated as a guarantee that another business will achieve the same outcome.'],
      ['Intellectual property', 'The Axe Official name, visual identity, website design, and original content belong to Axe Official unless another owner is identified. Client names and third-party marks belong to their respective owners.'],
      ['Questions', `For website or service questions, contact ${contactEmail}. For support, contact ${supportEmail}.`],
    ],
  },
}

function LegalPage({ type }) {
  const content = legalContent[type]
  return (
    <>
      <Nav page="legal" />
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
      <Footer />
    </>
  )
}

export default function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('is-visible')),
      { threshold: 0.12 },
    )
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    const hashFrame = requestAnimationFrame(() => {
      const hashId = window.location.hash.slice(1)
      const target = hashId ? document.getElementById(hashId) : null
      target?.scrollIntoView()
    })
    return () => {
      observer.disconnect()
      cancelAnimationFrame(hashFrame)
    }
  }, [])

  const page = document.body.dataset.page
  if (page === 'careers') return <CareersPage />
  if (page === 'privacy' || page === 'terms') return <LegalPage type={page} />
  return <HomePage />
}

const root = globalThis.__axeRoot ?? createRoot(document.getElementById('root'))
globalThis.__axeRoot = root

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
