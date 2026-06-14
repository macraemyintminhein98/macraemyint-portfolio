import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, ExternalLink, ArrowRight } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { TiltCard } from '@/components/effects/TiltCard';
import { ParticleEmbers } from '@/components/effects/ParticleEmbers';
import { InteractiveCube } from '@/components/effects/InteractiveCube';

// Web project screenshots
import signprosScreenshot from '@/assets/projects/signpros-screenshot.png';
import luminoScreenshot from '@/assets/projects/lumino-screenshot.png';
import mnOrderSyncScreenshot from '@/assets/projects/mn-order-sync-screenshot.png';

// Design section images
import alephCarwash from '@/assets/portfolio/aleph-carwash.png';
import alephLogos from '@/assets/portfolio/aleph-logos.png';
import akagiBranding from '@/assets/portfolio/akagi-branding.png';
import cometLogo from '@/assets/portfolio/comet-logo.png';
import creativo27Flyer from '@/assets/portfolio/creativo27-flyer.jpg';
import godzillaR33Final from '@/assets/portfolio/godzilla-r33-final.jpg';
import evoIvCollage from '@/assets/portfolio/evo-iv-collage.png';
import celicaZzt230 from '@/assets/portfolio/celica-zzt230.jpg';

// ── Types ──────────────────────────────────────────────────────────────────

type ProjectStatus = 'Live' | 'Internal' | 'Building';

interface WebProject {
  name: string;
  url?: string;
  status: ProjectStatus;
  category: string;
  stack: string[];
  description: string;
  screenshot?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const webProjects: WebProject[] = [
  {
    name: 'SignPros Demo',
    url: 'https://signpros-demo.vercel.app',
    status: 'Live',
    category: 'Business Website',
    stack: ['Vanilla JS', 'CSS', 'HTML'],
    description:
      'Portfolio SPA for a real estate sign company. 58 brand logos, product catalog, and FAQ chatbot. Gold/dark premium aesthetic — no frameworks.',
    screenshot: signprosScreenshot,
  },
  {
    name: 'Lumino AI Studios',
    url: 'https://app.luminoaistudiosmm.com',
    status: 'Live',
    category: 'Web Application / SaaS',
    stack: ['Next.js', 'MongoDB', 'NextAuth', 'Vercel'],
    description:
      'Myanmar-first AI SaaS — 41+ tools, Wave Pay / KBZ billing, multi-language (EN/MM/TH/PH), Telegram AutoReply. Production auth, subscriptions, billing.',
    screenshot: luminoScreenshot,
  },
  {
    name: 'MN Order Sync',
    status: 'Internal',
    category: 'Client Web App',
    stack: ['Next.js', 'Supabase', 'OpenAI Vision'],
    description:
      'Custom order tracking for MN Custom Homes. OpenAI OCR extracts job data from email screenshots; Supabase stores it; dashboard shows sign installation status in real time.',
    screenshot: mnOrderSyncScreenshot,
  },
];

const stats = [
  { value: '12+', label: 'Years Design' },
  { value: '3', label: 'Live Products' },
  { value: '2', label: 'Countries' },
  { value: '48hr', label: 'Turnaround' },
];

const services = [
  {
    num: '01',
    title: 'Website Design & Build',
    description: 'Clean, fast single-page sites. ~48 hours. No templates, no page builders.',
  },
  {
    num: '02',
    title: 'Monthly Management',
    description: 'Ongoing updates, hosting, and changes. Flat monthly fee.',
  },
  {
    num: '03',
    title: 'Web Applications',
    description: 'Custom tools, dashboards, and SaaS. For complex builds.',
  },
];

const designSamples = [
  { src: alephCarwash, title: 'Aleph Car Wash' },
  { src: alephLogos, title: 'Aleph Brand System' },
  { src: akagiBranding, title: 'Akagi Garage Identity' },
  { src: cometLogo, title: 'Comet Auto Works' },
  { src: creativo27Flyer, title: 'Creativo 27' },
  { src: godzillaR33Final, title: 'Godzilla × R33' },
  { src: evoIvCollage, title: 'Evo IV Builds' },
  { src: celicaZzt230, title: 'Celica ZZT230' },
];

const heroWords = ['Web Designer.', 'Developer.', 'Builder.'];

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

// ── Status Badge ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: ProjectStatus }) {
  const colors: Record<ProjectStatus, string> = {
    Live: 'border-primary/50 text-primary',
    Internal: 'border-white/20 text-white/50',
    Building: 'border-amber-500/50 text-amber-400',
  };
  return (
    <span
      className={`font-mono text-[10px] uppercase px-2 py-0.5 border ${colors[status]}`}
    >
      {status}
    </span>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const onLoaded = () => setReady(true);
    window.addEventListener('app-loaded', onLoaded);
    const fallback = setTimeout(() => setReady(true), 2200);
    return () => {
      window.removeEventListener('app-loaded', onLoaded);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen flex flex-col justify-between px-8 lg:px-16 pt-20 pb-8 overflow-hidden"
    >
      {/* Particle base layer */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleEmbers />
      </div>

      {/* Interactive 3D cube — drag to rotate, scroll to zoom */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block opacity-90 z-10">
        <InteractiveCube />
        {/* Hint label */}
        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-white/20 uppercase tracking-widest pointer-events-none select-none">
          drag · rotate · zoom
        </div>
      </div>

      {/* TOP ROW */}
      <div className="relative flex justify-between items-start pt-4">
        <div className="font-mono text-xs text-white/30 uppercase tracking-widest leading-relaxed">
          <div>MACRAE MYINT</div>
          <div>WEB DESIGNER + DEVELOPER</div>
          <div>v2026</div>
        </div>
        <div className="font-mono text-xs text-white/30 text-right leading-relaxed">
          <div>REDMOND, WA</div>
          <div>→ YANGON</div>
          <div>NOV 2026</div>
        </div>
      </div>

      {/* CENTER */}
      <div className="relative flex-1 flex items-center">
        <div className="max-w-6xl">
          <h1
            className="font-serif-display italic text-[#F5F0E8] text-left"
            style={{ fontSize: 'clamp(4rem, 10vw, 11rem)', lineHeight: 0.85, letterSpacing: '-3px' }}
          >
            {heroWords.map((word, i) => (
              <motion.span
                key={word}
                className="block"
                initial={{ filter: 'blur(14px)', opacity: 0, y: 30 }}
                animate={ready ? { filter: 'blur(0px)', opacity: 1, y: 0 } : undefined}
                transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 text-xl font-light text-white/50 max-w-lg leading-relaxed"
          >
            I build clean, fast websites for local businesses.
            12 years of design discipline behind every project.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              See My Work →
            </a>
            <a
              href="mailto:macrae@macraemyint.com"
              className="px-6 py-3 border border-white/20 text-white/70 font-mono text-xs uppercase tracking-widest hover:border-white/50 hover:text-white transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="relative flex justify-between items-end">
        <span className="font-mono text-xs text-white/25">SCROLL ↓</span>
        <span className="font-mono text-xs text-white/25">[ 3 LIVE PRODUCTS ]</span>
      </div>
    </section>
  );
}

// ── Web Project Card ───────────────────────────────────────────────────────

function WebProjectCard({ p, i }: { p: WebProject; i: number }) {
  const isCLC = p.name === 'CLC Construction';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
    >
      <TiltCard tiltMax={4}>
        <div className="group border border-white/[0.08] bg-white/[0.02] hover:border-primary/30 transition-colors overflow-hidden">
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
                    Internal Tool
                  </div>
                  <div className="font-serif-display italic text-white/20 text-2xl">
                    {p.name}
                  </div>
                </div>
              </div>
            )}
            {isCLC && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="font-mono text-xs text-amber-400 uppercase tracking-widest border border-amber-400/30 px-4 py-2">
                  Coming Soon
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

            {p.url ? (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-primary/80 uppercase tracking-widest transition-colors"
              >
                View Live <ExternalLink className="size-3" />
              </a>
            ) : isCLC ? (
              <span className="font-mono text-xs text-amber-400/60 uppercase tracking-widest">
                Building →
              </span>
            ) : (
              <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
                See Screenshots →
              </span>
            )}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <SEOHead
        title="Web Designer & Developer — Local Business Websites"
        description="Macrae Myint — web designer and developer building clean, fast websites for local businesses. 12+ years design experience. Based in Seattle, WA."
      />

      <div className="grain-overlay" aria-hidden="true" />

      <div className="min-h-screen bg-black text-[#F5F0E8] font-sans-body">
        <Hero />

        {/* ── INTRO ───────────────────────────────────────────────────── */}
        <section className="py-24 md:py-36 px-8 lg:px-16">
          <motion.div {...reveal}>
            <h2
              className="font-serif-display italic text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', letterSpacing: '-2px', lineHeight: 1 }}
            >
              Clean sites. Fast builds.<br />Real results.
            </h2>
            <p className="mt-6 text-lg font-light text-white/40 max-w-xl leading-relaxed">
              Local service businesses in WA get a polished, mobile-first website built in ~48 hours —
              then managed monthly. No templates. No page builders. Just good design and clean code.
            </p>
          </motion.div>
        </section>

        {/* ── WEB PROJECTS ─────────────────────────────────────────────── */}
        <section id="projects" className="py-16 md:py-24 px-8 lg:px-16">
          <motion.div {...reveal} className="mb-12">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">
              // WEB PROJECTS
            </p>
            <h2
              className="font-serif-display italic text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-2px', lineHeight: 1 }}
            >
              Three live products.
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webProjects.map((p, i) => (
              <WebProjectCard key={p.name} p={p} i={i} />
            ))}
            {/* CLC Coming Soon */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
            >
              <TiltCard tiltMax={4}>
                <div className="border border-dashed border-white/[0.08] bg-white/[0.01] overflow-hidden">
                  <div className="aspect-video w-full bg-white/[0.02] flex items-center justify-center">
                    <span className="font-mono text-xs text-amber-400/50 uppercase tracking-widest">
                      Building...
                    </span>
                  </div>
                  <div className="p-6">
                    <span className="font-mono text-[10px] text-amber-400/60 uppercase tracking-wider">
                      Construction — Myanmar
                    </span>
                    <h3 className="font-serif-display italic text-2xl text-white/40 mt-1 leading-tight">
                      CLC Construction
                    </h3>
                    <p className="text-sm font-light text-white/30 leading-relaxed mt-3 mb-4">
                      Cellular lightweight concrete company in Myanmar. Razor/razorblade model — machines plus recurring chemical sales.
                    </p>
                    <div className="flex flex-wrap gap-1 mb-5">
                      {['Next.js', 'Vercel'].map((s) => (
                        <span key={s} className="font-mono text-[10px] text-white/20 uppercase border border-white/[0.05] px-2 py-0.5">
                          {s}
                        </span>
                      ))}
                    </div>
                    <span className="font-mono text-xs text-amber-400/60 uppercase tracking-widest">
                      Building →
                    </span>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <section className="py-24 px-8 lg:px-16 border-t border-white/[0.07]">
          <div className="flex flex-wrap justify-between gap-12">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
              >
                <div
                  className="font-serif-display italic text-primary leading-none"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)' }}
                >
                  {s.value}
                </div>
                <div className="font-mono text-xs text-white/30 uppercase tracking-widest mt-2">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── DESIGN BACKGROUND ────────────────────────────────────────── */}
        <section id="design" className="py-24 px-8 lg:px-16">
          <motion.div {...reveal} className="mb-12">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">
              // DESIGN BACKGROUND
            </p>
            <h2
              className="font-serif-display italic text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-2px', lineHeight: 1 }}
            >
              12+ years of visual<br />discipline.
            </h2>
            <p className="mt-4 text-lg font-light text-white/40 max-w-md leading-relaxed">
              Behind every website I build is 12 years of design experience — brand identity,
              print, digital, and illustration work for clients across Myanmar and the US.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {designSamples.map((img, i) => (
              <motion.div
                key={img.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 4) * 0.06 }}
                className="group relative aspect-[3/4] w-full overflow-hidden"
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="absolute bottom-3 left-3 font-serif-display italic text-base text-white">
                    {img.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────── */}
        <section id="services" className="py-24 px-8 lg:px-16 bg-black">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...reveal}>
              <h2
                className="font-serif-display italic text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-2px', lineHeight: 0.9 }}
              >
                What I do.
              </h2>
              <p className="mt-4 font-mono text-xs text-white/30 uppercase">
                TAKING ON NEW CLIENTS — WA, OR, REMOTE
              </p>
            </motion.div>

            <div>
              {services.map((s, i) => (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
                  className="py-6 border-t border-white/[0.08] last:border-b flex justify-between items-start"
                >
                  <div className="flex items-baseline">
                    <span className="font-mono text-xs text-white/25 mr-6">{s.num}</span>
                    <span className="font-sans-body font-medium text-base text-white">
                      {s.title}
                    </span>
                  </div>
                  <p className="font-light text-sm text-white/40 max-w-xs text-right">
                    {s.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────── */}
        <section id="contact" className="py-32 px-8 lg:px-16">
          <motion.div {...reveal}>
            <h2
              className="font-serif-display italic text-white max-w-4xl"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-3px', lineHeight: 0.9 }}
            >
              Ready to get your site built?
            </h2>
            <p className="mt-6 text-lg font-light text-white/40 max-w-md leading-relaxed">
              Based in Redmond, WA — working with businesses in WA, OR, and remotely.
            </p>

            <div className="mt-10 flex flex-col gap-3">
              <a
                href="mailto:macrae@macraemyint.com"
                className="inline-flex items-center gap-2 font-mono text-sm text-white/50 hover:text-white transition-colors w-fit"
              >
                <ArrowRight className="size-4" />
                macrae@macraemyint.com
              </a>
            </div>

            <div className="mt-8 flex gap-4">
              {[
                { icon: Github, label: 'GitHub', href: 'https://github.com/macraemyintminhein98' },
                { icon: Twitter, label: 'X / Twitter', href: 'https://x.com/macrae_minhein' },
                { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/macrae-minhein/' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/30 hover:text-white transition-colors"
                >
                  <s.icon className="size-5" />
                </a>
              ))}
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
