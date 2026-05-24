import { Check } from 'lucide-react';
import type { FC } from 'react';

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
