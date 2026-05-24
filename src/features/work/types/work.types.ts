import type { ReactNode } from 'react';

export type MetricColor = 'green' | 'orange' | 'blue' | 'purple';

export interface JobMetricConfig {
  icon: ReactNode;
  value: string;
  label: string;
  color: MetricColor;
}

export interface JobArchNodeConfig {
  icon: ReactNode;
  label: string;
  sublabel?: string;
  highlight?: boolean;
}

export interface JobImpactConfig {
  icon: ReactNode;
  color: MetricColor;
  text: string;
}

export interface JobConfig {
  logoLetter: string;
  badge: string;
  badgeClass: string;
  subtitle: string;
  description: string;
  accentColor: string;
  metrics: JobMetricConfig[];
  archNodes: JobArchNodeConfig[];
  impacts: JobImpactConfig[];
  techStack: string[];
}

export type CompanyThemeName =
  | 'MathCo'
  | 'Leadsquared'
  | 'DevelUp'
  | 'Wipro'
  | string;

export interface CompanyThemeDetails {
  icon: ReactNode;
  badgeText: string;
  badgeClass: string;
  numColorClass: string;
  activeBgClass: string;
  indicatorClass: string;
}
