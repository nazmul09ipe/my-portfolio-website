import { useEffect, useState } from "react";
import { HiExternalLink, HiCode } from "react-icons/hi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchProjects } from "@/services/projectService";

const fallbackProjects = [
  {
    _id: "1",
    title: "A Human Resource Management App",
    description:
      "A fully responsive and secure HR management platform built with React and Vite. It enables employee management, workflow tracking, and user administration with Firebase authentication and REST API integration.",
    technologies: [
      "React",
      "Firebase",
      "Framer Motion",
      "Stripe gateway",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
    ],
    image: "https://i.ibb.co.com/pBPcdcjn/Screenshot-2026-06-02-155005.png",
    liveUrl: "https://staff-sphere-hr-management-app.web.app/",
    repoUrl: "https://github.com/nazmul09ipe/staff-sphere-hr-management-app",
    featured: true,
  },
  {
    _id: "2",
    title: "Smart Plant Care Management System",
    description:
      "PlantaCare is a modern Smart Plant Care Management System that helps users track plants, manage care schedules, monitor plant health, and connect with plant experts through an intuitive and responsive interface.",
    technologies: [
      "React",
      "React Router",
      "Tailwind CSS",
      "Firebase",
      "Framer Motion",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    image: "https://i.ibb.co.com/vC93gQRq/Screenshot-2026-06-02-155053.png",
    liveUrl: "https://plant-tracker-web-app-c73a3.web.app/",
    repoUrl: "https://github.com/nazmul09ipe/plantacare-app-client-side",
    featured: true,
  },
  {
    _id: "3",
    title: "HappenHub – Event Explorer & Ticket Management System",
    description:
      "HappenHub is a modern Event Discovery and Ticket Management System that allows users to explore upcoming local and virtual events, view event details and schedules, and securely book tickets through a seamless digital experience.",
    technologies: [
      "React",
      "React Router",
      "Tailwind CSS",
      "Firebase",
      "Framer Motion",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    image: "https://i.ibb.co.com/5Wbdw9Mc/Screenshot-2026-06-02-155115.png",
    liveUrl: "https://event-explorer-36aac.web.app/",
    repoUrl: "https://github.com/nazmul09ipe/Assignment-9-event-explorer",
    featured: true,
  },
];

export function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const ref = useScrollAnimation({ children: true, stagger: 0.1 });

  useEffect(() => {
    fetchProjects(true)
      .then((data) => {
        if (data?.length) setProjects(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section-padding section-alt relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 left-0 w-1/4 h-1/4 bg-brand-500/5 blur-[120px] -z-10" />

      <div className="container-custom">
        <SectionHeading subtitle="Portfolio" title="Featured Projects" />

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 rounded-full border-2 border-brand-500/20 border-t-brand-500 animate-spin" />
          </div>
        )}

        <div
          ref={ref}
          className="bento-grid"
        >
          {projects.map((project, idx) => {
            const isFeatured = idx === 0;
            return (
              <GlassCard 
                key={project._id} 
                premium 
                className={cn(
                  "flex flex-col h-full group transition-all duration-500",
                  isFeatured ? "lg:col-span-8 md:col-span-12" : "lg:col-span-4 md:col-span-6"
                )}
              >
                <div className={cn(
                  "overflow-hidden rounded-2xl border border-white/[0.06] mb-8 relative",
                  isFeatured ? "aspect-video md:aspect-[21/9]" : "aspect-video"
                )}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-void-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary !py-2 !px-4 !text-xs shadow-glow-sm"
                        >
                          <HiExternalLink className="w-4 h-4" /> Live Demo
                        </a>
                      )}
                      {project.repoUrl && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="glass-premium !py-2 !px-4 !text-xs !bg-white/10"
                        >
                          <HiCode className="w-4 h-4" /> Source Code
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(project.technologies || []).slice(0, isFeatured ? 6 : 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200/50 dark:border-white/10 font-bold text-slate-500 dark:text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies?.length > (isFeatured ? 6 : 3) && (
                      <span className="text-[10px] font-bold text-slate-400 self-center">
                        +{project.technologies.length - (isFeatured ? 6 : 3)} more
                      </span>
                    )}
                  </div>

                  <h3 className={cn(
                    "font-display font-black mb-4 tracking-tighter group-hover:text-brand-500 dark:group-hover:text-accent-cyan-400 transition-colors",
                    isFeatured ? "text-2xl md:text-3xl" : "text-xl"
                  )}>
                    {project.title}
                  </h3>
                  <p className={cn(
                    "text-slate-600 dark:text-slate-400 leading-relaxed mb-6",
                    isFeatured ? "text-base md:text-lg max-w-2xl" : "text-sm"
                  )}>
                    {project.description}
                  </p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
