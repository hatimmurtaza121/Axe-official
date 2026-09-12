export const site = {
  name: 'Axe Official',
  domain: 'axeofficial.com',
  url: 'https://axeofficial.com',
  contactEmail: 'info@axeofficial.com',
  supportEmail: 'support@axeofficial.com',
  careersEmail: 'careers@axeofficial.com',
  instagramUrl: 'https://instagram.com/axe.0fficial',
  copyrightYear: 2026,
} as const

export const volumeOptions = [
  'Under 100 operations / month',
  '100–1,000 / month',
  '1,000–10,000 / month',
  'More than 10,000 / month',
  'Not sure yet',
] as const

export const jobs = [
  {
    title: 'Forward Deployed Engineer',
    type: 'Engineering',
    location: 'Remote',
    blurb: 'Work directly with clients, understand messy real-world operations, and turn them into reliable software at speed.',
    skills: ['Product thinking', 'Full-stack engineering', 'Client-facing ownership'],
    responsibilities: [
      'Map real client workflows and identify the highest-leverage build.',
      'Ship full-stack solutions and stay close through production rollout.',
      'Translate technical decisions into clear business trade-offs.',
    ],
    profile: [
      'You move comfortably between users, systems, and code.',
      'You can make progress with incomplete information without hiding risk.',
    ],
  },
  {
    title: 'AI Automation Engineer',
    type: 'AI & Automation',
    location: 'Hybrid',
    blurb: 'Design agents, integrations, and resilient workflows that move business data and decisions safely.',
    skills: ['LLM systems', 'Workflow orchestration', 'APIs & integrations'],
    responsibilities: [
      'Build multi-step automations across client tools and data.',
      'Design evaluations, guardrails, retries, and human approval points.',
      'Monitor reliability, cost, and output quality after launch.',
    ],
    profile: [
      'You understand where deterministic software should replace AI.',
      'You treat edge cases and observability as product features.',
    ],
  },
  {
    title: 'QA Engineer',
    type: 'Quality',
    location: 'Remote',
    blurb: 'Build the test strategy and safeguards that keep high-speed delivery stable in production.',
    skills: ['Automation testing', 'Risk-based QA', 'Release confidence'],
    responsibilities: [
      'Turn critical workflows into practical test strategies.',
      'Build repeatable automated checks across UI, API, and integration layers.',
      'Make failures easy to reproduce, prioritize, and prevent.',
    ],
    profile: [
      'You test around business risk, not only acceptance criteria.',
      'You communicate precisely and challenge assumptions constructively.',
    ],
  },
  {
    title: 'Designer',
    type: 'Product Design',
    location: 'Remote',
    blurb: 'Turn complex operational systems into interfaces that feel obvious, calm, and fast.',
    skills: ['Product UX', 'Visual systems', 'Prototyping'],
    responsibilities: [
      'Observe workflows and turn complexity into clear interaction models.',
      'Prototype, test, and refine internal tools and customer experiences.',
      'Build visual systems that remain coherent as products grow.',
    ],
    profile: [
      'Your portfolio shows decisions and outcomes, not only polished screens.',
      'You can collaborate directly with engineers and business users.',
    ],
  },
] as const

export const legalContent = {
  privacy: {
    eyebrow: 'PRIVACY',
    title: 'Clear systems need clear boundaries.',
    intro: 'This notice explains what happens when you visit Axe Official online or contact us about a project.',
    sections: [
      ['Information you choose to share', 'When you contact Axe Official, you may provide your name, work email, company, project details, CV, or portfolio. We use that information only to respond, evaluate the request, and continue the conversation you initiated.'],
      ['Website data', 'This website does not currently use advertising trackers or analytics cookies. If you submit the project brief, the details you enter are sent to Axe Official so we can reply. Our hosting provider may process standard security and access logs.'],
      ['How information is handled', 'Access is limited to the people who need it for project or recruitment conversations. We retain correspondence only as long as it remains useful for that purpose or is required for legitimate business and legal records.'],
      ['External services', 'Links to Instagram and client websites take you to third-party services governed by their own privacy terms. Axe Official does not control those services.'],
      ['Your choices', `You can ask about, correct, or request deletion of information you sent us by writing to ${site.supportEmail}.`],
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
      ['Questions', `For website or service questions, contact ${site.contactEmail}. For support, contact ${site.supportEmail}.`],
    ],
  },
} as const

export type LegalType = keyof typeof legalContent
