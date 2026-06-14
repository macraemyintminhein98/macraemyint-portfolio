import { useEffect, useRef, useState, useCallback } from 'react';
import { PageFlip } from 'page-flip';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const pages = Array.from({ length: 12 }, (_, i) => ({
  src: `/portfolio-book/page-${i + 1}.jpg`,
  label: `Page ${i + 1}`,
}));

export function PortfolioBook() {
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<InstanceType<typeof PageFlip> | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (!bookRef.current || pageFlipRef.current) return;

    const pf = new PageFlip(bookRef.current, {
      width: 550,
      height: 733,
      size: 'stretch',
      maxShadowOpacity: 0.5,
      showCover: false,
      mobileScrollSupport: true,
      flippingTime: 800,
      usePortrait: true,
      startZIndex: 0,
      autoSize: true,
      drawShadow: true,
      swipeDistance: 30,
    });

    const pageEls = bookRef.current.querySelectorAll('.pf-page');
    if (pageEls.length > 0) {
      pf.loadFromHTML(pageEls as unknown as HTMLElement[]);
      setTotalPages(pf.getPageCount());

      pf.on('flip', (e: any) => {
        setCurrentPage(e.data);
      });

      pageFlipRef.current = pf;
    }

    return () => {
      if (pageFlipRef.current) {
        pageFlipRef.current.destroy();
        pageFlipRef.current = null;
      }
    };
  }, []);

  const goNext = useCallback(() => {
    pageFlipRef.current?.flipNext();
  }, []);

  const goPrev = useCallback(() => {
    pageFlipRef.current?.flipPrev();
  }, []);

  // Keyboard support
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev]);

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Navigation + Book */}
      <div className="relative w-full max-w-3xl flex items-center justify-center">
        {/* Left arrow */}
        <button
          onClick={goPrev}
          className="absolute left-0 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg hover:bg-background transition-colors -translate-x-4 md:-translate-x-12"
          aria-label="Previous page"
        >
          <ChevronLeft className="size-5 text-foreground" />
        </button>

        {/* PageFlip container */}
        <div
          ref={bookRef}
          className="w-full"
          style={{ maxWidth: '550px', aspectRatio: '550/733' }}
        >
          {pages.map((page, i) => (
            <div
              key={i}
              className="pf-page"
              style={{ backgroundColor: 'hsl(var(--card))' }}
            >
              <img
                src={page.src}
                alt={page.label}
                className="w-full h-full object-contain"
                loading={i < 4 ? 'eager' : 'lazy'}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={goNext}
          className="absolute right-0 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border flex items-center justify-center shadow-lg hover:bg-background transition-colors translate-x-4 md:translate-x-12"
          aria-label="Next page"
        >
          <ChevronRight className="size-5 text-foreground" />
        </button>
      </div>

      {/* Page indicator */}
      <p className="text-sm text-muted-foreground font-display tracking-wide">
        Page {currentPage + 1} of {totalPages || pages.length} · Use ← → arrow keys or swipe
      </p>
    </div>
  );
}
