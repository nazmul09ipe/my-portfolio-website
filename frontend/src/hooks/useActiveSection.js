import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds, offset = 140) {
  const [active, setActive] = useState(sectionIds[0] ?? '#home');

  useEffect(() => {
    const updateActive = () => {
      const scrollPos = window.scrollY + offset;
      let current = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.querySelector(id);
        if (el && el.offsetTop <= scrollPos) {
          current = id;
        }
      }

      setActive(current);
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => window.removeEventListener('scroll', updateActive);
  }, [sectionIds, offset]);

  return active;
}
