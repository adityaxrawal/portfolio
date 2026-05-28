/**
 * TechHeader — Full-width top header for Technology v2.
 *
 * Layout (horizontal):
 *   Left half:  SKILLS & EXPERTISE label + "My Skills. My Edge." serif tagline + description
 *   Separator:  vertical 1px divider
 *   Right half: MY APPROACH label + 4-step horizontal process flow with arrows
 */

import { APPROACH_STEPS } from '../../../constants/technologyV2.constants';

export function TechHeader() {
  return (
    <div className="tech-v2-header-outer" aria-label="Skills overview header">
      {/* ── Left Half: Tagline + Description ─────────────────── */}
      <div className="tech-v2-header-left">
        {/* Tagline column */}
        <div className="tech-v2-header-tagline-col">
          {/* Label */}
          <div className="tech-v2-label-row">
            <span className="tech-v2-dot" aria-hidden="true" />
            <span>SKILLS &amp; EXPERTISE</span>
          </div>

          {/* Serif heading */}
          <div className="tech-v2-tagline" aria-label="Tech for Innovation">
            <span className="tech-v2-tagline-line">Tech for</span>
            <span className="tech-v2-tagline-highlight">
              Innovation
              <svg
                className="tech-v2-tagline-underline"
                viewBox="0 0 200 9"
                fill="none"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M2.5 6.5C48.5 2.5 130.5 -1.5 197.5 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </div>

        {/* Vertical divider between tagline and description */}
        <div className="tech-v2-header-divider-v" aria-hidden="true" />

        {/* Description */}
        <p className="tech-v2-header-desc">
          A blend of full-stack engineering, cloud architecture, and data
          systems expertise — built to solve real problems at scale.
        </p>
      </div>

      {/* ── Right Half: Approach Flow (Now its own card) ────── */}
      <div className="tech-v2-header-right tech-v2-approach-card">
        {/* Label */}
        <div className="tech-v2-label-row">
          <span className="tech-v2-dot-black" aria-hidden="true" />
          <span>MY APPROACH</span>
        </div>

        {/* 4-step flow */}
        <div
          className="tech-v2-approach-steps"
          role="list"
          aria-label="My engineering approach"
        >
          {APPROACH_STEPS.map(({ icon: Icon, label, badgeColor }, idx) => (
            <div key={label} style={{ display: 'contents' }}>
              {/* Arrow between steps */}
              {idx > 0 && (
                <span className="tech-v2-step-arrow" aria-hidden="true">
                  →
                </span>
              )}

              {/* Step */}
              <div
                className="tech-v2-step"
                role="listitem"
                aria-label={label.replace('\n', ' ')}
              >
                {/* Icon box with optional badge */}
                <div className="tech-v2-step-icon-wrap">
                  <Icon size={22} strokeWidth={1.5} />
                  {badgeColor && (
                    <span
                      className="tech-v2-step-badge"
                      style={{ backgroundColor: badgeColor }}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Step label */}
                <span className="tech-v2-step-label">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
