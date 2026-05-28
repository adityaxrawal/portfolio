/**
 * @file projects.constants.ts
 * @description Static project data for the Projects v2 section.
 * Exact replica of the dashboard image content.
 */

export type ProjectStatus =
  | 'LIVE'
  | 'IN_PROGRESS'
  | 'EXPERIMENTAL'
  | 'ARCHIVED';
export type ProjectType =
  | 'Dashboard'
  | 'Utility'
  | 'Tooling'
  | 'Backend'
  | 'Data Tool'
  | 'Full Stack';

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  type?: ProjectType;
  status: ProjectStatus;
  stack: string[];
  githubUrl: string;
  stars?: number;
  forks?: number;
  lastActivity: string;
  isFeatured: boolean;
  sparklineData: number[];
}

export interface CommitActivity {
  repo: string;
  repoLabel: string;
  message: string;
  time: string;
  color: string;
}

export interface FocusArea {
  iconName: string;
  title: string;
  subtitle: string;
  color: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Data — matches image exactly
// ─────────────────────────────────────────────────────────────────────────────

export const PROJECTS: ProjectItem[] = [
  // ── FEATURED ──
  {
    id: 'financial-tracker',
    name: 'Financial Tracker',
    description:
      'AI system that extracts transactions from emails & bank statements. Delivers deep financial insights.',
    status: 'LIVE',
    stack: ['Python', 'FastAPI', 'PostgreSQL', 'AI/ML'],
    githubUrl: 'https://github.com/adityaxrawal/financial-tracker',
    stars: 1,
    forks: 0,
    lastActivity: '2d ago',
    isFeatured: true,
    sparklineData: [2, 5, 3, 8, 6, 12, 9, 14, 11, 18, 15, 20],
  },
  {
    id: 'trade-simulator',
    name: 'Trade Simulator',
    description:
      'Backtesting & paper trading platform with real-time market data, portfolio simulation and performance analytics.',
    status: 'IN_PROGRESS',
    stack: ['TypeScript', 'Next.js', 'Redis', 'WebSocket'],
    githubUrl: 'https://github.com/adityaxrawal/trade-simulator',
    stars: 1,
    forks: 1,
    lastActivity: '5d ago',
    isFeatured: true,
    sparklineData: [10, 8, 12, 7, 15, 11, 17, 13, 19, 14, 22, 18],
  },
  {
    id: 'realtime-market-events',
    name: 'Realtime Market Events',
    description:
      'Streaming pipeline for market event detection, sentiment aggregation, classification and intelligent alerting.',
    status: 'IN_PROGRESS',
    stack: ['Python', 'Kafka', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/adityaxrawal/realtime-market-events',
    stars: 0,
    forks: 1,
    lastActivity: '1w ago',
    isFeatured: true,
    sparklineData: [5, 9, 6, 11, 8, 14, 10, 16, 12, 18, 14, 20],
  },
  {
    id: 'credit-cards-dashboard',
    name: 'Credit Cards Dashboard',
    description:
      'Analytics dashboard for credit card spending, insights, category breakdown and trend analysis.',
    status: 'IN_PROGRESS',
    stack: ['React', 'TypeScript', 'Chart.js', 'PostgreSQL'],
    githubUrl: 'https://github.com/adityaxrawal/credit-cards-dashboard',
    stars: 1,
    forks: 0,
    lastActivity: '3d ago',
    isFeatured: true,
    sparklineData: [3, 7, 4, 9, 6, 13, 9, 16, 11, 15, 13, 19],
  },
  // ── ALL SYSTEMS (non-featured) ──
  {
    id: 'delta-exchange-dashboard',
    name: 'Delta Exchange Dashboard',
    description: 'Real-time crypto derivatives dashboard',
    type: 'Dashboard',
    status: 'EXPERIMENTAL',
    stack: ['Next.js', 'Tailwind CSS', 'Chart.js'],
    githubUrl: 'https://github.com/adityaxrawal/delta-exchange-dashboard',
    lastActivity: '1w ago',
    isFeatured: false,
    sparklineData: [6, 4, 8, 5, 10, 7, 12, 9, 11, 8, 14, 10],
  },
  {
    id: 'macos-battery-monitor',
    name: 'MacOS Battery Monitor',
    description: 'Menu bar app to track battery health',
    type: 'Utility',
    status: 'EXPERIMENTAL',
    stack: ['Swift', 'macOS', 'Chart.js'],
    githubUrl: 'https://github.com/adityaxrawal/macos-battery-monitor',
    lastActivity: '2w ago',
    isFeatured: false,
    sparklineData: [8, 6, 10, 7, 9, 11, 8, 13, 10, 12, 9, 14],
  },
  {
    id: 'macos-antigravity-quota-monitor',
    name: 'Antigravity Quota Monitor',
    description: 'Monitor daily usage queues for AI tools',
    type: 'Tooling',
    status: 'EXPERIMENTAL',
    stack: ['Swift', 'macOS'],
    githubUrl:
      'https://github.com/adityaxrawal/macos-antigravity-quota-monitor',
    lastActivity: '2w ago',
    isFeatured: false,
    sparklineData: [4, 7, 5, 9, 6, 11, 8, 13, 10, 12, 8, 15],
  },
  {
    id: 'user-management',
    name: 'User Management',
    description: 'Scalable user/role management service',
    type: 'Backend',
    status: 'IN_PROGRESS',
    stack: ['Java'],
    githubUrl: 'https://github.com/adityaxrawal/user-management',
    lastActivity: '5d ago',
    isFeatured: false,
    sparklineData: [5, 8, 6, 10, 7, 12, 9, 14, 11, 13, 10, 16],
  },
  {
    id: 'stock-data-filtering',
    name: 'Stock Data Filtering',
    description: 'Clean & filter stock datasets efficiently',
    type: 'Data Tool',
    status: 'EXPERIMENTAL',
    stack: ['Python', 'Pandas', 'PostgreSQL'],
    githubUrl: 'https://github.com/adityaxrawal/stock-data-filtering',
    lastActivity: '9d ago',
    isFeatured: false,
    sparklineData: [3, 6, 4, 8, 5, 10, 7, 12, 9, 11, 8, 14],
  },
  {
    id: 'ecommerce-app',
    name: 'Ecommerce App',
    description: 'Interactive platform for home decor',
    type: 'Full Stack',
    status: 'IN_PROGRESS',
    stack: ['Next.js', 'Tailwind CSS', 'MongoDB'],
    githubUrl: 'https://github.com/adityaxrawal/ecommerce-app',
    lastActivity: '3d ago',
    isFeatured: false,
    sparklineData: [7, 5, 9, 6, 11, 8, 13, 10, 15, 12, 14, 17],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Status counts (derived)
// ─────────────────────────────────────────────────────────────────────────────
export const STATUS_COUNTS: Record<ProjectStatus, number> = {
  LIVE: PROJECTS.filter((p) => p.status === 'LIVE').length,
  IN_PROGRESS: PROJECTS.filter((p) => p.status === 'IN_PROGRESS').length,
  EXPERIMENTAL: PROJECTS.filter((p) => p.status === 'EXPERIMENTAL').length,
  ARCHIVED: PROJECTS.filter((p) => p.status === 'ARCHIVED').length,
};

// ─────────────────────────────────────────────────────────────────────────────
// Impact Overview Stats
// ─────────────────────────────────────────────────────────────────────────────
export const IMPACT_STATS = {
  projects: 13,
  liveSystems: 2,
  totalStars: '1.2K+',
  totalForks: '230+',
};

// ─────────────────────────────────────────────────────────────────────────────
// Technology Cloud
// ─────────────────────────────────────────────────────────────────────────────
export const TECH_CLOUD: Array<{ name: string; color: string }> = [
  { name: 'Python', color: '#3B82F6' },
  { name: 'TypeScript', color: '#2563EB' },
  { name: 'React', color: '#06B6D4' },
  { name: 'Next.js', color: '#101010' },
  { name: 'FastAPI', color: '#059669' },
  { name: 'Node.js', color: '#16A34A' },
  { name: 'PostgreSQL', color: '#2563EB' },
  { name: 'MongoDB', color: '#16A34A' },
  { name: 'Redis', color: '#DC2626' },
  { name: 'Kafka', color: '#101010' },
  { name: 'WebSocket', color: '#7C3AED' },
  { name: 'Docker', color: '#0EA5E9' },
  { name: 'AWS', color: '#F97316' },
  { name: 'Tailwind CSS', color: '#06B6D4' },
  { name: 'Chart.js', color: '#EC4899' },
  { name: '…', color: '#9CA3AF' },
];

// ─────────────────────────────────────────────────────────────────────────────
// Focus Areas
// ─────────────────────────────────────────────────────────────────────────────
export const FOCUS_AREAS: FocusArea[] = [
  {
    iconName: 'BarChart3',
    title: 'Data & Analytics Systems',
    subtitle: 'Dashboards, pipelines & insights',
    color: '#3B82F6',
  },
  {
    iconName: 'Zap',
    title: 'Real-time & Event Streams',
    subtitle: 'Streaming data, processing & alerts',
    color: '#F59E0B',
  },
  {
    iconName: 'CreditCard',
    title: 'Fintech & Personal Tools',
    subtitle: 'Finance, tracking & automation',
    color: '#EF4444',
  },
  {
    iconName: 'Wrench',
    title: 'Developer Productivity',
    subtitle: 'Utilities, tooling & experiments',
    color: '#8B5CF6',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Latest Commit Activity
// ─────────────────────────────────────────────────────────────────────────────
export const COMMIT_ACTIVITY: CommitActivity[] = [
  {
    repo: 'financial-tracker',
    repoLabel: 'financial-tracker',
    message: 'Refactor parser module',
    time: '2h ago',
    color: '#27AE60',
  },
  {
    repo: 'trade-simulator',
    repoLabel: 'trade-simulator',
    message: 'Add paper trading engine',
    time: '1d ago',
    color: '#F97316',
  },
  {
    repo: 'realtime-market-events',
    repoLabel: 'realtime-market-events',
    message: 'Optimize streaming pipeline',
    time: '2d ago',
    color: '#3B82F6',
  },
];
