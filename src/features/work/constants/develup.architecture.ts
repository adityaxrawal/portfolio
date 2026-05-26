import { ArchitectureDiagramConfig } from '../types/architecture.types';

export const develupArchitecture: ArchitectureDiagramConfig = {
  company: 'DevelUp',
  rows: [
    {
      id: 'clients',
      layerLabel: 'CLIENT\nLAYER',
      nodes: [
        { id: 'web',        label: 'Web Users',   icon: 'Globe',       iconColor: '#64748b' /* TODO: palette - tech brand color */ },
        { id: 'job',        label: 'Job Seekers', icon: 'Target',      iconColor: '#64748b' /* TODO: palette - tech brand color */ },
        { id: 'students',   label: 'Students',    icon: 'GraduationCap', iconColor: '#64748b' /* TODO: palette - tech brand color */ },
        { id: 'recruiters', label: 'Recruiters',  icon: 'UserCog',     iconColor: '#64748b' /* TODO: palette - tech brand color */ },
      ],
      connectorToNext: 'solid',
    },
    {
      id: 'frontend',
      layerLabel: 'FRONTEND',
      nodes: [
        {
          id: 'next',
          label: 'Next.js App',
          subLabel: 'SSR / CSR — Resume Builder',
          icon: 'SiNextdotjs',
          iconColor: '#000000' /* TODO: palette - tech brand color */,
          highlight: true,
        },
      ],
      connectorToNext: 'solid',
      connectorArrowCount: 4, // branches to 4 API nodes
    },
    {
      id: 'api',
      layerLabel: 'API\nLAYER',
      nodes: [
        { id: 'gateway',     label: 'REST API Gateway',  icon: 'Network',    iconColor: '#3b82f6' /* TODO: palette - tech brand color */ },
        { id: 'auth',        label: 'Auth Middleware',   subLabel: '(JWT)',   icon: 'Key',       iconColor: '#f59e0b' /* TODO: palette - tech brand color */ },
        { id: 'controllers', label: 'Controllers',        icon: 'LayoutGrid', iconColor: '#8B5CF6' /* TODO: palette - tech brand color */ },
        { id: 'services',    label: 'Services',           icon: 'Server',     iconColor: '#64748b' /* TODO: palette - tech brand color */ },
      ],
      connectorToNext: 'solid',
      connectorArrowCount: 3, // to 3 DATA nodes
    },
    {
      id: 'data',
      layerLabel: 'DATA\nLAYER',
      nodes: [
        { id: 'postgres', label: 'PostgreSQL', subLabel: '(User & Auth)',            icon: 'SiPostgresql', iconColor: '#336791' /* TODO: palette - tech brand color */ },
        { id: 'mongo',    label: 'MongoDB',    subLabel: '(Resumes & Templates)',    icon: 'SiMongodb',    iconColor: '#47A248' /* TODO: palette - tech brand color */ },
        { id: 'redis',    label: 'Redis',      subLabel: '(Cache & Sessions)',       icon: 'SiRedis',      iconColor: '#DC382D' /* TODO: palette - tech brand color */ },
      ],
      connectorToNext: 'dashed',
      connectorArrowCount: 4, // dashed → 4 WORKER nodes
    },
    {
      id: 'workers',
      layerLabel: 'BACKGROUND\nSERVICES',
      nodes: [
        { id: 'render',    label: 'Resume Rendering', icon: 'FileText',   iconColor: '#64748b' /* TODO: palette - tech brand color */ },
        { id: 'pdf',       label: 'PDF Generation',  subLabel: '(Worker)', icon: 'Box',         iconColor: '#ef4444' /* TODO: palette - tech brand color */ },
        { id: 'email',     label: 'Email / Notifications', icon: 'Mail',  iconColor: '#f59e0b' /* TODO: palette - tech brand color */ },
        { id: 'analytics', label: 'Analytics Worker', icon: 'Activity',   iconColor: '#10b981' /* TODO: palette - tech brand color */ },
      ],
      connectorToNext: 'solid',
      connectorArrowCount: 3, // → 3 STORAGE nodes
    },
    {
      id: 'storage',
      layerLabel: 'STORAGE\n& CDN',
      nodes: [
        { id: 's3',     label: 'AWS S3',       subLabel: '(Resumes & Files)', icon: 'Archive', iconColor: '#3CB054' /* TODO: palette - tech brand color */ },
        { id: 'cdn',    label: 'CloudFront',   subLabel: '(CDN)',             icon: 'Cloud',   iconColor: '#f97316' /* TODO: palette - tech brand color */ },
        { id: 'assets', label: 'Static Assets',                               icon: 'Package', iconColor: '#64748b' /* TODO: palette - tech brand color */ },
      ],
      connectorToNext: 'none',
    },
  ],
};
