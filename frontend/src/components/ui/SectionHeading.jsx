import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export function SectionHeading({ title, subtitle, className, align = 'center' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'mb-14 md:mb-20',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {subtitle && (
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-accent-cyan-400 mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        <span className="gradient-text">{title}</span>
      </h2>
      <div
        className={cn(
          'mt-5 h-px w-24 rounded-full',
          'bg-linear-to-r from-brand-500 via-accent-purple-500 to-accent-cyan-400',
          'shadow-glow-sm',
          align === 'center' && 'mx-auto'
        )}
      />
    </motion.div>
  );
}
