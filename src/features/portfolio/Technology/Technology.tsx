import { useEffect, useRef, useState, useCallback } from 'react';

import './Technology.css';
import { TechnicalSkills } from '../data/technicalSkills';

import TechnologyBox from './TechnologyBox';

import { useSharedState } from '@/app/providers/AppContext';
import { darkModeColorList, lightModeColorList } from '@/constants';

const Technology = () => {
  const { isDarkTheme } = useSharedState();
  const horizontalScroll = useRef<HTMLDivElement>(null);
  const techSection = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);

  const handleScroll = useCallback(() => {
    if (!techSection.current) return;

    const sectionTop = techSection.current.getBoundingClientRect().top;

    if (sectionTop < 0) {
      setIsPinned(true);
    } else {
      setIsPinned(false);
    }
  }, [techSection]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div ref={techSection} className="section-technology">
      <div className="technology-container">
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
                key={index}
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
