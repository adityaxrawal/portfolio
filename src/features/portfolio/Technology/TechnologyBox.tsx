import { memo } from 'react';

import { THEME_COLORS } from '@/constants';
import './TechnologyBox.css';

export interface TechnologyBoxProps {
  skillName: string;
  skillLevel: number;
  skillIcon: string;
  skillDesc?: string;
  extra?: string;
  skillImage: string;
  category: string;
  isDarkTheme: boolean;
  index: number;
}

const TechnologyBox = ({
  skillName,
  skillLevel,
  skillIcon,
  extra,
  skillImage,
  category,
  isDarkTheme,
  index,
}: TechnologyBoxProps) => {
  return (
    <div className={`tech-boxes ${isDarkTheme ? 'dark' : 'light'}`} key={index}>
      <div
        className={`box ${category}`}
        style={{
          color: isDarkTheme ? THEME_COLORS.DARK_TEXT : THEME_COLORS.LIGHT_TEXT,
          backgroundColor: 'var(--box-bg-color)',
        }}
      >
        <div className="box-container">
          <div className="box-first">
            <div className="box-first-container">
              <div className="box-skill-image">
                <img
                  src={
                    new URL(
                      `../../../assets/images/skills/${skillImage}`,
                      import.meta.url,
                    ).href
                  }
                  className="skill-image"
                  alt={`${skillName} technology logo`}
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    img.style.display = 'none';
                    const fallback =
                      img.nextElementSibling as HTMLElement | null;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <div className="image-fallback" style={{ display: 'none' }}>
                  <span>{skillIcon}</span>
                </div>
              </div>
              <div className="box-skill-name-desc">
                <h4 className="box-skill-name">{skillName}</h4>
                <div className="box-badge">{category}</div>
              </div>
            </div>
          </div>
          <div className="box-second">{extra}</div>
          <div
            className="box-third"
            aria-label={`Skill level: ${skillLevel} out of 10`}
          >
            {[...Array(10)].map((_, barIndex) => (
              <div
                className="box-skill-bar-container"
                key={barIndex}
                aria-hidden="true"
              >
                <span
                  className={`box-skill-bar ${barIndex < skillLevel ? 'filled' : ''}`}
                ></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(TechnologyBox);
