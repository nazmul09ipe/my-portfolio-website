import { useEffect } from 'react';
import { siteConfig } from '@/data/portfolioData';

export function SEO({ title, description }) {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} | ${siteConfig.title}`;
  const desc =
    description ||
    `Portfolio of ${siteConfig.name} — Full-stack developer with ${siteConfig.yearsExperience}+ years experience. React, Node.js, MongoDB.`;

  useEffect(() => {
    document.title = fullTitle;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', desc);
  }, [fullTitle, desc]);

  return null;
}
