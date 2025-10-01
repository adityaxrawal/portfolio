import { useEffect, useRef, useState, useCallback } from "react";
import "./tech.component.css";
import { useSharedState } from "../../../context/app-context";
import {
  darkModeColorList,
  lightModeColorList,
  PROGRESS_COLORS,
  TechnicalSkills,
} from "../../../share/utils/constant";
import TechnologyBox from "./Boxes/tech-box.component";

const Technology = () => {
  const { isDarkTheme } = useSharedState();
  const horizontalScroll = useRef(null);
  const techSection = useRef(null);
  const [isPinned, setIsPinned] = useState(false);

  // const handleScroll = useCallback(() => {
  //   if (horizontalScroll.current && techSection.current) {
  //     const techSectionTop = techSection.current.getBoundingClientRect().top;
  //     // Only update if the change is significant to reduce unnecessary repaints.
  //     if (Math.abs(techSectionTop - lastKnownTechTop.current) > 2) {
  //       lastKnownTechTop.current = techSectionTop;
  //       if (techSectionTop < 0) {
  //         horizontalScroll.current.scrollLeft = Math.abs(techSectionTop - 14);
  //       }
  //     }
  //   }
  // }, []);

  const handleScroll = useCallback(() => {
    if (!techSection.current) return;

    const sectionTop = techSection.current.getBoundingClientRect().top;

    if (sectionTop < 0) {
      setIsPinned(true);
    } else {
      setIsPinned(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // useEffect(() => {
  //   const newDimensions =
  //     window.innerWidth < 600
  //       ? { section: 150, box: 30 }
  //       : { section: 32, box: 30 };
  //   setDimensions(newDimensions);
  // }, []);

  const getProgressColor = (barIndex, skillLevel) => {
    const colorEntry = PROGRESS_COLORS.find((entry) => skillLevel <= entry.max);
    return barIndex < skillLevel ? colorEntry?.color || "white" : "white";
  };

  return (
    <div ref={techSection} className="section-technology">
      <div className="technology-container">
        <div
          className={`tech-heading ${isPinned ? "sticky" : "relative"}`}
          style={{
            backgroundColor: isDarkTheme
              ? darkModeColorList[0]
              : lightModeColorList[0],
          }}
        >
          <div className="tech-heading-text">
            <span
              className={`${
                isPinned ? "heading-text-spining" : "heading-spining-reset"
              }`}
            >
              Scriptology
            </span>
          </div>
          <div className="tech-heading-subText">
            <span
              className={`${
                isPinned ? "heading-subtext-spining" : "heading-spining-reset"
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
              },
              index
            ) => (
              <TechnologyBox
                key={index}
                skillName={skillName}
                skillLevel={skillLevel}
                skillIcon={skillIcon}
                skillDesc={skillDesc}
                extra={extra}
                skillImage={skillImage}
                isDarkTheme={isDarkTheme}
                getProgressColor={getProgressColor}
                index={index}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Technology;
