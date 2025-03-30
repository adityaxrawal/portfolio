import React, { useEffect, useRef, useState, useCallback } from 'react'; // Added useCallback
import './tech.component.css';
import { PROGRESS_COLORS, TechnicalSkills } from '../../../share/utils/constant';

const Technology = () => {
    const horizontalScroll = useRef();
    const techSection = useRef();
    const [height, setHeight] = useState({
        section: 50,
        box: 45
    });

    // Scroll handling effect (unchanged)
    useEffect(() => {
        const handleScroll = () => {
            if (horizontalScroll.current && techSection.current) {
                const techSectionTop = techSection.current.getBoundingClientRect().top;
                if (techSectionTop < 0) {
                    horizontalScroll.current.scrollLeft = Math.abs(techSectionTop - 14);
                }
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array is correct here

    const getProgressColor = (barIndex, skillLevel) => {
        const colorEntry = PROGRESS_COLORS.find(entry => skillLevel <= entry.max);
        return barIndex < skillLevel ? colorEntry?.color || 'white' : 'white';
    };

    // --- Improved Height Adjustment Effect ---
    // Use useCallback to memoize the update function if needed elsewhere,
    // but primarily using it here to define the logic cleanly.
    const updateHeightBasedOnWidth = useCallback(() => {
        // Use window.innerWidth for viewport size, which is usually better for responsive design
        if (window.innerWidth < 600) {
             // Use functional update
            setHeight(h => ({ ...h, section: 150, box: 30 }));
        } else {
             // Use functional update
            setHeight(h => ({ ...h, section: 50, box: 45 }));
        }
    }, []); // No dependencies needed for useCallback here as it doesn't rely on props/state

    useEffect(() => {
        // Run on mount
        updateHeightBasedOnWidth();

        // Add listener for resize events
        window.addEventListener('resize', updateHeightBasedOnWidth);

        // Cleanup listener on unmount
        return () => {
            window.removeEventListener('resize', updateHeightBasedOnWidth);
        };
    }, [updateHeightBasedOnWidth]); // Depend on the memoized function
    // --- End of Improved Effect ---


    return (
        <div ref={techSection} className='section-technology' style={{ height: `${height.section * TechnicalSkills.length}vw` }}>
            {/* ... rest of your JSX ... */}
             <div className='technology-container'>
                <div className='tech-heading'>
                    <div className='tech-heading-text'>
                        <span>Scriptology</span>
                    </div>
                    <div className='tech-heading-subText'>
                        <span>The Science of Making Computers Obey.</span>
                    </div>
                </div>
                <div ref={horizontalScroll} className='tech-boxes-container'>
                    {
                        TechnicalSkills.map(({ skillName, skillLevel, skillIcon, skillDesc, extra, skillImage }, index) => {
                            // Make sure the path is correct for require
                            // Note: Using require inside the map might not be ideal for performance/bundling depending on setup.
                            // Consider importing images at the top if possible.
                            const imageSrc = require(`../../../share/img/skills/${skillImage}`);

                            return (
                                <div className='tech-boxes' key={index}>
                                    <div className='box' style={{ backgroundColor: 'white', height: `${height.box}vh` }}>
                                        <div className='box-container' >
                                            <div className='box-absolute'>
                                                <div className='box-skill-image'>
                                                    {/* Static Image */}
                                                    <img src={imageSrc} className='skill-image' alt='skill-logo' />

                                                    {/* Rotating SVG */}
                                                    <div className="rotating-svg">
                                                        <svg width="100%" height="100%" viewBox="0 0 200 200">
                                                            <defs>
                                                                <path
                                                                    id={`circlePath${index}`}
                                                                    d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
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
                                            <div className='box-first'>
                                                <div className='box-first-container'>
                                                    <div className='box-skill-name-desc'>
                                                        <div className='box-skill-name'>{skillName}</div>
                                                        <div className='box-skill-desc'>{skillDesc}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='box-second'>{extra}</div>
                                            <div className='box-third'>
                                                {/* Showcase the skill level in bars */}
                                                {[...Array(10)].map((_, barIndex) => {
                                                    return (
                                                        <div className='box-skill-bar-container' key={barIndex}>
                                                            <span
                                                                className='box-skill-bar'
                                                                style={{ backgroundColor: getProgressColor(barIndex, skillLevel) }}
                                                            >
                                                            </span>
                                                        </div>
                                                    )
                                                })}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Technology;