import { useState, useRef, useCallback } from 'react';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { useLanguage } from '@/contexts/LanguageContext';

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const { t } = useLanguage();

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) updatePosition(e.clientX);
  };

  const onPointerUp = () => { dragging.current = false; };

  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
              {t('ba.title1')} <span className="text-gradient">{t('ba.title2')}</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('ba.subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div
            ref={containerRef}
            className="relative aspect-[16/9] rounded-xl overflow-hidden border border-border select-none touch-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            {/* After (illustration) — full background */}
            <div className="absolute inset-0">
              <img
                src="/images/after-art.jpg"
                alt="Finished illustration"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Before (photo) — clipped */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <img
                src="/images/before-car.jpg"
                alt="Reference car photo"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Slider Handle */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-primary cursor-ew-resize z-10"
              style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-primary border-2 border-primary-foreground flex items-center justify-center shadow-lg">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-primary-foreground">
                  <path d="M8 6l-4 6 4 6M16 6l4 6-4 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-display font-bold uppercase tracking-wider text-foreground border border-border">
              {t('ba.yourCar')}
            </div>
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-primary/80 backdrop-blur-sm text-xs font-display font-bold uppercase tracking-wider text-primary-foreground">
              {t('ba.yourIllustration')}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
