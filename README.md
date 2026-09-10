# Axe Official

Marketing website for Axe Official, an AI-first software house focused on workflow automation, internal applications, portals, and production AI.

## Pages

- `/` — company positioning, services, outcomes, delivery principles, and contact
- `/careers` — culture and open roles
- `/privacy` — privacy notice
- `/terms` — website terms

Older `.html` URLs redirect to these routes.

## Local development

Requires Node.js 22.

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Contact form

The project brief is posted to `/api/contact`, which forwards it to a Cloudflare Worker. The worker emails `info@axeofficial.com`. Use Cloudflare Email Routing to forward that address to your personal inbox.

1. Deploy the worker in `cloudflare/contact-worker`.
2. Create a send-from address such as `noreply@axeofficial.com`.
3. Set a worker secret named `CONTACT_SECRET`.
4. Copy `.env.example` to `.env` and add the worker URL plus the same secret.

## Deploy on Vercel

The website is a Next.js app and deploys from the repository root. The Cloudflare Worker stays on Cloudflare; Vercel only hosts the site and `/api/contact`.

1. Commit the current site and push `main` to GitHub. Do not commit `.env`.
2. Open [vercel.com](https://vercel.com), import `hatimmurtaza121/Axe-official`, and leave the root directory as `.`.
3. Add these environment variables for **Production** and **Preview**:
   - `CONTACT_WORKER_URL` — `https://axe-contact.axeofficial.workers.dev`
   - `CONTACT_WORKER_SECRET` — the same value as the worker secret `CONTACT_SECRET`
4. Deploy, then open the `.vercel.app` URL and send a test brief.
5. In Vercel → Project → Settings → Domains, add `axeofficial.com` and `www.axeofficial.com`.
6. Keep DNS on Cloudflare so Email Routing still works. Point the site at Vercel:
   - `www` CNAME → `cname.vercel-dns.com`
   - apex `@` CNAME (flatten) → `cname.vercel-dns.com`
   - leave existing MX / Email Routing records unchanged

## Scripts

```bash
npm run build
npm start
npm run lint
```

## Design research

The site combines selected patterns observed across ten automation and AI software companies while retaining an original Axe identity:

1. NineTwoThree — measurable outcomes and a clear delivery process
2. Autviz — visual demonstration of automation in action
3. Intuz — production reliability over prototype theatre
4. EffectiveSoft — enterprise-grade integration and governance
5. HatchWorks AI — practical AI transformation positioning
6. Azumo — technical capability presented in business language
7. Makeitfuture — one-metric ROI framing and security reassurance
8. O8 — outcome definition before technology selection
9. Rapidops — bold editorial typography and case-study metrics
10. Xyonix — custom systems built around specific operational problems

The implementation does not copy text, layouts, branding, or assets from these websites.
