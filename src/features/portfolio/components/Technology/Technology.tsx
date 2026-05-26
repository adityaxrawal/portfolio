import { useEffect, useRef, useState } from 'react';

import './Technology.css';
import { TechnicalSkills } from '../../constants/technicalSkills';

import TechnologyBox from './TechnologyBox';

import { useSharedState } from '@/app';
import type { SnapSlideProps } from '@/components/ui/SnapLayout';
import { darkModeColorList, lightModeColorList } from '@/config';

const Technology = ({
  isActive = false,
  goToSlide: _goToSlide,
  slideIndex: _slideIndex,
}: Partial<SnapSlideProps> = {}) => {
  const { isDarkTheme } = useSharedState();
  const horizontalScroll = useRef<HTMLDivElement>(null);
  const techSection = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  // In snap layout the window never scrolls — use isActive to drive the spin animation
  useEffect(() => {
    setIsPinned(isActive);
  }, [isActive]);

  return (
    <div
      ref={techSection}
      className="section-technology"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="technology-container"
        style={{ flex: 1, overflowY: 'auto' }}
      >
        <div
          className={`tech-heading ${isPinned ? 'sticky' : 'relative'}`}
          style={{
            backgroundColor: !isPinned
              ? 'transparent'
              : isDarkTheme
                ? darkModeColorList[0]
                : lightModeColorList[0],
          }}
        >
          <div className="tech-heading-text">
            <span
              className={`${
                isPinned ? 'heading-text-spining' : 'heading-spining-reset'
              }`}
            >
              Scriptology
            </span>
          </div>
          <div className="tech-heading-subText">
            <span
              className={`${
                isPinned ? 'heading-subtext-spining' : 'heading-spining-reset'
              }`}
            >
              The Science of Making Computers Obey.
            </span>
          </div>
        </div>
        <div ref={horizontalScroll} className="tech-boxes-container">
          {TechnicalSkills.map(
            (
              {
                skillName,
                skillLevel,
                skillIcon,
                skillDesc,
                extra,
                skillImage,
                category,
              },
              index,
            ) => (
              <TechnologyBox
                key={skillName}
                skillName={skillName}
                skillLevel={skillLevel}
                skillIcon={skillIcon}
                skillDesc={skillDesc}
                extra={extra}
                skillImage={skillImage}
                category={category}
                isDarkTheme={isDarkTheme}
                index={index}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default Technology;
