import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function AnimatedBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const orbs = containerRef.current?.querySelectorAll('.orb');
    if (!orbs?.length) return;

    orbs.forEach((orb, i) => {
      gsap.to(orb, {
        x: `random(-100, 100)`,
        y: `random(-80, 80)`,
        duration: 10 + i * 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 -z-20 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <div className="absolute inset-0 bg-slate-50 dark:bg-void-950 transition-colors duration-700" />

      <div className="absolute inset-0 mesh-gradient animate-mesh opacity-80 dark:opacity-100" />

      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.5]"
        style={{
          backgroundImage: `
            radial-gradient(at 15% 15%, rgba(59, 130, 246, 0.4) 0px, transparent 45%),
            radial-gradient(at 85% 8%, rgba(124, 58, 237, 0.35) 0px, transparent 42%),
            radial-gradient(at 75% 85%, rgba(34, 211, 238, 0.28) 0px, transparent 48%),
            radial-gradient(at 8% 75%, rgba(37, 99, 235, 0.25) 0px, transparent 45%)
          `,
        }}
      />

      <div className="orb absolute top-[15%] left-[20%] w-80 h-80 rounded-full bg-brand-500/25 blur-[100px] animate-glow" />
      <div className="orb absolute top-[45%] right-[15%] w-96 h-96 rounded-full bg-accent-purple-600/20 blur-[120px]" />
      <div className="orb absolute bottom-[20%] left-[35%] w-72 h-72 rounded-full bg-accent-cyan-500/15 blur-[90px] animate-glow" />

      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.6) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-void-950/80 dark:to-void-950" />
    </div>
  );
}
