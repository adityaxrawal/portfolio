import { useCallback, useEffect, useRef, useState, memo } from 'react';

import './Work.css';
// import { useSharedState } from '@/app/providers/AppContext';
import { WorkExperience } from '../data/workExperience';

// images
import mathcoLogo from '../../../assets/images/companies/mathco.webp';
import leadsquaredLogo from '../../../assets/images/companies/lsq.webp';
import develUpLogo from '../../../assets/images/companies/develup.webp';
import wiproLogo from '../../../assets/images/companies/wipro.webp';

const Work = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [isPinned, setIsPinned] = useState(false);
  const [isHeadingOverflowing, setHeadingOverflowing] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });
  // const { isDarkTheme, backgroundColor, setBackgroundColor } = useSharedState();

  const calculateImageDimensions = useCallback(() => {
    const width = (window.innerWidth * 0.9) / 2; // (innerWidth - 10%)/2
    const height = width / 1.8; // height = width/2.2
    setImageDimensions({ width, height });
  }, []);

  useEffect(() => {
    calculateImageDimensions();
    window.addEventListener('resize', calculateImageDimensions);
    return () => window.removeEventListener('resize', calculateImageDimensions);
  }, [calculateImageDimensions]);

  const handleScroll = async () => {
    if (!sectionRef.current || !imagesRef.current || !textRef.current) return;

    const sectionTop = sectionRef.current.getBoundingClientRect().top;
    const sectionOffSetHeight = sectionRef.current.offsetHeight;
    const textTop = textRef.current.getBoundingClientRect().top;
    const sectionBottom = sectionRef.current.getBoundingClientRect().bottom;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;

    const currentScreenSize = window.screen.width;
    const dynamicOverflowDivisor = currentScreenSize < 500 ? 0.75 : 4;

    setHeadingOverflowing(() => {
      return (
        sectionBottom + windowWidth / dynamicOverflowDivisor < windowHeight
      );
    });
    if (sectionTop < 0) {
      setIsPinned(true);
      const dynamicDivisor = 2.75 * (windowHeight / windowWidth);
      imagesRef.current.scrollTop = Math.floor(
        Math.abs(textTop) / dynamicDivisor,
      );
      // ICP = image container percentage -> how is image container covered : returns percentage
      // const currentICP = await calculateICP();
      // updateBackgroundColor(currentICP);
    } else if (sectionTop === -sectionOffSetHeight) {
      setIsPinned(false);
    } else {
      setIsPinned(false);
      imagesRef.current.scrollTop = 0;
    }
  };

  useEffect(() => {
    const scrollHandler = () => handleScroll();
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <>
      <section ref={sectionRef} className="work-section">
        <div className={`work-heading ${isPinned ? 'sticky' : 'relative'}`}>
          <h2
            className={`work-heading-text 
                            ${
                              isPinned && !isHeadingOverflowing
                                ? 'heading-text-spining'
                                : 'heading-spining-reset'
                            }                            `}
          >
            Deployments
          </h2>
          <p
            className={`work-heading-subtext ${
              isPinned ? 'heading-subtext-spining' : 'heading-spining-reset'
            }`}
          >
            Code. Debug. Shenanigans. Repeat.!!
          </p>
        </div>
        <div className="work-container">
          <div className="work-container-text" ref={textRef}>
            {WorkExperience.map(
              (
                { companyName, title, years, description },
                index,
              ) => {
                return (
                  <article className="work-text" key={index}>
                    <div className="work-text-details">
                      <header className="work-details-headings">
                        <div className="work-details-heading-container">
                          <h3 className="work-text-details-heading">
                            {companyName}&nbsp;
                          </h3>
                          <span className="work-text-details-heading-subtext">
                            {title}
                          </span>
                        </div>
                        <time className="work-text-heading-years">{years}</time>
                      </header>
                      <p className="work-text-description">
                        {description}
                      </p>
                    </div>
                  </article>
                );
              },
            )}
          </div>
          <div
            className={`work-container-images ${
              isPinned ? 'sticky' : 'relative'
            }`}
          >
            <div
              className={`work-images-list`}
              ref={imagesRef}
              onWheel={() => {
                return false;
              }}
              style={{
                width: imageDimensions.width,
                height: imageDimensions.height,
              }}
            >
              <span className="work-images-items">
                <img
                  src={mathcoLogo}
                  alt="MathCo-Logo"
                  className="work-images"
                />
              </span>
              <span className="work-images-items">
                <img
                  src={leadsquaredLogo}
                  alt="Leadsquared-Logo"
                  className="work-images"
                />
              </span>
              <span className="work-images-items">
                <img
                  src={develUpLogo}
                  alt="DevelUp-Logo"
                  className="work-images"
                />
              </span>
              <span className="work-images-items">
                <img src={wiproLogo} alt="Wipro-Logo" className="work-images" />
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default memo(Work);
