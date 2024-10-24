import React, { useEffect, useRef, useState } from 'react'
import './projects.component.css'

const Projects = () => {
    const sectionRef = useRef(null);
    const [isPinned, setIsPinned] = useState(false);
    const [scrollIndex, setScrollIndex] = useState(0);
    const MAX_TEXTS_INSIDE_SCROLL = 2

    // Handle scroll event and calculate the index of the current text
    const handleScroll = () => {
        if (!sectionRef.current) return;

        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop <= 0 && Math.abs(sectionTop) < windowHeight * (MAX_TEXTS_INSIDE_SCROLL + 1)) {
            setIsPinned(true);
            console.log('--------------start--------------')
            console.log('section top', sectionTop)
            console.log('window height', windowHeight)
            const scrollPosition = Math.min(
                Math.floor((Math.abs(sectionTop) / windowHeight) * (MAX_TEXTS_INSIDE_SCROLL + 1)),
                MAX_TEXTS_INSIDE_SCROLL
            ); // Max scroll index is 2 in this example
            console.log('math.abs', (Math.abs(sectionTop) / windowHeight))
            console.log('scroll position', scrollPosition)
            console.log('----------------end--------------')
            setScrollIndex(scrollPosition);
        } else {
            setIsPinned(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            <section ref={sectionRef} className='project-section'>
                <div className='project-header' style={{ position: isPinned ? "fixed" : "relative", maxWidth: isPinned ? '80%' : '100%', padding: isPinned ? '0% 10%' : '0%' }}>
                    <div className='project-container-header'>
                        <span className='project-header-text'>Projects</span>
                    </div>
                    <div className='project-container-text'>
                        {scrollIndex === 0 && <span className='project-text'>Text 1</span>}
                        {scrollIndex === 1 && <span className='project-text'>Text 2</span>}
                        {scrollIndex === 2 && <span className='project-text'>Text 3</span>}
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Projects