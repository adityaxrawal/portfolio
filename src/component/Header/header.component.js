import React, { useContext } from 'react'
// css
import './header.component.css'
// font
import '../../share/font/StiffStaff-Heavy.ttf'
import { SharedStateContext } from '../shared-state-context-api'

const Header = () => {
    const { isDarkTheme, setDarkTheme } = useContext(SharedStateContext)
    console.log('header', isDarkTheme)
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
                    <div className='nav-text'>
                        <span>About</span>
                    </div>
                    <div className='nav-text'>
                        <span>Projects</span>
                    </div>
                    <div className='nav-text'>
                        <span>Contact</span>
                    </div>
                    <div className='nav-switch'>
                        <label
                            className='container-dark-mode'
                            title={isDarkTheme ? "Activate light mode" : "Activate dark mode"}
                            aria-label={isDarkTheme ? "Activate light mode" : "Activate dark mode"}
                        >
                            <input
                                type="checkbox"
                                defaultChecked={false ? !isDarkTheme : isDarkTheme}
                                onChange={() => setDarkTheme(!isDarkTheme)}
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