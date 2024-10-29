import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import './projects.component.css'
import { SharedStateContext } from '../../shared-state-context-api';

const Projects = () => {
    const sectionRef = useRef(null);
    const imagesRef = useRef(null);
    const textRef = useRef(null);
    const [isPinned, setIsPinned] = useState(false);
    const { backgroundColor, setBackgroundColor } = useContext(SharedStateContext)

    const handleScroll = () => {
        if (!sectionRef.current || !imagesRef.current) return;

        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const sectionOffSetHeight = sectionRef.current.offsetHeight;
        const textTop = textRef.current.getBoundingClientRect().top;

        if (sectionTop < 0) {
            setIsPinned(true)
            imagesRef.current.scrollTop = parseInt(Math.abs(textTop) / 1.75);
            // IMC = image container percentage -> how is image container covered : returns percentage
            const currentICP = calculateICP();
            console.log('currentt iCP', currentICP)
            updateBackgroundColor(currentICP)
        } else if (sectionTop === -sectionOffSetHeight) {
            setIsPinned(false)
        } else {
            imagesRef.current.scrollTop = 0;
        }
    }

    const colorRanges = [
        { range: [0, 33], color: '#F8F4E1' },
        { range: [34, 49], color: '#AF8F6F' },
        { range: [50, 100], color: '#74512D' },
    ];

    const getColorForCurrentICP = (currentICP) => {
        for (const { range, color } of colorRanges) {
            console.log('rangee', range, currentICP)
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

    const calculateICP = useCallback(() => {
        if (!imagesRef.current) return 0;
        return parseInt((Math.abs(imagesRef.current.scrollTop) / imagesRef.current.scrollHeight) * 100);
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <React.Fragment>
            <section ref={sectionRef} className='project-section' >
                <div className={`project-heading ${isPinned ? 'sticky' : 'relative'}`}>
                    <span className='project-heading-text'>Projects</span>
                </div>
                <div className='project-container'>
                    <div className='project-container-text' ref={textRef}>
                        <span className='project-text'>Text 1</span>
                        <span className='project-text'>Text 2</span>
                        <span className='project-text'>Text 3</span>
                    </div>
                    <div className={`project-container-images ${isPinned ? 'sticky' : 'relative'}`}>
                        <div className={`project-images ${isPinned ? 'overflow-scroll' : 'overflow-hidden'}`} ref={imagesRef}>
                            <span className='project-images-items'>image 1</span>
                            <span className='project-images-items'>image 2</span>
                            <span className='project-images-items'>image 3</span>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Projects
