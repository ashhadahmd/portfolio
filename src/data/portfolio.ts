import { asset } from '@/src/lib/utils';

const email = 'ashhad.ahmed776@gmail.com';
const role = 'Fintech Software Engineer';
const company = 'Toko Labs';

export const portfolioData = {
  profile: {
    name: 'Ashhad Ahmed',
    role,
    company,
    email,
    location: 'Karachi, Pakistan',
    // Put the PDF in /public, then set this to asset('ashhad-ahmed-resume.pdf').
    resumeUrl: '',
    avatar: asset('avatar.jpg'),

    socials: {
      github: 'https://github.com/ashhadahmd',
      linkedin: 'https://linkedin.com/in/ashhad-ahmed',
    },

    coreStack: ['Python', 'Payment Systems', 'Ledgers', 'Automation'],
  },

  hero: {
    subhead: `${role} · ${company}`,
    headline: 'Financial engines.',
    headlineSecond: 'Built to never fail.',
    description:
      'I build Python backends, certified payment gateways, and automated systems that move money for millions of users.',
    primaryCta: { label: 'See the work', href: '#work' },
    secondaryCta: { label: 'Email me', href: `mailto:${email}` },
  },

  proof: {
    intro: 'System Scale & Impact',
    metrics: [
      {
        value: '10M+',
        label: "Active users powered across Toko Labs' fintech ecosystem (Rupin)",
      },
      {
        value: 'SAQ-D',
        label: 'Full PCI-DSS compliance audit delivered for Cobu Gateway',
      },
      {
        value: '10x',
        label: 'Workflow efficiency gained through automated scraping & data ingestion',
      },
    ],
    badges: [{ label: 'Rupin' }, { label: 'Cobu Gateway' }, { label: 'Data Automation' }],
  },

  caseStudies: [
    {
      slug: 'cobu-payment-gateway',
      title: 'Cobu — Certified Payment Gateway & Compliance',
      summary:
        'Engineered backend transaction settlement, integrated Mastercard Payment Gateway Services (MPGS), and isolated cardholder data behind a Visa and Mastercard certified payment gateway under strict PCI-DSS SAQ-D mandates.',
      impactHeadline: 'Certified by Visa and Mastercard',
      problem:
        'Cardholder data touched services that were never scoped to hold it, pulling the entire application estate into the PCI-DSS audit boundary.',
      solution:
        'Led backend architecture for transaction settlement and compliance, and built the Mastercard Payment Gateway Services (MPGS) integration. Enforced strict network segmentation to isolate the cardholder data environment, implemented edge tokenization, and built database-level idempotency keys. Sentry catches exceptions in the transaction path and routes them to on-call before a customer notices.',
      impact: [
        'Visa and Mastercard certification achieved for the Cobu gateway',
        'MPGS integration delivered for card payments',
        'PCI-DSS SAQ-D self-assessment successfully completed',
      ],
      stack: ['Django', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'Sentry', 'MPGS', 'PCI-DSS'],
      confidential: true,
      cover: {
        art: asset('covers/cobu-devices.webp'),
        accentRgb: '124, 58, 237',
        // White wordmark in both themes: on black in dark, on Cobu purple in light.
        logo: asset('logos/cobu-logo-dark.svg'),
        logoHeight: 26,
        pillLight: '#5B20F0',
        href: 'https://cobu.app/',
      },
    },
    {
      slug: 'rupin-digital-wallet',
      title: 'Rupin — Wallet & Payments',
      summary:
        "Rupin, formerly Udhaar Book, grew into the millions of users after its rebrand. I work on the backend behind its money movement: the wallet and ledger, QR and dynamic QR (DQR) payments, IBAN transfers, and virtual IBAN (VIBAN) payments.",
      impactHeadline: '10M+ active users served',
      problem:
        'Read-heavy endpoints and balance calculations were hitting Postgres directly on every request. As Rupin\'s user base grew past 10 million, those queries started competing with writes for the same connection pool, and response times degraded first for the heaviest users.',
      solution:
        "My scope covers the wallet, ledger, and payment services under that load, including QR and DQR payments, IBAN transfers, and VIBAN payments. Balance reads moved behind a Redis cache with a short TTL, invalidated on write, so the common case never touches Postgres. Slower background work, like statement generation and notification fan-out, moved off the request path onto Celery workers so it could queue and retry independently of the user-facing path. Request and worker logs feed into an ELK stack, and Sentry flags exceptions, so a regression during the scale-up showed up as a dashboard spike instead of a support ticket.",
      impact: [
        '10M+ active users served on the platform after the Rupin rebrand',
        'Backend work across wallet, QR, DQR, IBAN, and VIBAN payments',
      ],
      stack: ['Django', 'PostgreSQL', 'Redis', 'Celery', 'ELK Stack', 'Sentry', 'Docker'],
      confidential: true,
      cover: {
        art: asset('covers/rupin-app.webp'),
        accentRgb: '0, 113, 227',
        fit: 'cover' as const,
        logo: asset('logos/rupin-logo-light.svg'),
        logoDark: asset('logos/rupin-logo-dark.svg'),
        logoHeight: 20,
        href: 'https://rupin.pk/',
      },
    },
  ],

  certifications: [
    {
      name: 'PCI-DSS SAQ-D Compliance Implementer & Auditor',
      issuer: 'Toko Labs — Cobu',
      year: '2025',
      detail:
        'Scoped the cardholder data environment, implemented rigorous encryption standards, and carried the SAQ-D self-assessment through end to end.',
    },
    {
      name: 'Digital Operations Team Lead',
      issuer: 'Google Developer Student Clubs (GDSC SSUET)',
      year: '2024 – 2025',
      detail:
        'Orchestrated 15+ technical summits for 2,000+ participants and directed a 50+ member volunteer workforce using Agile/Kanban workflows.',
    },
  ],

  competencies: [
    { group: 'Languages', items: ['Python', 'JavaScript', 'SQL', 'Bash', 'C++'] },
    {
      group: 'Backend & APIs',
      items: ['Django', 'FastAPI', 'REST APIs', 'WebSockets', 'Celery', 'Pydantic'],
    },
    {
      group: 'Automation & Scraping',
      items: ['Scrapy', 'Playwright', 'Selenium', 'Headless Browsers', 'Data Ingestion'],
    },
    {
      group: 'Data Science & Storage',
      items: ['PostgreSQL', 'MongoDB', 'Redis', 'Pandas', 'NumPy', 'Matplotlib', 'Vector Search'],
    },
    {
      group: 'Infrastructure & Graphics',
      items: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'WebGL', 'Three.js'],
    },
  ],
};

export type CaseStudy = (typeof portfolioData.caseStudies)[number];
