/**
 * Technology v2 — Root container.
 *
 * Layout: 2-column
 *   Left  (flex:1)  — TechHeader + TechnicalSkillsGrid
 *   Right (28%)     — CoreStrengths panel
 */

import { CoreStrengths } from './CoreStrengths';
import { TechHeader } from './TechHeader';
import { TechnicalSkillsGrid } from './TechnicalSkillsGrid';

import { useSharedState } from '@/app';
import type { SnapSlideProps } from '@/components/ui/SnapLayout';
import './Technology.css';

const Technology = ({
  isActive: _isActive,
  goToSlide: _goToSlide,
  slideIndex: _slideIndex,
}: Partial<SnapSlideProps> = {}) => {
  const { isDarkTheme } = useSharedState();

  return (
    <div
      className={`tech-v2-section ${isDarkTheme ? 'dark' : 'light'}`}
      aria-label="My Skills and Expertise section"
    >
      <div className="tech-v2-container">
        {/* ── MAIN LEFT PANEL ──────────────────────────────── */}
        <main className="tech-v2-main" aria-label="Technical skills">
          <TechHeader />
          <TechnicalSkillsGrid />
        </main>

        {/* ── RIGHT SIDEBAR ────────────────────────────────── */}
        <aside className="tech-v2-right" aria-label="Core strengths">
          <CoreStrengths />
        </aside>
      </div>
    </div>
  );
};

export default Technology;
