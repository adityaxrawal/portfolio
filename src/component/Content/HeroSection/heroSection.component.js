import React from 'react'
// image
import mainImage from '../../../share/img/me-cropped-blurred.png'
// css
import './heroSection.component.css'
import { Button } from 'antd'

const HeroSection = () => {
    return (
        <div className='hero-section'>
            <div className='headline'>
                <span className='headline-title'>Hola! I'm Aditya, a developer based in India</span>
                <span className='headline-text'>
                    <span className='headline-sub-text'>
                        I love building tools that are user-friendly, simple and delightful.
                        I was a student at Lambda School where I spent 8 months learning the fundamentals
                        of front-end and back-end web development. I also worked at Lambda where my role
                        was split between helping scale processes through automations and overseeing
                        student teams.
                    </span>
                    <span className='headline-sub-text'>
                        Through these experiences, I had the opportunity to work with both small and large,
                        specialised and cross-functional teams across different time zones and developed a
                        working style that leans towards flexibility, clarity, and collaboration.
                        I'm currently looking for a new role as a developer. Hire me?
                    </span>
                </span>
                <div className='headline-button'>
                    <Button type='primary' className=''>View LinkedIn</Button>
                    <Button type='primary'>View Github</Button>
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