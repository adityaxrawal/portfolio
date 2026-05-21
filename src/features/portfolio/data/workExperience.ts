export interface WorkExperienceItem {
  companyName: string;
  companyLink: string;
  title: string;
  years: string;
  description: string;
  techHighlights: string[];
  orbitColor?: string;
  orbitShadowClass?: string;
}

export const WorkExperience: WorkExperienceItem[] = [
  {
    companyName: 'MathCo',
    companyLink: 'https://themathcompany.com/',
    title: 'Product Engineer - II',
    years: 'Jan 2024 - Present',
    description: `Spearheading the frontend architecture for a high-impact analytics dashboard at Mars Inc., turning complex data into sleek, user-centric visualizations that actually make sense! I collaborate closely with data scientists to translate brain-twisting analytical models into actionable insights, helping executive stakeholders make data-driven decisions. When I'm not crafting responsive interfaces with React and TypeScript, I'm under the hood with Python and FastAPI, architecting RESTful APIs that keep the data flow seamless. It's a full-stack adventure—from pixel-perfect visualizations to robust backend engines!`,
    techHighlights: [
      'React.js',
      'TypeScript',
      'Python',
      'FastAPI',
      'Data Visualization',
      'RESTful APIs',
      'Full-Stack',
    ],
    orbitColor: '#50b887',
    orbitShadowClass: 'shadow-green',
  },
  {
    companyName: 'Leadsquared',
    companyLink: 'https://www.leadsquared.com/',
    title: 'Software Engineer',
    years: 'Dec 2022 - Mar 2024',
    description: `Currently wrangling serverless functions and APIs! Developed a cost-saving, speedy web app using AWS Lambda. Built and maintain robust RESTful APIs in Node.js & Express.js, handling the chaos of ~500K monthly requests (and surviving!). Regularly integrate third-party APIs – because why build it if someone else already did? Participate in code reviews, ensuring our digital creations are secure, maintainable, and don't spontaneously combust. Collaborating across teams to enhance features and keep clients happy (mostly).`,
    techHighlights: [
      'AWS Lambda',
      'Node.js',
      'Express.js',
      'REST APIs',
      'Serverless',
      'Third-Party APIs',
    ],
    orbitColor: '#f97316',
    orbitShadowClass: 'shadow-orange',
  },
  {
    companyName: 'DevelUp',
    companyLink: 'https://www.develup.com/',
    title: 'Software Engineer',
    years: 'Jun 2021 - Dec 2022',
    description: `Helped build and maintain DevelUp's main site using the dynamic trio: Next.js, React.js, and Express.js, achieving a 45% boost in page load speed (faster than my morning coffee). Crafted engaging web pages leading to a 30% jump in user interaction. Designed and implemented a job search board that actually found relevant jobs (40% accuracy improvement!). Developed a Resume Builder used by over 5,000 users – hoping it helped them land great gigs! Also built an internal dashboard integrating job listings, enrollments, and profiles to improve retention.`,
    techHighlights: [
      'Next.js',
      'React.js',
      'Express.js',
      'Performance Optimization',
      'UI/UX',
      'Feature Development',
    ],
    orbitColor: '#3b82f6',
    orbitShadowClass: 'shadow-blue',
  },
  {
    companyName: 'Wipro',
    companyLink: 'https://www.wipro.com/',
    title: 'Software Engineer',
    years: 'Feb 2020 - May 2021',
    description: `Dived into the e-commerce world, developing a platform with the MEAN stack (MongoDB, Express, Angular, Node.js) - handling both database schemas and frontend logic. Designed a coupon microservice for tracking sales (everyone loves a discount!). Created essential REST APIs for user authentication and product management. Focused heavily on building a secure, scalable architecture to ensure smooth integration and a non-frustrating user experience.`,
    techHighlights: [
      'MEAN Stack',
      'Angular',
      'Node.js',
      'MongoDB',
      'Microservices',
      'REST APIs',
      'E-commerce',
    ],
    orbitColor: '#a855f7',
    orbitShadowClass: 'shadow-purple'
  },
];
