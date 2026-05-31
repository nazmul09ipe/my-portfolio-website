import { seedProjects, seedSkills } from '../data/seedData.js';

export const getFallbackProjects = (featured) => {
  if (featured === 'true') {
    return seedProjects.filter((p) => p.featured);
  }
  return seedProjects;
};

export const getFallbackSkills = () => seedSkills;
