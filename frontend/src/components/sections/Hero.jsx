import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { Button } from '@/components/ui/Button';
import { AnimatedNumber } from '@/components/ui/AnimatedNumber';
import { siteConfig, stats } from '@/data/portfolioData';

export function Hero() {
  const headlineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2,
        clearProps: 'opacity',
      });
      gsap.from('.hero-badge', {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: 'back.out(1.7)',
        clearProps: 'opacity,transform',
      });
    }, headlineRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="section-padding min-h-screen flex items-center pt-24">
      <div ref={headlineRef} className="container-custom grid lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:items-start">
        <div>
        <motion.span
          className="hero-badge badge-glow mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="w-2 h-2 rounded-full bg-accent-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
          Available for opportunities
        </motion.span>

        <p className="hero-line text-sm uppercase tracking-widest text-slate-500 dark:text-slate-500 mb-3">
          Hello, I&apos;m
        </p>
        <h1 className="hero-line font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-5">
          <span className="gradient-text">{siteConfig.name}</span>
        </h1>
        <h2 className="hero-line text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-navy-800 dark:text-slate-200 mb-6">
          {siteConfig.title}
        </h2>
        <p className="hero-line max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400 mb-10">
          {siteConfig.tagline}. Building scalable MERN applications with premium UI and buttery-smooth
          animations.
        </p>

        <div className="hero-line flex flex-wrap gap-4 mb-12">
          <Button href="#contact">Let&apos;s Talk</Button>
          <Button variant="secondary" href={siteConfig.resumeUrl}>
            <HiDownload className="w-5 h-5" />
            Download CV
          </Button>
          <Button variant="outline" href={siteConfig.github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="w-5 h-5" />
          </Button>
          <Button variant="outline" href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="w-5 h-5" />
          </Button>
        </div>

        <div className="hero-line grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-2xl p-5 md:p-6 text-center gradient-border hover:shadow-glow-sm transition-all duration-500"
            >
              <div className="font-display text-2xl md:text-3xl font-bold gradient-text tracking-tight">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={2.5} />
              </div>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-500 mt-2 tracking-wide">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <motion.a
          href="#about"
          className="hero-line inline-flex flex-col items-center gap-2 mt-20 text-slate-400 hover:text-accent-cyan-400 transition-colors duration-300"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-sm">Scroll to explore</span>
          <HiArrowDown className="w-5 h-5" />
        </motion.a>
        </div>

        <motion.div
          className="hero-photo relative mx-auto flex w-full items-center justify-center translate-y-6 sm:translate-y-8 lg:translate-y-12"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[26rem] lg:h-[26rem] rounded-full bg-linear-to-br from-brand-500/50 via-accent-purple-500/40 to-accent-cyan-400/30 blur-3xl animate-glow" />
          </div>

          <div className="relative animate-float">
            <div
              className="rounded-full p-1 bg-linear-to-br from-brand-400 via-accent-purple-500 to-accent-cyan-400 shadow-glow-lg"
              aria-hidden
            >
              <div className="rounded-full p-1 bg-void-950 dark:bg-navy-950">
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[26rem] lg:h-[26rem] rounded-full overflow-hidden bg-navy-800 ring-1 ring-white/10">
                  <img
                    src={siteConfig.profileImage}
                    alt={`${siteConfig.name} — professional headshot`}
                    className="h-full w-full object-cover object-[center_35%]"
                    width={416}
                    height={416}
                    fetchPriority="high"
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
