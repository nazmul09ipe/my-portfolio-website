import { motion } from "framer-motion";
import { HiAcademicCap, HiBriefcase, HiCode } from "react-icons/hi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { about, siteConfig } from "@/data/portfolioData";

const highlights = [
  {
    icon: HiBriefcase,
    title: "Current Role",
    text: `${about.job.title} at ${about.job.company}, ${about.job.location}`,
  },
  {
    icon: HiAcademicCap,
    title: "Education",
    text: `${about.degree} — ${about.university}`,
  },
  {
    icon: HiCode,
    title: "Training",
    text: `${about.merlinLevel1} · ${about.merlinLevel2}`,
  },
];

export function About() {
  const ref = useScrollAnimation({ children: true, stagger: 0.1 });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/4 right-0 w-1/3 h-1/3 bg-accent-cyan-500/5 blur-[120px] -z-10" />

      <div className="container-custom">
        <SectionHeading subtitle="About Me" title="Personal Narrative" />

        <div
          ref={ref}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start"
        >
          <GlassCard premium>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-8 text-balance">
              {about.bio}
            </p>
            <div className="space-y-4">
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-balance">
                With a strong foundation in <span className="text-brand-500 dark:text-accent-cyan-400 font-semibold">Industrial and Production Engineering</span> from RUET and intensive MERN training, I bring analytical thinking and clean code practices to every project.
              </p>
              <div className="h-px w-20 bg-linear-to-r from-brand-500 to-transparent" />
            </div>
          </GlassCard>

          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((item) => (
                <motion.div
                  key={item.title}
                  className="glass-premium rounded-2xl p-6 flex flex-col gap-4 border border-white/5 dark:border-white/10 hover:shadow-glow-sm transition-all duration-500 sm:last:col-span-2"
                  whileHover={{ y: -4 }}
                >
                  <div className="p-3 w-fit rounded-xl bg-slate-100 dark:bg-white/5 text-brand-500 dark:text-accent-cyan-400">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg mb-2 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              className="glass-premium rounded-2xl p-8 border border-white/5 dark:border-white/10 relative overflow-hidden group"
              whileHover={{ y: -4 }}
            >
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <HiBriefcase className="w-24 h-24" />
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-500 mb-3">
                Industry Experience
              </p>
              <div className="flex items-baseline gap-2">
                <p className="font-display text-5xl font-black gradient-text tracking-tighter">
                  {siteConfig.yearsExperience}+
                </p>
                <p className="text-xl font-bold text-navy-800 dark:text-slate-200">Years</p>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm mt-3 font-medium">
                Specializing in high-performance React ecosystems and scalable backend architectures.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
