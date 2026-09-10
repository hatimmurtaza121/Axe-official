import Image from 'next/image'
import heroArtwork from '@/assets/axe-automation-hero.webp'
import vendorAxeScreenshot from '@/assets/vendor-axe-erp.webp'
import vendorAxeModules from '@/assets/vendor-axe-modules.webp'
import { Arrow } from './Arrow'
import { Contact } from './Contact'
import { HashScroll } from './HashScroll'
import { SignalField } from './SignalField'
import { WorkflowVisual } from './WorkflowVisual'

export function HomePage() {
  return (
    <>
      <HashScroll />
      <main id="main-content">
        <section className="hero">
          <Image className="hero__art" src={heroArtwork} alt="" fill sizes="100vw" priority />
          <SignalField />
          <div className="hero__wash" />
          <div className="wrap hero__grid">
            <div className="hero__copy">
              <p className="eyebrow"><span>AI-FIRST SOFTWARE HOUSE</span><span>BUILDING GLOBALLY</span></p>
              <h1>Operations,<br /><em>engineered</em><br />to move.</h1>
              <p className="hero__lede">We turn manual, fragile workflows into secure software that runs fast, scales cleanly, and gives your team time back.</p>
              <div className="hero__actions">
                <a className="button button--lime" href="#contact">Find what to automate <Arrow /></a>
                <a className="text-link" href="#work">See the outcomes <Arrow diagonal /></a>
              </div>
              <p className="micro-proof"><i className="live-dot" /> Taking on select automation projects</p>
            </div>
            <div className="hero__visual">
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
                <a className="case-link" href="https://noorchemical.com/" target="_blank" rel="noopener noreferrer">Visit Noor Chemicals <Arrow diagonal /></a>
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
                  <a className="case-link" href="https://vendoraxe.com/" target="_blank" rel="noopener noreferrer">Explore Vendor Axe <Arrow diagonal /></a>
                </div>
                <figure>
                  <div className="case-gallery">
                    <Image src={vendorAxeScreenshot} alt="Vendor Axe product website showing its inventory command center" width={1440} height={900} sizes="(max-width: 900px) 100vw, 50vw" />
                    <Image src={vendorAxeModules} alt="Vendor Axe subscription plans listing ERP modules" width={1440} height={800} sizes="(max-width: 900px) 100vw, 30vw" />
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
              <a className="text-link" href="#contact">Map your first workflow <Arrow /></a>
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
    </>
  )
}
