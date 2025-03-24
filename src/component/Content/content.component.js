import React from 'react'
import HeroSection from './HeroSection/heroSection.component'
import Work from './Work/work.component'
import Technology from './Tech/tech.component'

const Content = () => {
  return (
    <React.Fragment>
      <HeroSection />
      <Work />
      <Technology/>
    </React.Fragment>
  )
}

export default Content