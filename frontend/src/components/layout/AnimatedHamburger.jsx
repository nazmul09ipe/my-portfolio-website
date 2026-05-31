import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

export function AnimatedHamburger({ open, className }) {
  return (
    <div className={cn('relative w-6 h-5 flex flex-col justify-between', className)} aria-hidden>
      <motion.span
        className="block h-0.5 w-full rounded-full bg-current origin-center"
        animate={open ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="block h-0.5 w-full rounded-full bg-current"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
      />
      <motion.span
        className="block h-0.5 w-full rounded-full bg-current origin-center"
        animate={open ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
