import React from 'react';

import Content from '@/features/portfolio';
import Footer from '@/components/ui/Footer';
import Header from '@/components/ui/Header';

import './PageLayout.css';

/**
 * @deprecated Use `PortfolioPage` with `SnapLayout` instead.
 */
const Page = () => {
  return (
    <React.Fragment>
      <Header />
      <Content />
      <Footer />
    </React.Fragment>
  );
};

export default Page;
