import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projects } from '@/data/projects';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { TiltCard } from '@/components/effects/TiltCard';
import { SEOHead } from '@/components/seo/SEOHead';

// Web project screenshots
import signprosScreenshot from '@/assets/projects/signpros-screenshot.png';
import luminoScreenshot from '@/assets/projects/lumino-screenshot.png';
import mnOrderSyncScreenshot from '@/assets/projects/mn-order-sync-screenshot.png';

// ── Types & data ───────────────────────────────────────────────────────────

type Tab = 'web' | 'design' | 'all';

type ProjectStatus = 'Live' | 'Internal' | 'Building';

interface WebProjectCard {
  id: string;
  name: string;
  url?: string;
  slug?: string;
  status: ProjectStatus;
  category: string;
  stack: string[];
  description: string;
  screenshot?: string;
  comingSoon?: boolean;
}

const webProjectCards: WebProjectCard[] = [
  {
    id: 'signpros',
    name: 'SignPros Demo',
    url: 'https://signpros-demo.vercel.app',
    slug: 'signpros-demo',
    status: 'Live',
    category: 'Business Website',
    stack: ['Vanilla JS', 'CSS', 'HTML'],
    description:
      'Portfolio SPA for a real estate sign company. 58 brand logos, product catalog, and FAQ chatbot. Gold/dark premium aesthetic — no frameworks.',
    screenshot: signprosScreenshot,
  },
  {
    id: 'lumino',
    name: 'Lumino AI Studios',
    url: 'https://app.luminoaistudiosmm.com',
    slug: 'lumino-ai-studios',
    status: 'Live',
    category: 'Web Application / SaaS',
    stack: ['Next.js', 'MongoDB', 'NextAuth', 'Vercel'],
    description:
      'Myanmar-first AI SaaS — 41+ tools, Wave Pay / KBZ billing, multi-language (EN/MM/TH/PH), Telegram AutoReply. Production auth, subscriptions, billing.',
    screenshot: luminoScreenshot,
  },
  {
    id: 'mn-order-sync',
    name: 'MN Order Sync',
    status: 'Internal',
    category: 'Client Web App',
    stack: ['Next.js', 'Supabase', 'OpenAI Vision'],
    description:
      'Custom order tracking for MN Custom Homes. OpenAI OCR extracts job data from email screenshots; Supabase stores it; dashboard shows sign installation status in real time.',
    screenshot: mnOrderSyncScreenshot,
    slug: 'mn-order-sync',
  },
  {
    id: 'clc',
    name: 'CLC Construction',
    status: 'Building',
    category: 'Construction — Myanmar',
    stack: ['Next.js', 'Vercel'],
    description:
      'Website coming soon for a cellular lightweight concrete construction company in Myanmar. Razor/razorblade model — machines they sell, recurring chemical sales.',
    comingSoon: true,
  },
];

const designProjects = projects.filter((p) => p.category !== 'web-apps');

// ── Helpers ────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ProjectStatus }) {
  const colors: Record<ProjectStatus, string> = {
    Live: 'border-primary/50 text-primary',
    Internal: 'border-white/20 text-white/50',
    Building: 'border-amber-500/50 text-amber-400',
  };
  return (
    <span className={`font-mono text-[10px] uppercase px-2 py-0.5 border ${colors[status]}`}>
      {status}
    </span>
  );
}

// ── Web Project Card ───────────────────────────────────────────────────────

function WebCard({ p, i }: { p: WebProjectCard; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
    >
      <TiltCard tiltMax={4}>
        <div
          className={`group border overflow-hidden ${
            p.comingSoon
              ? 'border-dashed border-white/[0.08] bg-white/[0.01]'
              : 'border-white/[0.08] bg-white/[0.02] hover:border-primary/30'
          } transition-colors`}
        >
          {/* Screenshot */}
          <div className="aspect-video w-full overflow-hidden bg-white/[0.03] relative">
            {p.screenshot ? (
              <img
                src={p.screenshot}
                alt={p.name}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="font-mono text-xs text-white/20 uppercase mb-2">
                    {p.comingSoon ? 'Coming Soon' : 'Internal Tool'}
                  </div>
                  <div className="font-serif-display italic text-white/20 text-2xl">{p.name}</div>
                </div>
              </div>
            )}
            {p.comingSoon && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="font-mono text-xs text-amber-400 uppercase tracking-widest border border-amber-400/30 px-4 py-2">
                  Building...
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <span className="font-mono text-[10px] text-primary uppercase tracking-wider">
                  {p.category}
                </span>
                <h3 className="font-serif-display italic text-2xl text-[#F5F0E8] mt-1 leading-tight">
                  {p.name}
                </h3>
              </div>
              <StatusBadge status={p.status} />
            </div>

            <p className="text-sm font-light text-white/50 leading-relaxed mb-4">
              {p.description}
            </p>

            <div className="flex flex-wrap gap-1 mb-5">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] text-white/30 uppercase border border-white/[0.08] px-2 py-0.5"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {p.url && (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-primary/80 uppercase tracking-widest transition-colors"
                >
                  View Live <ExternalLink className="size-3" />
                </a>
              )}
              {p.slug && (
                <Link
                  to={`/project/${p.slug}`}
                  className="inline-flex items-center gap-1 font-mono text-xs text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                >
                  Case Study →
                </Link>
              )}
              {p.comingSoon && (
                <span className="font-mono text-xs text-amber-400/60 uppercase tracking-widest">Building →</span>
              )}
            </div>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────

const tabs: { id: Tab; label: string }[] = [
  { id: 'web', label: 'Web Projects' },
  { id: 'design', label: 'Design Work' },
  { id: 'all', label: 'All' },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>('web');

  const allDesignProjects = useMemo(() => designProjects, []);

  return (
    <>
      <SEOHead
        title="Portfolio"
        description="Web projects and 12+ years of design work by Macrae Myint — business websites, SaaS applications, branding, and illustration."
      />

      <div className="min-h-screen bg-black text-[#F5F0E8]">
        {/* Header */}
        <section className="py-24 md:py-32 px-8 lg:px-16 border-b border-white/[0.07]">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-4">
                // PORTFOLIO
              </p>
              <h1
                className="font-serif-display italic text-white mb-4"
                style={{
                  fontSize: 'clamp(3rem, 7vw, 7rem)',
                  letterSpacing: '-3px',
                  lineHeight: 0.9,
                }}
              >
                My Work
              </h1>
              <p className="text-lg font-light text-white/40 max-w-xl leading-relaxed">
                Web projects and 12+ years of design work for clients across Myanmar and the US.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Tab filter */}
        <section className="sticky top-0 z-20 px-8 lg:px-16 py-4 bg-black/90 backdrop-blur border-b border-white/[0.07]">
          <div className="max-w-7xl mx-auto flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-white/[0.08] text-white/40 hover:text-white hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        <div className="py-12 md:py-16 px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">

            {/* Web Projects */}
            {(activeTab === 'web' || activeTab === 'all') && (
              <div className="mb-16">
                {activeTab === 'all' && (
                  <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-8">
                    // WEB PROJECTS
                  </p>
                )}
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {webProjectCards.map((p, i) => (
                    <WebCard key={p.id} p={p} i={i} />
                  ))}
                </div>
              </div>
            )}

            {/* Design Work */}
            {(activeTab === 'design' || activeTab === 'all') && (
              <div>
                {activeTab === 'all' && (
                  <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-8">
                    // DESIGN WORK
                  </p>
                )}
                <PortfolioGrid projects={allDesignProjects} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
