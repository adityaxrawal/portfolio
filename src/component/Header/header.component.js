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
                            <div key={index} className='cube-flip' style={{ animationDelay: `${index * 10}ms` }}>
                                {char}
                            </div>
                        ))}
                    </span>
                    <span className='animated-letters'>
                        {Array.from("ar.adityarawal@gmail.com").map((char, index) => (
                            <div key={index} className='cube-flop' style={{ animationDelay: `${index * 10}ms` }}>
                                {char}
                            </div>
                        ))}
                    </span>
                </div>
                <div className='nav-right'>
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