import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export function GlassCard({ children, className, hover = true, strong = false, premium = false, ...props }) {
  return (
    <motion.div
      className={cn(
        premium ? 'glass-premium' : (strong ? 'glass-strong' : 'glass'),
        'rounded-[var(--radius-card-lg)] p-6 md:p-8 gradient-border',
        'transition-all duration-500',
        hover && 'hover:shadow-glow-md hover:-translate-y-1 dark:hover:bg-navy-800/55',
        className
      )}
      style={{ transitionTimingFunction: 'var(--ease-premium)' }}
      whileHover={hover ? { y: -4 } : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
