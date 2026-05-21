import React from 'react';
import {
  Cloud,
  Code2,
  Database,
  Globe2,
  Monitor,
  ShieldCheck,
  Users,
  Workflow,
} from 'lucide-react';

import ArchitectureArrow from './ArchitectureArrow';
import ArchitectureCard from './ArchitectureCard';
import ArchitectureColumn from './ArchitectureColumn';
import './DevelUpArchitecture.css';

const columns = [
  {
    title: 'CLIENTS',
    tone: 'clients',
    icon: Users,
    cards: [
      { title: 'Web Users', icon: 'user' },
      { title: 'Job Seekers', icon: 'user' },
      { title: 'Students', icon: 'graduate' },
      { title: 'Recruiters', icon: 'users' },
    ],
  },
  {
    title: 'FRONTEND (Next.js)',
    tone: 'frontend',
    icon: Monitor,
    className: 'du-column--frontend',
    cards: [
      { title: 'Next.js App (SSR/CSR)' },
      { title: 'Resume Builder UI' },
      { title: 'Template Engine' },
      { title: 'State Management', subtitle: '(Context API)' },
      { title: 'Local Storage (Drafts)' },
    ],
  },
  {
    title: 'API LAYER (Express.js)',
    tone: 'api',
    icon: Code2,
    cards: [
      { title: 'REST API Gateway' },
      { title: 'Auth Middleware (JWT)' },
      { title: 'Controllers' },
      { title: 'Services' },
      { title: 'Repositories' },
    ],
  },
  {
    title: 'DATA LAYER',
    tone: 'data',
    icon: Database,
    cards: [
      { title: 'PostgreSQL', subtitle: '(User & Auth)', icon: 'database' },
      { title: 'MongoDB', subtitle: '(Resumes & Templates)', icon: 'file' },
      { title: 'Redis', subtitle: '(Cache & Sessions)', icon: 'cache' },
    ],
  },
  {
    title: 'BACKGROUND SERVICES',
    tone: 'workers',
    icon: Workflow,
    cards: [
      { title: 'Resume Rendering Service' },
      { title: 'PDF Generation Worker' },
      { title: 'Email/Notification Worker' },
      { title: 'Analytics Worker' },
    ],
  },
  {
    title: 'STORAGE & CDN',
    tone: 'storage',
    icon: Cloud,
    cards: [
      { title: 'AWS S3', subtitle: '(Resumes & Files)', icon: 'cloud' },
      { title: 'CloudFront', subtitle: '(CDN)', icon: 'server' },
      { title: 'Static Assets', icon: 'package' },
    ],
  },
];

const securityCards = [
  { title: 'JWT Authentication', icon: 'jwt' },
  { title: 'Protected Routes', icon: 'lock' },
  { title: 'Role-based Access', icon: 'role' },
];

const devopsCards = [
  { title: 'GitHub Actions (CI/CD)', icon: 'github' },
  { title: 'Sentry Monitoring', icon: 'bell' },
  { title: 'Logs & Analytics', icon: 'analytics' },
];

export const DevelUpArchitecture = () => {
  return (
    <section className="du-architecture" aria-label="DevelUp system architecture">
      <div className="du-board" role="img" aria-label="DevelUp resume platform architecture diagram">
        <div className="du-topology">
          <div className="du-columns">
            <ArchitectureColumn {...columns[0]} />
            <ArchitectureArrow className="du-arrow--main" />
            <div className="du-frontend-stack">
              <ArchitectureColumn {...columns[1]} />
              <ArchitectureArrow direction="down" className="du-arrow--cdn-down" />
              <ArchitectureCard title="CDN (Vercel Edge)" icon="cdn" tone="frontend" compact />
            </div>
            <ArchitectureArrow className="du-arrow--main" />
            <ArchitectureColumn {...columns[2]} />
            <ArchitectureArrow bidirectional className="du-arrow--main" />
            <ArchitectureColumn {...columns[3]} />
            <ArchitectureArrow bidirectional className="du-arrow--main" />
            <ArchitectureColumn {...columns[4]} />
            <ArchitectureArrow bidirectional className="du-arrow--main" />
            <ArchitectureColumn {...columns[5]} />
          </div>

          <div className="du-dashed du-dashed--api" aria-hidden="true" />
          <div className="du-dashed du-dashed--frontend" aria-hidden="true" />
          <div className="du-dashed du-dashed--workers" aria-hidden="true" />
          <div className="du-dashed du-dashed--storage" aria-hidden="true" />
        </div>

        <footer className="du-footer" aria-label="Security, observability, and DevOps">
          <section className="du-footer__group du-footer__group--security" aria-labelledby="du-security-title">
            <header className="du-footer__header">
              <ShieldCheck size={16} aria-hidden="true" />
              <h4 id="du-security-title">SECURITY</h4>
            </header>
            <div className="du-footer__cards">
              {securityCards.map((card) => (
                <ArchitectureCard key={card.title} {...card} tone="security" compact />
              ))}
            </div>
          </section>

          <span className="du-footer__divider" aria-hidden="true" />

          <section className="du-footer__group du-footer__group--devops" aria-labelledby="du-devops-title">
            <header className="du-footer__header du-footer__header--devops">
              <Globe2 size={16} aria-hidden="true" />
              <h4 id="du-devops-title">OBSERVABILITY & DEVOPS</h4>
            </header>
            <div className="du-footer__cards">
              {devopsCards.map((card) => (
                <ArchitectureCard key={card.title} {...card} tone="devops" compact />
              ))}
            </div>
          </section>
        </footer>
      </div>
    </section>
  );
};

export default DevelUpArchitecture;
