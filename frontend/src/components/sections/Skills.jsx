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
  const ref = useScrollAnimation({ children: true, stagger: 0.08 });

  return (
    <section id="skills" className="section-padding section-alt">
      <div className="container-custom">
        <SectionHeading subtitle="Expertise" title="Skills & Technologies" />

        <div ref={ref} className="space-y-12">
          {categories.map((cat) => {
            const items = localSkills.filter((s) => s.category === cat.key);
            if (!items.length) return null;

            return (
              <div key={cat.key}>
                <h3 className="font-display text-xl font-semibold mb-8 tracking-tight text-navy-800 dark:text-slate-200">
                  {cat.label}
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {items.map((skill) => {
                    const Icon = iconMap[skill.name] || SiJavascript;
                    return (
                      <GlassCard key={skill.name} className="!p-5" hover>
                        <div className="flex items-center gap-3 mb-5">
                          <Icon
                            className={`w-8 h-8 ${
                              skill.category === 'learning'
                                ? 'text-slate-400'
                                : 'text-brand-500 dark:text-accent-cyan-400'
                            }`}
                          />
                          <span className="font-semibold tracking-tight">{skill.name}</span>
                        </div>
                        <div className="progress-track">
                          <motion.div
                            className="progress-fill"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                          />
                        </div>
                        <p className="text-right text-xs text-slate-500 mt-2.5 font-medium">{skill.level}%</p>
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
