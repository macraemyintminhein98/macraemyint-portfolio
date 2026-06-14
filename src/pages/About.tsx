import { motion } from 'framer-motion';
import { MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { profileInfo } from '@/data/profile';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

const reveal = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
};

export default function About() {
  return (
    <>
      <SEOHead
        title="About"
        description={`${profileInfo.name} — web designer and developer with 12+ years of design experience, building local business websites and production web applications.`}
      />

      <div className="min-h-screen bg-black text-[#F5F0E8]">
        {/* Hero */}
        <section className="py-24 md:py-32 px-8 lg:px-16 border-b border-white/[0.07]">
          <motion.div {...reveal} className="max-w-4xl">
            <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-4">
              // ABOUT
            </p>
            <h1
              className="font-serif-display italic text-white"
              style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', letterSpacing: '-3px', lineHeight: 0.9 }}
            >
              About Me
            </h1>
            <p className="mt-6 text-lg font-light text-white/40 max-w-lg leading-relaxed">
              {profileInfo.tagline}
            </p>
          </motion.div>
        </section>

        {/* Bio + Portrait */}
        <section className="py-16 md:py-24 px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-white/[0.03] border border-white/[0.07]">
                  <img
                    src={profileInfo.portraitImage}
                    alt={profileInfo.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="space-y-3">
                  <h2
                    className="font-serif-display italic text-white"
                    style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-2px', lineHeight: 1 }}
                  >
                    Web Designer<br />& Developer
                  </h2>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-primary/40 bg-primary/10">
                    <span className="text-xs font-mono uppercase tracking-wider text-primary">
                      ✦ Taking On New Clients
                    </span>
                  </div>
                </div>

                <Separator className="bg-white/[0.07]" />

                <div className="space-y-5">
                  {profileInfo.biography.split('\n\n').map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-base md:text-lg leading-relaxed text-white/60 font-light"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="size-4 text-primary" />
                    <span className="text-white/50 font-mono">{profileInfo.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="size-4 text-primary font-mono">@</span>
                    <a
                      href={`mailto:${profileInfo.email}`}
                      className="text-primary font-mono hover:text-primary/80 transition-colors"
                    >
                      {profileInfo.email}
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-16 md:py-24 px-8 lg:px-16 border-t border-white/[0.07]">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <p className="font-mono text-xs text-white/30 uppercase tracking-widest mb-4">
                // SKILLS
              </p>
              <h2
                className="font-serif-display italic text-white mb-12"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', letterSpacing: '-2px', lineHeight: 1 }}
              >
                What I work with.
              </h2>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-6">
              {profileInfo.skills.map((category, index) => (
                <ScrollReveal key={category.category} delay={index * 0.1}>
                  <div className="p-6 border border-white/[0.08] bg-white/[0.02]">
                    <h3 className="font-mono text-xs uppercase tracking-widest mb-4 text-primary">
                      {category.category}
                    </h3>
                    <div className="space-y-4">
                      {category.skills.map((skill) => (
                        <div key={skill.name} className="space-y-1">
                          <p className="font-medium text-sm text-white/80">{skill.name}</p>
                          <p className="text-xs text-white/40 font-mono">{skill.tools.join(' · ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section className="py-16 md:py-24 px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-12">
                <Briefcase className="size-6 text-primary" />
                <h2
                  className="font-serif-display italic text-white"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)', letterSpacing: '-2px' }}
                >
                  Work Experience
                </h2>
              </div>
            </ScrollReveal>
            <div className="space-y-8">
              {profileInfo.experience.map((job, index) => (
                <ScrollReveal key={job.id} delay={index * 0.08}>
                  <div className="relative pl-8 border-l border-white/[0.08] hover:border-primary/40 transition-colors">
                    <div className="absolute -left-1.5 top-0 w-3 h-3 bg-primary" />
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-sans-body font-semibold text-lg text-white/90">
                          {job.title}
                        </h3>
                        {job.current && (
                          <span className="px-2 py-0.5 text-[10px] font-mono bg-primary/10 text-primary uppercase tracking-wider">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="text-primary font-mono text-sm">{job.company}</p>
                      <p className="text-xs text-white/30 font-mono">
                        {job.period} · {job.location}
                      </p>
                      <ul className="mt-3 space-y-1.5">
                        {job.responsibilities.map((item, i) => (
                          <li
                            key={i}
                            className="text-sm text-white/50 flex items-start gap-2 font-light"
                          >
                            <span className="text-primary mt-1 shrink-0">—</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="py-16 md:py-24 px-8 lg:px-16 border-t border-white/[0.07]">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-12">
                <GraduationCap className="size-6 text-primary" />
                <h2
                  className="font-serif-display italic text-white"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)', letterSpacing: '-2px' }}
                >
                  Education
                </h2>
              </div>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              {profileInfo.education.map((edu, index) => (
                <ScrollReveal key={edu.id} delay={index * 0.1}>
                  <div className="p-6 border border-white/[0.08] bg-white/[0.02]">
                    <h3 className="font-sans-body font-semibold text-base text-white/90">
                      {edu.degree}
                    </h3>
                    <p className="text-primary font-mono text-sm mb-1">{edu.institution}</p>
                    <p className="text-xs text-white/30 font-mono">{edu.period}</p>
                    <p className="text-sm font-light text-white/50 mt-2">{edu.grade}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
