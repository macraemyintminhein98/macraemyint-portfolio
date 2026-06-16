import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const navLinks = [
    { label: 'Work', to: '/portfolio' },
    { label: 'Services', to: '/services' },
    { label: 'About', to: '/about' },
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/[0.06]' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-5 sm:px-8 lg:px-16 h-16">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Home"
            className="font-sans-body font-semibold text-sm uppercase tracking-[0.2em] text-white hover:text-amber-400 transition-colors"
          >
            MACRAE
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={`font-mono text-sm transition-colors ${
                  location.pathname === to
                    ? 'text-amber-400'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href="mailto:macrae@macraemyint.com"
              className="font-mono text-sm text-amber-400 hover:text-amber-300 transition-colors border border-amber-400/40 hover:border-amber-400 px-4 py-1.5 rounded-full"
            >
              Hire Me →
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className={`block h-px w-5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block h-px w-5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center gap-10 md:hidden"
          >
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="font-sans-body text-3xl font-semibold text-white hover:text-amber-400 transition-colors"
              >
                {label}
              </Link>
            ))}
            <a
              href="mailto:macrae@macraemyint.com"
              className="font-mono text-lg text-amber-400 border border-amber-400/50 px-6 py-3 rounded-full hover:border-amber-400 transition-colors"
            >
              Hire Me →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
