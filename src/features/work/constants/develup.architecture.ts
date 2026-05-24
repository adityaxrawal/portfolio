import { ArchitectureDiagramConfig } from '../types/architecture.types';

export const develupArchitecture: ArchitectureDiagramConfig = {
  company: 'DevelUp',
  columns: [
    {
      id: 'clients',
      title: 'Clients',
      accent: '#8b5cf6', // purple
      nodes: [
        { id: 'web', label: 'Web Users', icon: 'user' },
        { id: 'job', label: 'Job Seekers', icon: 'user' },
        { id: 'students', label: 'Students', icon: 'graduate' },
        { id: 'recruiters', label: 'Recruiters', icon: 'users' },
      ],
    },
    {
      id: 'frontend',
      title: 'Frontend (Next.js)',
      accent: '#10b981', // emerald
      nodes: [
        { id: 'next', label: 'Next.js App', subLabel: '(SSR/CSR)' },
        { id: 'resume', label: 'Resume Builder UI' },
        { id: 'template', label: 'Template Engine' },
        { id: 'state', label: 'State Management', subLabel: '(Context API)' },
        { id: 'storage', label: 'Local Storage', subLabel: '(Drafts)' },
      ],
    },
    {
      id: 'api',
      title: 'API Layer (Express.js)',
      accent: '#3b82f6', // blue
      nodes: [
        { id: 'gateway', label: 'REST API Gateway' },
        { id: 'auth', label: 'Auth Middleware', subLabel: '(JWT)' },
        { id: 'controllers', label: 'Controllers' },
        { id: 'services', label: 'Services' },
        { id: 'repositories', label: 'Repositories' },
      ],
    },
    {
      id: 'data',
      title: 'Data Layer',
      accent: '#a855f7', // purple
      nodes: [
        { id: 'postgres', label: 'PostgreSQL', subLabel: '(User & Auth)', icon: 'database' },
        { id: 'mongo', label: 'MongoDB', subLabel: '(Resumes & Templates)', icon: 'file' },
        { id: 'redis', label: 'Redis', subLabel: '(Cache & Sessions)', icon: 'cache' },
      ],
    },
    {
      id: 'workers',
      title: 'Background Services',
      accent: '#f59e0b', // amber
      nodes: [
        { id: 'render', label: 'Resume Rendering Service' },
        { id: 'pdf', label: 'PDF Generation Worker' },
        { id: 'email', label: 'Email/Notification Worker' },
        { id: 'analytics', label: 'Analytics Worker' },
      ],
    },
    {
      id: 'storage',
      title: 'Storage & CDN',
      accent: '#06b6d4', // cyan
      nodes: [
        { id: 's3', label: 'AWS S3', subLabel: '(Resumes & Files)', icon: 'cloud' },
        { id: 'cdn', label: 'CloudFront', subLabel: '(CDN)', icon: 'server' },
        { id: 'assets', label: 'Static Assets', icon: 'package' },
      ],
    },
  ],
  footerBands: [
    {
      id: 'security',
      title: 'Security',
      nodes: [
        { id: 'jwt', label: 'JWT Authentication', icon: 'jwt' },
        { id: 'routes', label: 'Protected Routes', icon: 'lock' },
        { id: 'rbac', label: 'Role-based Access', icon: 'role' },
      ],
    },
    {
      id: 'devops',
      title: 'DevOps & Monitoring',
      nodes: [
        { id: 'cicd', label: 'GitHub Actions (CI/CD)', icon: 'github' },
        { id: 'sentry', label: 'Sentry Monitoring', icon: 'bell' },
        { id: 'logs', label: 'Logs & Analytics', icon: 'analytics' },
      ],
    },
  ],
};
