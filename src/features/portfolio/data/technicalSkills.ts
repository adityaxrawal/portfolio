export interface TechnicalSkill {
  skillName: string;
  skillLevel: number;
  skillColor: string;
  skillDesc: string;
  skillIcon: string;
  extra: string;
  skillImage: string;
  category: string;
}

export const TechnicalSkills: TechnicalSkill[] = [
  {
    skillName: 'React.js',
    skillLevel: 10,
    skillColor: '#61DAFB',
    skillDesc:
      'Building fast, dynamic, and responsive UIs with reusable components, state management, and hooks for seamless user experiences.',
    skillIcon: '⚛️',
    extra: 'React is my superpower! 🚀',
    skillImage: 'react.webp',
    category: 'FRONTEND',
  },
  {
    skillName: 'JavaScript',
    skillLevel: 9,
    skillColor: '#F7DF1E',
    skillDesc:
      'Writing clean, maintainable, and robust code with strong typing, asynchronous programming, and modern ES6+ features.',
    skillIcon: '📜',
    extra: 'JS + TS: The best of both worlds!',
    skillImage: 'JavaScript.webp',
    category: 'FRONTEND',
  },
  {
    skillName: 'HTML, CSS',
    skillLevel: 9,
    skillColor: '#E34F26',
    skillDesc:
      'Designing pixel-perfect, responsive web interfaces with modern styling techniques and framework-based UI components.',
    skillIcon: '🎨',
    extra: 'CSS is magic, sometimes dark magic!',
    skillImage: 'html_css.webp',
    category: 'FRONTEND',
  },
  {
    skillName: 'Next.js',
    skillLevel: 8,
    skillColor: '#000000',
    skillDesc:
      'Optimizing performance with SSR, ISR, and API routes to craft high-speed, SEO-friendly web applications.',
    skillIcon: '🚀',
    extra: 'The future of React-powered web apps!',
    skillImage: 'nextjs.webp',
    category: 'FRONTEND',
  },
  {
    skillName: 'Node.js',
    skillLevel: 8,
    skillColor: '#8CC84B',
    skillDesc:
      'Designing high-performance APIs and scalable backend architectures for handling millions of requests efficiently.',
    skillIcon: '🌿',
    extra: 'Backend speed meets scalability!',
    skillImage: 'Nodejs.webp',
    category: 'BACKEND',
  },
  {
    skillName: 'MongoDB',
    skillLevel: 8,
    skillColor: '#47A248',
    skillDesc:
      'Crafting flexible, high-speed NoSQL databases with optimized queries and efficient indexing for scalable applications.',
    skillIcon: '🍃',
    extra: 'Where data meets flexibility!',
    skillImage: 'mongodb.webp',
    category: 'CLOUD',
  },
  {
    skillName: 'REST API & Postman',
    skillLevel: 8,
    skillColor: '#FF5722',
    skillDesc:
      'Building, testing, and optimizing RESTful APIs with secure authentication, efficient data handling, and seamless third-party integrations.',
    skillIcon: '🔗',
    extra: 'APIs: The glue of the web!',
    skillImage: 'postman.webp',
    category: 'BACKEND',
  },
  {
    skillName: 'Express.js',
    skillLevel: 7,
    skillColor: '#303030',
    skillDesc:
      'Creating robust and scalable backend solutions with middleware, routing, and API handling.',
    skillIcon: '🚏',
    extra: 'Minimal and powerful!',
    skillImage: 'Expressjs.webp',
    category: 'BACKEND',
  },
  {
    skillName: 'Serverless Architecture',
    skillLevel: 7,
    skillColor: '#FF9800',
    skillDesc:
      'Architecting modular, scalable, and independently deployable services for flexibility and performance.',
    skillIcon: '📦',
    extra: 'Breaking monoliths, one function at a time!',
    skillImage: 'serverless.webp',
    category: 'CLOUD',
  },
  {
    skillName: 'Python',
    skillLevel: 7,
    skillColor: '#3776AB',
    skillDesc:
      'Solving complex problems with structured programming, scripting, and automation capabilities.',
    skillIcon: '🐍',
    extra: 'From scripting to system programming!',
    skillImage: 'python.webp',
    category: 'LANG/CS',
  },
  {
    skillName: 'Data Structure and Algorithms (DSA)',
    skillLevel: 7,
    skillColor: '#2196F3',
    skillDesc:
      'Implementing optimized algorithms and efficient data structures for high-performance applications.',
    skillIcon: '🔢',
    extra: 'Optimizing code, one algorithm at a time!',
    skillImage: 'dsa.webp',
    category: 'LANG/CS',
  },
  {
    skillName: 'AWS (EC2, Lambda, API Gateway)',
    skillLevel: 6,
    skillColor: '#FF9900',
    skillDesc:
      'Deploying and managing cloud infrastructure with serverless functions, cost-effective computing, and scalable API solutions.',
    skillIcon: '☁️',
    extra: 'Serverless: Pay for what you use!',
    skillImage: 'aws.webp',
    category: 'CLOUD',
  },
];
