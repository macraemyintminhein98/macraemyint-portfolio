import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

export function VisitorCounter() {
  const [count, setCount] = useState(() => Math.floor(Math.random() * 17) + 8);
  const { t } = useLanguage();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(Math.floor(Math.random() * 17) + 8);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="fixed bottom-8 left-8 z-50 px-4 py-2 rounded-full bg-card/90 border border-border backdrop-blur-sm shadow-lg flex items-center gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 3 }}
    >
      <span className="text-sm">👀</span>
      <span className="text-xs font-display font-semibold text-muted-foreground">
        {count} {t('visitor.viewing')}
      </span>
    </motion.div>
  );
}
