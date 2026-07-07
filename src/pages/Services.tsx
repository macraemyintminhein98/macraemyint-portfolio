import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Layout, ShoppingBag } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

const CALENDLY = 'https://calendly.com/macrae-macraemyint/30min';

const PACKAGES = [
  {
    icon: Zap,
    name: 'Starter',
    price: '$800',
    tag: 'Most Popular',
    tagColor: 'text-amber-400 border-amber-400/40 bg-amber-400/10',
    desc: 'A clean, fast, single-page website — ideal for local service businesses that need a professional online presence fast.',
    includes: [
      'Single-page design (all sections)',
      'Mobile-first, fully responsive',
      'Contact form with email notifications',
      'Google Maps embed',
      'SEO basics (meta, sitemap, robots.txt)',
      'Hosting setup & domain connection',
      '30 days of post-launch edits',
      'Delivered in ~48 hours',
    ],
  },
  {
    icon: Layout,
    name: 'Standard',
    price: '$1,200',
    tag: 'Best Value',
    tagColor: 'text-emerald-400 border-emerald-400/40 bg-emerald-400/10',
    desc: 'A multi-page site with more room to tell your story, showcase services, and convert visitors into customers.',
    includes: [
      'Up to 7 pages (Home, About, Services, Gallery, FAQ, Contact, +1)',
      'Booking or quote request form',
      'Google Reviews integration',
      'Blog or news section (optional)',
      'Google Analytics setup',
      'All Starter package features',
      '30 days of post-launch edits',
      'Delivered in 5–7 business days',
    ],
  },
  {
    icon: ShoppingBag,
    name: 'Custom',
    price: 'From $1,800',
    tag: 'Full Build',
    tagColor: 'text-sky-400 border-sky-400/40 bg-sky-400/10',
    desc: 'Complex builds including e-commerce stores, booking systems, custom dashboards, or web applications.',
    includes: [
      'E-commerce / online store',
      'Custom booking or scheduling system',
      'Payment integration (Stripe, PayPal)',
      'Admin dashboard or CMS',
      'User authentication',
      'Third-party API integrations',
      'Performance & Core Web Vitals optimisation',
      'Timeline and pricing scoped per project',
    ],
  },
];

const ADDONS = [
  { name: 'Monthly Maintenance', price: '$50/mo', desc: 'Updates, backups, uptime monitoring, and changes whenever you need them.' },
  { name: 'Google Ads Setup', price: '$200 one-time', desc: 'Campaign setup, keyword research, and conversion tracking. You control the ad spend.' },
  { name: 'SEO Package', price: '$300 / 3 months', desc: 'On-page optimisation, local SEO, Google Business setup, and monthly progress report.' },
];

const PROCESS = [
  { step: '01', title: 'Book a call', desc: 'Free 30-minute intro. We talk through your business, goals, and what you need.' },
  { step: '02', title: 'Proposal + 50% deposit', desc: 'I send a clear scope and price. Once you approve and pay the deposit, we start.' },
  { step: '03', title: 'Build', desc: 'I design and build. You get a preview link to review. Up to 3 rounds of revisions included.' },
  { step: '04', title: 'Launch + handover', desc: 'I push the site live, set up hosting, and walk you through it. Final 50% due on launch.' },
];

export default function Services() {
  return (
    <>
      <SEOHead
        title="Services & Pricing"
        description="Web design and development services for local businesses. Single-page sites from $800, multi-page from $1,200. Delivered fast, built to convert."
      />

      <div className="min-h-screen bg-black text-[#F5F0E8]">

        {/* ── Hero ── */}
        <section className="py-24 md:py-32 px-8 lg:px-16 border-b border-white/[0.07]">
          <motion.div {...reveal} className="max-w-4xl">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-4">
              // SERVICES
            </p>
            <h1
              className="font-serif-display italic text-white"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-3px', lineHeight: 0.9 }}
            >
              Simple pricing.<br />Real results.
            </h1>
            <p className="mt-6 text-lg font-light text-white/40 max-w-xl leading-relaxed">
              Clean, fast websites for local service businesses and trades. Fixed prices, no surprises, and I handle everything from design to launch.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-amber-400 text-black font-mono text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors"
              >
                Book a free 30-min call ↗
              </a>
              <a
                href="mailto:macrae@macraemyint.com"
                className="px-6 py-3 border border-white/20 text-white/70 font-mono text-xs uppercase tracking-widest hover:border-white/50 hover:text-white transition-colors"
              >
                Email me instead
              </a>
            </div>
          </motion.div>
        </section>

        {/* ── Packages ── */}
        <section className="py-20 md:py-28 px-8 lg:px-16 border-b border-white/[0.07]">
          <motion.div {...reveal} className="max-w-6xl mx-auto">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">Packages</p>
            <h2 className="font-serif-display italic text-white mb-12" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-2px' }}>
              Pick your package
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {PACKAGES.map((pkg, i) => {
                const Icon = pkg.icon;
                return (
                  <motion.div
                    key={pkg.name}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col border border-white/[0.08] bg-white/[0.02] p-7 hover:border-white/20 hover:bg-white/[0.04] transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-5">
                      <Icon className="size-6 text-white/40" />
                      <span className={`font-mono text-xs px-2.5 py-1 border ${pkg.tagColor}`}>
                        {pkg.tag}
                      </span>
                    </div>

                    <h3 className="font-sans-body text-xl font-semibold text-white mb-1">{pkg.name}</h3>
                    <p className="font-mono text-2xl text-amber-400 mb-4">{pkg.price}</p>
                    <p className="text-sm text-white/40 leading-relaxed mb-6 flex-grow">{pkg.desc}</p>

                    <ul className="space-y-2.5 mb-8">
                      {pkg.includes.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-white/60">
                          <Check className="size-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={CALENDLY}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full py-3 border border-white/20 text-white/70 font-mono text-xs uppercase tracking-widest text-center hover:border-amber-400/60 hover:text-amber-400 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      Get started <ArrowRight className="size-3" />
                    </a>
                  </motion.div>
                );
              })}
            </div>

            <p className="mt-6 text-xs text-white/25 font-mono text-center">
              All packages include a 50% deposit upfront, 50% on launch day. 3 rounds of revisions included.
            </p>
          </motion.div>
        </section>

        {/* ── Add-ons ── */}
        <section className="py-20 px-8 lg:px-16 border-b border-white/[0.07]">
          <motion.div {...reveal} className="max-w-4xl mx-auto">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">Add-ons</p>
            <h2 className="font-serif-display italic text-white mb-10" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-1.5px' }}>
              Keep growing after launch
            </h2>

            <div className="grid sm:grid-cols-3 gap-5">
              {ADDONS.map((addon, i) => (
                <motion.div
                  key={addon.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="border border-white/[0.07] p-5 hover:border-white/15 transition-colors"
                >
                  <p className="font-mono text-amber-400 text-sm mb-2">{addon.price}</p>
                  <h4 className="font-sans-body font-semibold text-white text-sm mb-2">{addon.name}</h4>
                  <p className="text-xs text-white/40 leading-relaxed">{addon.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── Process ── */}
        <section className="py-20 px-8 lg:px-16 border-b border-white/[0.07]">
          <motion.div {...reveal} className="max-w-4xl mx-auto">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">Process</p>
            <h2 className="font-serif-display italic text-white mb-12" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-1.5px' }}>
              How it works
            </h2>

            <div className="grid sm:grid-cols-2 gap-8">
              {PROCESS.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="flex gap-5"
                >
                  <span className="font-mono text-3xl text-white/[0.08] flex-shrink-0 leading-none mt-0.5">{step.step}</span>
                  <div>
                    <h4 className="font-sans-body font-semibold text-white mb-1.5">{step.title}</h4>
                    <p className="text-sm text-white/40 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>


        {/* ── FAQ ── */}
        <section className="py-20 px-8 lg:px-16 border-b border-white/[0.07]">
          <motion.div {...reveal} className="max-w-4xl mx-auto">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="font-serif-display italic text-white mb-10" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', letterSpacing: '-1.5px' }}>
              Common questions
            </h2>

            <div className="space-y-0 divide-y divide-white/[0.06]">
              {[
                {
                  q: 'How long does a website take?',
                  a: "Starter single-page sites are typically delivered within 48 hours of deposit. Standard multi-page sites take 5–7 business days. Custom builds are scoped per project — I'll give you a clear timeline upfront."
                },
                {
                  q: 'How does payment work?',
                  a: '50% deposit to start, 50% on launch day. I accept Zelle, Venmo, PayPal, and bank transfer. No surprises — the price you see is the price you pay.'
                },
                {
                  q: 'What if I need changes after launch?',
                  a: 'Every package includes 3 rounds of revisions before launch. After launch, changes are covered by the $50/mo maintenance plan — or billed at $75/hr if you prefer one-off edits.'
                },
                {
                  q: 'Do you handle hosting and domain setup?',
                  a: 'Yes. I set up and configure everything — hosting, domain connection, SSL certificate, and DNS. You keep ownership of your domain and hosting account. I just handle the technical setup.'
                },
                {
                  q: 'I already have a website. Can you redesign it?',
                  a: 'Absolutely — redesigns are most of what I do. I rebuild your existing site as a clean, fast, modern version. Same domain, same business, completely new look and performance.'
                },
                {
                  q: 'Do you work with businesses outside of Washington?',
                  a: 'Yes. I work remotely with clients across the US and internationally. Everything is handled online — video call, email, and shared Google Drive for content and feedback.'
                },
              ].map((item, i) => (
                <div key={i} className="py-6">
                  <h4 className="font-sans-body font-semibold text-white mb-2.5 text-sm md:text-base">{item.q}</h4>
                  <p className="text-sm text-white/40 leading-relaxed font-light">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 md:py-32 px-8 lg:px-16">
          <motion.div {...reveal} className="max-w-3xl mx-auto text-center">
            <h2
              className="font-serif-display italic text-white mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)', letterSpacing: '-2px', lineHeight: 0.95 }}
            >
              Ready to get started?
            </h2>
            <p className="text-white/40 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Book a free 30-minute call. No pressure, no pitch — just a quick conversation to see if we're a good fit.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-amber-400 text-black font-mono text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors"
              >
                Book a free call ↗
              </a>
              <a
                href="mailto:macrae@macraemyint.com"
                className="px-8 py-4 border border-white/20 text-white/60 font-mono text-xs uppercase tracking-widest hover:border-white/40 hover:text-white transition-colors"
              >
                macrae@macraemyint.com
              </a>
            </div>
            <p className="mt-6 text-xs text-white/20 font-mono">Redmond, WA — available for remote projects worldwide</p>
          </motion.div>
        </section>

      </div>
    </>
  );
}
