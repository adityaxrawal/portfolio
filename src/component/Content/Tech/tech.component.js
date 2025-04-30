import React, { useEffect, useRef, useState, useCallback } from 'react';
import './tech.component.css';
import { PROGRESS_COLORS, TechnicalSkills } from '../../../share/utils/constant';

const Technology = () => {
  const horizontalScroll = useRef(null);
  const techSection = useRef(null);
  const [dimensions, setDimensions] = useState({ section: 50, box: 45 });
  const lastKnownTechTop = useRef(0);

  const handleScroll = useCallback(() => {
    if (horizontalScroll.current && techSection.current) {
      const techSectionTop = techSection.current.getBoundingClientRect().top;
      // Only update if the change is significant to reduce unnecessary repaints.
      if (Math.abs(techSectionTop - lastKnownTechTop.current) > 2) {
        lastKnownTechTop.current = techSectionTop;
        if (techSectionTop < 0) {
          horizontalScroll.current.scrollLeft = Math.abs(techSectionTop - 14);
        }
      }
    }
  }, []);

  useEffect(() => {
    const onScroll = () => window.requestAnimationFrame(handleScroll);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  useEffect(() => {
    const newDimensions =
      window.innerWidth < 600
        ? { section: 150, box: 30 }
        : { section: 50, box: 45 };
    setDimensions(newDimensions);
  }, []);

  const getProgressColor = (barIndex, skillLevel) => {
    const colorEntry = PROGRESS_COLORS.find(entry => skillLevel <= entry.max);
    return barIndex < skillLevel ? (colorEntry?.color || 'white') : 'white';
  };

  return (
    <div
      ref={techSection}
      className="section-technology"
      style={{ height: `${dimensions.section * TechnicalSkills.length}vw` }}
    >
      <div className="technology-container">
        <div className="tech-heading">
          <div className="tech-heading-text">
            <span>Scriptology</span>
          </div>
          <div className="tech-heading-subText">
            <span>The Science of Making Computers Obey.</span>
          </div>
        </div>
        <div ref={horizontalScroll} className="tech-boxes-container">
          {TechnicalSkills.map(
            ({ skillName, skillLevel, skillIcon, skillDesc, extra, skillImage }, index) => (
              <div className="tech-boxes" key={index}>
                <div
                  className="box"
                  style={{ backgroundColor: 'white', height: `${dimensions.box}vh` }}
                >
                  <div className="box-container">
                    <div className="box-absolute">
                      <div className="box-skill-image">
                        <img
                          src={require(`../../../share/img/skills/${skillImage}`)}
                          className="skill-image"
                          alt="skill-logo"
                        />
                        <div className="rotating-svg">
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
                                {Array(26).fill(skillIcon).join(' ')}
                              </textPath>
                            </text>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="box-first">
                      <div className="box-first-container">
                        <div className="box-skill-name-desc">
                          <div className="box-skill-name">{skillName}</div>
                          <div className="box-skill-desc">{skillDesc}</div>
                        </div>
                      </div>
                    </div>
                    <div className="box-second">{extra}</div>
                    <div className="box-third">
                      {[...Array(10)].map((_, barIndex) => (
                        <div className="box-skill-bar-container" key={barIndex}>
                          <span
                            className="box-skill-bar"
                            style={{ backgroundColor: getProgressColor(barIndex, skillLevel) }}
                          ></span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Technology;
