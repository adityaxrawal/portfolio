import React from 'react'
import './header.component.css'

const Header = () => {
  return (
    <React.Fragment>
        <nav className='nav-bar'>
            <div className='nav-left'>
                <span>Rawal</span>
            </div>
            <div className='nav-right'>
                <div>
                    <span>Work</span>
                </div>
                <div>
                    <span>Project</span>
                </div>
                <div>
                    <span>Contact</span>
                </div>
                <div>
                    <buton>click me</buton>
                </div>
            </div>
        </nav>
    </React.Fragment>
  )
}

export default Header