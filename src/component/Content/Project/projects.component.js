import React, { useEffect, useRef, useState } from 'react'
import './projects.component.css'

const Projects = () => {
    const sectionRef = useRef(null);
    const imagesRef = useRef(null);
    const textRef = useRef(null);
    const [isPinned, setIsPinned] = useState(false);

    const handleScroll = () => {
        if (!sectionRef.current || !imagesRef.current) return;

        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        const sectionOffSetHeight = sectionRef.current.offsetHeight;
        const textTop = textRef.current.getBoundingClientRect().top;

        if (sectionTop < 0) {
            setIsPinned(true)
            imagesRef.current.scrollTop = parseInt(Math.abs(textTop) / 1.75);
        } else if (sectionTop === -sectionOffSetHeight) {
            setIsPinned(false)
        } else {
            imagesRef.current.scrollTop = 0;
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
            <section ref={sectionRef} className='project-section'>
                <div className='project-heading' style={{ position: isPinned ? 'sticky' : 'relative', top: 0 }}>
                    <span className='project-heading-text'>Projects</span>
                </div>
                <div className='project-container'>
                    <div className='project-container-text' ref={textRef}>
                        <span className='project-text'>Text 1</span>
                        <span className='project-text'>Text 2</span>
                        <span className='project-text'>Text 3</span>
                    </div>
                    <div className='project-container-images' style={{ position: isPinned ? 'sticky' : 'relative', top: 0 }}>
                        <div className='project-images' ref={imagesRef} style={{ overflow: isPinned ? 'scroll' : 'hidden' }}>
                            <span className='project-images-items' style={{ backgroundColor: "darkred" }}>image 1</span>
                            <span className='project-images-items' style={{ backgroundColor: "darkblue" }}>image 2</span>
                            <span className='project-images-items' style={{ backgroundColor: "darkgreen" }}>image 3</span>
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