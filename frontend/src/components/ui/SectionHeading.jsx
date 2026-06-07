import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export function SectionHeading({ title, subtitle, className, align = 'center' }) {
  const words = title.split(' ');

  return (
    <div
      className={cn(
        'mb-14 md:mb-20 overflow-hidden',
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
        className
      )}
    >
      {subtitle && (
        <motion.span 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-block text-xs font-bold uppercase tracking-[0.3em] text-brand-600 dark:text-accent-cyan-400 mb-5"
        >
          {subtitle}
        </motion.span>
      )}
      
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[1.1]">
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden mr-[0.2em] last:mr-0 py-1">
            <motion.span
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: i * 0.1, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="inline-block gradient-text"
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>
      
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: 'circOut' }}
        className={cn(
          'mt-6 h-1 w-24 rounded-full origin-left',
          'bg-linear-to-r from-brand-500 via-accent-purple-500 to-accent-cyan-400',
          'shadow-glow-sm',
          align === 'center' && 'mx-auto origin-center'
        )}
      />
    </div>
  );
}
