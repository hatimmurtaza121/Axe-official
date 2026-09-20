import Image from 'next/image'
import vendorAxeScreenshot from '@/assets/vendor-axe-erp.webp'
import vendorAxeModules from '@/assets/vendor-axe-modules.webp'
import { products } from '@/lib/site'
import { Arrow } from './Arrow'

export function ProductsPage() {
  const [vendorAxe] = products

  return (
    <main id="main-content">
      <section className="careers-hero">
        <div className="careers-orbit" aria-hidden="true">
          <div className="careers-orbit__ring"><i /><i /><i /></div>
          <div className="careers-orbit__core"><span>AXE</span></div>
        </div>
        <div className="wrap careers-hero__content">
          <p className="eyebrow"><span>PRODUCTS FROM AXE&nbsp;OFFICIAL</span><span>SEPARATE FROM SERVICES</span></p>
          <h1>Software we<br /><em>own</em> and<br /><em>ship.</em></h1>
          <p>Axe Official is the software house. These are ready-to-use products we built and operate—not custom client work.</p>
          <a className="button button--lime" href="#catalog">View products <Arrow /></a>
        </div>
      </section>

      <section className="career-manifesto section">
        <div className="wrap statement__grid">
          <p className="section-label">THE DISTINCTION</p>
          <div>
            <h2 className="display-copy">Services solve your operation.<br /><em>Products run on their own.</em></h2>
            <p className="statement__body">Hire Axe to automate a workflow, replace a spreadsheet, or build an internal system. Use an Axe product when you need a finished subscription tool without a custom build.</p>
          </div>
        </div>
        <div className="wrap culture-grid culture-grid--pair">
          {[
            ['01', 'Services', 'Custom software designed around how your team already works.'],
            ['02', 'Products', 'Axe-owned systems you can subscribe to and start using.'],
          ].map(([n, title, text]) => (
            <article key={title}><span>{n}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="openings section" id="catalog">
        <div className="wrap">
          <div className="section-head section-head--light openings__head">
            <p className="section-label">AXE-BUILT PRODUCTS / 0{products.length}</p>
            <h2>Live products.<br /><em>Ready to use.</em></h2>
          </div>
          <p className="openings__context">Each product has its own site. This page is the index—not a second homepage for the product.</p>
          <article className="case case--product product-card reveal">
            <div className="case__topline"><span>{vendorAxe.name.toUpperCase()} / {vendorAxe.category.toUpperCase()}</span><span>{vendorAxe.code}</span></div>
            <div className="case-product">
              <div className="case-product__story">
                <p className="section-label">AXE-BUILT PRODUCT</p>
                <h3>{vendorAxe.tagline[0]}<br />{vendorAxe.tagline[1]}</h3>
                <dl className="case-facts">
                  <div><dt>Problem</dt><dd>{vendorAxe.problem}</dd></div>
                  <div><dt>Solution</dt><dd>{vendorAxe.solution}</dd></div>
                  <div><dt>Delivery</dt><dd>{vendorAxe.delivery}</dd></div>
                  <div><dt>Outcome</dt><dd>{vendorAxe.outcome}</dd></div>
                </dl>
                <a className="case-link" href={vendorAxe.url} target="_blank" rel="noopener noreferrer">Explore Vendor Axe <Arrow diagonal /></a>
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
    </main>
  )
}
