import React from 'react'
// css
import './header.component.css'
// font
import '../../share/font/StiffStaff-Heavy.ttf'
import { Switch } from 'antd'

const Header = () => {
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
                        <Switch defaultChecked/>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}

export default Header