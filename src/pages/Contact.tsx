import { motion } from 'framer-motion';
import { Mail, ArrowRight } from 'lucide-react';
import { profileInfo } from '@/data/profile';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact"
        description={`Commission a custom car illustration from ${profileInfo.name}. Book a consultation or get in touch today.`}
      />
      
      <div className="min-h-screen">
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight mb-4">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Ready to commission your dream car illustration?
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <ScrollReveal>
                <div className="p-8 rounded-xl bg-card border border-border card-shadow space-y-6">
                  <h2 className="text-2xl font-display font-bold uppercase tracking-wider">Contact Info</h2>
                  <div className="space-y-5">
                    {/* Emails */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10"><Mail className="size-5 text-primary" /></div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a href={`mailto:${profileInfo.email}`} className="text-foreground font-medium hover:text-primary transition-colors block">
                          {profileInfo.email}
                        </a>
                        {profileInfo.emailSecondary && (
                          <a href={`mailto:${profileInfo.emailSecondary}`} className="text-foreground font-medium hover:text-primary transition-colors block">
                            {profileInfo.emailSecondary}
                          </a>
                        )}
                      </div>
                    </div>
                    {/* Instagram */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <svg className="size-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="20" rx="5" />
                          <circle cx="12" cy="12" r="5" />
                          <circle cx="18" cy="6" r="1.5" fill="currentColor" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Instagram</p>
                        <a href={profileInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                          @macrae_minhein
                        </a>
                      </div>
                    </div>
                    {/* Twitter/X */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <svg className="size-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Twitter / X</p>
                        <a href={profileInfo.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                          @macrae_minhein
                        </a>
                      </div>
                    </div>
                    {/* TikTok */}
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <svg className="size-5 text-primary" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.83 4.83 0 0 1-1-.15z"/>
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">TikTok</p>
                        <a href={profileInfo.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="text-foreground font-medium hover:text-primary transition-colors">
                          @macrae_minhein
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Book Consultation */}
              <ScrollReveal delay={0.1}>
                <div className="p-8 rounded-xl bg-primary/5 border border-primary/30 glow flex flex-col items-center justify-center text-center space-y-6 h-full">
                  <h2 className="text-2xl font-display font-bold uppercase tracking-wider">Book a Consultation</h2>
                  <p className="text-muted-foreground">
                    Schedule a free call to discuss your car illustration project, timeline, and style preferences.
                  </p>
                  <a
                    href={profileInfo.calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-display font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-primary/90 transition-all hover:scale-105 glow"
                  >
                    Book Consultation
                    <ArrowRight className="size-4" />
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
