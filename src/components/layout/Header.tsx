import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Header() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="flex items-center justify-between px-8 lg:px-16 h-16">
        <Link
          to="/"
          aria-label="Home"
          className="font-sans-body font-semibold text-sm uppercase tracking-[0.2em] text-white"
        >
          MACRAE
        </Link>

        <a
          href="mailto:macrae.xmyint@gmail.com"
          className="font-mono text-sm text-white/60 hover:text-white transition-colors"
        >
          Hire Me →
        </a>
      </div>
    </motion.header>
  );
}
