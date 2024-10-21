import React from 'react'
import { useState } from 'react'
// css
import './header.component.css'
// font
import '../../share/font/StiffStaff-Heavy.ttf'

const Header = () => {
    const [isDarkMode, setDarkMode] = useState(false)

    return (
        <React.Fragment>
            <nav className='nav-bar'>
                <div className='nav-left'>
                    <span className='animated-letter'>R</span>
                    <span className='animated-letter'>a</span>
                    <span className='animated-letter'>w</span>
                    <span className='animated-letter'>a</span>
                    <span className='animated-letter'>l</span>
                </div>
                <div className='nav-right'>
                    <div>
                        <span>About</span>
                    </div>
                    <div>
                        <span>Projects</span>
                    </div>
                    <div>
                        <span>Contact</span>
                    </div>
                    <div>
                        <label
                            className='container-dark-mode'
                            title={isDarkMode ? "Activate light mode" : "Activate dark mode"}
                            aria-label={isDarkMode ? "Activate light mode" : "Activate dark mode"}
                        >
                            <input
                                type="checkbox"
                                defaultChecked={false ? !isDarkMode : isDarkMode}
                                onChange={setDarkMode(!isDarkMode)}
                            />
                            <div />
                        </label>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Header