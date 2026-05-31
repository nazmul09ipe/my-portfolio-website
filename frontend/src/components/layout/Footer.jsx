import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { siteConfig } from '@/data/portfolioData';

const socials = [
  { icon: FaGithub, href: siteConfig.github, label: 'GitHub' },
  { icon: FaLinkedin, href: siteConfig.linkedin, label: 'LinkedIn' },
  { icon: FaTwitter, href: siteConfig.twitter, label: 'Twitter' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/40 dark:border-white/[0.06] py-12 mt-8">
      <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-slate-500 dark:text-slate-500 tracking-tight">
          © {year}{' '}
          <span className="text-slate-700 dark:text-slate-300 font-medium">{siteConfig.name}</span>
          . Crafted with precision.
        </p>
        <div className="flex gap-3">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-3 rounded-xl glass hover:shadow-glow-sm hover:text-brand-500 dark:hover:text-accent-cyan-400 transition-all duration-300"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
