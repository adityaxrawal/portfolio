import React from "react";
import { lightModeColorList } from "../../../../share/utils/constant";
import "../tech.component.css";

const TechnologyBox = ({
  skillName,
  skillLevel,
  skillIcon,
  skillDesc,
  extra,
  skillImage,
  isDarkTheme,
  dimensions,
  getProgressColor,
  index,
} = {}) => {
  return (
    <div className="tech-boxes" key={index}>
      <div
        className="box"
        style={{
          backgroundColor: isDarkTheme ? lightModeColorList[0] : "white",
          color: "black",
        }}
      >
        <div className="box-container">
          <div className="box-absolute">
            <div className="box-skill-image">
              <img
                src={require(`../../../../share/img/skills/${skillImage}`)}
                className="skill-image"
                alt={`${skillName} technology logo`}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextElementSibling.style.display = "flex";
                }}
              />
              <div className="image-fallback" style={{ display: "none" }}>
                <span>{skillIcon}</span>
              </div>
            </div>
          </div>
          <div className="box-first">
            <div className="box-first-container">
              <div className="box-skill-name-desc">
                <div className="box-skill-name">{skillName}</div>
              </div>
            </div>
          </div>
          <div className="box-second">{extra}</div>
          <div className="box-third">
            {[...Array(10)].map((_, barIndex) => (
              <div className="box-skill-bar-container" key={barIndex}>
                <span
                  className="box-skill-bar"
                  style={{
                    backgroundColor: getProgressColor(barIndex, skillLevel),
                  }}
                ></span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TechnologyBox);
