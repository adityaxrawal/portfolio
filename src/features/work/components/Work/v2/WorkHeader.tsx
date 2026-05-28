/**
 * WorkHeader component - Header section for work sidebar.
 *
 * Responsibility: Displays section title, subtitle, and visual accent.
 * Extracted from Work.tsx to improve component composability.
 */

export function WorkHeader() {
  return (
    <div className="work-v2-header">
      <div className="work-v2-label">
        <span>WORK EXPERIENCE</span>
        <span className="work-v2-dot"></span>
      </div>

      <div className="work-v2-title-wrapper">
        <span className="work-v2-title">Systems in</span>
        <span className="work-v2-title-highlight">
          Production
          <svg
            className="work-v2-underline"
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

      <span className="work-v2-subtitle">
        I design, build and ship systems that
        <br />
        solve real problems and create measurable
        <br />
        impact at scale.
      </span>
    </div>
  );
}
