import { Outlet } from 'react-router-dom';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { FloatingParticles } from '@/components/layout/FloatingParticles';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { CustomCursor } from '@/components/ui/CustomCursor';

export function MainLayout() {
  return (
    <>
      <CustomCursor />
      <div className="noise-overlay" aria-hidden="true" />
      <AnimatedBackground />
      <FloatingParticles />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
