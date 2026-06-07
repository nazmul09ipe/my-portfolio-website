import { motion } from 'framer-motion';
import {
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiFirebase,
  SiNextdotjs,
  SiTypescript,
  SiAxios,
} from 'react-icons/si';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { skills as localSkills } from '@/data/portfolioData';

const iconMap = {
  HTML: SiHtml5,
  CSS: SiCss,
  'Tailwind CSS': SiTailwindcss,
  Bootstrap: SiBootstrap,
  JavaScript: SiJavascript,
  React: SiReact,
  'React Router': SiReact,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  MongoDB: SiMongodb,
  'Firebase Auth': SiFirebase,
  JWT: SiFirebase,
  Axios: SiAxios,
  'Next.js': SiNextdotjs,
  TypeScript: SiTypescript,
};

const categories = [
  { key: 'frontend', label: 'Frontend' },
  { key: 'backend', label: 'Backend' },
  { key: 'tools', label: 'Tools & APIs' },
  { key: 'learning', label: 'Learning' },
];

export function Skills() {
  const ref = useScrollAnimation({ children: true, stagger: 0.05 });

  return (
    <section id="skills" className="section-padding section-alt relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand-500/5 blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-accent-purple-500/5 blur-[100px] -z-10" />

      <div className="container-custom">
        <SectionHeading subtitle="Expertise" title="Skills & Technologies" />

        <div ref={ref} className="space-y-20">
          {categories.map((cat) => {
            const items = localSkills.filter((s) => s.category === cat.key);
            if (!items.length) return null;

            return (
              <div key={cat.key} className="relative">
                <div className="flex items-center gap-4 mb-10">
                  <h3 className="font-display text-2xl font-bold tracking-tight text-navy-800 dark:text-slate-200">
                    {cat.label}
                  </h3>
                  <div className="h-px flex-1 bg-linear-to-r from-slate-200 to-transparent dark:from-white/10" />
                </div>
                
                <div className="bento-grid">
                  {items.map((skill, idx) => {
                    const Icon = iconMap[skill.name] || SiJavascript;
                    // Define bento spans based on index or skill name for variety
                    const isLarge = idx === 0 || skill.name === 'React' || skill.name === 'Node.js';
                    
                    return (
                      <GlassCard 
                        key={skill.name} 
                        premium 
                        className={cn(
                          "!p-6 flex flex-col justify-between group",
                          isLarge ? "lg:col-span-4 md:col-span-6" : "lg:col-span-3 md:col-span-6"
                        )}
                        hover
                      >
                        <div className="flex items-start justify-between mb-8">
                          <div className="p-3 rounded-2xl bg-slate-100 dark:bg-white/5 text-brand-500 dark:text-accent-cyan-400 group-hover:scale-110 transition-transform duration-500">
                            <Icon className="w-8 h-8" />
                          </div>
                          <span className="text-3xl font-display font-black opacity-5 group-hover:opacity-10 transition-opacity">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                        </div>

                        <div>
                          <h4 className="text-lg font-bold mb-4 tracking-tight group-hover:text-brand-500 dark:group-hover:text-accent-cyan-400 transition-colors">
                            {skill.name}
                          </h4>
                          <div className="progress-track h-1.5 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-linear-to-r from-brand-500 to-accent-cyan-400"
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            />
                          </div>
                          <div className="flex justify-between items-center mt-3">
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Proficiency</span>
                            <span className="text-xs font-black text-brand-500 dark:text-accent-cyan-400">{skill.level}%</span>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
