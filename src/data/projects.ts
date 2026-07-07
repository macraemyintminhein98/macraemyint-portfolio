import type { Project, ProjectCategory } from '@/types'; // CaseStudy used via Project.caseStudy

// Web project screenshots
import signprosScreenshot from '@/assets/projects/signpros-screenshot.png';
import luminoScreenshot from '@/assets/projects/lumino-screenshot.png';
import mnOrderSyncScreenshot from '@/assets/projects/mn-order-sync-screenshot.png';
import solarSystemScreenshot from '@/assets/projects/solar-system-screenshot.png';

// Design work — commercial branding
import alephCarwash from '@/assets/portfolio/aleph-carwash.png';
import alephLogos from '@/assets/portfolio/aleph-logos.png';
import akagiBranding from '@/assets/portfolio/akagi-branding.png';
import alephPricelist from '@/assets/portfolio/aleph-pricelist.png';
import naturinStore from '@/assets/portfolio/naturin-store.png';
import digitalKaway from '@/assets/portfolio/digital-kaway.png';
import cometLogo from '@/assets/portfolio/comet-logo.png';
import creativo27Flyer from '@/assets/portfolio/creativo27-flyer.jpg';

// Design work — car illustrations (3 max, shows design eye)
import godzillaR33Final from '@/assets/portfolio/godzilla-r33-final.jpg';
import evoIvCollage from '@/assets/portfolio/evo-iv-collage.png';
import celicaZzt230 from '@/assets/portfolio/celica-zzt230.jpg';

export const projects: Project[] = [
  // ── WEB PROJECTS ──────────────────────────────────────────────────────────
  {
    id: 'signpros-demo',
    title: 'SignPros Demo',
    category: 'web-apps',
    year: '2025',
    slug: 'signpros-demo',
    coverImage: signprosScreenshot,
    description: 'Portfolio SPA for a real estate sign company. 58 real estate brand logos, product catalog, FAQ chatbot, gold/dark premium aesthetic. Vanilla JS, fully custom — no frameworks.',
    client: 'Sign Pros Inc.',
    tools: 'Vanilla JS · CSS · HTML',
    liveUrl: 'https://signpros-demo.vercel.app',
    status: 'Live' as const,
    stack: ['Vanilla JS', 'CSS', 'HTML'],
    caseStudy: {
      problem: "Sign Pros had no web presence. Prospects receiving their sales emails had nowhere to verify the company's work, browse their product catalog, or get quick answers — so leads went cold.",
      solution: 'Built a fully custom single-page portfolio site with 58 real estate brand logos, a full product catalog organized by sign type, and an interactive FAQ chatbot — all in pure Vanilla JS with zero frameworks. Gold/dark premium aesthetic to match the company positioning.',
      result: 'Live and used as a direct link in sales emails. Visitors can see the full catalog and get answers without a phone call — exactly what a B2B sign company needs to convert cold outreach into conversations.',
    },
    images: [{ id: 'signpros-1', src: signprosScreenshot, alt: 'SignPros Demo — real estate sign company portfolio', aspectRatio: 'landscape' as const }],
  },
  {
    id: 'lumino-ai-studios',
    title: 'Lumino AI Studios',
    category: 'web-apps',
    year: '2025',
    slug: 'lumino-ai-studios',
    coverImage: luminoScreenshot,
    description: 'Myanmar-first AI SaaS platform with 41+ AI tools, Wave Pay/KBZ payment integration, multi-language (EN/MM/TH/PH), Telegram AutoReply. Production-grade auth, subscriptions, and billing.',
    client: 'Lumino AI Studios',
    tools: 'Next.js · MongoDB Atlas · NextAuth · Vercel',
    liveUrl: 'https://app.luminoaistudiosmm.com',
    status: 'Live' as const,
    stack: ['Next.js', 'MongoDB Atlas', 'NextAuth', 'Vercel'],
    caseStudy: {
      problem: 'Myanmar had no local AI SaaS product. Users were paying in USD for tools not built for their language, payment methods, or usage patterns — a gap no one had filled.',
      solution: 'Built a full-stack SaaS from scratch: 41+ AI tools, local payment integration (Wave Pay, KBZ), four-language support (EN/MM/TH/PH), a Telegram AutoReply system, and a complete subscription billing stack with auth and user management.',
      result: 'Live in production with paying subscribers. The first Myanmar-first AI platform with local payment methods. Every layer — auth, billing, multi-language routing, and AI tool orchestration — is custom-built and maintained.',
    },
    images: [{ id: 'lumino-1', src: luminoScreenshot, alt: 'Lumino AI Studios — Myanmar-first AI SaaS platform', aspectRatio: 'landscape' as const }],
  },
  {
    id: 'mn-order-sync',
    title: 'MN Order Sync',
    category: 'web-apps',
    year: '2025',
    slug: 'mn-order-sync',
    coverImage: mnOrderSyncScreenshot,
    description: 'Custom order tracking web app for MN Custom Homes. OpenAI Vision OCR extracts order data from email screenshots, Supabase stores it, custom dashboard shows installation status in real time.',
    client: 'MN Custom Homes',
    tools: 'Next.js · Supabase · OpenAI Vision API',
    status: 'Internal' as const,
    stack: ['Next.js', 'Supabase', 'OpenAI Vision API'],
    caseStudy: {
      problem: 'MN Custom Homes tracked sign installation orders through emails and spreadsheets. Jobs were getting missed, status was invisible, and chasing updates wasted hours each week.',
      solution: 'Built a custom internal web app: paste or forward an order email, and OpenAI Vision OCR extracts the job details automatically. Supabase stores every record. A real-time dashboard shows all active jobs, their status, and install dates — no manual data entry.',
      result: "The client uses it daily. Order chaos eliminated. The team sees every job's status at a glance without digging through email — and new orders go from inbox to dashboard in under 10 seconds.",
    },
    images: [{ id: 'mn-1', src: mnOrderSyncScreenshot, alt: 'MN Order Sync — internal order tracking dashboard', aspectRatio: 'landscape' as const }],
  },
  {
    id: 'clc-construction',
    title: 'CLC Construction',
    category: 'web-apps',
    year: '2026',
    slug: 'clc-construction',
    coverImage: luminoScreenshot, // placeholder — coming soon
    description:
      'Website coming soon for a cellular lightweight concrete construction company in Myanmar. Razor/razorblade model — the machines they sell, recurring chemical sales.',
    client: 'CLC Construction Myanmar',
    tools: 'Next.js · Vercel',
    images: [
      {
        id: 'clc-1',
        src: luminoScreenshot,
        alt: 'CLC Construction — coming soon',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'solar-system-simulator',
    title: 'Solar System — Live Orbital Sim',
    category: 'web-apps',
    year: '2026',
    slug: 'solar-system-simulator',
    coverImage: solarSystemScreenshot,
    description:
      'Real-time 3D ephemeris of the solar system. Kepler\'s equation solved every frame against JPL J2000 orbital elements — the planets on screen sit where they actually are right now. GLSL sun shader, procedural planet textures (zero image assets), 1,300-asteroid instanced belt, cinematic follow camera.',
    client: 'Lab — personal build',
    tools: 'Three.js · WebGL · GLSL · React · TypeScript',
    liveUrl: 'https://macraemyint.com/solar-system',
    status: 'Live' as const,
    stack: ['Three.js', 'WebGL', 'GLSL', 'React', 'TypeScript'],
    caseStudy: {
      problem:
        'Portfolio sites claim "I can build anything" but rarely prove it. I wanted a single page that demonstrates graphics programming, real math, and product polish at once — something a visitor can feel in five seconds.',
      solution:
        "Built a live orbital simulator, not an animation: a Newton–Raphson Kepler solver runs against real JPL J2000 orbital elements every frame, so eccentricity, inclination and planetary positions match the actual sky for any date from 1800–2050. Every surface — gas-giant bands, Earth's continents and cloud layer, Saturn's rings, crater fields — is procedurally generated from seeded noise at load, so the page ships zero image assets. HDR bloom pipeline, custom GLSL sun shader, instanced 1,300-rock asteroid belt, click-to-focus cinematic camera, and full time control from real-time to a year per second.",
      result:
        'A working scientific instrument inside a portfolio: open it today and the planets are where they actually are today. It doubles as the fastest possible proof of what "vibe coding" with an AI-assisted workflow can ship — physics, shaders, and UI polish in one self-contained page.',
    },
    images: [
      {
        id: 'solar-1',
        src: solarSystemScreenshot,
        alt: 'Solar System live orbital simulator — real-time Keplerian ephemeris',
        aspectRatio: 'landscape' as const,
      },
    ],
  },

  // ── DESIGN WORK ───────────────────────────────────────────────────────────
  {
    id: 'aleph-carwash-branding',
    title: 'Aleph Car Wash — Brand & Marketing',
    category: 'logo-branding',
    year: '2024',
    slug: 'aleph-carwash-branding',
    coverImage: alephCarwash,
    description:
      'Bold promotional poster for Aleph Services mobile car detailing. High-contrast design with premium automotive photography and professional service tier breakdown.',
    client: 'Aleph Services',
    tools: 'Adobe Photoshop · Illustrator',
    images: [
      {
        id: 'aleph-carwash-1',
        src: alephCarwash,
        alt: 'Aleph Car Wash brand and marketing materials',
        aspectRatio: 'portrait',
      },
    ],
  },
  {
    id: 'aleph-logo-system',
    title: 'Aleph — Logo & Brand System',
    category: 'logo-branding',
    year: '2024',
    slug: 'aleph-logo-system',
    coverImage: alephLogos,
    description:
      'Modern logo design system for Aleph featuring an elegant ribbon-inspired mark. Multiple color variations across blue, purple, and grey for corporate brand applications.',
    client: 'Aleph',
    tools: 'Adobe Illustrator',
    images: [
      {
        id: 'aleph-logos-1',
        src: alephLogos,
        alt: 'Aleph logo and brand system variations',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'akagi-garage-brand',
    title: 'Akagi Garage — Brand Identity',
    category: 'logo-branding',
    year: '2023',
    slug: 'akagi-garage-brand',
    coverImage: akagiBranding,
    description:
      'Complete brand identity system for Akagi Garage Racing Team. Multiple logo variations — Japanese typography, Mt. Fuji motif, and racing-inspired designs across dark and light applications.',
    client: 'Akagi Garage',
    tools: 'Adobe Illustrator',
    images: [
      {
        id: 'akagi-1',
        src: akagiBranding,
        alt: 'Akagi Garage complete brand identity system',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'aleph-pricelist-design',
    title: 'Aleph Services — Price List',
    category: 'promotional',
    year: '2024',
    slug: 'aleph-pricelist-design',
    coverImage: alephPricelist,
    description:
      'Professional pricing infographic for Aleph Mobile Automobile Services. Clean, modern design with clear pricing tiers, service inclusions, and contact information on a dark teal background.',
    client: 'Aleph Services',
    tools: 'Adobe Illustrator · Canva',
    images: [
      {
        id: 'aleph-pricelist-1',
        src: alephPricelist,
        alt: 'Aleph Services price list infographic',
        aspectRatio: 'portrait',
      },
    ],
  },
  {
    id: 'naturin-store-launch',
    title: 'Naturin2 — E-Commerce Launch',
    category: 'social-media',
    year: '2024',
    slug: 'naturin-store-launch',
    coverImage: naturinStore,
    description:
      'Social media announcement design for Naturin2 dietary supplement brand new online store launch. Device mockups showing the e-commerce platform across desktop and mobile.',
    client: 'Naturin2',
    tools: 'Adobe Photoshop · Canva',
    images: [
      {
        id: 'naturin-1',
        src: naturinStore,
        alt: 'Naturin2 e-commerce store launch announcement',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'digital-kaway-branding',
    title: 'Digital Kaway — Brand Presentation',
    category: 'logo-branding',
    year: '2023',
    slug: 'digital-kaway-branding',
    coverImage: digitalKaway,
    description:
      'Complete brand presentation for Digital Kaway digital marketing agency. Logo variations, service offerings, and presentation slides with purple gradient theme and Myanmar cultural elements.',
    client: 'Digital Kaway',
    tools: 'Adobe Illustrator · PowerPoint',
    images: [
      {
        id: 'digital-kaway-1',
        src: digitalKaway,
        alt: 'Digital Kaway brand presentation',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'comet-auto-logo',
    title: 'Comet Auto Works — Logo',
    category: 'logo-branding',
    year: '2024',
    slug: 'comet-auto-logo',
    coverImage: cometLogo,
    description:
      'Dynamic logo for Comet Auto Works & Wiring. Vintage race car with comet trail effect, bold red-and-white on black — high-energy automotive brand identity with retro racing aesthetics.',
    client: 'Comet Auto Works',
    tools: 'Adobe Illustrator',
    images: [
      {
        id: 'comet-1',
        src: cometLogo,
        alt: 'Comet Auto Works logo design',
        aspectRatio: 'square',
      },
    ],
  },
  {
    id: 'creativo27-flyer',
    title: 'Creativo 27 — Restaurant Flyer',
    category: 'promotional',
    year: '2023',
    slug: 'creativo27-flyer',
    coverImage: creativo27Flyer,
    description:
      'Promotional flyer for Creativo 27 organic culinary restaurant in Yangon. Professional food photography, green organic theme, and clear layout for weekend superfood specials.',
    client: 'Creativo 27',
    tools: 'Adobe Photoshop · Illustrator',
    images: [
      {
        id: 'creativo-1',
        src: creativo27Flyer,
        alt: 'Creativo 27 organic restaurant flyer',
        aspectRatio: 'portrait',
      },
    ],
  },
  // Car illustrations (3) — show design eye
  {
    id: 'godzilla-r33',
    title: 'Godzilla × Skyline R33',
    category: 'illustrations',
    year: '2018',
    slug: 'godzilla-r33',
    coverImage: godzillaR33Final,
    description:
      'Epic digital illustration — Godzilla towering behind a white Nissan Skyline R33 GT-R. Japanese rising sun background and city silhouette. Pen Tool only, Adobe Illustrator.',
    client: 'Personal Project',
    tools: 'Adobe Illustrator',
    images: [
      {
        id: 'r33-1',
        src: godzillaR33Final,
        alt: 'Godzilla x Nissan Skyline R33 GT-R illustration',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'evo-iv-builds',
    title: 'Mitsubishi Evo IV — Build Variations',
    category: 'illustrations',
    year: '2018',
    slug: 'evo-iv-builds',
    coverImage: evoIvCollage,
    description:
      'Front-view series showing various Mitsubishi Evo IV build configurations — different bumper styles, tube-frame builds, and modification stages. Clean technical vector work.',
    client: 'Personal Project',
    tools: 'Adobe Illustrator',
    images: [
      {
        id: 'evo-1',
        src: evoIvCollage,
        alt: 'Mitsubishi Evo IV build variations',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'celica-zzt230',
    title: 'Toyota Celica ZZT230',
    category: 'illustrations',
    year: '2015',
    slug: 'celica-zzt230',
    coverImage: celicaZzt230,
    description:
      'Vibrant yellow Toyota Celica ZZT230 with dynamic low-angle perspective. Stylized vector artwork capturing the sporty character of the 7th generation Celica with bold colors and clean lines.',
    client: 'Personal Project',
    tools: 'Adobe Illustrator',
    images: [
      {
        id: 'celica-1',
        src: celicaZzt230,
        alt: 'Toyota Celica ZZT230 yellow illustration',
        aspectRatio: 'landscape',
      },
    ],
  },
];

export const categoryLabels: Record<ProjectCategory, string> = {
  'web-apps': 'Web Projects',
  'logo-branding': 'Logo & Branding',
  'packaging': 'Packaging',
  'social-media': 'Social Media',
  'promotional': 'Promotional',
  'certificates': 'Infographics',
  'app-mockups': 'App Mockups',
  'illustrations': 'Illustrations',
};

export const getProjectBySlug = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
};

export const getFeaturedProjects = (): Project[] =>
  projects.filter((p) => p.category === 'web-apps');

export const getCarIllustrations = (): Project[] =>
  projects.filter((p) => p.category === 'illustrations');

export const getAdjacentProjects = (
  currentSlug: string,
): { prev: Project | null; next: Project | null } => {
  const idx = projects.findIndex((p) => p.slug === currentSlug);
  return {
    prev: idx > 0 ? projects[idx - 1] : null,
    next: idx < projects.length - 1 ? projects[idx + 1] : null,
  };
};
