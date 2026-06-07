import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { HiMoon, HiSun, HiDownload } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';
import { useActiveSection } from '@/hooks/useActiveSection';
import { AnimatedHamburger } from '@/components/layout/AnimatedHamburger';
import { navLinks, siteConfig } from '@/data/portfolioData';
import { cn } from '@/utils/cn';

const socials = [
  { icon: FaGithub, href: siteConfig.github, label: 'GitHub' },
  { icon: FaLinkedin, href: siteConfig.linkedin, label: 'LinkedIn' },
  { icon: FaTwitter, href: siteConfig.twitter, label: 'Twitter' },
];

const sectionIds = navLinks.map((l) => l.href);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const active = useActiveSection(sectionIds);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNav = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'py-3 backdrop-blur-2xl bg-white/70 dark:bg-void-950/75 border-b border-white/20 dark:border-white/[0.06] shadow-glass'
          : 'py-5 bg-transparent'
      )}
      style={{ transitionTimingFunction: 'var(--ease-premium)' }}
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-linear-to-r from-brand-500 via-accent-purple-500 to-accent-cyan-400 origin-left z-50"
        style={{ scaleX }}
      />

      <nav className="container-custom flex items-center justify-between gap-4">
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            handleNav('#home');
          }}
          className="font-display text-xl sm:text-2xl font-black tracking-tighter shrink-0 flex items-center gap-1.5"
        >
          <span className="gradient-text">{siteConfig.shortName.split(' ')[1] || 'NH'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan-400 shadow-glow-sm" />
          <span className="text-slate-400 dark:text-slate-500 font-bold text-xs uppercase tracking-widest hidden sm:inline">
            Portfolio
          </span>
        </motion.a>

        <ul className="hidden lg:flex items-center gap-1 glass-premium rounded-full px-2 py-1.5 border border-white/20 dark:border-white/[0.08]">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(link.href);
                  }}
                  className={cn(
                    'relative z-10 block px-4 py-2 rounded-full text-[11px] uppercase font-bold tracking-widest transition-colors duration-300',
                    isActive
                      ? 'text-brand-700 dark:text-white'
                      : 'text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-accent-cyan-400'
                  )}
                >
                  {link.label}
                </a>
                {isActive && (
                  <motion.span
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 rounded-full bg-brand-500/15 dark:bg-white/5 ring-1 ring-brand-500/30 dark:ring-white/10 shadow-glow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden md:flex items-center gap-1 bg-white/5 dark:bg-white/5 rounded-xl p-1 border border-white/10">
            {socials.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                whileHover={{ y: -2, scale: 1.1 }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-accent-cyan-400 transition-all duration-300"
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>

          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="p-2.5 rounded-xl glass-premium hover:shadow-glow-sm transition-all duration-300 border border-white/10"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <HiSun className="w-5 h-5 text-accent-cyan-400" />
            ) : (
              <HiMoon className="w-5 h-5 text-brand-600" />
            )}
          </motion.button>

          <button
            type="button"
            className="lg:hidden p-2.5 rounded-xl glass-premium hover:shadow-glow-sm transition-all duration-300 text-slate-700 dark:text-slate-200 border border-white/10"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <AnimatedHamburger open={open} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[60px] bg-void-950/60 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden mx-4 mt-2 glass-strong rounded-2xl border border-white/[0.08] shadow-elevated overflow-hidden"
            >
              <ul className="flex flex-col p-3 gap-1 max-h-[70vh] overflow-y-auto">
                {navLinks.map((link, i) => {
                  const isActive = active === link.href;
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.3 }}
                    >
                      <a
                        href={link.href}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(link.href);
                        }}
                        className={cn(
                          'flex items-center justify-between py-3 px-4 rounded-xl font-medium transition-all duration-300',
                          isActive
                            ? 'bg-brand-500/15 text-brand-700 dark:text-accent-cyan-400 ring-1 ring-brand-500/25'
                            : 'hover:bg-brand-500/10 text-slate-700 dark:text-slate-300'
                        )}
                      >
                        {link.label}
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                        )}
                      </a>
                    </motion.li>
                  );
                })}
              </ul>

              <div className="p-4 pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-3">
                <div className="flex gap-2">
                  {socials.map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-2.5 rounded-xl glass hover:shadow-glow-sm transition-all duration-300"
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
                <a
                  href={siteConfig.resumeUrl}
                  download={siteConfig.resumeUrl !== '#'}
                  className="btn-primary !px-4 !py-2 !text-xs ml-auto"
                  onClick={() => setOpen(false)}
                >
                  <HiDownload className="w-4 h-4" />
                  Download Resume
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
