import { Star } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { useLanguage } from '@/contexts/LanguageContext';

const testimonials = [
  {
    name: 'Alex R.',
    car: 'Nissan Skyline R34 GT-R',
    rating: 5,
    text: "Macrae absolutely nailed my R34. Every single detail is spot on — from the Midnight Purple paint to the Nismo side skirts. The vector quality is insane, I got it printed on a huge canvas and it looks perfect. 100% worth every penny.",
  },
  {
    name: 'Jordan T.',
    car: 'Toyota Supra MK4',
    rating: 5,
    text: "I've never seen anyone capture the curves of a Supra like this. The anime-style background with the sunset was exactly what I envisioned. Turnaround time was super fast too. Already planning my next commission!",
  },
  {
    name: 'Kenji M.',
    car: 'Mitsubishi Evo IX',
    rating: 5,
    text: "Commissioned a manga-style Evo IX piece and it blew my mind. The attention to detail on the Varis kit and Enkei wheels is unreal. Macrae's pen tool work is truly next level. Highly recommend to any car enthusiast.",
  },
];

export function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-8 bg-secondary/30 overflow-hidden">
      <span className="absolute top-10 right-10 text-[14rem] font-bold select-none pointer-events-none kanji-watermark">声</span>
      <div className="max-w-6xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
              {t('testimonials.title1')} <span className="text-gradient">{t('testimonials.title2')}</span>
            </h2>
            <p className="text-lg text-muted-foreground">{t('testimonials.subtitle')}</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.name} delay={i * 0.1}>
              <TiltCard tiltMax={5} className="p-6 rounded-xl bg-card border border-border h-full flex flex-col space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, j) => (
                    <Star key={j} className="size-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">"{testimonial.text}"</p>
                <div className="pt-4 border-t border-border">
                  <p className="font-display font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-primary">{testimonial.car}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
