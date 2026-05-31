import { useMemo } from 'react';

const PARTICLE_COUNT = 48;

export function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
        id: i,
        left: `${(i * 17 + 7) % 100}%`,
        top: `${(i * 23 + 11) % 100}%`,
        size: 1 + (i % 3),
        delay: `${(i % 12) * 0.5}s`,
        duration: `${8 + (i % 10)}s`,
        driftX: `${(i % 2 === 0 ? 1 : -1) * (10 + (i % 20))}px`,
        driftY: `${(i % 3 === 0 ? -1 : 1) * (15 + (i % 25))}px`,
        opacity: 0.15 + (i % 5) * 0.08,
      })),
    []
  );

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            '--drift-x': p.driftX,
            '--drift-y': p.driftY,
            background:
              p.id % 3 === 0
                ? 'rgba(34, 211, 238, 0.9)'
                : p.id % 3 === 1
                  ? 'rgba(139, 92, 246, 0.9)'
                  : 'rgba(59, 130, 246, 0.9)',
            boxShadow:
              p.id % 3 === 0
                ? '0 0 6px rgba(34, 211, 238, 0.8)'
                : p.id % 3 === 1
                  ? '0 0 6px rgba(139, 92, 246, 0.8)'
                  : '0 0 6px rgba(59, 130, 246, 0.8)',
          }}
        />
      ))}
    </div>
  );
}
