import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import logoSignature from '@/assets/logo-signature.png';

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      window.dispatchEvent(new Event('app-loaded'));
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center"
          style={{ background: 'hsl(0 0% 0%)' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Ambient glow */}
          <div
            className="absolute w-[40rem] h-[40rem] rounded-full blur-[160px] pointer-events-none"
            style={{ background: 'hsla(45, 53%, 54%, 0.06)' }}
          />

          <div className="flex flex-col items-center gap-8 relative">
            {/* Signature logo reveal */}
            <motion.img
              src={logoSignature}
              alt="Macrae Myint"
              className="h-24 md:h-32 w-auto object-contain"
              initial={{ opacity: 0, filter: 'blur(14px)', scale: 0.96 }}
              animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Loading bar */}
            <div className="w-40 h-[1.5px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, hsl(45 53% 54%), hsl(40 33% 93%))' }}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.4, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
