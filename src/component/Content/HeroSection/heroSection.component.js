import React, { useContext } from 'react'
// image
import mainImage from '../../../share/img/me-cropped-blurred.png'
// css
import './heroSection.component.css'
// Rough Notation for react
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
// constants
import { links } from '../../../share/utils/constant';
import { SharedStateContext } from '../../shared-state-context-api';

const HeroSection = () => {
    const { isDarkTheme } = useContext(SharedStateContext)
    return (
        <div className='hero-section'>
            <RoughNotationGroup show={true}>
                <div className='headline'>
                    <span className='headline-title'>Hola! I am Aditya, a <RoughNotation type='highlight' order='1' color='#cddafd'><span style={{ color: isDarkTheme ? 'black' : 'initial' }}>developer</span></RoughNotation> based in India</span>
                    <span className='headline-text'>
                        <span className='headline-sub-text'>
                            I love building tools that are <RoughNotation type='highlight' order='2' color='#fde2e4'><span className='highlighted-text' style={{color: isDarkTheme ? 'black' : 'initial'}}>user-friendly, simple</span></RoughNotation> and <RoughNotation type='highlight' order='3' color='#bee1e6'><span style={{ color: isDarkTheme ? 'black' : 'initial' }}>delightful.</span></RoughNotation>
                        </span>
                        <span className='headline-sub-text'>
                            I am currently a Software Engineer at Leadsquared, where I develop scalable
                            web applications using <RoughNotation type='highlight' order='4' color='#e9edc9'><span className='highlighted-text' style={{color: isDarkTheme ? 'black' : 'initial'}}>Node.js and React.js</span></RoughNotation>.
                            In this role, I focus on crafting intuitive user interfaces and leveraging
                            AWS Lambda for optimized performance.
                        </span>
                        <span className='headline-sub-text'>
                            Prior to this, I worked as a Software Developer at DevelUp, where I maintained
                            the company’s website using <RoughNotation type='highlight' order='5' color='#faedcd'><span style={{color: isDarkTheme ? 'black' : 'initial'}}>Next.js</span></RoughNotation> and created a Resume Builder tool that
                            significantly improved users job placement prospects. These experiences have
                            allowed me to collaborate with diverse teams and refine my skills in &nbsp;<RoughNotation type='highlight' order='6' color='#ffd7ba'><span className='highlighted-text' style={{color: isDarkTheme ? 'black' : 'initial'}}>full-stack development</span></RoughNotation>.
                        </span>
                        <span className='headline-sub-text'>
                            I am now seeking new opportunities to further my career as a developer.
                            <RoughNotation type='circle' order='7' color='orange'> Hire me?</RoughNotation>
                        </span>
                    </span>
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
            <div className='image-container'>
                <div className='image-subcontainer'>
                    <img src={mainImage} alt='my-image' className='image' />
                </div>
            </div>
        </div>
    )
}

export default HeroSection