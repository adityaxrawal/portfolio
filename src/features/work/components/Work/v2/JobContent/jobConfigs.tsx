import {
  AppWindow,
  BarChart,
  BarChart2,
  CheckSquare,
  Clock,
  Cloud,
  Code2,
  Cpu,
  Database,
  FileCode2,
  GitBranch,
  Globe,
  Layers,
  Lock,
  Monitor,
  Package,
  Server,
  Share2,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
  Box,
  Activity,
  Network,
} from 'lucide-react';
import type { ReactNode } from 'react';

import type { JobConfig } from '../../../../types/work.types';

export interface ArchDomainChip {
  label: string;
  icon: ReactNode;
  color?: string;
}

export interface DetailedInfoSection {
  title: string;
  icon: ReactNode;
  description?: string;
  items?: string[];
  domains?: ArchDomainChip[];
  variant: 'built' | 'responsibilities';
}

/* ─────────────────────────────────────────────────────────────
   WIPRO
   ───────────────────────────────────────────────────────────── */
export const wiproDetailedSections: DetailedInfoSection[] = [
  {
    title: 'What I Built',
    icon: <FileCode2 size={14} />,
    description:
      'A full-stack e-commerce platform with coupon management, product catalog, and secure authentication.',
    domains: [
      { label: 'Frontend', icon: <Monitor size={10} />, color: '#0ea5e9' },
      { label: 'Backend API', icon: <Server size={10} />, color: '#6366f1' },
      { label: 'Auth / JWT', icon: <Lock size={10} />, color: '#8b5cf6' },
      { label: 'Databases', icon: <Database size={10} />, color: '#f59e0b' },
      { label: 'Microservices', icon: <Package size={10} />, color: '#14b8a6' },
      { label: 'REST APIs', icon: <Globe size={10} />, color: '#ec4899' },
    ],
    variant: 'built',
  },
  {
    title: 'Key Responsibilities',
    icon: <ShieldCheck size={14} />,
    items: [
      'Developed MEAN stack modules',
      'Built coupon microservice',
      'Implemented JWT auth',
      'Designed MongoDB schemas',
      'Improved API performance',
    ],
    variant: 'responsibilities',
  },
];

/* ─────────────────────────────────────────────────────────────
   DEVELUP
   ───────────────────────────────────────────────────────────── */
export const develUpDetailedSections: DetailedInfoSection[] = [
  {
    title: 'What I Built',
    icon: <AppWindow size={14} />,
    description:
      'An interactive Resume Builder with real-time editing, template customization, secure auth, PDF export and user dashboard.',
    domains: [
      { label: 'Frontend SSR', icon: <Monitor size={10} />, color: '#10b981' },
      { label: 'REST APIs', icon: <Network size={10} />, color: '#3b82f6' },
      {
        label: 'Auth / RBAC',
        icon: <ShieldCheck size={10} />,
        color: '#8b5cf6',
      },
      { label: 'Async Workers', icon: <Share2 size={10} />, color: '#f59e0b' },
      { label: 'CDN / S3', icon: <Cloud size={10} />, color: '#06b6d4' },
      { label: 'CI/CD', icon: <GitBranch size={10} />, color: '#64748b' },
    ],
    variant: 'built',
  },
  {
    title: 'Key Responsibilities',
    icon: <CheckSquare size={14} />,
    items: [
      'Developed Next.js frontend with SSR + CSR',
      'Built REST APIs using Express.js',
      'Implemented JWT auth & protected routes',
      'Designed resume templates & rendering flow',
      'Built dashboard with analytics & tracking',
    ],
    variant: 'responsibilities',
  },
];

/* ─────────────────────────────────────────────────────────────
   LEADSQUARED
   ───────────────────────────────────────────────────────────── */
export const leadSquaredDetailedSections: DetailedInfoSection[] = [
  {
    title: 'What I Built',
    icon: <Package size={14} />,
    description:
      'Serverless microservices, secure APIs, and micro frontend modules that power core CRM workflows.',
    domains: [
      { label: 'Micro Frontend', icon: <Layers size={10} />, color: '#3b82f6' },
      { label: 'Serverless', icon: <Zap size={10} />, color: '#f97316' },
      { label: 'Event-Driven', icon: <Share2 size={10} />, color: '#f59e0b' },
      {
        label: 'Auth & WAF',
        icon: <ShieldCheck size={10} />,
        color: '#a855f7',
      },
      { label: 'Integrations', icon: <Globe size={10} />, color: '#0ea5e9' },
      { label: 'CDN / Edge', icon: <Cloud size={10} />, color: '#64748b' },
    ],
    variant: 'built',
  },
  {
    title: 'Key Responsibilities',
    icon: <GitBranch size={14} />,
    items: [
      'Designed serverless microservices using Node.js & AWS Lambda',
      'Built secure RESTful APIs with JWT, rate limiting & middleware',
      'Developed React micro frontends for CRM modules',
      'Integrated third-party systems via webhooks & APIs',
      'Implemented event-driven architectures with SQS/EventBridge',
    ],
    variant: 'responsibilities',
  },
];

/* ─────────────────────────────────────────────────────────────
   MATHCO
   ───────────────────────────────────────────────────────────── */
export const mathCoDetailedSections: DetailedInfoSection[] = [
  {
    title: 'What I Built',
    icon: <FileCode2 size={14} />,
    description:
      'End-to-end analytics dashboard with real-time insights, automated pipelines and secure data access.',
    domains: [
      { label: 'React / TS UI', icon: <Monitor size={10} />, color: '#22c55e' },
      { label: 'FastAPI', icon: <Server size={10} />, color: '#3b82f6' },
      { label: 'Data Pipelines', icon: <Share2 size={10} />, color: '#f97316' },
      {
        label: 'Auth & RBAC',
        icon: <ShieldCheck size={10} />,
        color: '#a855f7',
      },
      { label: 'CI/CD & Docker', icon: <Box size={10} />, color: '#64748b' },
      { label: 'Monitoring', icon: <Activity size={10} />, color: '#0ea5e9' },
    ],
    variant: 'built',
  },
  {
    title: 'Key Responsibilities',
    icon: <CheckSquare size={14} />,
    items: [
      'Built React + TypeScript dashboards',
      'Developed FastAPI backend services',
      'Integrated analytics pipelines',
      'Collaborated with data scientists',
      'Ensured performance & data accuracy',
    ],
    variant: 'responsibilities',
  },
];

/* ─────────────────────────────────────────────────────────────
   JOB CONFIGS (Metrics, ArchNodes, Impacts, TechStack)
   ───────────────────────────────────────────────────────────── */
export const jobConfigs: Record<string, JobConfig> = {
  MathCo: {
    logoLetter: 'M',
    badge: 'LIVE >',
    badgeClass: 'jc-badge-live',
    subtitle: 'Product Engineer - II  •  Jun 2025 - Present  •  Mars Inc.',
    description:
      'Building high-impact analytics systems that turn complex data into decisions leaders trust.',
    accentColor: '#16a34a', // green
    metrics: [
      {
        icon: <Database size={8} />,
        value: '12+',
        label: 'Dashboards\nShipped',
        color: 'green',
      },
      {
        icon: <Users size={8} />,
        value: '50K+',
        label: 'Daily Active\nUsers',
        color: 'orange',
      },
      {
        icon: <Target size={8} />,
        value: '98.7%',
        label: 'Data Accuracy\nAchieved',
        color: 'blue',
      },
      {
        icon: <Zap size={8} />,
        value: '~300ms',
        label: 'Avg. Query\nResponse',
        color: 'purple',
      },
    ],
    archNodes: [
      { icon: <Database size={14} />, label: 'Data Sources' },
      {
        icon: <Cloud size={14} />,
        label: 'Ingestion Layer',
        sublabel: '(ETL Pipelines)',
      },
      { icon: <Zap size={14} />, label: 'FastAPI Services', highlight: true },
      { icon: <BarChart2 size={14} />, label: 'Analytics Engine' },
      { icon: <Monitor size={14} />, label: 'Dashboards', sublabel: '(React)' },
    ],
    impacts: [
      {
        icon: <TrendingUp size={16} />,
        color: 'green',
        text: 'Unified analytics across brands & regions enabling faster, data-driven decisions.',
      },
      {
        icon: <Clock size={16} />,
        color: 'orange',
        text: 'Reduced report generation time by ~70% through automated data pipelines.',
      },
      {
        icon: <ShieldCheck size={16} />,
        color: 'blue',
        text: 'Trusted by executives across Mars Inc. for critical business insights.',
      },
    ],
    techStack: [
      'React',
      'TypeScript',
      'FastAPI',
      'Python',
      'AWS',
      'PostgreSQL',
    ],
  },

  Leadsquared: {
    logoLetter: 'L',
    badge: 'SCALED',
    badgeClass: 'jc-badge-scaled',
    subtitle: 'Software Engineer  •  Dec 2022 - Mar 2024  •  LeadSquared',
    description:
      'Architected serverless APIs and scalable backend integrations handling over 500K monthly requests.',
    accentColor: '#ea580c', // orange
    metrics: [
      {
        icon: <Server size={16} />,
        value: '500K+',
        label: 'Monthly API\nRequests',
        color: 'orange',
      },
      {
        icon: <Zap size={16} />,
        value: '40%',
        label: 'Cost\nReduction',
        color: 'blue',
      },
      {
        icon: <Globe size={16} />,
        value: '99.9%',
        label: 'API\nUptime',
        color: 'green',
      },
      {
        icon: <Code2 size={16} />,
        value: '10+',
        label: 'Third-Party\nIntegrations',
        color: 'purple',
      },
    ],
    archNodes: [
      { icon: <Monitor size={14} />, label: 'CRM Frontend' },
      {
        icon: <Cloud size={14} />,
        label: 'API Gateway',
        sublabel: '(AWS / REST)',
      },
      { icon: <Zap size={14} />, label: 'Lambda Fns', highlight: true },
      { icon: <Globe size={14} />, label: 'Third-Party APIs' },
      { icon: <Database size={14} />, label: 'RDS/DynamoDB' },
    ],
    impacts: [
      {
        icon: <Zap size={16} />,
        color: 'orange',
        text: 'Reduced application hosting and compute costs by ~40% via serverless migration.',
      },
      {
        icon: <TrendingUp size={16} />,
        color: 'green',
        text: 'Handled ~500K monthly API requests seamlessly with auto-scaling systems.',
      },
      {
        icon: <ShieldCheck size={16} />,
        color: 'blue',
        text: 'Integrated secure OAuth flows and rate limiting for external integrations.',
      },
    ],
    techStack: [
      'AWS Lambda',
      'Node.js',
      'Express.js',
      'REST APIs',
      'DynamoDB',
      'SQS',
    ],
  },

  DevelUp: {
    logoLetter: 'D',
    badge: 'LEARNING',
    badgeClass: 'jc-badge-learning-blue',
    subtitle: 'Software Engineer  •  Jun 2021 - Dec 2022  •  DevelUp',
    description:
      'Shipped user-facing features on Next.js and React, driving a 30% increase in user engagement.',
    accentColor: '#2563eb', // blue
    metrics: [
      {
        icon: <TrendingUp size={16} />,
        value: '45%',
        label: 'Page Load\nSpeedup',
        color: 'blue',
      },
      {
        icon: <Users size={16} />,
        value: '5,000+',
        label: 'Resume Builder\nUsers',
        color: 'green',
      },
      {
        icon: <BarChart size={16} />,
        value: '30%',
        label: 'User Interaction\nIncrease',
        color: 'orange',
      },
      {
        icon: <Target size={16} />,
        value: '40%',
        label: 'Job Match\nAccuracy',
        color: 'purple',
      },
    ],
    archNodes: [
      { icon: <Monitor size={14} />, label: 'User Browser' },
      {
        icon: <Cloud size={14} />,
        label: 'Next.js App',
        sublabel: '(SSR / SSG)',
      },
      { icon: <Code2 size={14} />, label: 'React UI', highlight: true },
      { icon: <Server size={14} />, label: 'Express APIs' },
      { icon: <Database size={14} />, label: 'PostgreSQL' },
    ],
    impacts: [
      {
        icon: <TrendingUp size={16} />,
        color: 'blue',
        text: 'Achieved 45% faster page load speeds through Next.js code splitting and SSG.',
      },
      {
        icon: <Users size={16} />,
        color: 'green',
        text: 'Resume Builder scaled successfully to support over 5,000 active users.',
      },
      {
        icon: <Clock size={16} />,
        color: 'orange',
        text: 'Boosted internal job match recommendations accuracy by ~40%.',
      },
    ],
    techStack: [
      'Next.js',
      'React.js',
      'Express.js',
      'TypeScript',
      'PostgreSQL',
      'Node.js',
    ],
  },

  Wipro: {
    logoLetter: 'W',
    badge: 'LEARNING',
    badgeClass: 'jc-badge-learning-purple',
    subtitle: 'Software Engineer  •  Feb 2020 - May 2021  •  Wipro',
    description:
      'Engineered scalable microservices and APIs for e-commerce platforms using the MEAN stack.',
    accentColor: '#9333ea', // purple
    metrics: [
      {
        icon: <Cpu size={16} />,
        value: 'MEAN',
        label: 'Full Stack\nExpertise',
        color: 'purple',
      },
      {
        icon: <Package size={16} />,
        value: '3+',
        label: 'Microservices\nBuilt',
        color: 'blue',
      },
      {
        icon: <Lock size={16} />,
        value: '100%',
        label: 'Secure Auth\nCoverage',
        color: 'green',
      },
      {
        icon: <Layers size={16} />,
        value: '5+',
        label: 'REST APIs\nShipped',
        color: 'orange',
      },
    ],
    archNodes: [
      { icon: <Monitor size={14} />, label: 'Storefront SPA' },
      { icon: <Code2 size={14} />, label: 'Angular UI', highlight: true },
      { icon: <Server size={14} />, label: 'Express API' },
      { icon: <Database size={14} />, label: 'MongoDB' },
      {
        icon: <Package size={14} />,
        label: 'Microservices',
        sublabel: '(Coupon)',
      },
    ],
    impacts: [
      {
        icon: <Cpu size={16} />,
        color: 'purple',
        text: 'Developed robust database schemas and REST APIs for authentication & product management.',
      },
      {
        icon: <Package size={16} />,
        color: 'orange',
        text: 'Designed a coupon tracking microservice to streamline sales promotion flows.',
      },
      {
        icon: <Lock size={16} />,
        color: 'green',
        text: 'Implemented stateful authentication and endpoint authorization protocols.',
      },
    ],
    techStack: [
      'Angular',
      'Node.js',
      'Express.js',
      'MongoDB',
      'REST APIs',
      'JWT',
    ],
  },
};

/**
 * Maps company names to their detailed info sections.
 * REFACTOR: Centralised here so adding a new company only requires one change.
 */
export const detailedSections: Record<string, DetailedInfoSection[]> = {
  Wipro: wiproDetailedSections,
  DevelUp: develUpDetailedSections,
  Leadsquared: leadSquaredDetailedSections,
  MathCo: mathCoDetailedSections,
};
