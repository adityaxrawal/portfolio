/**
 * Technology v2 — Root container.
 *
 * Layout: 2-column
 *   Left  (flex:1)  — TechHeader + TechnicalSkillsGrid
 *   Right (28%)     — CoreStrengths panel
 */

import { motion } from 'framer-motion';

import { CoreStrengths } from './CoreStrengths';
import { TechHeader } from './TechHeader';
import { TechnicalSkillsGrid } from './TechnicalSkillsGrid';

import { useSharedState } from '@/app';
import type { SnapSlideProps } from '@/components/ui/SnapLayout';
import { fadeUp, staggerContainer, staggerChild } from '@/lib/animations';
import './Technology.css';

const Technology = ({
  isActive: _isActive,
  goToSlide: _goToSlide,
  slideIndex: _slideIndex,
}: Partial<SnapSlideProps> = {}) => {
  const { isDarkTheme } = useSharedState();

  return (
    <motion.div
      className={`tech-v2-section ${isDarkTheme ? 'dark' : 'light'}`}
      aria-label="My Skills and Expertise section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
    >
      <motion.div className="tech-v2-container" variants={staggerContainer}>
        {/* ── MAIN LEFT PANEL ──────────────────────────────── */}
        <motion.main
          className="tech-v2-main"
          aria-label="Technical skills"
          variants={staggerChild}
        >
          <TechHeader />
          <TechnicalSkillsGrid />
        </motion.main>

        {/* ── RIGHT SIDEBAR ────────────────────────────────── */}
        <motion.aside
          className="tech-v2-right"
          aria-label="Core strengths"
          variants={staggerChild}
        >
          <CoreStrengths />
        </motion.aside>
      </motion.div>
    </motion.div>
  );
};

export default Technology;
