/**
 * TechBadge — Three display modes:
 *   TechIconBadge  — colored chip with 2-letter abbreviation (for featured cards)
 *   TechDot        — solid colored circle only, no text (for table stack column)
 *   TechStack      — legacy text pill row (still exported for backward compat)
 */

import { Network, BrainCircuit, BarChart3, Cloud } from 'lucide-react';
import type { ComponentType } from 'react';
import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiFastapi,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiApachekafka,
  SiDocker,
  SiTailwindcss,
  SiPandas,
  SiSwift,
  SiApple,
} from 'react-icons/si';

// ─── Color map ───────────────────────────────────────────────────────────────

export const TECH_COLORS: Record<string, string> = {
  Python: '#3776AB',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  React: '#61DAFB',
  'Next.js': '#000000',
  FastAPI: '#009688',
  'Node.js': '#339939',
  Express: '#000000',
  PostgreSQL: '#4169E1',
  MongoDB: '#47A248',
  Redis: '#DC382D',
  Kafka: '#231F20',
  WebSocket: '#7C3AED',
  Docker: '#2496ED',
  AWS: '#232F3E',
  'Chart.js': '#FF6384',
  'Tailwind CSS': '#06B6D4',
  Pandas: '#150458',
  Swift: '#F05138',
  'AI/ML': '#8B5CF6',
  macOS: '#000000',
};

// ─── Icon Map ────────────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const TECH_ICONS: Record<string, ComponentType<any>> = {
  Python: SiPython,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  React: SiReact,
  'Next.js': SiNextdotjs,
  FastAPI: SiFastapi,
  'Node.js': SiNodedotjs,
  Express: SiExpress,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Redis: SiRedis,
  Kafka: SiApachekafka,
  WebSocket: Network,
  Docker: SiDocker,
  AWS: Cloud,
  'Chart.js': BarChart3,
  'Tailwind CSS': SiTailwindcss,
  Pandas: SiPandas,
  Swift: SiSwift,
  'AI/ML': BrainCircuit,
  macOS: SiApple,
};

// ─── Tech Icon Badge (featured cards) ────────────────────────────────────────

interface TechIconBadgeProps {
  name: string;
}

/**
 * Colored chip showing the brand icon. Used in featured cards.
 */
export function TechIconBadge({ name }: TechIconBadgeProps) {
  const color = TECH_COLORS[name] ?? '#9CA3AF';
  const IconComponent = TECH_ICONS[name];

  return (
    <span
      className="proj-tech-icon-badge"
      style={{
        backgroundColor: `${color}18`,
        borderColor: `${color}40`,
        color,
      }}
      title={name}
      aria-label={name}
    >
      {IconComponent ? (
        <IconComponent size={12} />
      ) : (
        name.slice(0, 2).toUpperCase()
      )}
    </span>
  );
}

/**
 * Row of up to `max` TechIconBadges + overflow counter. For featured cards.
 */
export function TechIconRow({
  stack,
  max = 3,
}: {
  stack: string[];
  max?: number;
}) {
  const visible = stack.slice(0, max);
  const overflow = stack.length - max;

  return (
    <div className="proj-tech-icon-row">
      {visible.map((tech) => (
        <TechIconBadge key={tech} name={tech} />
      ))}
      {overflow > 0 && (
        <span
          className="proj-tech-icon-more"
          aria-label={`${overflow} more technologies`}
        >
          +{overflow}
        </span>
      )}
    </div>
  );
}

// ─── Tech Dot (table stack column) ───────────────────────────────────────────

interface TechDotProps {
  name: string;
}

/**
 * Solid colored circle with the brand icon. Used in the table stack column.
 */
export function TechDot({ name }: TechDotProps) {
  const color = TECH_COLORS[name] ?? '#9CA3AF';
  const IconComponent = TECH_ICONS[name];

  return (
    <span
      className="proj-tech-dot-circle"
      style={{ backgroundColor: color }}
      title={name}
      aria-label={name}
    >
      {IconComponent ? (
        <IconComponent size={8} color="#fff" />
      ) : (
        name.slice(0, 1)
      )}
    </span>
  );
}

/**
 * Row of up to `max` TechDots + overflow counter. For the table stack column.
 */
export function TechDotRow({
  stack,
  max = 3,
}: {
  stack: string[];
  max?: number;
}) {
  const visible = stack.slice(0, max);
  const overflow = stack.length - max;

  return (
    <div className="proj-tech-dot-row">
      {visible.map((tech) => (
        <TechDot key={tech} name={tech} />
      ))}
      {overflow > 0 && (
        <span className="proj-tech-dot-more" aria-label={`${overflow} more`}>
          +{overflow}
        </span>
      )}
    </div>
  );
}

// ─── Legacy: text pill TechStack (kept for any remaining usages) ─────────────

interface TechBadgeProps {
  name: string;
  variant?: 'default' | 'compact';
}

export function TechBadge({ name, variant = 'default' }: TechBadgeProps) {
  const color = TECH_COLORS[name] ?? '#9CA3AF';
  const isExtra = name.startsWith('+');

  return (
    <span
      className={`proj-tech-badge ${variant === 'compact' ? 'proj-tech-badge-compact' : ''} ${isExtra ? 'proj-tech-badge-extra' : ''}`}
    >
      <span
        className="proj-tech-dot"
        style={{ backgroundColor: color }}
        aria-hidden="true"
      />
      {name}
    </span>
  );
}

export function TechStack({
  stack,
  max = 4,
  variant = 'default',
}: {
  stack: string[];
  max?: number;
  variant?: 'default' | 'compact';
}) {
  const visible = stack.slice(0, max);
  const overflow = stack.length - max;

  return (
    <div className="proj-tech-stack">
      {visible.map((tech) => (
        <TechBadge key={tech} name={tech} variant={variant} />
      ))}
      {overflow > 0 && <TechBadge name={`+${overflow}`} variant={variant} />}
    </div>
  );
}
