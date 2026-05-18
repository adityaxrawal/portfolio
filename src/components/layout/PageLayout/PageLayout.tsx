import './PageLayout.css';
import Footer from '../Footer/v2';
import Header from '../Header/Header';

import Content from '@/features/portfolio/components/MainContent';
import React from 'react';

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
