import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CustomCursor } from '@/components/effects/CustomCursor';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { BackToTop } from '@/components/effects/ScrollProgress';
import { LoadingScreen } from '@/components/effects/LoadingScreen';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-background cursor-none md:cursor-none">
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Header />
      <main 
        id="main-content" 
        className={`flex-1 ${isHomepage ? '' : 'pt-16'}`}
        tabIndex={-1}
      >
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
