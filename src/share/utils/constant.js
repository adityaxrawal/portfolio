export const links = {
    linkedInLink: 'https://www.linkedin.com/in/adityaxrawal',
    githubLink: 'https://www.github.com/adityaxrawal'
}


export const darkModeColorList = {
    0: '#222831',  // Darkest shade (near-black with a hint of blue)
    1: '#31363F',  // Dark blue-gray, similar depth to light mode's shade 5
    2: '#76ABAE',  // Muted mid-tone blue-gray
    3: '#EEEEEE',  // Softer blue-gray, matches light mode’s mid-tones
    4: '#B8E0E3',  // Lighter muted blue, for highlights
    5: '#F0F5F7'   // Lightest shade, off-white with a hint of blue
}


export const lightModeColorList = {
    0: '#F9F7F7', // Lightest shade
    1: '#DBE2EF', // Light blue-gray
    2: '#C1D0E6', // Soft blue-gray, a step darker than the previous shade
    3: '#A7BEDC', // Muted medium blue
    4: '#3F72AF', // Medium-dark blue
    5: '#112D4E'  // Darkest blue
}


export const WorkExperience = [
    {
        companyName: 'Leadsquared',
        companyLink: 'https://www.leadsquared.com/',
        title: 'Software Engineer',
        years: 'Dec 2023 - Present',
        description: `
            Developed a serverless web app using AWS Lambda, cutting costs and boosting speed. 
            Built RESTful APIs in Node.js and Express.js, handling 500K requests monthly. 
            Integrated third-party APIs for scalability. 
            Led code reviews for security and maintainability. 
            Worked with teams to enhance features and client satisfaction.`
    },
    {
        companyName: 'Uniq Global Labs',
        companyLink: 'https://www.develup.com/',
        title: 'Software Engineer',
        years: 'Jan 2023 - Dec 2023',
        description: `
            Built and maintained DevelUp’s site using Next.js, React.js, and Express.js, improving page load by 45%. 
            Created web pages boosting engagement by 30%. 
            Designed a job search board, enhancing accuracy by 40%. 
            Built a Resume Builder used by 5,000+ users. 
            Developed a dashboard integrating job listings, enrollments, and profiles for retention.`
    },
    {
        companyName: 'Wipro',
        companyLink: 'https://www.wipro.com/',
        title: 'Software Engineer',
        years: 'Feb 2022 - Aug 2022',
        description: `
            Developed an e-commerce platform with MEAN stack, handling database and frontend. 
            Designed a coupon microservice for sales tracking. 
            Created REST APIs for user authentication and product management. 
            Focused on secure and scalable architecture, ensuring seamless integration across features for enhanced user experience.`
    }
]

export const PROGRESS_COLORS = [
    { max: 2, color: "#FFCCBC" },  // 0-2: Peach
    { max: 5, color: "#FFD180" },  // 3-5: Pastel Orange
    { max: 7, color: "#81D4FA" },  // 6-7: Sky Blue
    { max: 9, color: "#A5D6A7" },  // 8-9: Soft Mint Green
    { max: 10, color: "#B39DDB" }  // 10: Pastel Purple (Completed)
];

export const TechnicalSkills = [
    {
        skillName: 'React.js',
        skillLevel: 10,
        skillColor: '#61DAFB',
        skillDesc: 'Building fast, dynamic, and responsive UIs with reusable components, state management, and hooks for seamless user experiences.',
        skillIcon: '⚛️',
        extra: 'React is my superpower! 🚀',
        skillImage: 'react.png'
    },
    {
        skillName: 'JavaScript',
        skillLevel: 9,
        skillColor: '#F7DF1E',
        skillDesc: 'Writing clean, maintainable, and robust code with strong typing, asynchronous programming, and modern ES6+ features.',
        skillIcon: '📜',
        extra: 'JS + TS: The best of both worlds!',
        skillImage: 'JavaScript.png'
    },
    {
        skillName: 'HTML, CSS',
        skillLevel: 9,
        skillColor: '#E34F26',
        skillDesc: 'Designing pixel-perfect, responsive web interfaces with modern styling techniques and framework-based UI components.',
        skillIcon: '🎨',
        extra: 'CSS is magic, Bootstrap is speed!',
        skillImage: 'html_css.jpg'
    },
    {
        skillName: 'Next.js',
        skillLevel: 8,
        skillColor: '#000000',
        skillDesc: 'Optimizing performance with SSR, ISR, and API routes to craft high-speed, SEO-friendly web applications.',
        skillIcon: '🚀',
        extra: 'The future of React-powered web apps!',
        skillImage: 'nextjs.png'
    },
    {
        skillName: 'Node.js',
        skillLevel: 8,
        skillColor: '#8CC84B',
        skillDesc: 'Designing high-performance APIs and scalable backend architectures for handling millions of requests efficiently.',
        skillIcon: '🌿',
        extra: 'Backend speed meets scalability!',
        skillImage: 'Nodejs.png'
    },
    {
        skillName: 'MongoDB',
        skillLevel: 8,
        skillColor: '#47A248',
        skillDesc: 'Crafting flexible, high-speed NoSQL databases with optimized queries and efficient indexing for scalable applications.',
        skillIcon: '🍃',
        extra: 'Where data meets flexibility!',
        skillImage: 'mongodb.webp'
    },
    {
        skillName: 'REST API & Postman',
        skillLevel: 8,
        skillColor: '#FF5722',
        skillDesc: 'Building, testing, and optimizing RESTful APIs with secure authentication, efficient data handling, and seamless third-party integrations.',
        skillIcon: '🔗',
        extra: 'APIs: The glue of the web!',
        skillImage: 'postman.png'
    },
    {
        skillName: 'Express.js',
        skillLevel: 7,
        skillColor: '#303030',
        skillDesc: 'Creating robust and scalable backend solutions with middleware, routing, and API handling.',
        skillIcon: '🚏',
        extra: 'Minimal and powerful!',
        skillImage: 'Expressjs.png'
    },
    {
        skillName: 'Serverless Architecture',
        skillLevel: 7,
        skillColor: '#FF9800',
        skillDesc: 'Architecting modular, scalable, and independently deployable services for flexibility and performance.',
        skillIcon: '📦',
        extra: 'Breaking monoliths, one service at a time!',
        skillImage: 'serverless.png'
    },
    {
        skillName: 'Python',
        skillLevel: 7,
        skillColor: '#3776AB',
        skillDesc: 'Solving complex problems with structured programming, scripting, and automation capabilities.',
        skillIcon: '🐍',
        extra: 'From scripting to system programming!',
        skillImage: 'python.png'
    },
    {
        skillName: 'Data Structure and Algorithms (DSA)',
        skillLevel: 7,
        skillColor: '#2196F3',
        skillDesc: 'Implementing optimized algorithms and efficient data structures for high-performance applications.',
        skillIcon: '🔢',
        extra: 'Optimizing code, one algorithm at a time!',
        skillImage: 'dsa.png'
    },
    {
        skillName: 'AWS (EC2, Lambda, API Gateway)',
        skillLevel: 6,
        skillColor: '#FF9900',
        skillDesc: 'Deploying and managing cloud infrastructure with serverless functions, cost-effective computing, and scalable API solutions.',
        skillIcon: '☁️',
        extra: 'Serverless: Deploy first, ask questions later!',
        skillImage: 'aws.png'
    },
    {
        skillName: 'CI/CD Pipelines',
        skillLevel: 5,
        skillColor: '#2196F3',
        skillDesc: 'Automating deployment pipelines, ensuring smooth integrations, and optimizing development workflows with CI/CD tools.',
        skillIcon: '⚙️',
        extra: 'Automate everything, ship faster!',
        skillImage: 'serverless.png'
    },
    {
        skillName: 'Jira',
        skillLevel: 4,
        skillColor: '#0052CC',
        skillDesc: 'Managing Agile workflows, tracking sprints, and enhancing team collaboration for seamless software development.',
        skillIcon: '📊',
        extra: 'Turning tasks into milestones!',
        skillImage: 'jira.png'
    }
];
