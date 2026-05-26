import { ArrowRight } from 'lucide-react';
import { Fragment } from 'react';

import { useSharedState } from '../../../../../../app';
import type { WorkExperienceItem } from '../../../../constants/workExperience';

import { ArchitecturePanel } from './ArchitecturePanel';
import { ArchNode } from './ArchNode';
import { DetailedInfoBlock } from './DetailedInfoBlock';
import { ImpactItem } from './ImpactItem';
import { detailedSections, jobConfigs } from './jobConfigs';
import { MetricCard } from './MetricCard';
import { TechStack } from './TechStack';

import '../JobContent.css';

interface JobContentProps {
  job: WorkExperienceItem;
}

const DETAILED_COMPANIES = [
  'Wipro',
  'DevelUp',
  'Leadsquared',
  'MathCo',
] as const;
type DetailedCompany = (typeof DETAILED_COMPANIES)[number];

function isDetailedCompany(name: string): name is DetailedCompany {
  return (DETAILED_COMPANIES as readonly string[]).includes(name);
}

function JobContent({ job }: JobContentProps) {
  const { isDarkTheme } = useSharedState();
  const config = jobConfigs[job.companyName] ?? jobConfigs['MathCo'];
  const usesCustomDiagram = isDetailedCompany(job.companyName);

  // Lookup replaces cascading company-name ternaries.
  // REFACTOR: detailedSections map is the single source of truth in jobConfigs.tsx.
  const jobDetailedSections = detailedSections[job.companyName];

  return (
    <div className={`jc-root ${isDarkTheme ? 'dark' : 'light'}`}>
      <div className="jc-header">
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

        <div className="jc-header-divider" />

        <div className="jc-metrics-grid">
          {config.metrics.map((m) => (
            <MetricCard key={m.label} {...m} />
          ))}
        </div>
      </div>

      <div className="jc-divider" />

      <div className="jc-main-panel">
        <div className="jc-left-col">
          <div
            className={`jc-arch-section ${
              usesCustomDiagram ? 'jc-arch-section--detailed' : ''
            }`}
          >
            <div className="jc-section-header">
              <span
                className="jc-section-dot"
                style={{ backgroundColor: config.accentColor }}
              />
              <span className="jc-section-label">SYSTEM ARCHITECTURE</span>
            </div>
            {usesCustomDiagram ? (
              <ArchitecturePanel companyName={job.companyName} />
            ) : (
              <div className="jc-arch-flow-wrapper">
                <div className="jc-arch-flow">
                  {config.archNodes.map((node, i) => (
                    <Fragment key={node.label}>
                      <ArchNode {...node} accentColor={config.accentColor} />
                      {i < config.archNodes.length - 1 && (
                        <div className="jc-arch-arrow">
                          <ArrowRight
                            size={12}
                            className="jc-arch-arrow-icon"
                          />
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
                <div className="jc-feedback-loop">
                  <div className="jc-feedback-line-container">
                    <div className="jc-feedback-arrow" />
                  </div>
                  <div className="jc-feedback-label">feedback loop</div>
                </div>
              </div>
            )}
          </div>

          <div className="jc-col-divider" />

          <div className="jc-tech-section">
            <div className="jc-section-header">
              <span
                className="jc-section-dot"
                style={{ backgroundColor: config.accentColor }}
              />
              <span className="jc-section-label">TECH STACK</span>
            </div>
            <TechStack labels={config.techStack} />
          </div>
        </div>

        <div className="jc-vert-divider" />

        <div
          className={`jc-impact-section ${
            usesCustomDiagram ? 'jc-impact-section--detailed' : ''
          }`}
        >
          {jobDetailedSections ? (
            <DetailedInfoBlock sections={jobDetailedSections} />
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
                  <Fragment key={item.text.slice(0, 30)}>
                    <ImpactItem {...item} />
                    {i < config.impacts.length - 1 && (
                      <div className="jc-impact-divider" />
                    )}
                  </Fragment>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobContent;
