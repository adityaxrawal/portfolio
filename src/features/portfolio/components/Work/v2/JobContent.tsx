import {
  AppWindow,
  ArrowRight,
  BarChart,
  BarChart2,
  Check,
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
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import React from 'react';
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

import { WorkExperienceItem } from '../../../data/workExperience';

import { DevelUpArchitecture } from './exp-architecture/DevelUpArchitecture/DevelUpArchitecture';
import { LeadSquaredArchitecture } from './exp-architecture/LeadSquaredArchitecture/LeadSquaredArchitecture';
import { MathCoArchitecture } from './exp-architecture/MathCoArchitecture/MathCoArchitecture';
import { WiproArchitecture } from './exp-architecture/WiproArchitecture/WiproArchitecture';

import { useSharedState } from '@/app/providers/AppContext';

import './JobContent.css';

const MathCoDiagram = () => <MathCoArchitecture embedded={true} />;
const LeadSquaredDiagram = () => <LeadSquaredArchitecture embedded={true} />;
const DevelUpDiagram = () => <DevelUpArchitecture />;
const WiproDiagram = () => <WiproArchitecture />;

// ─── Sub-components ────────────────────────────────────────────────────────

interface MetricCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: 'green' | 'orange' | 'blue' | 'purple';
}

const MetricCard: React.FC<MetricCardProps> = ({
  icon,
  value,
  label,
  color,
}) => (
  <div className={`jc-metric-card jc-metric-${color}`}>
    <div className={`jc-metric-icon jc-metric-icon-${color}`}>{icon}</div>
    <div className="jc-metric-value">{value}</div>
    <div className="jc-metric-label">{label}</div>
  </div>
);

interface ArchNodeProps {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  highlight?: boolean;
  accentColor?: string;
}

const ArchNode: React.FC<ArchNodeProps> = ({
  icon,
  label,
  sublabel,
  highlight,
  accentColor,
}) => (
  <div
    className={`jc-arch-node ${highlight ? 'jc-arch-node-highlight' : ''}`}
    style={
      highlight && accentColor
        ? {
            borderColor: accentColor,
            boxShadow: `0 0 0 1px ${accentColor}20, 0 1px 6px ${accentColor}15`,
          }
        : {}
    }
  >
    <div
      className={`jc-arch-node-icon ${highlight ? 'jc-arch-node-icon-hl' : ''}`}
      style={
        highlight && accentColor
          ? { backgroundColor: `${accentColor}10`, color: accentColor }
          : {}
      }
    >
      {icon}
    </div>
    <span className="jc-arch-node-label">{label}</span>
    {sublabel && <span className="jc-arch-node-sub">{sublabel}</span>}
  </div>
);

interface ImpactItemProps {
  icon: React.ReactNode;
  color: 'green' | 'orange' | 'blue' | 'purple';
  text: string;
}

const ImpactItem: React.FC<ImpactItemProps> = ({ icon, color, text }) => (
  <div className="jc-impact-item">
    <div className={`jc-impact-icon jc-impact-icon-${color}`}>{icon}</div>
    <div className="jc-impact-text">
      <span className="jc-impact-desc">{text}</span>
    </div>
  </div>
);

interface DetailedInfoSection {
  title: string;
  icon: React.ReactNode;
  description?: string;
  items?: string[];
  variant: 'built' | 'responsibilities' | 'architecture';
}

const wiproDetailedSections: DetailedInfoSection[] = [
  {
    title: 'What I Built',
    icon: <FileCode2 size={14} />,
    description:
      'A full-stack e-commerce platform with coupon management, product catalog, and secure authentication.',
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
  {
    title: 'Architecture Highlights',
    icon: <GitBranch size={14} />,
    items: [
      'RESTful APIs with Node.js & Express',
      'Secure authentication with JWT',
      'Coupon engine with rule validation',
      'Caching with Redis',
      'Scalable & modular monolith',
    ],
    variant: 'architecture',
  },
];

const develUpDetailedSections: DetailedInfoSection[] = [
  {
    title: 'What I Built',
    icon: <AppWindow size={14} />,
    description:
      'An interactive Resume Builder with real-time editing, template customization, secure auth, PDF export and user dashboard.',
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
      // 'Integrated PDF generation & storage',
      'Built dashboard with analytics & tracking',
    ],
    variant: 'responsibilities',
  },
  {
    title: 'Architecture Highlights',
    icon: <Zap size={14} />,
    items: [
      'Server-side rendering for better SEO',
      'Optimized for performance & scalability',
      'Asynchronous PDF generation with queues',
      'Secure state management & data isolation',
      'Modular, maintainable & component-driven',
    ],
    variant: 'architecture',
  },
];

const leadSquaredDetailedSections: DetailedInfoSection[] = [
  {
    title: 'What I Built',
    icon: <Package size={14} />,
    description:
      'Serverless microservices, secure APIs, and micro frontend modules that power core CRM workflows.',
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
  {
    title: 'Architecture Highlights',
    icon: <Cloud size={14} />,
    items: [
      'Serverless, event-driven architecture',
      'Micro frontends for scalability',
      'High availability & auto-scaling',
      'Secure multi-tenant design',
      'Cost optimized with AWS services',
    ],
    variant: 'architecture',
  },
];

const mathCoDetailedSections: DetailedInfoSection[] = [
  {
    title: 'What I Built',
    icon: <FileCode2 size={14} />,
    description:
      'End-to-end analytics dashboard with real-time insights, automated pipelines and secure data access.',
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
  {
    title: 'Architecture Highlights',
    icon: <Layers size={14} />,
    items: [
      'Microservices with FastAPI',
      'Real-time + Batch processing',
      'Scalable data pipelines',
      'Secure, role-based access',
      'High performance caching',
    ],
    variant: 'architecture',
  },
];

interface DetailedInfoBlockProps {
  sections: DetailedInfoSection[];
}

const DetailedInfoBlock: React.FC<DetailedInfoBlockProps> = ({ sections }) => (
  <div className="jc-detailed-info" aria-label="Detailed delivery summary">
    {sections.map((section) => (
      <section
        className={`jc-detailed-info-section jc-detailed-info-section--${section.variant}`}
        key={section.title}
        aria-labelledby={`detailed-info-${section.variant}`}
      >
        <div className="jc-detailed-info-header">
          <span
            className={`jc-detailed-info-header-icon jc-detailed-info-header-icon--${section.variant}`}
            aria-hidden="true"
          >
            {section.icon}
          </span>
          <h3
            className="jc-detailed-info-title"
            id={`detailed-info-${section.variant}`}
          >
            {section.title}
          </h3>
        </div>

        {section.description && (
          <p className="jc-detailed-info-description">{section.description}</p>
        )}

        {section.items && section.variant === 'responsibilities' && (
          <ul className="jc-detailed-check-list">
            {section.items.map((item) => (
              <li className="jc-detailed-check-item" key={item}>
                <Check size={14} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {section.items && section.variant === 'architecture' && (
          <ul className="jc-detailed-arch-list">
            {section.items.map((item) => (
              <li className="jc-detailed-arch-item" key={item}>
                <span className="jc-detailed-arch-bullet" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    ))}
  </div>
);

interface TechPillProps {
  label: string;
}

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

const TechPill: React.FC<TechPillProps> = ({ label }) => (
  <span className="jc-tech-pill">
    {(() => {
      const logo = techLogoMap[label] ?? {
        Icon: FaServer,
        tone: 'default',
      };
      const Icon = logo.Icon;

      return (
        <>
          <span
            className={`jc-tech-pill-icon jc-tech-pill-icon-${logo.tone}`}
            aria-hidden="true"
          >
            <Icon />
          </span>
          <span className="jc-tech-pill-label">{logo.label ?? label}</span>
        </>
      );
    })()}
  </span>
);

// ─── Per-job content configs ────────────────────────────────────────────────

interface JobConfig {
  logoLetter: string;
  badge: string;
  badgeClass: string;
  subtitle: string;
  description: string;
  accentColor: string;
  metrics: MetricCardProps[];
  archNodes: ArchNodeProps[];
  impacts: ImpactItemProps[];
  techStack: string[];
}

const jobConfigs: Record<string, JobConfig> = {
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

// ─── Main Component ─────────────────────────────────────────────────────────

interface JobContentProps {
  job: WorkExperienceItem;
}

const JobContent: React.FC<JobContentProps> = ({ job }) => {
  const { isDarkTheme } = useSharedState();
  const config = jobConfigs[job.companyName] ?? jobConfigs['MathCo'];

  return (
    <div className={`jc-root ${isDarkTheme ? 'dark' : 'light'}`}>
      {/* ── Header ── */}
      <div className="jc-header">
        {/* Company Profile */}
        <div className="jc-profile">
          <div className="jc-logo">
            <span className="jc-logo-letter">{config.logoLetter}</span>
          </div>
          <div className="jc-profile-text">
            <div className="jc-profile-title-row">
              <span className="jc-company-name">{job.companyName}</span>
              <span className={`jc-badge ${config.badgeClass}`}>
                {config.badge}
              </span>
            </div>
            <span className="jc-subtitle">{config.subtitle}</span>
            <span className="jc-description">{config.description}</span>
          </div>
        </div>

        {/* Vertical Divider in Header */}
        <div className="jc-header-divider" />

        {/* Metrics */}
        <div className="jc-metrics-grid">
          {config.metrics.map((m, i) => (
            <MetricCard key={i} {...m} />
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="jc-divider" />

      {/* ── Main Split Panel ── */}
      <div className="jc-main-panel">
        {/* Left Column: System Architecture & Tech Stack */}
        <div className="jc-left-col">
          {/* System Architecture */}
          <div
            className={`jc-arch-section ${
              job.companyName === 'Wipro' ? 'jc-arch-section--detailed' : ''
            }`}
          >
            {job.companyName === 'Wipro' ? (
              <WiproDiagram />
            ) : (
              <>
                <div className="jc-section-header">
                  <span
                    className="jc-section-dot"
                    style={{ backgroundColor: config.accentColor }}
                  />
                  <span className="jc-section-label">SYSTEM ARCHITECTURE</span>
                </div>

                {job.companyName === 'MathCo' ? (
                  <MathCoDiagram />
                ) : job.companyName === 'Leadsquared' ? (
                  <LeadSquaredDiagram />
                ) : job.companyName === 'DevelUp' ? (
                  <DevelUpDiagram />
                ) : (
                  <div className="jc-arch-flow-wrapper">
                    <div className="jc-arch-flow">
                      {config.archNodes.map((node, i) => (
                        <React.Fragment key={i}>
                          <ArchNode
                            {...node}
                            accentColor={config.accentColor}
                          />
                          {i < config.archNodes.length - 1 && (
                            <div className="jc-arch-arrow">
                              <ArrowRight
                                size={12}
                                className="jc-arch-arrow-icon"
                              />
                            </div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    {/* Feedback Loop line overlay */}
                    <div className="jc-feedback-loop">
                      <div className="jc-feedback-line-container">
                        <div className="jc-feedback-arrow" />
                      </div>
                      <div className="jc-feedback-label">feedback loop</div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Inner Horizontal Divider */}
          <div className="jc-col-divider" />

          {/* Tech Stack */}
          <div className="jc-tech-section">
            <div className="jc-section-header">
              <span
                className="jc-section-dot"
                style={{ backgroundColor: config.accentColor }}
              />
              <span className="jc-section-label">TECH STACK</span>
            </div>
            <div className="jc-tech-pills">
              {config.techStack.map((t, i) => (
                <TechPill key={i} label={t} />
              ))}
            </div>
          </div>
        </div>

        {/* Vertical Panel Divider */}
        <div className="jc-vert-divider" />

        {/* Right Column: Core Impact / Detailed Delivery Brief */}
        <div
          className={`jc-impact-section ${
            ['Wipro', 'DevelUp', 'Leadsquared', 'MathCo'].includes(job.companyName) ? 'jc-impact-section--detailed' : ''
          }`}
        >
          {job.companyName === 'Wipro' ? (
            <DetailedInfoBlock sections={wiproDetailedSections} />
          ) : job.companyName === 'DevelUp' ? (
            <DetailedInfoBlock sections={develUpDetailedSections} />
          ) : job.companyName === 'Leadsquared' ? (
            <DetailedInfoBlock sections={leadSquaredDetailedSections} />
          ) : job.companyName === 'MathCo' ? (
            <DetailedInfoBlock sections={mathCoDetailedSections} />
          ) : (
            <>
              <div className="jc-section-header">
                <span
                  className="jc-section-dot"
                  style={{ backgroundColor: config.accentColor }}
                />
                <span className="jc-section-label">CORE IMPACT</span>
              </div>
              <div className="jc-impact-list">
                {config.impacts.map((item, i) => (
                  <React.Fragment key={i}>
                    <ImpactItem {...item} />
                    {i < config.impacts.length - 1 && (
                      <div className="jc-impact-divider" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobContent;
