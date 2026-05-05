import React from 'react';

import HeroSection from '../../hero';
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
