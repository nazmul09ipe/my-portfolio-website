import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { GlassCard } from '@/components/ui/GlassCard';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { fetchProjects } from '@/services/projectService';

const fallbackProjects = [
  {
    _id: '1',
    title: 'E-Commerce MERN Platform',
    description: 'Full-stack online store with cart, JWT auth, and admin dashboard.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
  },
  {
    _id: '2',
    title: 'Task Management Dashboard',
    description: 'Kanban board with Firebase auth and real-time updates.',
    technologies: ['React', 'Firebase', 'Framer Motion'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
  },
  {
    _id: '3',
    title: 'REST API Boilerplate',
    description: 'Production-ready Express API with MongoDB and rate limiting.',
    technologies: ['Node.js', 'Express', 'MongoDB'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
  },
];

export function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const ref = useScrollAnimation({ children: true, stagger: 0.12 });

  useEffect(() => {
    fetchProjects(true)
      .then((data) => {
        if (data?.length) setProjects(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section-padding section-alt">
      <div className="container-custom">
        <SectionHeading subtitle="Portfolio" title="Featured Projects" />

        {loading && (
          <p className="text-center text-slate-500 mb-8">Loading projects...</p>
        )}

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <GlassCard key={project._id || i} className="flex flex-col h-full group">
              <div className="aspect-video rounded-xl bg-linear-to-br from-brand-500/15 via-accent-purple-600/15 to-accent-cyan-500/15 mb-6 flex items-center justify-center overflow-hidden border border-white/[0.06] group-hover:shadow-glow-sm transition-shadow duration-500">
                <motion.div
                  className="text-6xl font-display font-bold gradient-text opacity-60"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {project.title.charAt(0)}
                </motion.div>
              </div>

              <h3 className="font-display text-xl font-bold mb-3 tracking-tight group-hover:gradient-text transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {(project.technologies || []).slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-navy-700/60 border border-slate-200/50 dark:border-white/[0.06] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-accent-cyan-400 hover:underline transition-colors duration-300"
                  >
                    <HiExternalLink /> Live
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-accent-cyan-400 transition-colors duration-300"
                  >
                    <HiCode /> Code
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
