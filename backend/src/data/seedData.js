export const seedProjects = [
  {
    title: 'E-Commerce MERN Platform',
    description:
      'Full-stack online store with cart, JWT auth, Stripe-ready checkout, and admin dashboard.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
    order: 1,
    category: 'fullstack',
  },
  {
    title: 'Task Management Dashboard',
    description:
      'Real-time kanban board with drag-and-drop, Firebase auth, and responsive dark UI.',
    technologies: ['React', 'Firebase', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
    order: 2,
    category: 'frontend',
  },
  {
    title: 'REST API Boilerplate',
    description:
      'Production-ready Express API with rate limiting, validation, and MongoDB integration.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
    liveUrl: '#',
    repoUrl: '#',
    featured: true,
    order: 3,
    category: 'backend',
  },
];

export const seedSkills = [
  { name: 'HTML', category: 'frontend', proficiency: 95, order: 1 },
  { name: 'CSS', category: 'frontend', proficiency: 92, order: 2 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 94, order: 3 },
  { name: 'JavaScript', category: 'frontend', proficiency: 90, order: 4 },
  { name: 'React', category: 'frontend', proficiency: 88, order: 5 },
  { name: 'Node.js', category: 'backend', proficiency: 85, order: 6 },
  { name: 'Express.js', category: 'backend', proficiency: 84, order: 7 },
  { name: 'MongoDB', category: 'backend', proficiency: 82, order: 8 },
  { name: 'Firebase Auth', category: 'tools', proficiency: 86, order: 9 },
  { name: 'Next.js', category: 'learning', proficiency: 55, order: 10 },
  { name: 'TypeScript', category: 'learning', proficiency: 60, order: 11 },
];
