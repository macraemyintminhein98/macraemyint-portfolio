import type { Project, ProjectCategory } from '@/types';

// Web project screenshots
import signprosScreenshot from '@/assets/projects/signpros-screenshot.png';
import luminoScreenshot from '@/assets/projects/lumino-screenshot.png';

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
    description:
      'Portfolio SPA for a real estate sign company. 58 real estate brand logos, product catalog, FAQ chatbot, gold/dark premium aesthetic. Vanilla JS, fully custom — no frameworks.',
    client: 'Sign Pros Inc.',
    tools: 'Vanilla JS · CSS · HTML',
    images: [
      {
        id: 'signpros-1',
        src: signprosScreenshot,
        alt: 'SignPros Demo — real estate sign company portfolio',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'lumino-ai-studios',
    title: 'Lumino AI Studios',
    category: 'web-apps',
    year: '2025',
    slug: 'lumino-ai-studios',
    coverImage: luminoScreenshot,
    description:
      'Myanmar-first AI SaaS platform with 41+ AI tools, Wave Pay/KBZ payment integration, multi-language (EN/MM/TH/PH), Telegram AutoReply. Production-grade auth, subscriptions, and billing.',
    client: 'Lumino AI Studios',
    tools: 'Next.js · MongoDB Atlas · NextAuth · Vercel',
    images: [
      {
        id: 'lumino-1',
        src: luminoScreenshot,
        alt: 'Lumino AI Studios — Myanmar-first AI SaaS platform',
        aspectRatio: 'landscape',
      },
    ],
  },
  {
    id: 'mn-order-sync',
    title: 'MN Order Sync',
    category: 'web-apps',
    year: '2025',
    slug: 'mn-order-sync',
    coverImage: signprosScreenshot, // placeholder — internal tool
    description:
      'Custom order tracking web app for MN Custom Homes. OpenAI Vision OCR extracts order data from email screenshots, Supabase stores it, custom dashboard shows installation status in real time.',
    client: 'MN Custom Homes',
    tools: 'Next.js · Supabase · OpenAI Vision API',
    images: [
      {
        id: 'mn-1',
        src: signprosScreenshot,
        alt: 'MN Order Sync — internal order tracking dashboard',
        aspectRatio: 'landscape',
      },
    ],
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
