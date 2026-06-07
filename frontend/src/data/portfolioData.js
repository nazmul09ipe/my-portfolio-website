export const siteConfig = {
  name: 'Md. Nazmul Haque',
  shortName: 'Nazmul Haque',
  title: 'Full-Stack Developer',
  tagline: 'Crafting premium digital experiences with modern web technologies',
  email: 'nazmul09ipe@gmail.com',
  phone: '+880 1768-741760',
  location: 'Savar, Dhaka, Bangladesh',
  github: 'https://github.com/nazmul09ipe',
  linkedin: 'https://www.linkedin.com/in/md-nazmul-haque-130537105/',
  twitter: 'https://twitter.com',
  resumeUrl: '/Md_Nazmul_Haque_Resume.pdf',
  yearsExperience: 2,
  profileImage: '/profile.jpg',
};

export const about = {
  degree: 'B.Sc in Industrial and Production Engineering',
  university: 'RUET (Rajshahi University of Engineering and Technology)',
  merlinLevel1: 'Level-1 MERN Stack — Programming Hero (Completed)',
  merlinLevel2: 'Level-2 — Programming Hero (In Progress)',
  job: {
    title: 'Frontend Developer',
    company: 'Purrfect Software Limited',
    location: 'Savar, Dhaka',
  },
  bio: `I'm a passionate full-stack developer with ${siteConfig.yearsExperience}+ years of experience building responsive, performant web applications. Currently working as a Frontend Developer at Purrfect Software Limited, I combine engineering discipline from my IPE background at RUET with hands-on MERN stack expertise from Programming Hero.`,
};

export const skills = [
  { name: 'HTML', category: 'frontend', level: 95 },
  { name: 'CSS', category: 'frontend', level: 92 },
  { name: 'Tailwind CSS', category: 'frontend', level: 94 },
  { name: 'Bootstrap', category: 'frontend', level: 88 },
  { name: 'JavaScript', category: 'frontend', level: 90 },
  { name: 'React', category: 'frontend', level: 88 },
  { name: 'React Router', category: 'frontend', level: 86 },
  { name: 'Node.js', category: 'backend', level: 85 },
  { name: 'Express.js', category: 'backend', level: 84 },
  { name: 'MongoDB', category: 'backend', level: 82 },
  { name: 'Firebase Auth', category: 'tools', level: 86 },
  { name: 'JWT', category: 'tools', level: 83 },
  { name: 'Axios', category: 'tools', level: 88 },
  { name: 'Next.js', category: 'learning', level: 55 },
  { name: 'TypeScript', category: 'learning', level: 60 },
];

export const experience = [
  {
    id: 1,
    role: 'Frontend Developer',
    company: 'Purrfect Software Limited',
    location: 'Savar, Dhaka',
    period: 'Present',
    description:
      'Building responsive UIs, integrating APIs, and collaborating with cross-functional teams to deliver production-grade web applications.',
    highlights: ['React & Tailwind', 'Component architecture', 'Performance optimization'],
  },
  {
    id: 2,
    role: 'Web Developer',
    company: 'Freelance & Personal Projects',
    location: 'Remote',
    period: '2023 — Present',
    description:
      'Developed full-stack MERN applications, REST APIs, and client websites with modern design patterns and best practices.',
    highlights: ['MERN Stack', 'MongoDB', 'Firebase Authentication'],
  },
];

export const education = [
  {
    id: 1,
    degree: about.degree,
    institution: about.university,
    period: 'Graduate',
    description: 'Engineering foundation with analytical problem-solving applied to software development.',
  },
  {
    id: 2,
    degree: 'Level-1 MERN Stack Development',
    institution: 'Programming Hero',
    period: 'Completed',
    description: 'Intensive bootcamp covering React, Node, Express, MongoDB, and deployment.',
  },
  {
    id: 3,
    degree: 'Level-2 Advanced Development',
    institution: 'Programming Hero',
    period: 'In Progress',
    description: 'Advanced concepts, team projects, and industry-ready practices.',
  },
];

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Responsive, performant websites and web apps with React, Node.js, and modern tooling.',
    icon: 'code',
  },
  {
    id: 2,
    title: 'UI/UX Implementation',
    description: 'Pixel-perfect interfaces with glassmorphism, motion design, and premium SaaS aesthetics.',
    icon: 'design',
  },
  {
    id: 3,
    title: 'API Integration',
    description: 'RESTful APIs, MongoDB backends, Firebase auth, and third-party service integration.',
    icon: 'api',
  },
  {
    id: 4,
    title: 'Performance Optimization',
    description: 'Core Web Vitals, lazy loading, code splitting, and production-ready deployments.',
    icon: 'speed',
  },
];

export const testimonials = [
  {
    id: 1,
    name: 'Client Review',
    role: 'Project Stakeholder',
    quote:
      'Nazmul delivered a polished, fast portfolio with smooth animations and clean code. Highly professional work.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Team Lead',
    role: 'Purrfect Software Limited',
    quote:
      'Strong React skills, great attention to UI detail, and reliable communication throughout the sprint.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mentor Feedback',
    role: 'Programming Hero',
    quote:
      'Consistent MERN stack execution with modern best practices. Ready for production-level projects.',
    rating: 5,
  },
];

export const stats = [
  { label: 'Years Experience', value: siteConfig.yearsExperience, suffix: '+' },
  { label: 'Projects Built', value: 25, suffix: '+' },
  { label: 'Technologies', value: skills.length, suffix: '' },
  { label: 'Happy Clients', value: 15, suffix: '+' },
];
