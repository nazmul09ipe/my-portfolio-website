import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { HiLocationMarker } from 'react-icons/hi';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { experience, education } from '@/data/portfolioData';
import 'swiper/css';
import 'swiper/css/pagination';

export function Experience() {
  const ref = useScrollAnimation();

  return (
    <section id="experience" className="section-padding">
      <div className="container-custom">
        <SectionHeading subtitle="Journey" title="Experience & Education" />

        <div ref={ref}>
          <h3 className="font-display text-xl font-semibold mb-8 tracking-tight">Work Experience</h3>
          <div className="space-y-6 mb-20">
            {experience.map((exp) => (
              <GlassCard key={exp.id} className="relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-brand-500 via-accent-purple-500 to-accent-cyan-400 rounded-full shadow-glow-sm" />
                <div className="pl-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <h4 className="font-display text-xl font-bold tracking-tight">{exp.role}</h4>
                      <p className="text-brand-600 dark:text-accent-cyan-400 font-medium mt-1">{exp.company}</p>
                    </div>
                    <span className="text-sm px-3 py-1.5 rounded-full glass font-medium glow-ring">
                      {exp.period}
                    </span>
                  </div>
                  <p className="flex items-center gap-1 text-sm text-slate-500 mb-4">
                    <HiLocationMarker /> {exp.location}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-600 dark:text-accent-cyan-400 font-medium"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          <h3 className="font-display text-xl font-semibold mb-8 tracking-tight">Education & Training</h3>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {education.map((edu) => (
              <SwiperSlide key={edu.id}>
                <GlassCard className="h-full min-h-[220px]">
                  <span className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-accent-cyan-400">
                    {edu.period}
                  </span>
                  <h4 className="font-display font-bold text-lg mt-3 mb-1 tracking-tight">{edu.degree}</h4>
                  <p className="text-brand-600 dark:text-accent-cyan-400 text-sm font-medium mb-3">
                    {edu.institution}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">{edu.description}</p>
                </GlassCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
