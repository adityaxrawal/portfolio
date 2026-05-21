import React from 'react';
import {
  BarChart3,
  Bell,
  Boxes,
  Braces,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Database,
  FileText,
  GitBranch,
  Globe2,
  GraduationCap,
  HardDrive,
  KeyRound,
  Layers3,
  LockKeyhole,
  Mail,
  Monitor,
  Network,
  Route,
  Server,
  ShieldCheck,
  User,
  UserCheck,
  Users,
  Workflow,
} from 'lucide-react';

const iconMap = {
  analytics: BarChart3,
  api: Network,
  auth: KeyRound,
  briefcase: BriefcaseBusiness,
  cache: HardDrive,
  cdn: Globe2,
  cloud: Cloud,
  code: Code2,
  database: Database,
  file: FileText,
  github: GitBranch,
  graduate: GraduationCap,
  jwt: ShieldCheck,
  layers: Layers3,
  lock: LockKeyhole,
  mail: Mail,
  monitor: Monitor,
  package: Boxes,
  role: UserCheck,
  route: Route,
  server: Server,
  template: Braces,
  user: User,
  users: Users,
  workflow: Workflow,
  bell: Bell,
};

export const ArchitectureCard = ({
  title,
  subtitle,
  icon,
  tone = 'neutral',
  compact = false,
}) => {
  const Icon = icon ? iconMap[icon] : null;

  return (
    <article
      className={`du-card du-card--${tone} ${compact ? 'du-card--compact' : ''}`}
      aria-label={subtitle ? `${title} ${subtitle}` : title}
    >
      {Icon && (
        <span className="du-card__icon" aria-hidden="true">
          <Icon size={18} strokeWidth={2.35} />
        </span>
      )}
      <span className="du-card__copy">
        <span className="du-card__title">{title}</span>
        {subtitle && <span className="du-card__subtitle">{subtitle}</span>}
      </span>
    </article>
  );
};

export default ArchitectureCard;
