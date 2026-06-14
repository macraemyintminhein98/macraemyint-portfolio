import { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowLeft } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getProjectBySlug } from '@/data/projects';
import { ImageWithLightbox } from '@/components/portfolio/ImageWithLightbox';
import { Lightbox } from '@/components/portfolio/Lightbox';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) return <Navigate to="/404" replace />;

  const isWebProject = project.category === 'web-apps';

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  if (isWebProject) {
    return <WebProjectDetail project={project} />;
  }

  // ── Design work: original gallery layout ──────────────────────────────────
  return (
    <>
      <SEOHead title={project.title} description={project.description} image={project.coverImage} type="article" />
      <div className="min-h-screen bg-black text-[#F5F0E8]">
        <motion.div
          className="relative w-full h-[70vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </motion.div>

        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <Link to="/portfolio" className="inline-flex items-center gap-2 font-mono text-xs text-white/40 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="size-3" /> Back to Portfolio
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="font-mono text-xs text-primary uppercase tracking-widest mb-3">{project.category}</p>
            <h1 className="font-serif-display italic text-5xl md:text-6xl mb-6" style={{ letterSpacing: '-2px' }}>{project.title}</h1>
            <p className="text-lg font-light text-white/60 leading-relaxed mb-8">{project.description}</p>
            <div className="flex gap-8 text-sm font-light text-white/40">
              {project.client && <div><span className="block text-white/20 font-mono text-[10px] uppercase mb-1">Client</span>{project.client}</div>}
              {project.tools && <div><span className="block text-white/20 font-mono text-[10px] uppercase mb-1">Tools</span>{project.tools}</div>}
              <div><span className="block text-white/20 font-mono text-[10px] uppercase mb-1">Year</span>{project.year}</div>
            </div>
          </motion.div>
        </section>

        <section className="py-12 md:py-16 space-y-8 md:space-y-12">
          {project.images.map((image, index) => (
            <ScrollReveal key={image.id} delay={index * 0.1}>
              <ImageWithLightbox image={image} onClick={() => openLightbox(index)} priority={index === 0} index={0} className="w-full" />
            </ScrollReveal>
          ))}
        </section>

        <Lightbox images={project.images} currentIndex={currentImageIndex} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} onNavigate={setCurrentImageIndex} />
      </div>
    </>
  );
}

// ── Web Project Case Study Layout ─────────────────────────────────────────────

function WebProjectDetail({ project }: { project: ReturnType<typeof getProjectBySlug> }) {
  if (!project) return null;

  const statusColors: Record<string, string> = {
    Live: 'text-emerald-400 border-emerald-400/40',
    Internal: 'text-white/50 border-white/20',
    Building: 'text-amber-400 border-amber-400/40',
  };
  const statusColor = project.status ? statusColors[project.status] : statusColors['Internal'];

  return (
    <>
      <SEOHead title={project.title} description={project.description} image={project.coverImage} type="article" />

      <div className="min-h-screen bg-black text-[#F5F0E8]">

        {/* Hero screenshot */}
        <motion.div
          className="relative w-full overflow-hidden bg-black"
          style={{ height: 'clamp(280px, 55vh, 600px)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9 }}
        >
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover object-top"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          {/* Back link overlaid on hero */}
          <div className="absolute top-20 left-5 sm:left-8 lg:left-16">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-mono text-xs text-white/50 hover:text-white transition-colors bg-black/40 backdrop-blur px-3 py-1.5 border border-white/10"
            >
              <ArrowLeft className="size-3" /> Portfolio
            </Link>
          </div>
        </motion.div>

        {/* Project header */}
        <section className="px-5 sm:px-8 lg:px-16 pt-10 pb-0 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono text-[10px] text-primary uppercase tracking-widest">{project.client}</span>
              {project.status && (
                <span className={`font-mono text-[10px] uppercase px-2 py-0.5 border ${statusColor}`}>
                  {project.status}
                </span>
              )}
              <span className="font-mono text-[10px] text-white/20">{project.year}</span>
            </div>

            <h1
              className="font-serif-display italic text-[#F5F0E8] mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 6rem)', letterSpacing: '-2px', lineHeight: 0.9 }}
            >
              {project.title}
            </h1>

            <p className="text-lg md:text-xl font-light text-white/50 max-w-2xl leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-8 pb-10 border-b border-white/[0.07]">
              {/* Stack */}
              {project.stack && (
                <div>
                  <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-2">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span key={s} className="font-mono text-xs text-white/50 border border-white/[0.1] px-2 py-0.5">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Live link */}
              {project.liveUrl && (
                <div>
                  <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-2">Live Site</p>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-sm text-primary hover:text-primary/80 transition-colors"
                  >
                    {project.liveUrl.replace('https://', '')} <ExternalLink className="size-3" />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* Case study */}
        {project.caseStudy && (
          <section className="px-5 sm:px-8 lg:px-16 py-16 max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12">
              {[
                { label: '01 — The Problem', text: project.caseStudy.problem, accent: false },
                { label: '02 — The Solution', text: project.caseStudy.solution, accent: true },
                { label: '03 — The Result', text: project.caseStudy.result, accent: false },
              ].map(({ label, text, accent }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className={`border-t pt-6 ${accent ? 'border-primary' : 'border-white/[0.08]'}`}
                >
                  <p className={`font-mono text-[10px] uppercase tracking-widest mb-4 ${accent ? 'text-primary' : 'text-white/30'}`}>
                    {label}
                  </p>
                  <p className="text-base font-light text-white/60 leading-relaxed">{text}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Screenshot gallery */}
        {project.images.length > 0 && (
          <section className="px-5 sm:px-8 lg:px-16 pb-16 max-w-7xl mx-auto">
            <p className="font-mono text-[10px] text-white/20 uppercase tracking-widest mb-6">// Screenshots</p>
            <div className="rounded overflow-hidden border border-white/[0.06]">
              <img
                src={project.images[0].src}
                alt={project.images[0].alt}
                className="w-full object-cover"
              />
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="px-5 sm:px-8 lg:px-16 py-20 border-t border-white/[0.07]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-3">// Get something like this</p>
              <h2
                className="font-serif-display italic text-[#F5F0E8]"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-1px' }}
              >
                Let's build yours.
              </h2>
              <p className="text-white/40 font-light mt-3 max-w-md">
                Clean, fast, fully custom — delivered in 5 days. No templates, no page builders.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a
                href="mailto:macrae@macraemyint.com"
                className="px-8 py-4 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-colors text-center"
              >
                Get in Touch →
              </a>
              <Link
                to="/portfolio"
                className="px-8 py-4 border border-white/20 text-white/60 font-mono text-xs uppercase tracking-widest hover:border-white/40 hover:text-white transition-colors text-center"
              >
                See More Work
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
