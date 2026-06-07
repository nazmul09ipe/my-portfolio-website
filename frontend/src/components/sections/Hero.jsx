import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { siteConfig, stats } from '@/data/portfolioData';

export function Hero() {
  const headlineRef = useRef(null);
  const containerRef = useRef(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const springConfig = { damping: 25, stiffness: 150 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set((clientX / innerWidth - 0.5) * 40);
      mouseY.set((clientY / innerHeight - 0.5) * 40);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 100,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'expo.out',
        delay: 0.1,
        clearProps: 'all',
      });
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" ref={containerRef} className="section-padding min-h-screen flex items-center pt-24 overflow-hidden">
      <div ref={headlineRef} className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start relative z-10">
        <motion.div style={{ opacity }}>
        <motion.span
          className="hero-badge badge-glow mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          Available for opportunities
        </motion.span>

        <p className="hero-line text-sm uppercase tracking-[0.2em] font-semibold text-slate-500 dark:text-slate-500 mb-4">
          Hello, I&apos;m
        </p>
        <h1 className="hero-line font-display text-display-xl md:text-display-2xl font-bold leading-[1.05] tracking-tighter mb-6 text-balance">
          <span className="gradient-text">{siteConfig.name}</span>
        </h1>
        <h2 className="hero-line text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-navy-800 dark:text-slate-200 mb-8 text-balance">
          {siteConfig.title}
        </h2>
        <p className="hero-line max-w-xl text-lg md:text-xl leading-relaxed text-slate-600 dark:text-slate-400 mb-10 text-balance">
          {siteConfig.tagline}. I craft digital experiences that merge <span className="text-brand-500 font-medium">technical excellence</span> with <span className="text-accent-purple-500 font-medium">modern aesthetics</span>.
        </p>

        <div className="hero-line flex flex-wrap gap-4 mb-16">
          <Button href="#contact" className="shadow-glow-sm hover:shadow-glow-md transition-shadow">
            Let&apos;s Talk
          </Button>
          <Button variant="secondary" href={siteConfig.resumeUrl} className="glass">
            <HiDownload className="w-5 h-5" />
            Download CV
          </Button>
          <div className="flex gap-3 ml-2">
            <Button variant="outline" href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
              <FaGithub className="w-5 h-5" />
            </Button>
            <Button variant="outline" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full w-12 h-12 p-0 flex items-center justify-center">
              <FaLinkedin className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="hero-line grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              whileHover={{ y: -5 }}
              className="glass-premium rounded-2xl p-5 text-center transition-all duration-300 border-white/5 dark:border-white/10"
            >
              <div className="font-display text-2xl md:text-3xl font-bold gradient-text tracking-tighter">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <p className="text-[10px] md:text-xs uppercase font-bold text-slate-500 dark:text-slate-500 mt-2 tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.a
          href="#about"
          className="hero-line inline-flex flex-col items-center gap-2 mt-16 text-slate-400 hover:text-accent-cyan-400 transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
          <HiArrowDown className="w-4 h-4" />
        </motion.a>
        </motion.div>

        <motion.div
          className="hero-photo relative mx-auto flex w-full items-center justify-center"
          style={{ y: y1 }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Parallax Background Orbs */}
          <motion.div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ x: mouseX, y: mouseY }}
          >
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem] rounded-full bg-linear-to-br from-brand-500/40 via-accent-purple-500/30 to-accent-cyan-400/20 blur-[100px] animate-glow" />
          </motion.div>

          <motion.div 
            className="relative"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            style={{ x: useSpring(useTransform(mouseX, [0, 40], [0, 10]), springConfig) }}
          >
            <div
              className="rounded-full p-[2px] bg-linear-to-br from-brand-400/50 via-accent-purple-500/50 to-accent-cyan-400/50 shadow-glow-lg"
              aria-hidden
            >
              <div className="rounded-full p-2 bg-void-950/80 backdrop-blur-sm">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-full overflow-hidden bg-navy-900 ring-1 ring-white/10">
                  <img
                    src={siteConfig.profileImage}
                    alt={`${siteConfig.name} — professional headshot`}
                    className="h-full w-full object-cover object-[center_35%] transition-transform duration-700 hover:scale-110"
                    width={448}
                    height={448}
                    fetchPriority="high"
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-void-950/40 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-4 -right-4 glass-premium p-4 rounded-2xl hidden md:block"
              style={{ y: y2 }}
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold tracking-wider uppercase">Active Now</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
