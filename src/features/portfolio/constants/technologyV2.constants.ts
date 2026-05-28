/**
 * @file technologyV2.constants.ts
 * @description Data constants for the Technology v2 section.
 *   - APPROACH_STEPS       — 4-step process flow in the header
 *   - SKILL_CATEGORIES     — 4-column grid (Languages, Frontend, Backend, Data & Database)
 *   - CLOUD_DEVOPS_ITEMS   — Cloud & DevOps chip row
 *   - TOOLS_PRACTICES_ITEMS — Tools & Practices chip row
 *   - CORE_STRENGTHS       — 6-item right-panel strength list
 */

import {
  Lightbulb,
  Palette,
  Monitor,
  Rocket,
  Cloud,
  Shield,
  TrendingUp,
  Code2,
  User,
  Network,
  Boxes,
  RefreshCw,
  ShieldCheck,
  Database,
  GitBranch,
  Settings2,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { FaAws } from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiFastapi,
  SiSpringboot,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiGithubactions,
  SiTerraform,
  SiPostman,
} from 'react-icons/si';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ApproachStep {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ComponentType<any>;
  label: string;
  badgeColor: string | null;
}

export interface SkillItem {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ComponentType<any>;
  /** Brand color for the icon */
  color: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  /** Accent color for the category label dot */
  dotColor: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  categoryIcon: ComponentType<any>;
  skills: SkillItem[];
}

export interface ChipItem {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ComponentType<any>;
  color: string;
}

export interface CoreStrength {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ComponentType<any>;
  title: string;
  desc: string;
}

// ─── Approach Steps ───────────────────────────────────────────────────────────

export const APPROACH_STEPS: ApproachStep[] = [
  {
    icon: Lightbulb,
    label: 'Understand\nProblems',
    badgeColor: null,
  },
  {
    icon: Palette,
    label: 'Design\nSolutions',
    badgeColor: '#F97316',
  },
  {
    icon: Monitor,
    label: 'Build &\nOptimize',
    badgeColor: '#27AE60',
  },
  {
    icon: Rocket,
    label: 'Deliver\nImpact',
    badgeColor: '#8B5CF6',
  },
];

// ─── Skill Categories (4-column grid) ─────────────────────────────────────────

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    label: 'LANGUAGES',
    dotColor: '#27AE60',
    categoryIcon: Code2,
    skills: [
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'Java', icon: SiOpenjdk, color: '#ED8B00' },
    ],
  },
  {
    id: 'frontend',
    label: 'FRONTEND',
    dotColor: '#F97316',
    categoryIcon: Monitor,
    skills: [
      { name: 'React.js', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#444444' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    id: 'backend',
    label: 'BACKEND',
    dotColor: '#3B82F6',
    categoryIcon: Settings2,
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339939' },
      { name: 'Express.js', icon: SiExpress, color: '#444444' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6DB33F' },
    ],
  },
  {
    id: 'data',
    label: 'DATA & DATABASE',
    dotColor: '#8B5CF6',
    categoryIcon: Database,
    skills: [
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'Redis', icon: SiRedis, color: '#DC382D' },
      { name: 'Amazon S3', icon: Cloud, color: '#FF9900' },
    ],
  },
];

// ─── Cloud & DevOps Chips ─────────────────────────────────────────────────────

export const CLOUD_DEVOPS_ITEMS: ChipItem[] = [
  { name: 'AWS', icon: FaAws, color: '#232F3E' },
  { name: 'Docker', icon: SiDocker, color: '#2496ED' },
  { name: 'CI/CD', icon: RefreshCw, color: '#6B6866' },
  { name: 'Git', icon: SiGit, color: '#F05032' },
  { name: 'GitHub\nActions', icon: SiGithubactions, color: '#2088FF' },
  { name: 'Terraform', icon: SiTerraform, color: '#7B42BC' },
];

// ─── Tools & Practices Chips ──────────────────────────────────────────────────

export const TOOLS_PRACTICES_ITEMS: ChipItem[] = [
  { name: 'REST APIs', icon: Network, color: '#8B7355' },
  { name: 'Microservices', icon: GitBranch, color: '#6B7280' },
  { name: 'Agile', icon: RefreshCw, color: '#27AE60' },
  { name: 'JWT', icon: ShieldCheck, color: '#6B6866' },
  { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
];

// ─── Core Strengths ───────────────────────────────────────────────────────────

export const CORE_STRENGTHS: CoreStrength[] = [
  {
    icon: Boxes,
    title: 'System Design',
    desc: 'Scalable & reliable architecture for complex systems.',
  },
  {
    icon: Shield,
    title: 'API Engineering',
    desc: 'Secure, fast & well-documented APIs.',
  },
  {
    icon: Cloud,
    title: 'Cloud Native',
    desc: 'Serverless, scalable & cost efficient solutions.',
  },
  {
    icon: TrendingUp,
    title: 'Data Pipelines',
    desc: 'Batch, stream & event-driven data workflows.',
  },
  {
    icon: Code2,
    title: 'Full-Stack',
    desc: 'End-to-end feature ownership across the stack.',
  },
  {
    icon: User,
    title: 'Problem Solving',
    desc: 'Analytical mindset & ownership to solve real problems.',
  },
];
