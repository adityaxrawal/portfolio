import React from 'react';

import HeroSection from '../../../hero/components/HeroSection';
import Work from '../Work';
import Technology from '../Technology';
import Portfolio from '../PortfolioDetail';
// import Project from './Project'

const Content = () => {
  return (
    <>
      <HeroSection />
      <Work />
      <Technology />
      {/* <Project /> */}
      <Portfolio />
    </>
  );
};

export default Content;
