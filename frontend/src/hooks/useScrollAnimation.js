import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);

  const {
    y = 30,
    duration = 0.8,
    start = 'top 90%',
    once = true,
  } = options;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const isMobile = window.innerWidth < 768;

    // IMPORTANT: ensure visible by default (prevents missing UI)
    gsap.set(el, { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
    });

    tl.from(el, {
      y: isMobile ? y / 2 : y,
      opacity: 0,
      duration,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
      tl.scrollTrigger?.kill();
    };
  }, []);

  return ref;
}