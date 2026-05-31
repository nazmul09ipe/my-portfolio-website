import { HiStar } from 'react-icons/hi';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { testimonials } from '@/data/portfolioData';

export function Testimonials() {
  const ref = useScrollAnimation({ children: true, stagger: 0.12 });

  return (
    <section id="testimonials" className="section-padding section-alt">
      <div className="container-custom">
        <SectionHeading subtitle="Kind Words" title="Testimonials" />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((item) => (
            <GlassCard key={item.id} className="flex flex-col h-full">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <HiStar key={i} className="w-4 h-4 text-amber-400" />
                ))}
              </div>
              <blockquote className="text-slate-600 dark:text-slate-300 leading-relaxed flex-grow mb-6">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="pt-4 border-t border-slate-200/50 dark:border-white/[0.06]">
                <p className="font-display font-semibold tracking-tight">{item.name}</p>
                <p className="text-sm text-brand-600 dark:text-accent-cyan-400">{item.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
