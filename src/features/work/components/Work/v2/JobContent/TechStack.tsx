import type { FC } from 'react';
import type { IconType } from 'react-icons';
import { FaAws, FaCloud, FaDatabase, FaServer } from 'react-icons/fa';
import {
  SiAngular,
  SiExpress,
  SiFastapi,
  SiJsonwebtokens,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiSwagger,
  SiTypescript,
} from 'react-icons/si';

const techLogoMap: Record<
  string,
  { Icon: IconType; tone: string; label?: string }
> = {
  React: { Icon: SiReact, tone: 'react' },
  'React.js': { Icon: SiReact, tone: 'react', label: 'React' },
  TypeScript: { Icon: SiTypescript, tone: 'typescript' },
  FastAPI: { Icon: SiFastapi, tone: 'fastapi' },
  Python: { Icon: SiPython, tone: 'python' },
  AWS: { Icon: FaAws, tone: 'aws' },
  PostgreSQL: { Icon: SiPostgresql, tone: 'postgresql' },
  'AWS Lambda': { Icon: FaCloud, tone: 'lambda' },
  'Node.js': { Icon: SiNodedotjs, tone: 'node' },
  'Express.js': { Icon: SiExpress, tone: 'express' },
  'REST APIs': { Icon: SiSwagger, tone: 'rest' },
  DynamoDB: { Icon: FaDatabase, tone: 'dynamodb' },
  SQS: { Icon: FaAws, tone: 'sqs' },
  'Next.js': { Icon: SiNextdotjs, tone: 'next' },
  Angular: { Icon: SiAngular, tone: 'angular' },
  MongoDB: { Icon: SiMongodb, tone: 'mongodb' },
  JWT: { Icon: SiJsonwebtokens, tone: 'jwt' },
};

interface TechPillProps {
  label: string;
}

// REFACTOR: Replaced the IIFE inside JSX with a derived variable above the return.
// IIFEs in JSX are hard to read and make it difficult for devs to reason about rendering.
export const TechPill: FC<TechPillProps> = ({ label }) => {
  const logo = techLogoMap[label] ?? { Icon: FaServer, tone: 'default' };
  const Icon = logo.Icon;

  return (
    <span className="jc-tech-pill">
      <span
        className={`jc-tech-pill-icon jc-tech-pill-icon-${logo.tone}`}
        aria-hidden="true"
      >
        <Icon />
      </span>
      <span className="jc-tech-pill-label">{logo.label ?? label}</span>
    </span>
  );
};

interface TechStackProps {
  labels: string[];
}

export const TechStack: FC<TechStackProps> = ({ labels }) => (
  <div className="jc-tech-pills">
    {labels.map((t) => (
      <TechPill key={t} label={t} />
    ))}
  </div>
);
