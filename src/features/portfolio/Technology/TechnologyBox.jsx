import { memo } from 'react';

import {
  lightModeColorList,
  THEME_COLORS,
} from '../../../shared/utils/constants';
import './TechnologyBox.css';

const TechnologyBox = ({
  skillName,
  skillLevel,
  skillIcon,
  skillDesc,
  extra,
  skillImage,
  category,
  isDarkTheme,
  index,
} = {}) => {
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
          <div className="box-absolute">
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
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="image-fallback" style={{ display: 'none' }}>
                <span>{skillIcon}</span>
              </div>
            </div>
          </div>
          <div className="box-first">
            <div className="box-first-container">
              <div className="box-skill-name-desc">
                <div className="box-skill-name">{skillName}</div>
                <div className="box-badge">{category}</div>
              </div>
            </div>
          </div>
          <div className="box-second">{extra}</div>
          <div className="box-third">
            {[...Array(10)].map((_, barIndex) => (
              <div className="box-skill-bar-container" key={barIndex}>
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
