import 'dotenv/config';
import mongoose from 'mongoose';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { seedProjects, seedSkills } from '../data/seedData.js';

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await Project.deleteMany({});
  await Skill.deleteMany({});
  await Project.insertMany(seedProjects);
  await Skill.insertMany(seedSkills);
  console.log('Database seeded successfully');
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
