import { Instagram } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { useLanguage } from '@/contexts/LanguageContext';

const placeholders = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  gradient: [
    'from-primary/30 to-accent',
    'from-accent to-primary/20',
    'from-secondary to-primary/30',
    'from-primary/20 to-secondary',
    'from-accent to-secondary',
    'from-secondary to-accent',
  ][i],
}));

export function InstagramFeed() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
              {t('ig.title1')} <span className="text-gradient">{t('ig.title2')}</span>
            </h2>
            <p className="text-lg text-muted-foreground">{t('ig.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {placeholders.map((p, i) => (
            <ScrollReveal key={p.id} delay={i * 0.05}>
              <TiltCard tiltMax={4}>
                <div className={`aspect-square rounded-lg bg-gradient-to-br ${p.gradient} border border-border flex items-center justify-center group cursor-pointer relative overflow-hidden`}>
                  <Instagram className="size-8 text-muted-foreground group-hover:text-primary transition-colors" />
                  <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="size-10 text-primary" />
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="text-center mt-10">
            <MagneticButton>
              <a
                href="https://www.instagram.com/macrae_minhein/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 border border-border text-foreground font-display font-semibold uppercase tracking-wider text-sm rounded-lg hover:border-primary/40 hover:bg-primary/5 transition-all"
              >
                <Instagram className="size-5" />
                {t('ig.follow')}
              </a>
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
