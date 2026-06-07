import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/utils/cn';

export function GlassCard({ 
  children, 
  className, 
  hover = true, 
  strong = false, 
  premium = false, 
  tilt = false,
  ...props 
}) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);
  
  // Animated shadow based on tilt
  const shadowX = useTransform(mouseXSpring, [-0.5, 0.5], ['20px', '-20px']);
  const shadowY = useTransform(mouseYSpring, [-0.5, 0.5], ['20px', '-20px']);

  const handleMouseMove = (e) => {
    if (!tilt || !ref.current) return;
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Disable tilt on mobile for better performance

    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        premium ? 'glass-premium' : (strong ? 'glass-strong' : 'glass'),
        'rounded-[var(--radius-card-lg)] p-6 md:p-8 gradient-border',
        'transition-all duration-500 will-change-transform',
        hover && !tilt && 'hover:shadow-glow-md hover:-translate-y-1 dark:hover:bg-navy-800/55',
        tilt && 'hover:dark:bg-navy-800/40',
        className
      )}
      style={{ 
        transitionTimingFunction: 'var(--ease-premium)',
        rotateX: tilt ? rotateX : 0,
        rotateY: tilt ? rotateY : 0,
        transformStyle: 'preserve-3d',
      }}
      whileHover={hover && !tilt ? { y: -4 } : undefined}
      {...props}
    >
      <div style={{ transform: tilt ? 'translateZ(30px)' : 'none', transformStyle: 'preserve-3d' }}>
        {children}
      </div>
      
      {tilt && (
        <motion.div 
          className="absolute inset-0 -z-10 rounded-[inherit] bg-brand-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ x: shadowX, y: shadowY }}
        />
      )}
    </motion.div>
  );
}
