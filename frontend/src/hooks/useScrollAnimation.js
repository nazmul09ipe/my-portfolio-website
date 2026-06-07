import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const {
    y = 40, // Reduced from 60 for subtler motion
    opacity = 0,
    duration = 1,
    delay = 0,
    start = 'top 92%', // Trigger a bit later for better performance
    stagger = 0,
    children = false,
  } = options;

  useEffect(() => {
    // Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    const el = ref.current;
    if (!el || prefersReducedMotion) {
      if (el) gsap.set(children ? el.children : el, { opacity: 1, y: 0 });
      return;
    }

    const targets = children ? el.children : el;

    // Use will-change to hint GPU
    gsap.set(targets, { willChange: 'transform, opacity' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none reverse',
      }
    });

    tl.fromTo(
      targets,
      { 
        y: isMobile ? y / 2 : y, // Half movement on mobile
        opacity,
        scale: options.scale || 0.98,
        rotateX: options.rotateX || 5 // Reduced from 10
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: isMobile ? duration * 0.8 : duration,
        delay,
        stagger: children ? stagger || 0.1 : 0,
        ease: 'power2.out', // Slightly cheaper than expo
        clearProps: 'willChange', // Clean up after animation
      }
    );

    return () => {
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [y, opacity, duration, delay, start, stagger, children, options.scale, options.rotateX]);

  return ref;
}
