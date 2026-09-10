# Axe Official — Project Overview

## 1. Purpose

Axe Official is a public marketing website for an AI-first software house. It presents the company’s services, selected outcomes, delivery principles, careers, legal information, and contact paths.

The site focuses on:

- AI and workflow automation
- Internal tools and operational platforms
- Client and site portals
- Production AI and computer vision
- Business websites and custom web applications

This repository contains the public website plus a small Cloudflare Worker that emails project briefs. It does not contain a database, authentication system, CMS, or analytics service.

## 2. Technology

- Next.js 16 App Router
- React 19
- TypeScript
- Next.js Image Optimization (`next/image`)
- Next.js Font Optimization (`next/font`)
- Global CSS for layout, responsive design, and animation
- ESLint with `eslint-config-next`

Recommended runtime:

- Node.js 24.x
- npm 10 or newer

Pages are statically generated at build time. Interactive pieces (navigation, contact form, reveal animations) hydrate as client components.

## 3. Project Structure

```text
Axe-official/
├── cloudflare/contact-worker/
├── public/brand/
├── src/
│   ├── app/
│   │   ├── api/contact/route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── careers/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── assets/
│   ├── components/
│   └── lib/
├── next.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

Generated folders:

- `node_modules/` contains installed dependencies.
- `.next/` contains the Next.js build.
- Both folders are excluded from Git.

## 4. Routes

| URL | Page |
| --- | --- |
| `/` | Home |
| `/careers` | Careers |
| `/privacy` | Privacy |
| `/terms` | Terms |

Permanent redirects keep older `.html` bookmarks working:

- `/careers.html` → `/careers`
- `/privacy.html` → `/privacy`
- `/terms.html` → `/terms`

## 5. Main Components

- `Nav` — shared navigation, mobile menu, keyboard handling
- `Footer` — identity, emails, Instagram, legal links
- `HomePage` — hero, services, case studies, principles, process
- `SignalField` — GPU-friendly SVG line animation
- `WorkflowVisual` — hero service-time card
- `Contact` — custom dropdown, inline validation, POST to `/api/contact`
- `CareersPage` — culture and open roles
- `LegalPage` — privacy and terms
- `RevealObserver` — one-time intersection observer for entrance motion
- `HashScroll` — scrolls to a home-page hash after navigation

Shared copy, emails, jobs, and legal text live in `src/lib/site.ts`.

## 6. Performance

- Statically generated HTML for every public page
- Self-hosted Manrope and DM Mono through `next/font`
- Hero image loads with `priority`; later images use responsive `sizes`
- AVIF/WebP negotiation through Next.js image optimization
- Animations use `transform` and `opacity` with `translate3d` to stay on the compositor
- Reveal observers unobserve after the first appearance
- `prefers-reduced-motion` disables decorative animation

## 7. Contact Behavior

The brief is posted to `/api/contact`, which forwards it to the Cloudflare Worker. The worker emails `info@axeofficial.com`. Careers apply links still use mailto.

- Project inquiries: `info@axeofficial.com`
- Support: `support@axeofficial.com`
- Careers: `careers@axeofficial.com`

## 8. Local Development

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
http://localhost:3000/careers
http://localhost:3000/privacy
http://localhost:3000/terms
```

## 9. Quality Checks

```bash
npm run lint
npm run build
npm start
```

## 10. Deployment

The website is intended for **Vercel** (Next.js, image optimization, `/api/contact`). The contact email worker stays on **Cloudflare**.

Vercel needs these server environment variables:

- `CONTACT_WORKER_URL`
- `CONTACT_WORKER_SECRET`

Do not commit `.env`. Keep DNS on Cloudflare if Email Routing should continue to work; point the web hostname at Vercel.
