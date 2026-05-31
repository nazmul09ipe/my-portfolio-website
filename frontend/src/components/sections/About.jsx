import { motion } from 'framer-motion';
import { HiAcademicCap, HiBriefcase, HiCode } from 'react-icons/hi';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { about, siteConfig } from '@/data/portfolioData';

const highlights = [
  {
    icon: HiBriefcase,
    title: 'Current Role',
    text: `${about.job.title} at ${about.job.company}, ${about.job.location}`,
  },
  {
    icon: HiAcademicCap,
    title: 'Education',
    text: `${about.degree} — ${about.university}`,
  },
  {
    icon: HiCode,
    title: 'Training',
    text: `${about.merlinLevel1} · ${about.merlinLevel2}`,
  },
];

export function About() {
  const ref = useScrollAnimation({ children: true, stagger: 0.15 });

  return (
    <section id="about" className="section-padding">
      <div className="container-custom">
        <SectionHeading subtitle="About Me" title="Who I Am" />

        <div ref={ref} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <GlassCard>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-6">{about.bio}</p>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
              With a strong foundation in Industrial and Production Engineering from RUET and intensive MERN
              training from Programming Hero, I bring analytical thinking and clean code practices to every
              project I touch.
            </p>
          </GlassCard>

          <div className="space-y-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                className="glass rounded-2xl p-6 flex gap-4 gradient-border hover:shadow-glow-sm transition-all duration-500"
                whileHover={{ x: 6 }}
              >
                <div className="icon-box">
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-1 tracking-tight">{item.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            ))}

            <div className="glass rounded-2xl p-6 gradient-border glow-sm">
              <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Experience</p>
              <p className="font-display text-2xl font-bold gradient-text">
                {siteConfig.yearsExperience}+ Years
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Professional web development</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
