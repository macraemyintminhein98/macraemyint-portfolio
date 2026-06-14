import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TiltCard } from '@/components/effects/TiltCard';
import { MagneticButton } from '@/components/effects/MagneticButton';
import { Clock, Users, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

const TOTAL_SLOTS = 5;
const AVAILABLE_SLOTS = 3;

interface CommissionFormData {
  name: string;
  email: string;
  carMake: string;
  carModel: string;
  year: string;
  color: string;
  style: string;
  background: string;
  notes: string;
  budget: string;
}

const initialForm: CommissionFormData = {
  name: '',
  email: '',
  carMake: '',
  carModel: '',
  year: '',
  color: '',
  style: 'Clean',
  background: 'Simple',
  notes: '',
  budget: '$100 - $200',
};

const styles = ['Clean', 'Detailed', 'Anime', 'Aggressive'];
const backgrounds = ['Simple', 'Scene', 'Custom'];
const budgets = ['Under $100', '$100 - $200', '$200 - $300', '$300 - $500', '$500+'];

export function CommissionForm({ prefill }: { prefill?: Partial<CommissionFormData> }) {
  const [form, setForm] = useState<CommissionFormData>({ ...initialForm, ...prefill });
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();
  const slotsAvailable = AVAILABLE_SLOTS > 0;

  const update = (field: keyof CommissionFormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Commission Request from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCar: ${form.year} ${form.carMake} ${form.carModel}\nColor: ${form.color}\nStyle: ${form.style}\nBackground: ${form.background}\nBudget: ${form.budget}\n\nNotes:\n${form.notes}`
    );
    window.open(`mailto:macraemyintminhein98@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  return (
    <section id="commission" className="relative py-24 md:py-32 px-6 lg:px-8 overflow-hidden">
      <span className="absolute top-20 left-10 text-[14rem] font-bold select-none pointer-events-none kanji-watermark">依</span>
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-12 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/40 bg-primary/10">
              <Clock className="size-4 text-primary" />
              <span className="text-sm font-bold font-display uppercase tracking-wider text-primary">
                {t('commission.wait')}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight">
              {t('commission.title1')} <span className="text-gradient">{t('commission.title2')}</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Slots Counter */}
        <ScrollReveal delay={0.1}>
          <div className="mb-10 max-w-md mx-auto space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Users className="size-4" /> {t('commission.slots')}
              </span>
              <span className="font-display font-bold text-primary">
                {AVAILABLE_SLOTS} {t('commission.of')} {TOTAL_SLOTS} {t('commission.available')}
              </span>
            </div>
            <Progress value={(AVAILABLE_SLOTS / TOTAL_SLOTS) * 100} className="h-2 bg-secondary" />
          </div>
        </ScrollReveal>

        {slotsAvailable ? (
          submitted ? (
            <ScrollReveal>
              <TiltCard className="p-10 rounded-xl bg-card border border-primary/30 text-center space-y-4">
                <div className="text-5xl">🎉</div>
                <h3 className="text-2xl font-display font-bold">{t('commission.sent')}</h3>
                <p className="text-muted-foreground">{t('commission.sentDesc')}</p>
              </TiltCard>
            </ScrollReveal>
          ) : (
            <ScrollReveal delay={0.15}>
              <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-xl bg-card border border-border">
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label={t('commission.name')} value={form.name} onChange={(v) => update('name', v)} required />
                  <InputField label={t('commission.email')} type="email" value={form.email} onChange={(v) => update('email', v)} required />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <InputField label={t('commission.carMake')} value={form.carMake} onChange={(v) => update('carMake', v)} placeholder="e.g. Nissan" required />
                  <InputField label={t('commission.carModel')} value={form.carModel} onChange={(v) => update('carModel', v)} placeholder="e.g. Skyline R34" required />
                  <InputField label={t('commission.year')} value={form.year} onChange={(v) => update('year', v)} placeholder="e.g. 1999" />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <InputField label={t('commission.color')} value={form.color} onChange={(v) => update('color', v)} placeholder="e.g. Midnight Purple" />
                  <SelectField label={t('commission.budget')} value={form.budget} options={budgets} onChange={(v) => update('budget', v)} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <RadioField label={t('commission.style')} options={styles} value={form.style} onChange={(v) => update('style', v)} />
                  <RadioField label={t('commission.background')} options={backgrounds} value={form.background} onChange={(v) => update('background', v)} />
                </div>
                <div>
                  <label className="block text-sm font-display font-semibold uppercase tracking-wider text-foreground mb-2">
                    {t('commission.refPhoto')}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-border file:bg-secondary file:text-foreground file:font-display file:font-semibold file:uppercase file:tracking-wider file:text-xs hover:file:bg-primary/10 transition-colors"
                  />
                  <p className="text-xs text-muted-foreground mt-1">{t('commission.refPhotoDesc')}</p>
                </div>
                <div>
                  <label className="block text-sm font-display font-semibold uppercase tracking-wider text-foreground mb-2">
                    {t('commission.notes')}
                  </label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => update('notes', e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder={t('commission.notesPlaceholder')}
                  />
                </div>
                <MagneticButton>
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-primary-foreground font-display font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-primary/90 transition-all hover:shadow-[0_0_30px_hsla(15,100%,55%,0.4)]"
                  >
                    {t('commission.submit')}
                    <ArrowRight className="size-4" />
                  </button>
                </MagneticButton>
              </form>
            </ScrollReveal>
          )
        ) : (
          <ScrollReveal delay={0.15}>
            <WaitlistForm />
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}

function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [joined, setJoined] = useState(false);
  const { t } = useLanguage();

  if (joined) {
    return (
      <TiltCard className="p-10 rounded-xl bg-card border border-primary/30 text-center space-y-4">
        <div className="text-5xl">📋</div>
        <h3 className="text-2xl font-display font-bold">{t('commission.onWaitlist')}</h3>
        <p className="text-muted-foreground">{t('commission.onWaitlistDesc')}</p>
      </TiltCard>
    );
  }

  return (
    <div className="p-8 rounded-xl bg-card border border-border text-center space-y-6">
      <div className="text-4xl">🔒</div>
      <h3 className="text-2xl font-display font-bold">{t('commission.slotsFull')}</h3>
      <p className="text-muted-foreground">{t('commission.waitlistDesc')}</p>
      <form
        onSubmit={(e) => { e.preventDefault(); setJoined(true); }}
        className="max-w-sm mx-auto space-y-4"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t('commission.name')}
          required
          className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t('commission.email')}
          required
          className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary text-primary-foreground font-display font-semibold uppercase tracking-wider text-sm rounded-lg hover:bg-primary/90 transition-all"
        >
          {t('commission.joinWaitlist')}
        </button>
      </form>
    </div>
  );
}

/* Reusable form fields */
function InputField({ label, value, onChange, type = 'text', placeholder, required }: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-display font-semibold uppercase tracking-wider text-foreground mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      />
    </div>
  );
}

function SelectField({ label, value, options, onChange }: {
  label: string; value: string; options: string[]; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-display font-semibold uppercase tracking-wider text-foreground mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function RadioField({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-display font-semibold uppercase tracking-wider text-foreground mb-2">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold uppercase tracking-wider transition-all border ${
              value === o
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-secondary text-muted-foreground border-border hover:border-primary/40'
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
