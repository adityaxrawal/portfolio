import React from 'react'
// image
import mainImage from '../../../share/img/me-cropped-blurred.png'
// css
import './heroSection.component.css'

const HeroSection = () => {
    console.log("herosection")
    return (
        <div className='hero-section'>
            <div className='headline'>
                <span className='headline-title'>Hola! I am Aditya, a developer based in India</span>
                <span className='headline-text'>
                    <span className='headline-sub-text'>
                        I love building tools that are user-friendly, simple and delightful.
                    </span>
                    <span className='headline-sub-text'>
                        I was a student at Lambda School where I spent 8 months learning the fundamentals
                        of front-end and back-end web development. I also worked at Lambda where my role
                        was split between helping scale processes through automations and overseeing
                        student teams.
                    </span>
                    <span className='headline-sub-text'>
                        Through these experiences, I had the opportunity to work with both small and large,
                        specialised and cross-functional teams across different time zones and developed a
                        working style that leans towards flexibility, clarity, and collaboration.
                        I am currently looking for a new role as a developer. Hire me?
                    </span>
                </span>
                <div className='headline-buttons'>
                    <button type='primary' className='headline-btn linkedin'>View LinkedIn</button>
                    <button type='primary' className='headline-btn github'>View Github</button>
                </div>
            </div>
            <div className='image-container'>
                <div className='image-subcontainer'>
                    <img src={mainImage} alt='my-image' className='image' />
                </div>
            </div>
        </div>
    )
}

export default HeroSection