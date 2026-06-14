import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const flags: Record<Language, { label: string; code: string }> = {
  en: { label: 'English', code: 'us' },
  th: { label: 'ไทย', code: 'th' },
};

function FlagIcon({ code, size = 20 }: { code: string; size?: number }) {
  // Using flagcdn.com for reliable flag rendering across all platforms
  return (
    <img
      src={`https://flagcdn.com/w40/${code}.png`}
      alt={code}
      width={size}
      height={Math.round(size * 0.75)}
      className="rounded-sm object-cover"
      style={{ width: size, height: Math.round(size * 0.75) }}
    />
  );
}

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();
  const next: Language = lang === 'en' ? 'th' : 'en';

  return (
    <motion.button
      onClick={() => setLang(next)}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card hover:border-primary/40 transition-all text-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${flags[next].label}`}
    >
      <FlagIcon code={flags[lang].code} />
      <span className="font-display font-semibold text-xs uppercase tracking-wider text-foreground">
        {lang === 'en' ? 'EN' : 'TH'}
      </span>
    </motion.button>
  );
}
