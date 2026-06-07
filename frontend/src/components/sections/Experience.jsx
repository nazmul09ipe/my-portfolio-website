import { HiLocationMarker, HiBriefcase, HiAcademicCap } from 'react-icons/hi';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { experience, education } from '@/data/portfolioData';
import { cn } from '@/utils/cn';

export function Experience() {
  const ref = useScrollAnimation({ children: true, stagger: 0.1 });

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background cinematic lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-linear-to-b from-transparent via-brand-500/20 to-transparent -z-10 hidden lg:block" />

      <div className="container-custom">
        <SectionHeading subtitle="Timeline" title="Professional Journey" />

        <div ref={ref} className="space-y-32">
          {/* Work Experience */}
          <div className="relative">
            <div className="flex items-center gap-6 mb-16">
              <div className="p-4 rounded-2xl bg-brand-500/10 text-brand-500">
                <HiBriefcase className="w-8 h-8" />
              </div>
              <h3 className="font-display text-3xl font-black tracking-tighter uppercase">Work Experience</h3>
            </div>

            <div className="space-y-12">
              {experience.map((exp, idx) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline Dot */}
                  <div className="absolute left-[-42px] top-10 w-4 h-4 rounded-full border-2 border-brand-500 bg-void-950 z-10 hidden lg:block group-hover:scale-150 transition-transform" />
                  
                  <GlassCard 
                    premium 
                    tilt
                    className="relative overflow-hidden border border-white/5 dark:border-white/10"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-6 mb-8">
                      <div className="space-y-2">
                        <h4 className="font-display text-2xl md:text-3xl font-black tracking-tighter text-balance">
                          {exp.role}
                        </h4>
                        <div className="flex items-center gap-3">
                          <p className="text-brand-500 font-bold tracking-widest uppercase text-xs">
                            {exp.company}
                          </p>
                          <span className="w-1 h-1 rounded-full bg-slate-500" />
                          <p className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-500 tracking-widest">
                            <HiLocationMarker className="text-brand-500" /> {exp.location}
                          </p>
                        </div>
                      </div>
                      <div className="px-4 py-2 rounded-xl glass-premium border border-white/10 text-xs font-black tracking-widest uppercase text-brand-500">
                        {exp.period}
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed mb-8 max-w-3xl">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-3">
                      {exp.highlights.map((h) => (
                        <span
                          key={h}
                          className="text-[10px] uppercase font-bold tracking-widest px-4 py-1.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-brand-500 hover:border-brand-500/50 transition-colors"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Training */}
          <div>
            <div className="flex items-center gap-6 mb-16">
              <div className="p-4 rounded-2xl bg-accent-purple-500/10 text-accent-purple-500">
                <HiAcademicCap className="w-8 h-8" />
              </div>
              <h3 className="font-display text-3xl font-black tracking-tighter uppercase">Education & Training</h3>
            </div>

            <div className="bento-grid">
              {education.map((edu, idx) => (
                <GlassCard 
                  key={edu.id} 
                  premium 
                  tilt
                  className={cn(
                    "flex flex-col justify-between",
                    idx === 0 ? "lg:col-span-8 md:col-span-12" : "lg:col-span-4 md:col-span-6"
                  )}
                >
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent-purple-500 mb-6 block">
                      {edu.period}
                    </span>
                    <h4 className="font-display text-2xl font-black tracking-tighter mb-4 text-balance">
                      {edu.degree}
                    </h4>
                    <p className="text-brand-500 dark:text-accent-cyan-400 font-bold uppercase tracking-widest text-xs mb-6">
                      {edu.institution}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
