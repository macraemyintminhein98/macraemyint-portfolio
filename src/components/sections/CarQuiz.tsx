import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { ArrowRight, RotateCcw } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const resultMap: Record<string, string> = {
  '90s JDM-Street-White': 'Clean Street Style',
  '90s JDM-Street-Black': 'Midnight Street Scene',
  '90s JDM-Drift-Red': 'Aggressive Anime Scene',
  '90s JDM-Track-Black': 'Detailed Track Attack',
  'Modern-Show-White': 'Minimal Clean Outline',
  'Classic-Street-Red': 'Retro Anime Style',
};

function getResult(answers: string[]): string {
  const key = answers.join('-');
  if (resultMap[key]) return resultMap[key];
  const era = answers[0];
  const vibe = answers[1];
  if (era === '90s JDM' || era === 'Classic') {
    if (vibe === 'Drift' || vibe === 'Street') return 'Aggressive Anime Scene';
    return 'Detailed JDM Portrait';
  }
  if (vibe === 'Show') return 'Clean Minimalist Outline';
  if (vibe === 'Track') return 'Dynamic Track Scene';
  return 'Full Color Detailed Scene';
}

export function CarQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const { t } = useLanguage();

  const questions = [
    { question: t('quiz.q1'), options: ['90s JDM', '2000s Euro', 'Modern', 'Classic'] },
    { question: t('quiz.q2'), options: ['Street', 'Track', 'Drift', 'Show'] },
    { question: t('quiz.q3'), options: ['White', 'Black', 'Red', 'Other'] },
  ];

  const isComplete = step >= questions.length;

  const answer = (option: string) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);
    setStep(step + 1);
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
  };

  return (
    <section className="relative py-24 md:py-32 px-6 lg:px-8 bg-secondary/30 overflow-hidden">
      <span className="absolute bottom-10 left-10 text-[14rem] font-bold select-none pointer-events-none kanji-watermark">車</span>
      <div className="max-w-2xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
              {t('quiz.title1')} <span className="text-gradient">{t('quiz.title2')}</span>
            </h2>
            <p className="text-lg text-muted-foreground">{t('quiz.subtitle')}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <TiltCard tiltMax={3} className="p-8 rounded-xl bg-card border border-border min-h-[300px] flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              {!isComplete ? (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="w-full space-y-6 text-center"
                >
                  <div className="text-xs font-display font-bold uppercase tracking-wider text-muted-foreground">
                    {t('quiz.question')} {step + 1} {t('quiz.of')} {questions.length}
                  </div>
                  <h3 className="text-2xl font-display font-bold">{questions[step].question}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {questions[step].options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => answer(opt)}
                        className="px-4 py-3 rounded-lg border border-border bg-secondary text-foreground font-display font-semibold uppercase tracking-wider text-sm hover:border-primary/50 hover:bg-primary/5 transition-all"
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6 w-full"
                >
                  <div className="text-5xl">🏎️</div>
                  <div>
                    <p className="text-sm text-muted-foreground font-display uppercase tracking-wider mb-2">{t('quiz.resultLabel')}</p>
                    <h3 className="text-3xl font-display font-bold text-gradient">{getResult(answers)}</h3>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                    <MagneticButton>
                      <a
                        href="#commission"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-display font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-primary/90 transition-all"
                      >
                        {t('quiz.bookCommission')}
                        <ArrowRight className="size-4" />
                      </a>
                    </MagneticButton>
                    <button
                      onClick={reset}
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-display font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-secondary transition-all"
                    >
                      <RotateCcw className="size-4" />
                      {t('quiz.retake')}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </TiltCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
