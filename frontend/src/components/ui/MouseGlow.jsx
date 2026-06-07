import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 50, stiffness: 300 };
  const glowX = useSpring(mouseX, springConfig);
  const glowY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isMobile || prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX]);

  return (
    <motion.div
      className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full opacity-[0.05] dark:opacity-[0.12]"
        style={{
          x: glowX,
          y: glowY,
          translateX: '-50%',
          translateY: '-50%',
          background: 'radial-gradient(circle, var(--color-brand-500) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
    </motion.div>
  );
}
