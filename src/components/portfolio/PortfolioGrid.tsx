import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Project, ProjectCategory } from '@/types';
import { categoryLabels } from '@/data/projects';
import { Lightbox } from './Lightbox';
import { TiltCard } from '@/components/effects/TiltCard';

interface PortfolioGridProps {
  projects: Project[];
}

const categoryOrder: ProjectCategory[] = [
  'web-apps',
  'illustrations',
  'logo-branding',
  'packaging',
  'promotional',
  'social-media',
  'certificates',
  'app-mockups',
];

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');

  // Group projects by category
  const grouped = useMemo(() => {
    const map = new Map<ProjectCategory, Project[]>();
    for (const p of projects) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return map;
  }, [projects]);

  // Get available categories in order
  const categories = useMemo(() => {
    return categoryOrder.filter((c) => grouped.has(c));
  }, [grouped]);

  // Filtered projects
  const filtered = useMemo(() => {
    if (activeCategory === 'all') return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const lightboxImages = filtered.map((p) => ({
    id: p.id,
    src: p.coverImage,
    alt: p.title,
    aspectRatio: 'landscape' as const,
    caption: p.title,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-lg text-xs font-display font-semibold uppercase tracking-wider transition-all ${
            activeCategory === 'all'
              ? 'bg-primary text-primary-foreground shadow-[0_0_15px_hsla(210,100%,55%,0.3)]'
              : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
          }`}
        >
          All ({projects.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg text-xs font-display font-semibold uppercase tracking-wider transition-all ${
              activeCategory === cat
                ? 'bg-primary text-primary-foreground shadow-[0_0_15px_hsla(210,100%,55%,0.3)]'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40'
            }`}
          >
            {categoryLabels[cat]} ({grouped.get(cat)?.length || 0})
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: index * 0.03, layout: { duration: 0.3 } }}
            >
              <TiltCard tiltMax={6}>
                <div
                  className="group relative overflow-hidden rounded-lg aspect-[3/2] bg-secondary cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading={index < 6 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <span className="inline-block px-2 py-0.5 rounded text-[10px] font-display font-bold uppercase tracking-wider bg-primary/20 text-primary mb-2">
                        {categoryLabels[project.category]}
                      </span>
                      <h2 className="text-foreground font-display text-lg font-semibold uppercase tracking-wide">
                        {project.title}
                      </h2>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="size-12 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center">
                        <svg className="size-6 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <Lightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </>
  );
}
