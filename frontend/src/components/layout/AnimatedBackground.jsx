import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';

export function AnimatedBackground() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    if (prefersReducedMotion || isMobile) return; // Disable complex animations on mobile/reduced motion

    const orbs = containerRef.current?.querySelectorAll('.orb');
    if (!orbs?.length) return;

    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: `random(-100, 100)`,
        y: `random(-60, 60)`,
        scale: `random(0.9, 1.1)`,
        duration: 20 + i * 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none bg-void-950"
      aria-hidden
    >
      {/* Dynamic Gradient Mesh */}
      <motion.div 
        style={{ rotate }}
        className="absolute inset-[-50%] opacity-30 dark:opacity-40"
      >
        <div className="absolute top-1/4 left-1/4 w-[60%] h-[60%] rounded-full bg-brand-500/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] rounded-full bg-accent-purple-600/20 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-accent-cyan-500/15 blur-[80px]" />
      </motion.div>

      {/* Morphing Blobs */}
      <div className="orb absolute top-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-linear-to-br from-brand-500/10 to-transparent blur-[80px]" />
      <div className="orb absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-linear-to-tr from-accent-purple-500/10 to-transparent blur-[100px]" />
      <div className="orb absolute top-[40%] right-[20%] w-[30vw] h-[30vw] rounded-full bg-linear-to-bl from-accent-cyan-400/10 to-transparent blur-[90px]" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }} 
      />
    </div>
  );
}
