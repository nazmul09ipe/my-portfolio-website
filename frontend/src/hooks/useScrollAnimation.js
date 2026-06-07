import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const {
    y = 60,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    start = 'top 85%',
    stagger = 0,
    children = false,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = children ? el.children : el;

    gsap.fromTo(
      targets,
      { 
        y, 
        opacity,
        scale: options.scale || 1,
        rotateX: options.rotateX || 0
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration,
        delay,
        stagger: children ? stagger || 0.12 : 0,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: 'play none none reverse',
          onEnter: () => {
            if (options.scrub) return;
            gsap.to(targets, { 
              opacity: 1, 
              y: 0, 
              stagger: children ? stagger || 0.12 : 0 
            });
          }
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [y, opacity, duration, delay, start, stagger, children]);

  return ref;
}
