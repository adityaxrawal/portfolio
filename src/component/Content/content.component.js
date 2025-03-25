import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection/heroSection.component'
import Work from './Work/work.component'
import Technology from './Tech/tech.component'

const Content = (props) => {

  const [allImagesLoaded, setAllImagesLoaded] = useState(0)

  useEffect(() => {
    console.log('count of all images loaded', allImagesLoaded)
    if (allImagesLoaded === 21) {
      console.log('all images are loaded', allImagesLoaded)
      props.handleLoading(false)
    } else {
      console.log('else part')
      props.handleLoading(true)
    }
  }, [allImagesLoaded, props])

  const handleLoadImage = () => {
    setAllImagesLoaded(allImagesLoaded + 1)
  };


  return (
    <React.Fragment>
      <HeroSection handleLoadImage={handleLoadImage} />
      <Work />
      <Technology />
    </React.Fragment>
  )
}

export default Content