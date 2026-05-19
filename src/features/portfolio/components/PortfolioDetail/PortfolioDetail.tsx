// src/component/Content/PortfolioDetail/PortfolioDetail.js
import React from 'react';
import './PortfolioDetail.css';
import { RoughNotation } from 'react-rough-notation';

import GithubMetricsSection from '../GithubMetrics/GithubMetricsSection';

import { useSharedState } from '@/app/providers/AppContext';
import type { SlideProps } from '@/types/slides';

// Removed old GitStats implementation in favor of live GithubMetricsSection

const TECH_STACK = [
  {
    name: 'React.js',
    color: '#61DAFB',
    detail: '(Hooks, Context API for state)',
  },
  {
    name: 'CSS3',
    color: '#E34F26',
    detail: '(Flexbox, Grid, Custom Properties, Animations)',
  },
  { name: 'React Router', color: 'orange', detail: '(for navigation)' },
  { name: 'Lenis', color: 'green', detail: '(for that buttery smooth scroll)' },
  {
    name: 'React Rough Notation',
    color: '#fde2e4',
    detail: '(for the sketchy highlights)',
  },
];

const DetailCard = React.memo(
  ({
    title,
    content,
    isDarkTheme,
    extraClass,
  }: {
    title: string;
    content: React.ReactNode;
    isDarkTheme: boolean;
    extraClass?: string;
  }) => (
    <div
      className={`detail-card ${isDarkTheme ? 'theme-dark' : 'theme-light'} ${extraClass || ''}`}
    >
      <h3>{title}</h3>
      {content}
    </div>
  ),
);

DetailCard.displayName = 'DetailCard';

const Portfolio = ({ isActive: _isActive, goToSlide: _goToSlide, slideIndex: _slideIndex }: Partial<SlideProps> = {}) => {
  const { isDarkTheme } = useSharedState();

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column', paddingTop: '9vh', boxSizing: 'border-box' }}>
      <section className="portfolio-deep-dive" style={{ flex: 1, overflowY: 'auto' }}>
      <span className="section-heading">
        <RoughNotation
          type="underline"
          show
          color={
            isDarkTheme ? 'var(--theme-dark-text)' : 'var(--theme-dark-grid)'
          }
          strokeWidth={3}
          order={1}
        >
          Project Spotlight: This Portfolio
        </RoughNotation>
      </span>

      <div className="details-grid">
        <DetailCard
          title="Tech Stack & Tools"
          extraClass="card-tech"
          content={
            <ul>
              {TECH_STACK.map((tech, i) => (
                <li key={tech.name}>
                  <RoughNotation
                    type="box"
                    show
                    color={tech.color}
                    order={i + 2}
                    padding={[2, 5]}
                  >
                    {tech.name}
                  </RoughNotation>{' '}
                  {tech.detail}
                </li>
              ))}
              <li>Various custom fonts for ✨ aesthetics ✨</li>
            </ul>
          }
          isDarkTheme={isDarkTheme}
        />

        <DetailCard
          title="Key Features & Implementations"
          extraClass="card-features"
          content={
            <ul>
              <li>
                <strong>Theme Toggle:</strong> A simple light/dark mode switch
                using React Context and CSS variables.
              </li>
              <li>
                <strong>Dynamic Backgrounds:</strong> The &apos;Work&apos;
                section changes background color based on scroll position — a
                little visual flair using scroll listeners.
              </li>
              <li>
                <strong>Interactive Animations:</strong> From the header text
                flip to the skill visualizations and scroll-triggered effects.
              </li>
              <li>
                <strong>Responsiveness:</strong> Adapting the layout for
                different screen sizes (always a fun challenge!).
              </li>
              <li>
                <strong>Easter Egg:</strong> Try the Konami Code (↑ ↑ ↓ ↓ ← → ←
                → B A) for a surprise! 😉
              </li>
            </ul>
          }
          isDarkTheme={isDarkTheme}
        />

        <DetailCard
          title="Challenges & Problem-Solving"
          extraClass="card-challenges"
          content={
            <ul>
              <li>
                Fine-tuning scroll-linked animations for smooth performance
                across browsers.
              </li>
              <li>
                Ensuring accessibility alongside creative visual elements.
              </li>
              <li>
                Resisting the urge to add *just one more* animation library.
              </li>
            </ul>
          }
          isDarkTheme={isDarkTheme}
        />

        <GithubMetricsSection />
      </div>
      </section>
    </div>
  );
};

export default Portfolio;
