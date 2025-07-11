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
          backgroundColor: isDarkTheme
            ? lightModeColorList[0]
            : "white",
          color: "black",
        }}
      >
        <div className="box-container">
          <div className="box-absolute">
            <div className="box-skill-image">
              <img
                src={require(`../../../../share/img/skills/${skillImage}`)}
                className="skill-image"
                alt="skill-logo"
              />
              {/* <div className="rotating-svg">
                <svg width="100%" height="100%" viewBox="0 0 200 200">
                  <defs>
                    <path
                      id={`circlePath${index}`}
                      d="M 100,100 m -75,0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
                    />
                  </defs>
                  <text fontSize="16" fill="black">
                    <textPath
                      href={`#circlePath${index}`}
                      startOffset="50%"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {Array(26).fill(skillIcon).join(" ")}
                    </textPath>
                  </text>
                </svg>
              </div> */}
            </div>
          </div>
          <div className="box-first">
            <div className="box-first-container">
              <div className="box-skill-name-desc">
                <div className="box-skill-name">{skillName}</div>
                {/* <div className="box-skill-marquee-effect">
                  <div className="marquee">
                   
                  </div>
                </div> */}
                {/* <div className="box-skill-desc">{skillDesc}</div> */}
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

export default TechnologyBox;
