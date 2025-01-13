import React, { useContext } from 'react'
// css
import './header.component.css'
// context
import { SharedStateContext } from '../shared-state-context-api'
import { darkModeColorList, lightModeColorList } from '../../share/utils/constant'

const Header = () => {
    const { isDarkTheme, setDarkTheme, setBackgroundColor } = useContext(SharedStateContext)

    const handleDarkMode = () => {
        setDarkTheme(!isDarkTheme)
        setBackgroundColor(!isDarkTheme === true ? darkModeColorList[0] : lightModeColorList[0])
    }
    return (
        <React.Fragment>
            <nav className='nav-bar'>
                <div className='nav-left'>
                    <span className='animated-letters'>
                        {Array.from("ar.adityarawal@gmail.com").map((char, index) => (
                            <div key={index} className='cube' style={{ animationDelay: `${index * 100}ms` }}>
                                {char}
                            </div>
                        ))}
                    </span>
                    {/* https://www.jhosuemesias.com/ */}
                    {/* <span className='animated-letter'>R</span>
                    <span className='animated-letter'>a</span>
                    <span className='animated-letter'>w</span>
                    <span className='animated-letter'>a</span>
                    <span className='animated-letter'>l</span> */}
                </div>
                <div className='nav-right'>
                    {/* <div className='nav-text'>
                        <span>About</span>
                    </div>
                    <div className='nav-text'>
                        <span>Projects</span>
                    </div>
                    <div className='nav-text'>
                        <span>Contact</span>
                    </div> */}
                    <div className='nav-switch'>
                        <label
                            className='container-dark-mode'
                            title={isDarkTheme ? "Activate light mode" : "Activate dark mode"}
                            aria-label={isDarkTheme ? "Activate light mode" : "Activate dark mode"}
                        >
                            <input
                                type="checkbox"
                                defaultChecked={false ? !isDarkTheme : isDarkTheme}
                                onChange={handleDarkMode}
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