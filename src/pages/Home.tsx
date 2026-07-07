import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, ExternalLink, ArrowRight, ChevronDown, Check, X } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { TiltCard } from '@/components/effects/TiltCard';
import { ParticleEmbers } from '@/components/effects/ParticleEmbers';
import { InteractiveCube } from '@/components/effects/InteractiveCube';

// Web project screenshots
import signprosScreenshot from '@/assets/projects/signpros-screenshot.png';
import luminoScreenshot from '@/assets/projects/lumino-screenshot.png';
import mnOrderSyncScreenshot from '@/assets/projects/mn-order-sync-screenshot.png';
import solarSystemCover from '@/assets/projects/solar-system-screenshot.png';

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
  slug?: string;
  status: ProjectStatus;
  category: string;
  stack: string[];
  description: string;
  screenshot?: string;
  caseStudy?: { problem: string; solution: string; result: string };
}

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

interface PricingTier {
  name: string;
  subtitle: string;
  setup: string;
  monthly: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

// ── Data ───────────────────────────────────────────────────────────────────

const webProjects: WebProject[] = [
  {
    name: 'SignPros Demo',
    url: 'https://signpros-demo.vercel.app',
    slug: 'signpros-demo',
    status: 'Live',
    category: 'Business Website',
    stack: ['Vanilla JS', 'CSS', 'HTML'],
    description:
      'Portfolio SPA for a real estate sign company. 58 brand logos, product catalog, and FAQ chatbot. Gold/dark premium aesthetic — no frameworks.',
    screenshot: signprosScreenshot,
    caseStudy: {
      problem:
        'Sign Pros had no web presence — potential clients had no way to browse their product catalog or see brand work without calling.',
      solution:
        'Built a premium single-page app with 58 real estate brand logos, interactive product catalog, and an FAQ chatbot. No frameworks — custom-coded for speed.',
      result:
        'A polished digital storefront that sales reps share in every cold email. Loads in under 1 second on mobile.',
    },
  },
  {
    name: 'Lumino AI Studios',
    url: 'https://app.luminoaistudiosmm.com',
    slug: 'lumino-ai-studios',
    status: 'Live',
    category: 'Web Application / SaaS',
    stack: ['Next.js', 'MongoDB', 'NextAuth', 'Vercel'],
    description:
      'Myanmar-first AI SaaS — 41+ tools, Wave Pay / KBZ billing, multi-language (EN/MM/TH/PH), Telegram AutoReply. Production auth, subscriptions, billing.',
    screenshot: luminoScreenshot,
    caseStudy: {
      problem:
        'Businesses in Myanmar had no affordable, local-language access to AI tools — every option was English-only, US-priced, and built for Western payment methods.',
      solution:
        'Built a full-stack SaaS with 41+ AI tools, Wave Pay / KBZ Pay billing, and content in Burmese, Thai, and Filipino. Full auth, subscriptions, and Telegram integration.',
      result:
        'Live production platform serving paying subscribers across Southeast Asia. First Myanmar-native AI SaaS with local payment processing.',
    },
  },
  {
    name: 'MN Order Sync',
    slug: 'mn-order-sync',
    status: 'Internal',
    category: 'Client Web App',
    stack: ['Next.js', 'Supabase', 'OpenAI Vision'],
    description:
      'Custom order tracking for MN Custom Homes. OpenAI OCR extracts job data from email screenshots; Supabase stores it; dashboard shows sign installation status in real time.',
    screenshot: mnOrderSyncScreenshot,
    caseStudy: {
      problem:
        'MN Custom Homes tracked sign installation orders through forwarded emails — no visibility into job status, frequent miscommunications, and lost orders.',
      solution:
        'Built an internal dashboard that uses OpenAI Vision to extract job data directly from email screenshots, stores it in Supabase, and shows live installation status.',
      result:
        'The team went from hunting through email chains to a single live dashboard. Real client, real problem, actively used every day.',
    },
  },
];

// Update pricing to match your actual rates
const pricingTiers: PricingTier[] = [
  {
    name: 'Starter',
    subtitle: 'Perfect for service businesses',
    setup: '$750',
    monthly: '+ $75 / month',
    features: [
      'Single-page site',
      'Mobile-first design',
      'Contact form',
      'SEO basics',
      '~5 day turnaround',
      'Domain & SSL setup',
      'Monthly updates & hosting',
    ],
    cta: 'Get started',
  },
  {
    name: 'Standard',
    subtitle: 'For businesses that need more',
    setup: '$1,500',
    monthly: '+ $125 / month',
    features: [
      'Up to 5 pages',
      'Blog or news section',
      'Google Analytics',
      'SEO-optimized pages',
      'Photo gallery',
      'Priority support',
      'Monthly updates & hosting',
    ],
    cta: 'Get started',
    highlighted: true,
  },
  {
    name: 'Custom',
    subtitle: 'Dashboards, SaaS, client portals',
    setup: 'From $3,000',
    monthly: 'Ongoing retainer',
    features: [
      'Custom web application',
      'User authentication',
      'Database & API',
      'Third-party integrations',
      'Admin dashboard',
      'Ongoing development',
    ],
    cta: 'Get a quote',
  },
];

// Replace with real quotes from your clients
const testimonials: Testimonial[] = [
  {
    quote:
      'Macrae built our sign catalog site in under 48 hours. It looks polished, loads fast, and our sales team uses it in every client email.',
    name: 'R. Johnson',
    role: 'Operations',
    company: 'Sign Pros Inc.',
  },
  {
    quote:
      'The order tracking tool he built replaced three spreadsheets we were maintaining manually. The whole team uses it every single day.',
    name: 'M. Nguyen',
    role: 'Project Manager',
    company: 'MN Custom Homes',
  },
  {
    quote:
      'Fast turnaround, premium result, and he actually understood what we were building. That combination is rare.',
    name: 'A. Thein',
    role: 'Founder',
    company: 'Lumino AI Studios',
  },
];

const processSteps = [
  {
    day: 'Day 1',
    title: 'Discovery',
    description:
      'You share your business info, goals, and any examples you like. We align on scope — pages, features, deadline.',
  },
  {
    day: 'Day 2–3',
    title: 'Design',
    description:
      'I mock up the layout, color scheme, and visual direction. You see it before a single line of code is written.',
  },
  {
    day: 'Day 4–5',
    title: 'Build',
    description:
      'Clean, custom code. No WordPress, no page builders. Mobile-first, fast-loading, built to last.',
  },
  {
    day: 'Day 6',
    title: 'Review',
    description:
      'You give feedback. I refine. Revisions are included — no extra charges for reasonable change requests.',
  },
  {
    day: 'Day 7',
    title: 'Launch',
    description:
      'Your domain is connected, SSL is live, site is live. I hand you the keys — or keep managing it monthly.',
  },
];

const stats = [
  { target: 12, suffix: '+', label: 'Years Design' },
  { target: 3, suffix: '', label: 'Live Products' },
  { target: 2, suffix: '', label: 'Countries' },
  { target: 5, suffix: ' days', label: 'Turnaround' },
];

const services = [
  {
    num: '01',
    title: 'Website Design & Build',
    description: 'Clean, fast single-page sites. ~5 days. No templates, no page builders.',
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

// ── Animated Stat ──────────────────────────────────────────────────────────

function AnimatedStat({
  target,
  suffix,
  label,
  delay,
}: {
  target: number;
  suffix: string;
  label: string;
  delay: number;
}) {
  const [display, setDisplay] = useState('0');
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setDisplay(`${Math.round(ease * target)}${suffix}`);
            if (progress < 1) requestAnimationFrame(step);
          };
          setTimeout(() => requestAnimationFrame(step), delay * 1000);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
    >
      <div
        className="font-serif-display italic text-primary leading-none"
        style={{ fontSize: 'clamp(3.5rem, 8vw, 8rem)' }}
      >
        {display}
      </div>
      <div className="font-mono text-xs text-white/30 uppercase tracking-widest mt-2">{label}</div>
    </motion.div>
  );
}

// ── Status Badge ───────────────────────────────────────────────────────────

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
      className="relative min-h-screen flex flex-col justify-between px-5 sm:px-8 lg:px-16 pt-20 pb-8 overflow-hidden"
    >
      {/* Particle base layer */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleEmbers />
      </div>

      {/* Mobile glow — visible only when cube is hidden */}
      <motion.div
        className="absolute inset-0 lg:hidden pointer-events-none"
        animate={{ opacity: [0.4, 0.85, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 85% 45%, rgba(201,168,76,0.2) 0%, transparent 70%)',
        }}
      />

      {/* Interactive 3D cube — desktop only */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block opacity-90 z-10">
        <InteractiveCube />
      </div>

      {/* TOP ROW */}
      <div className="relative flex justify-between items-start pt-4">
        <div className="font-mono text-xs text-white/30 uppercase tracking-widest leading-relaxed">
          <div>MACRAE MYINT</div>
          <div>WEB DESIGNER + DEVELOPER</div>
          <div>v2026</div>
        </div>
        <div className="font-mono text-xs text-white/30 text-right leading-relaxed hidden lg:block">
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
            style={{ fontSize: 'clamp(2.8rem, 10vw, 11rem)', lineHeight: 0.88, letterSpacing: '-2px' }}
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

          {/* Available indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 inline-flex items-center gap-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-xs text-emerald-400/80 uppercase tracking-widest">
              Taking on new clients
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 flex flex-wrap gap-4"
          >
            <a
              href="#projects"
              className="px-6 py-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors"
            >
              See My Work →
            </a>
            <a
              href="https://calendly.com/macrae-macraemyint/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-primary/50 text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary/10 transition-colors"
            >
              Book a 30-min Call ↗
            </a>
            <a
              href="#contact"
              className="px-6 py-3 border border-white/20 text-white/70 font-mono text-xs uppercase tracking-widest hover:border-white/50 hover:text-white transition-colors"
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="relative flex justify-between items-end pointer-events-none">
        <span className="font-mono text-xs text-white/25">SCROLL ↓</span>
        <span className="font-mono text-xs text-white/25">[ 3 LIVE PRODUCTS ]</span>
      </div>
    </section>
  );
}

// ── Web Project Card ───────────────────────────────────────────────────────

function WebProjectCard({ p, i }: { p: WebProject; i: number }) {
  const [expanded, setExpanded] = useState(false);

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
                  <div className="font-mono text-xs text-white/20 uppercase mb-2">Internal Tool</div>
                  <div className="font-serif-display italic text-white/20 text-2xl">{p.name}</div>
                </div>
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

            <p className="text-sm font-light text-white/50 leading-relaxed mb-4">{p.description}</p>

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

            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex flex-wrap items-center gap-4">
                {p.url ? (
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-xs text-primary hover:text-primary/80 uppercase tracking-widest transition-colors"
                  >
                    View Live <ExternalLink className="size-3" />
                  </a>
                ) : (
                  <span className="font-mono text-xs text-white/30 uppercase tracking-widest">
                    Internal Tool
                  </span>
                )}
                {p.slug && (
                  <Link
                    to={`/project/${p.slug}`}
                    className="font-mono text-xs text-white/35 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Full Case Study →
                  </Link>
                )}
              </div>

              {p.caseStudy && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 font-mono text-[10px] text-white/30 hover:text-white/60 uppercase tracking-widest transition-colors"
                >
                  Details
                  <ChevronDown
                    className={`size-3 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                  />
                </button>
              )}
            </div>

            {/* Expandable case study */}
            <AnimatePresence>
              {expanded && p.caseStudy && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-5 pt-5 border-t border-white/[0.06] space-y-4">
                    {[
                      { label: 'The Problem', text: p.caseStudy.problem },
                      { label: 'The Build', text: p.caseStudy.solution },
                      { label: 'The Result', text: p.caseStudy.result },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1">
                          {item.label}
                        </div>
                        <p className="text-sm font-light text-white/40 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </TiltCard>
    </motion.div>
  );
}

// ── Testimonial Card ───────────────────────────────────────────────────────

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
      className="border border-white/[0.08] bg-white/[0.02] p-5 md:p-8 flex flex-col"
    >
      <div className="font-serif-display italic text-primary text-5xl leading-none mb-4 select-none">
        "
      </div>
      <p className="text-base font-light text-white/65 leading-relaxed mb-6 flex-1">{t.quote}</p>
      <div>
        <div className="font-mono text-xs text-white/60 uppercase tracking-widest">{t.name}</div>
        <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mt-0.5">
          {t.role} — {t.company}
        </div>
      </div>
    </motion.div>
  );
}

// ── Pricing Card ───────────────────────────────────────────────────────────

function PricingCard({ tier, i }: { tier: PricingTier; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
      className={`relative border p-5 md:p-8 flex flex-col ${
        tier.highlighted
          ? 'border-primary/50 bg-primary/[0.05]'
          : 'border-white/[0.08] bg-white/[0.02]'
      }`}
    >
      {/* Top accent line */}
      {tier.highlighted && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      )}
      {tier.highlighted && (
        <div className="absolute -top-3 left-8">
          <span className="font-mono text-[10px] text-black bg-primary px-2 py-0.5 uppercase tracking-widest">
            Most Popular
          </span>
        </div>
      )}

      <div className="mb-5">
        <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-1">
          {tier.subtitle}
        </div>
        <div className="font-serif-display italic text-2xl text-[#F5F0E8]">{tier.name}</div>
      </div>

      <div className="mb-6 pb-6 border-b border-white/[0.07]">
        <div
          className={`font-serif-display italic leading-none ${
            tier.highlighted ? 'text-primary' : 'text-white'
          }`}
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          {tier.setup}
        </div>
        <div className="font-mono text-xs text-white/35 mt-1">{tier.monthly}</div>
      </div>

      <ul className="space-y-3 mb-8 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check
              className={`size-3.5 mt-0.5 shrink-0 ${tier.highlighted ? 'text-primary' : 'text-white/35'}`}
            />
            <span className="text-sm font-light text-white/55">{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contact"
        className={`font-mono text-xs uppercase tracking-widest px-6 py-3 text-center transition-colors block ${
          tier.highlighted
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'border border-white/20 text-white/55 hover:border-white/40 hover:text-white'
        }`}
      >
        {tier.cta} →
      </a>
    </motion.div>
  );
}

// ── Contact Form ───────────────────────────────────────────────────────────

function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', projectType: '', message: '' });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // Sign up free at formspree.io, create a form, then replace YOUR_FORM_ID
      const res = await fetch('https://formspree.io/f/mzdqyrev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus('sent');
        setForm({ name: '', email: '', projectType: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const base =
    'w-full bg-white/[0.03] border border-white/[0.10] text-white/80 font-light text-sm px-4 py-3 placeholder-white/20 focus:outline-none focus:border-primary/50 transition-colors';

  if (status === 'sent') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-primary/30 bg-primary/[0.04] p-8 text-center"
      >
        <div className="font-serif-display italic text-primary text-3xl mb-2">Got it.</div>
        <p className="font-mono text-xs text-white/40 uppercase tracking-widest">
          I'll reply within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          placeholder="Your name"
          required
          value={form.name}
          onChange={handleChange}
          className={base}
        />
        <input
          name="email"
          type="email"
          placeholder="Email address"
          required
          value={form.email}
          onChange={handleChange}
          className={base}
        />
      </div>

      <select
        name="projectType"
        value={form.projectType}
        onChange={handleChange}
        className={`${base} cursor-pointer`}
        style={{ appearance: 'none' }}
      >
        <option value="" disabled>
          What do you need?
        </option>
        <option value="starter">Starter Site ($750 setup)</option>
        <option value="standard">Standard Site ($1,500 setup)</option>
        <option value="webapp">Web Application (custom quote)</option>
        <option value="other">Something else</option>
      </select>

      <textarea
        name="message"
        placeholder="Tell me about your business and what you're looking for..."
        required
        rows={5}
        value={form.message}
        onChange={handleChange}
        className={`${base} resize-none`}
      />

      <div className="flex items-center gap-6 flex-wrap">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-8 py-3 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message →'}
        </button>

        {status === 'error' && (
          <p className="font-mono text-xs text-red-400/80">
            Something went wrong.{' '}
            <a href="mailto:macrae@macraemyint.com" className="underline hover:text-red-300">
              Email me directly.
            </a>
          </p>
        )}
      </div>
    </form>
  );
}

// ── Sticky CTA Bar ─────────────────────────────────────────────────────────

function StickyBar() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const threshold = document.documentElement.scrollHeight * 0.15;
      setVisible(window.scrollY > threshold);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-black/92 border-t border-white/[0.08] backdrop-blur-md"
        >
          <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <p className="font-mono text-xs text-white/40 hidden sm:block">
              Ready to get your site built?
            </p>
            <div className="flex items-center gap-3 ml-auto">
              <a
                href="https://calendly.com/macrae-macraemyint/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2 border border-primary/40 text-primary font-mono text-xs uppercase tracking-widest hover:bg-primary/10 transition-colors whitespace-nowrap hidden sm:block"
              >
                Book a call ↗
              </a>
              <a
                href="#contact"
                onClick={() => setDismissed(true)}
                className="px-5 py-2 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Get in touch →
              </a>
              <button
                onClick={() => setDismissed(true)}
                className="text-white/25 hover:text-white/60 transition-colors p-1"
                aria-label="Dismiss"
              >
                <X className="size-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── Main Export ────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <SEOHead
        title="Web Designer & Developer — Local Business Websites"
        description="Macrae Myint — web designer and developer building clean, fast websites for local businesses. 12+ years design experience. Based in Seattle, WA."
        image="/og-image.png"
      />

      <div className="grain-overlay" aria-hidden="true" />
      <StickyBar />

      <div className="min-h-screen bg-black text-[#F5F0E8] font-sans-body">
        <Hero />

        {/* ── INTRO ───────────────────────────────────────────────────── */}
        <section className="py-16 md:py-32 px-5 sm:px-8 lg:px-16">
          <motion.div {...reveal}>
            <h2
              className="font-serif-display italic text-white"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5.5rem)', letterSpacing: '-2px', lineHeight: 1 }}
            >
              Clean sites. Fast builds.<br />Real results.
            </h2>
            <p className="mt-6 text-lg font-light text-white/40 max-w-xl leading-relaxed">
              Local service businesses in WA get a polished, mobile-first website built in ~5 days —
              then managed monthly. No templates. No page builders. Just good design and clean code.
            </p>
          </motion.div>
        </section>

        {/* ── WEB PROJECTS ─────────────────────────────────────────────── */}
        <section id="projects" className="py-12 md:py-20 px-5 sm:px-8 lg:px-16 border-t border-white/[0.07]">
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                <div className="border border-dashed border-white/[0.08] bg-white/[0.01] overflow-hidden h-full">
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
                        <span
                          key={s}
                          className="font-mono text-[10px] text-white/20 uppercase border border-white/[0.05] px-2 py-0.5"
                        >
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

        {/* ── PROCESS ──────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 px-5 sm:px-8 lg:px-16 border-t border-white/[0.07]">
          <motion.div {...reveal} className="mb-16">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">
              // HOW IT WORKS
            </p>
            <h2
              className="font-serif-display italic text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-2px', lineHeight: 1 }}
            >
              From first email<br />to live site in 7 days.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.day}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 }}
                className="relative border-l border-white/[0.08] pl-6 pb-10 md:pb-0"
              >
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 border border-primary/60 bg-black rotate-45" />
                <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-2">
                  {step.day}
                </div>
                <div className="font-serif-display italic text-lg text-[#F5F0E8] mb-2">
                  {step.title}
                </div>
                <p className="text-xs font-light text-white/40 leading-relaxed pr-4">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── STATS ────────────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 px-5 sm:px-8 lg:px-16 border-t border-white/[0.07]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {stats.map((s, i) => (
              <AnimatedStat
                key={s.label}
                target={s.target}
                suffix={s.suffix}
                label={s.label}
                delay={i * 0.08}
              />
            ))}
          </div>
        </section>

        {/* ── TESTIMONIALS ─────────────────────────────────────────────── */}
        <section className="py-16 md:py-24 px-5 sm:px-8 lg:px-16 border-t border-white/[0.07]">
          <motion.div {...reveal} className="mb-12">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">
              // CLIENTS
            </p>
            <h2
              className="font-serif-display italic text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-2px', lineHeight: 1 }}
            >
              What clients say.
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.name} t={t} i={i} />
            ))}
          </div>
        </section>

        {/* ── PRICING ──────────────────────────────────────────────────── */}
        <section id="pricing" className="py-16 md:py-24 px-5 sm:px-8 lg:px-16 border-t border-white/[0.07]">
          <motion.div {...reveal} className="mb-16">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">
              // PRICING
            </p>
            <h2
              className="font-serif-display italic text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-2px', lineHeight: 1 }}
            >
              Transparent pricing.<br />No surprises.
            </h2>
            <p className="mt-4 text-lg font-light text-white/40 max-w-md leading-relaxed">
              One-time setup fee + flat monthly management. Cancel any time.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {pricingTiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} i={i} />
            ))}
          </div>

          <motion.p
            {...reveal}
            className="mt-8 font-mono text-[10px] text-white/20 text-center uppercase tracking-widest"
          >
            All prices in USD · Setup fee is one-time · Monthly covers hosting, updates & support
          </motion.p>
        </section>

        {/* ── DESIGN BACKGROUND ────────────────────────────────────────── */}
        <section id="design" className="py-16 md:py-24 px-5 sm:px-8 lg:px-16 border-t border-white/[0.07]">
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

        {/* ── LAB / OFF THE CLOCK ──────────────────────────────────────── */}
        <section id="lab" className="py-16 md:py-24 px-5 sm:px-8 lg:px-16 border-t border-white/[0.07]">
          <motion.div {...reveal} className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
            <div>
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">
                // OFF THE CLOCK — LAB 001
              </p>
              <h2
                className="font-serif-display italic text-white"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-2px', lineHeight: 1 }}
              >
                I build things<br />for fun, too.
              </h2>
              <p className="mt-4 text-lg font-light text-white/40 max-w-md leading-relaxed">
                A live solar system simulator running real orbital math in your browser — Kepler's
                equation solved every frame against JPL data, so the planets on screen are where
                they actually are right now. Every surface is generated from code. A weekend build,
                zero image assets.
              </p>
              <Link
                to="/solar-system"
                className="inline-flex items-center gap-2 mt-8 font-mono text-xs uppercase tracking-widest text-amber-400 hover:text-amber-300 transition-colors group"
              >
                Enter the simulator
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            <Link to="/solar-system" className="block group relative overflow-hidden border border-white/[0.08]">
              <img
                src={solarSystemCover}
                alt="Solar System — live orbital simulator"
                loading="lazy"
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                <span className="font-mono text-[10px] uppercase tracking-widest text-white/80">
                  Real-time Keplerian ephemeris ↗
                </span>
              </div>
            </Link>
          </motion.div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────── */}
        <section id="services" className="py-16 md:py-24 px-5 sm:px-8 lg:px-16 bg-black border-t border-white/[0.07]">
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
                    <span className="font-sans-body font-medium text-base text-white">{s.title}</span>
                  </div>
                  <p className="font-light text-sm text-white/40 max-w-xs text-right">{s.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ──────────────────────────────────────────────────── */}
        <section id="contact" className="py-20 md:py-32 px-5 sm:px-8 lg:px-16 border-t border-white/[0.07]">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <motion.div {...reveal}>
              <h2
                className="font-serif-display italic text-white"
                style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-3px', lineHeight: 0.9 }}
              >
                Let's build<br />your site.
              </h2>
              <p className="mt-6 text-lg font-light text-white/40 max-w-sm leading-relaxed">
                Based in Redmond, WA — working with businesses in WA, OR, and remotely.
                I'll reply within 24 hours.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href="mailto:macrae@macraemyint.com"
                  className="flex items-center gap-2 font-mono text-sm text-white/40 hover:text-white transition-colors w-fit"
                >
                  <ArrowRight className="size-4" />
                  macrae@macraemyint.com
                </a>
                <a
                  href="https://calendly.com/macrae-macraemyint/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-sm text-primary/70 hover:text-primary transition-colors w-fit"
                >
                  <ArrowRight className="size-4" />
                  Book a free 30-min intro call ↗
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <ContactForm />
              <p className="mt-4 font-mono text-[10px] text-white/15 uppercase tracking-widest">
                // Contact form active — submissions go to macrae@macraemyint.com via Formspree
              </p>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
