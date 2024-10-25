import React, { useEffect, useRef, useState } from 'react'
import './projects.component.css'

const Projects = () => {
    const sectionRef = useRef(null);
    const [isPinned, setIsPinned] = useState(false);

    const handleScroll = () => {
        if (!sectionRef.current) return;

        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const sectionOffSetHeight = sectionRef.current.offsetHeight;
        if (sectionTop < 0) {
            setIsPinned(true)
        } else if (sectionTop === -sectionOffSetHeight) {
            setIsPinned(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            <section ref={sectionRef} className='project-section' style={{ position: isPinned ? 'sticky' : 'intial', top: 0 }}>
                <div className='project-container'>
                    <div className='project-heading'>
                        <span className='project-heading-text'>Projects</span>
                    </div>
                    <div className='project-container-text-images'>
                        <div className='project-container-text'>
                            <span className='project-text'>Text 1</span>
                            <span className='project-text'>Text 2</span>
                            <span className='project-text'>Text 3</span>
                        </div>
                        <div className='project-container-images' style={{ position: isPinned ? 'sticky' : 'initial', top: 0 }}>
                            <span className='project-image'>image1</span>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    )
}

export default Projects

// style={{ position: isPinned ? "fixed" : "relative", maxWidth: isPinned ? '80%' : '100%', padding: isPinned ? '0% 10%' : '0%' }}

// Handle scroll event and calculate the index of the current text
// const handleScroll = () => {
//     if (!sectionRef.current) return;

//     const sectionTop = sectionRef.current.getBoundingClientRect().top;
//     const windowHeight = window.innerHeight;

//     if (sectionTop <= 0 && Math.abs(sectionTop) < windowHeight * (MAX_TEXTS_INSIDE_SCROLL + 1)) {
//         setIsPinned(true);
//         console.log('--------------start--------------')
//         console.log('section top', sectionTop)
//         console.log('window height', windowHeight)
//         const scrollPosition = Math.min(
//             Math.floor((Math.abs(sectionTop) / windowHeight) * (MAX_TEXTS_INSIDE_SCROLL + 1)),
//             MAX_TEXTS_INSIDE_SCROLL
//         ); // Max scroll index is 2 in this example
//         console.log('math.abs', (Math.abs(sectionTop) / windowHeight))
//         console.log('scroll position', scrollPosition)
//         console.log('----------------end--------------')
//         setScrollIndex(scrollPosition);
//     } else {
//         setIsPinned(false);
//     }
// };