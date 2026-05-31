import { useEffect, useRef, useState } from 'react';
import { animate, useInView } from 'framer-motion';

/**
 * Scroll-triggered number counter (replaces react-countup for reliable Vite ESM support).
 */
export function AnimatedNumber({ value, suffix = '', duration = 2.5, className }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
