import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import './work.component.css'
import { SharedStateContext } from '../../shared-state-context-api';
import { darkModeColorList, lightModeColorList } from '../../../share/utils/constant';

// images
import leadsquaredLogo from '../../../share/img/lsq.png'
import develUpLogo from '../../../share/img/develup.png'
import wiproLogo from '../../../share/img/wipro.png'

const Work = () => {
    const sectionRef = useRef(null);
    const imagesRef = useRef(null);
    const textRef = useRef(null);
    const [isPinned, setIsPinned] = useState(false);
    const { isDarkTheme, backgroundColor, setBackgroundColor } = useContext(SharedStateContext)

    const handleScroll = async (e) => {
        console.log('e', e)
        if (!sectionRef.current || !imagesRef.current) return;

        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const sectionOffSetHeight = sectionRef.current.offsetHeight;
        const textTop = textRef.current.getBoundingClientRect().top;

        if (sectionTop < 0) {
            setIsPinned(true)
            imagesRef.current.scrollTop = parseInt(Math.abs(textTop) / 1.75);
            // IMC = image container percentage -> how is image container covered : returns percentage
            const currentICP = await calculateICP();
            updateBackgroundColor(currentICP)
        } else if (sectionTop === -sectionOffSetHeight) {
            setIsPinned(false)
        } else {
            imagesRef.current.scrollTop = 0;
        }
    }

    const LightModeColorRanges = [
        { range: [-33, 5], color: isDarkTheme ? darkModeColorList[0] : lightModeColorList[0] },
        { range: [5, 33], color: isDarkTheme ? darkModeColorList[1] : lightModeColorList[1] },
        { range: [34, 49], color: isDarkTheme ? darkModeColorList[2] : lightModeColorList[2] },
        { range: [50, 100], color: isDarkTheme ? darkModeColorList[3] : lightModeColorList[3] },
    ];

    const getColorForCurrentICP = (currentICP) => {
        for (const { range, color } of LightModeColorRanges) {
            if (currentICP >= range[0] && currentICP <= range[1]) {
                return color;
            }
        }
        return backgroundColor; // fallback to current color if no match found
    };

    const updateBackgroundColor = (currentICP) => {
        const newColor = getColorForCurrentICP(currentICP);
        if (newColor !== backgroundColor) {
            setBackgroundColor(newColor);
        }
    };

    const calculateICP = useCallback(async () => {
        if (!imagesRef.current) return 0;
        return parseInt((Math.abs(imagesRef.current.scrollTop) / imagesRef.current.scrollHeight) * 100);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", (e) => handleScroll(e));

        return () => {
            window.removeEventListener("scroll", (e) => handleScroll(e));
        };
    });

    return (
        <React.Fragment>
            <section ref={sectionRef} className='project-section' >
                <div className={`project-heading ${isPinned ? 'sticky' : 'relative'}`}>
                    <span className='project-heading-text'>Grindstory</span>
                    <span className='project-heading-subtext'>The tale of endless grind</span>
                </div>
                <div className='project-container'>
                    <div className='project-container-text' ref={textRef}>
                        <div className='project-text'>
                            <div className='project-text-details'>
                                <span className='project-text-heading'>
                                    Leadsquared
                                </span>
                                <span className='project-text-description'>

                                    Develop scalable web apps using Node.js, React.js, and AWS Lambda.
                                    Conduct code reviews, resolve issues, and maintain technical documentation.
                                    Collaborate with clients to gather and document project requirements clearly.
                                    Implement efficient solutions with strong analytical and problem-solving skills.
                                    Design REST APIs for seamless system and platform integrations.
                                </span>
                            </div>
                        </div>
                        <div className='project-text'>
                        <div className='project-text-details'>
                                <span className='project-text-heading'>
                                    DevelUp
                                </span>
                                <span className='project-text-description'>

                                    Develop scalable web apps using Node.js, React.js, and AWS Lambda.
                                    Conduct code reviews, resolve issues, and maintain technical documentation.
                                    Collaborate with clients to gather and document project requirements clearly.
                                    Implement efficient solutions with strong analytical and problem-solving skills.
                                    Design REST APIs for seamless system and platform integrations.
                                </span>
                            </div>
                        </div>
                        <div className='project-text'>
                        <div className='project-text-details'>
                                <span className='project-text-heading'>
                                    Wipro
                                </span>
                                <span className='project-text-description'>

                                    Develop scalable web apps using Node.js, React.js, and AWS Lambda.
                                    Conduct code reviews, resolve issues, and maintain technical documentation.
                                    Collaborate with clients to gather and document project requirements clearly.
                                    Implement efficient solutions with strong analytical and problem-solving skills.
                                    Design REST APIs for seamless system and platform integrations.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={`project-container-images ${isPinned ? 'sticky' : 'relative'}`}>
                        <div className={`project-images`} ref={imagesRef} onWheel={() => { return false }}>
                            <span className='project-images-items'>
                                <img src={leadsquaredLogo} alt='Leadsquared-Logo' className='project-images' />
                            </span>
                            <span className='project-images-items'>
                                <img src={develUpLogo} alt='DevelUp-Logo' className='project-images' />
                            </span>
                            <span className='project-images-items'>
                                <img src={wiproLogo} alt='Wipro-Logo' className='project-images' />
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Work
