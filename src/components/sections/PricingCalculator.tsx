import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { Calculator, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const illustrationStyles = [
  { price: 50 },
  { price: 100 },
  { price: 150 },
  { price: 120 },
];

const carCounts = [
  { multiplier: 1 },
  { multiplier: 1.8 },
  { multiplier: 2.5 },
];

const backgroundTypes = [
  { price: 0 },
  { price: 25 },
  { price: 75 },
];

interface CalcSelections {
  styleIdx: number;
  carsIdx: number;
  bgIdx: number;
  rush: boolean;
}

export function PricingCalculator({ onBook }: { onBook?: (selections: { style: string; background: string; total: number }) => void }) {
  const [sel, setSel] = useState<CalcSelections>({ styleIdx: 1, carsIdx: 0, bgIdx: 0, rush: false });
  const { t, lang } = useLanguage();

  const styleLabels = [t('calc.simpleOutline'), t('calc.fullColor'), t('calc.detailedScene'), t('calc.animeStyle')];
  const carLabels = [t('calc.1car'), t('calc.2cars'), t('calc.3cars')];
  const bgLabels = [t('calc.none'), t('calc.simple'), t('calc.fullScene')];
  const currencySymbol = lang === 'th' ? '฿' : '$';

  const total = useMemo(() => {
    const base = illustrationStyles[sel.styleIdx].price;
    const carMultiplier = carCounts[sel.carsIdx].multiplier;
    const bg = backgroundTypes[sel.bgIdx].price;
    const subtotal = base * carMultiplier + bg;
    return sel.rush ? Math.round(subtotal * 1.5) : Math.round(subtotal);
  }, [sel]);

  return (
    <section id="calculator" className="relative py-24 md:py-32 px-6 lg:px-8 bg-secondary/30 overflow-hidden">
      <span className="absolute bottom-10 right-10 text-[14rem] font-bold select-none pointer-events-none kanji-watermark">算</span>
      <div className="max-w-3xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10">
              <Calculator className="size-4 text-primary" />
              <span className="text-sm font-bold font-display uppercase tracking-wider text-primary">{t('calc.instantQuote')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
              {t('calc.title1')} <span className="text-gradient">{t('calc.title2')}</span>
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TiltCard tiltMax={3} className="p-8 rounded-xl bg-card border border-border space-y-8">
            {/* Style */}
            <OptionGroup
              label={t('calc.style')}
              options={styleLabels.map((s, i) => `${s} — ${currencySymbol}${illustrationStyles[i].price}`)}
              activeIdx={sel.styleIdx}
              onChange={(i) => setSel((p) => ({ ...p, styleIdx: i }))}
            />

            {/* Cars */}
            <OptionGroup
              label={t('calc.cars')}
              options={carLabels}
              activeIdx={sel.carsIdx}
              onChange={(i) => setSel((p) => ({ ...p, carsIdx: i }))}
            />

            {/* Background */}
            <OptionGroup
              label={t('calc.background')}
              options={bgLabels.map((b, i) => backgroundTypes[i].price > 0 ? `${b} (+${currencySymbol}${backgroundTypes[i].price})` : b)}
              activeIdx={sel.bgIdx}
              onChange={(i) => setSel((p) => ({ ...p, bgIdx: i }))}
            />

            {/* Rush */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary border border-border">
              <div>
                <p className="font-display font-semibold uppercase tracking-wider text-sm">{t('calc.rush')}</p>
                <p className="text-xs text-muted-foreground">{t('calc.rushDesc')}</p>
              </div>
              <button
                type="button"
                onClick={() => setSel((p) => ({ ...p, rush: !p.rush }))}
                className={`relative w-12 h-6 rounded-full transition-colors ${sel.rush ? 'bg-primary' : 'bg-border'}`}
              >
                <motion.div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-foreground"
                  animate={{ left: sel.rush ? '26px' : '2px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
            </div>

            {/* Total */}
            <div className="pt-6 border-t border-border flex items-center justify-between">
              <span className="text-muted-foreground font-display uppercase tracking-wider text-sm">{t('calc.total')}</span>
              <motion.span
                key={total}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-bold font-display text-primary"
              >
                {currencySymbol}{total}
              </motion.span>
            </div>

            <MagneticButton>
              <button
                type="button"
                onClick={() => onBook?.({
                  style: styleLabels[sel.styleIdx],
                  background: bgLabels[sel.bgIdx],
                  total,
                })}
                className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-display font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_hsla(15,100%,55%,0.4)]"
              >
                {t('calc.book')}
                <ArrowRight className="size-4" />
              </button>
            </MagneticButton>
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>
  );
}

function OptionGroup({ label, options, activeIdx, onChange }: {
  label: string; options: string[]; activeIdx: number; onChange: (i: number) => void;
}) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-display font-semibold uppercase tracking-wider text-foreground">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(i)}
            className={`px-4 py-2 rounded-lg text-xs font-display font-semibold uppercase tracking-wider transition-all border ${
              activeIdx === i
                ? 'bg-primary text-primary-foreground border-primary shadow-[0_0_15px_hsla(210,100%,55%,0.3)]'
                : 'bg-secondary text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
