import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { HiArrowDown, HiDownload, HiCode } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { siteConfig, stats } from '@/data/portfolioData';

export function Hero() {
  const headlineRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 250]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 400], [1, 0.9]);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      if (isMobile) return; // Disable mouse parallax on mobile for performance
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 50);
      mouseY.set((clientY / innerHeight - 0.5) * 50);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 100,
        opacity: 0,
        duration: 1.4,
        stagger: 0.08,
        ease: 'power2.out',
        delay: 2.2, 
        clearProps: 'all',
      });
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="section-padding min-h-screen flex items-center pt-24 overflow-hidden relative">
      {/* Background Cinematic Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02] select-none">
        <h2 className="font-display text-[25vw] font-black leading-none tracking-tighter">
          DEVELOPER
        </h2>
      </div>

      <div ref={headlineRef} className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-20 items-center lg:items-start relative z-10">
        <motion.div style={{ opacity, scale, transformStyle: 'preserve-3d', perspective: '1200px' }}>
        <motion.div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-premium border border-white/10 mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          style={{ translateZ: '40px' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-cyan-400"></span>
          </span>
          <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-slate-400">Available for projects</span>
        </motion.div>

        <p className="hero-line text-xs uppercase tracking-[0.5em] font-black text-brand-500 mb-6" style={{ translateZ: '30px' }}>
          MERN STACK ENGINEER
        </p>
        
        <h1 className="hero-line font-display text-display-xl md:text-display-2xl font-black leading-[0.9] tracking-tighter mb-8 text-balance" style={{ translateZ: '80px' }}>
          <span className="block opacity-50">Md. Nazmul Haque</span>
          {/* <span className="gradient-text drop-shadow-[0_0_30px_rgba(59,130,246,0.3)]">ARCHITECT</span> */}
        </h1>
        
        <h2 className="hero-line text-xl sm:text-2xl font-bold tracking-tight text-navy-800 dark:text-slate-300 mb-10 text-balance" style={{ translateZ: '50px' }}>
          Crafting high-performance <span className="italic font-display text-brand-500">cinematic</span> web experiences.
        </h2>

        <div className="hero-line flex flex-wrap items-center gap-6 mb-16" style={{ translateZ: '40px' }}>
          <Button href="#contact" className="shadow-glow-md hover:shadow-glow-lg transition-all !px-10 !py-5 text-sm uppercase tracking-widest font-black">
            Start a Project
          </Button>
          <Button 
            variant="secondary" 
            href={siteConfig.resumeUrl} 
            download="Md_Nazmul_Haque_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="glass !px-8 !py-5 text-sm uppercase tracking-widest font-black"
          >
            <HiDownload className="w-5 h-5" />
            Download CV
          </Button>
          <div className="flex gap-4">
            <motion.a 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={siteConfig.github} 
              target="_blank" 
              className="p-3 rounded-2xl glass-premium border border-white/10 text-slate-400 hover:text-brand-500 transition-colors"
            >
              <FaGithub className="w-6 h-6" />
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={siteConfig.linkedin} 
              target="_blank" 
              className="p-3 rounded-2xl glass-premium border border-white/10 text-slate-400 hover:text-brand-500 transition-colors"
            >
              <FaLinkedin className="w-6 h-6" />
            </motion.a>
          </div>
        </div>

        <div className="hero-line grid grid-cols-2 md:grid-cols-4 gap-6" style={{ translateZ: '20px' }}>
          {stats.map((stat) => (
            <div key={stat.label} className="relative group">
              <div className="font-display text-3xl font-black gradient-text tracking-tighter">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={3} />
              </div>
              <p className="text-[9px] uppercase font-black text-slate-500 mt-2 tracking-[0.2em]">
                {stat.label}
              </p>
              <div className="absolute -bottom-2 left-0 w-0 h-[2px] bg-brand-500 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
        </motion.div>

        <motion.div
          className="hero-photo relative mx-auto flex w-full items-center justify-center"
          style={{ y: y1 }}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Parallax Background Layers */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ x: useTransform(mouseX, [0, 50], [0, -20]), y: useTransform(mouseY, [0, 50], [0, -20]) }}
          >
            <div className="w-80 h-80 md:w-[35rem] md:h-[35rem] rounded-full bg-brand-500/10 blur-[120px] animate-glow" />
          </motion.div>

          <motion.div 
            className="relative"
            style={{ x: useSpring(useTransform(mouseX, [0, 50], [0, 15]), springConfig), rotateX: useTransform(mouseY, [-50, 50], [5, -5]), rotateY: useTransform(mouseX, [-50, 50], [-5, 5]) }}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-linear-to-br from-brand-500/20 via-accent-purple-500/20 to-accent-cyan-400/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="rounded-full p-[1px] bg-linear-to-br from-white/20 via-white/5 to-white/20 shadow-2xl relative">
                <div className="rounded-full p-3 bg-void-950/40 backdrop-blur-xl">
                  <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] rounded-full overflow-hidden bg-void-900 ring-1 ring-white/10">
                    <img
                      src={siteConfig.profileImage}
                      alt={siteConfig.name}
                      className="h-full w-full object-cover object-[center_35%] transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                      width={512}
                      height={512}
                      fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-void-950/80 via-transparent to-transparent opacity-60" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating UI Elements */}
            <motion.div 
              className="absolute -top-6 -right-6 glass-premium px-6 py-4 rounded-2xl border border-white/10 hidden md:block"
              style={{ y: y2, translateZ: '60px' }}
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-void-950 bg-slate-800 flex items-center justify-center text-[8px] font-black">
                      {i}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[10px] font-black text-white leading-none">PROJECTS COMPLETED</p>
                  <p className="text-[8px] text-slate-500 mt-1 uppercase tracking-widest">Global Reach</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="absolute bottom-10 -left-10 glass-premium px-6 py-4 rounded-2xl border border-white/10 hidden md:block"
              style={{ y: useTransform(scrollY, [0, 500], [0, 100]), translateZ: '40px' }}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-brand-500/20 text-brand-500">
                  <HiCode className="w-5 h-5" />
                </div>
                <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">MERN STACK</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] font-black text-slate-500">Discover More</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-[1px] h-12 bg-linear-to-b from-brand-500 to-transparent"
        />
      </motion.div>
    </section>
  );
}
