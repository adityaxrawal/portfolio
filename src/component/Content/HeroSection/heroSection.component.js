// src/component/Content/HeroSection/heroSection.component.js
import React, { useCallback, useEffect, useState } from 'react';
// image
import heroImage from '../../../share/img/my/me.png';
// css
import './heroSection.component.css';
// Rough Notation for react
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
// constants
import { links } from '../../../share/utils/constant';
import { useSharedState } from '../../../context/app-context';
import Confetti from 'react-confetti'; // Import Confetti

const HeroSection = () => {
    const { isDarkTheme } = useSharedState();

    const [imageSize, setImageSize] = useState({
        width: 0,
        height: 0
    });
    const [showHireConfetti, setShowHireConfetti] = useState(false); // State for confetti
    const [confettiDimensions, setConfettiDimensions] = useState({ width: 0, height: 0 });


    // Maintain Aspect Ratio (Original ratio from the given image)
    const aspectRatio = 0.6; // Replace with your actual width/height ratio

    const calculateImageSize = useCallback(() => {
        if (window.innerWidth <= 600) { // Hide image on mobile
             setImageSize({ width: 0, height: 0 });
             return;
         }
        let newWidth = window.innerWidth * 0.20; // Image takes 20% of screen width
        let newHeight = newWidth / aspectRatio; // Maintain aspect ratio

        setImageSize({ width: newWidth, height: newHeight });
    }, [aspectRatio]); // Added dependency

    // Calculate confetti dimensions
     useEffect(() => {
        setConfettiDimensions({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () => {
             setConfettiDimensions({ width: window.innerWidth, height: window.innerHeight });
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        calculateImageSize();
        window.addEventListener('resize', calculateImageSize);
        return () => window.removeEventListener('resize', calculateImageSize);
    }, [calculateImageSize]);

    // Function to trigger confetti for "Hire Me"
    const handleHireMeClick = () => {
         console.log("Hire me clicked!");
        setShowHireConfetti(true);
        // Hide confetti after a few seconds
        setTimeout(() => setShowHireConfetti(false), 4000);
    };

    return (
        <div className='hero-section'>
             {/* Confetti for Hire Me */}
             {showHireConfetti && (
                <Confetti
                    width={confettiDimensions.width}
                    height={confettiDimensions.height}
                    recycle={false}
                    numberOfPieces={250}
                    gravity={0.15}
                    style={{ position: 'fixed', top: 0, left: 0, zIndex: 9998 }}
                />
            )}

            <RoughNotationGroup show={true}>
                <div className='headline'>
                     {/* --- ORIGINAL TEXT CONTENT BELOW --- */}
                    <span className='headline-title'>Hola! I am Aditya, a <RoughNotation type='highlight' order='1' color='#cddafd'><span style={{ color: isDarkTheme ? 'black' : 'initial' }}>developer</span></RoughNotation> based in India</span>
                    <span className='headline-text'>
                        <span className='headline-sub-text'>
                            I love building tools that are <RoughNotation type='highlight' order='2' color='#fde2e4'><span className='highlighted-text' style={{ color: isDarkTheme ? 'black' : 'initial' }}>user-friendly, simple</span></RoughNotation> and <RoughNotation type='highlight' order='3' color='#bee1e6'><span style={{ color: isDarkTheme ? 'black' : 'initial' }}>delightful.</span></RoughNotation>
                        </span>
                        <span className='headline-sub-text'>
                            I am currently a Software Engineer at Leadsquared, where I develop scalable
                            web applications using <RoughNotation type='highlight' order='4' color='#e9edc9'><span className='highlighted-text' style={{ color: isDarkTheme ? 'black' : 'initial' }}>Node.js and React.js</span></RoughNotation>.
                            In this role, I focus on crafting intuitive user interfaces and leveraging
                            AWS Lambda for optimized performance.
                        </span>
                        <span className='headline-sub-text'>
                            Prior to this, I worked as a Software Developer at DevelUp, where I maintained
                            the company website using <RoughNotation type='highlight' order='5' color='#faedcd'><span style={{ color: isDarkTheme ? 'black' : 'initial' }}>Next.js</span></RoughNotation> and created a Resume Builder tool that
                            significantly improved users job placement prospects. These experiences have
                            allowed me to collaborate with diverse teams and refine my skills in &nbsp;<RoughNotation type='highlight' order='6' color='#ffd7ba'><span className='highlighted-text' style={{ color: isDarkTheme ? 'black' : 'initial' }}>full-stack development</span></RoughNotation>.
                        </span>
                         {/* --- END ORIGINAL TEXT --- */}
                        <span className='headline-sub-text hire-me-line'>
                            I am now seeking new opportunities to further my career as a developer.
                            <br />
                             {/* Keep clickable "Hire me?" span */}
                             <span onClick={handleHireMeClick} style={{ cursor: 'pointer' }}>
                                <RoughNotation type='circle' order='7' color='orange' animationDelay={1000} strokeWidth={3}> Hire me?</RoughNotation>
                             </span>
                        </span>
                    </span>
                     {/* --- END ORIGINAL TEXT --- */}
                    <div className='headline-buttons'>
                        <a href={links.linkedInLink} target='_blank' rel='noopener noreferrer'>
                            <button type='primary' className='headline-btn linkedin'>
                                View LinkedIn
                            </button>
                        </a>
                        <a href={links.githubLink} target='_blank' rel='noopener noreferrer'>
                            <button type='primary' className='headline-btn github'>
                                View Github
                            </button>
                        </a>
                    </div>
                </div>
            </RoughNotationGroup>
            {/* Conditionally render image based on screen size */}
            {imageSize.width > 0 && (
                <div className='image-container'>
                    <div className='image-card'
                        style={{ width: (imageSize.width + 16), height: (imageSize.height + 48) }}
                    >
                        <div className='image-card-part-one'>
                            <img
                                src={heroImage}
                                alt='Aditya Rawal' // More descriptive alt text
                                className='image'
                                style={{ width: imageSize.width, height: imageSize.height }}
                                loading="lazy" // Add lazy loading
                            />
                        </div>
                        <div className='image-card-part-two'>
                            <span>Aditya Rawal</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default HeroSection;