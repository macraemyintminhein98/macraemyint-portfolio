export function Footer() {
  const links = [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/macraemyint-minhein' },
    { label: 'GitHub', href: 'https://github.com/macraemyintminhein98' },
    { label: 'Dribbble', href: 'https://dribbble.com/macraexmyint' },
    { label: 'macrae@macraemyint.com', href: 'mailto:macrae@macraemyint.com' },
  ];

  return (
    <footer className="border-t border-white/[0.05] bg-black">
      <div className="px-5 sm:px-8 lg:px-16 py-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <p className="font-mono text-xs text-white/30 uppercase tracking-widest">© 2026 Macrae Myint</p>
          <p className="font-mono text-xs text-white/15 mt-1">REDMOND → YANGON → BANGKOK</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="font-mono text-xs text-white/30 hover:text-amber-400 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
