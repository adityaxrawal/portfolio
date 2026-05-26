import { Check } from 'lucide-react';
import type { CSSProperties, FC } from 'react';

import type { DetailedInfoSection } from './jobConfigs';

interface DetailedInfoBlockProps {
  sections: DetailedInfoSection[];
}

export const DetailedInfoBlock: FC<DetailedInfoBlockProps> = ({ sections }) => (
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

        {/* Architecture domain chips — shown for 'built' variant */}
        {section.domains && section.domains.length > 0 && (
          <div className="jc-domain-chips-wrapper">
            <div className="jc-domain-separator" aria-hidden="true">
              <span className="jc-domain-separator-line" />
              <span className="jc-domain-separator-label">
                Architecture Domains
              </span>
              <span className="jc-domain-separator-line" />
            </div>
            <div
              className="jc-domain-chips"
              role="list"
              aria-label="Architecture domains"
            >
              {section.domains.map((domain) => (
                <div
                  key={domain.label}
                  className="jc-domain-chip"
                  role="listitem"
                  style={
                    {
                      '--chip-color': domain.color ?? '#64748b',
                    } as CSSProperties
                  }
                >
                  <span className="jc-domain-chip-icon" aria-hidden="true">
                    {domain.icon}
                  </span>
                  <span className="jc-domain-chip-label">{domain.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Key responsibilities checklist */}
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
      </section>
    ))}
  </div>
);
