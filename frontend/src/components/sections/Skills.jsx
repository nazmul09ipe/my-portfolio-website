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
    <section id="skills" className="section-padding relative overflow-hidden bg-void-950">
      {/* Background cinematic visuals */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-purple-500/10 blur-[100px]" />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading subtitle="Expertise" title="Digital Arsenal" />

        <div ref={ref} className="space-y-32">
          {categories.map((cat) => {
            const items = localSkills.filter((s) => s.category === cat.key);
            if (!items.length) return null;

            return (
              <div key={cat.key} className="relative">
                <div className="flex items-center gap-6 mb-12">
                  <h3 className="font-display text-4xl font-black tracking-tighter uppercase text-white/90">
                    {cat.label}
                  </h3>
                  <div className="h-[2px] flex-1 bg-linear-to-r from-brand-500/50 to-transparent" />
                </div>
                
                <div className="bento-grid">
                  {items.map((skill, idx) => {
                    const Icon = iconMap[skill.name] || SiJavascript;
                    const isLarge = idx === 0 || skill.name === 'React' || skill.name === 'Node.js';
                    
                    return (
                      <GlassCard 
                        key={skill.name} 
                        premium 
                        tilt
                        className={cn(
                          "relative group flex flex-col justify-between p-8 border border-white/[0.03] hover:border-brand-500/30 transition-colors duration-700",
                          isLarge ? "lg:col-span-4 md:col-span-6" : "lg:col-span-3 md:col-span-6"
                        )}
                      >
                        {/* Lighting effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                          <div className="absolute inset-0 bg-radial-gradient from-brand-500/10 via-transparent to-transparent" />
                        </div>

                        <div className="flex items-start justify-between relative z-10">
                          <motion.div 
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="p-4 rounded-2xl bg-white/[0.03] text-brand-500 group-hover:text-accent-cyan-400 group-hover:bg-brand-500/10 transition-all duration-500 shadow-2xl"
                          >
                            <Icon className="w-10 h-10" />
                          </motion.div>
                          <span className="text-5xl font-display font-black opacity-[0.03] group-hover:opacity-10 transition-opacity text-white">
                            {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                          </span>
                        </div>

                        <div className="relative z-10 mt-12">
                          <h4 className="text-2xl font-black mb-6 tracking-tighter text-white/80 group-hover:text-white transition-colors">
                            {skill.name}
                          </h4>
                          
                          <div className="space-y-4">
                            <div className="progress-track h-[3px] bg-white/[0.05] rounded-full overflow-hidden">
                              <motion.div
                                className="h-full bg-linear-to-r from-brand-500 via-accent-purple-500 to-accent-cyan-400"
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                              />
                            </div>
                            <div className="flex justify-between items-end">
                              <span className="text-[9px] uppercase font-black tracking-[0.3em] text-slate-500">System Mastery</span>
                              <span className="text-lg font-display font-black text-brand-500">{skill.level}%</span>
                            </div>
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
