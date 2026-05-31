import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  outline: 'btn-outline',
  ghost: 'btn-ghost',
};

export function Button({
  children,
  variant = 'primary',
  className,
  href,
  disabled,
  type = 'button',
  ...props
}) {
  const classes = cn(variants[variant], disabled && 'opacity-60 cursor-not-allowed pointer-events-none', className);

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={disabled ? undefined : { scale: 1.02 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={classes}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
