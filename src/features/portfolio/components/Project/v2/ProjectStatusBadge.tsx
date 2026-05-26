/**
 * ProjectStatusBadge — Styled status pill for LIVE / IN_PROGRESS / EXPERIMENTAL / ARCHIVED.
 */
import type { ProjectStatus } from '../../../constants/projects.constants';

interface ProjectStatusBadgeProps {
  status: ProjectStatus;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; className: string }
> = {
  LIVE: { label: 'LIVE', className: 'proj-badge proj-badge-live' },
  IN_PROGRESS: {
    label: 'IN PROGRESS',
    className: 'proj-badge proj-badge-progress',
  },
  EXPERIMENTAL: {
    label: 'EXPERIMENTAL',
    className: 'proj-badge proj-badge-experimental',
  },
  ARCHIVED: { label: 'ARCHIVED', className: 'proj-badge proj-badge-archived' },
};

export function ProjectStatusBadge({
  status,
  size = 'sm',
}: ProjectStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`${config.className} ${size === 'md' ? 'proj-badge-md' : ''}`}
    >
      {config.label}
    </span>
  );
}
