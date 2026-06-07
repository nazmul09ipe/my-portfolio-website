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
    <section id="projects" className="section-padding relative overflow-hidden bg-void-950">
      {/* Background cinematic visuals */}
      <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-500/5 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
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
                tilt
                className={cn(
                  "flex flex-col h-full group border border-white/[0.03] hover:border-brand-500/30 transition-all duration-700 overflow-hidden",
                  isFeatured ? "lg:col-span-8 md:col-span-12" : "lg:col-span-4 md:col-span-6"
                )}
              >
                {/* Image Showcase with lighting effect */}
                <div className={cn(
                  "overflow-hidden rounded-2xl mb-8 relative group/img shadow-2xl",
                  isFeatured ? "aspect-video md:aspect-[21/9]" : "aspect-video"
                )}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Glassy Overlay with microinteractions */}
                  <div className="absolute inset-0 bg-void-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-xs">
                    {project.liveUrl && project.liveUrl !== "#" && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-brand-500 text-white shadow-glow-sm"
                      >
                        <HiExternalLink className="w-6 h-6" />
                      </motion.a>
                    )}
                    {project.repoUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20"
                      >
                        <HiCode className="w-6 h-6" />
                      </motion.a>
                    )}
                  </div>
                  
                  {/* Decorative badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-lg glass-premium text-[9px] font-black uppercase tracking-widest border border-white/10">
                      {isFeatured ? 'Featured Production' : 'Release'}
                    </span>
                  </div>
                </div>

                <div className="flex-grow flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {(project.technologies || []).slice(0, isFeatured ? 6 : 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.05] font-black text-slate-500 group-hover:text-brand-500 group-hover:border-brand-500/30 transition-all duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <h3 className={cn(
                    "font-display font-black mb-4 tracking-tighter group-hover:text-white transition-colors",
                    isFeatured ? "text-3xl md:text-5xl" : "text-2xl"
                  )}>
                    {project.title}
                  </h3>
                  <p className={cn(
                    "text-slate-500 group-hover:text-slate-400 leading-relaxed mb-8 transition-colors",
                    isFeatured ? "text-lg md:text-xl max-w-2xl" : "text-sm"
                  )}>
                    {project.description}
                  </p>

                  <div className="mt-auto flex items-center gap-2">
                    <div className="h-[1px] w-8 bg-brand-500/50" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-500">Case Study</span>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
