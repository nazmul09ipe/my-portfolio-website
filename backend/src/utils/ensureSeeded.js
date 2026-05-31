import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { seedProjects, seedSkills } from '../data/seedData.js';

export const ensureSeeded = async () => {
  const projectCount = await Project.countDocuments();
  if (projectCount === 0) {
    await Project.insertMany(seedProjects);
    console.log('Seeded default projects');
  }

  const skillCount = await Skill.countDocuments();
  if (skillCount === 0) {
    await Skill.insertMany(seedSkills);
    console.log('Seeded default skills');
  }
};
