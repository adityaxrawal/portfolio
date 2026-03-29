import React from 'react';

import './PageLayout.css';
import Header from '../Header';
import Footer from '../Footer';
import Content from '../../../features/portfolio/components/MainContent';

const Page = () => {
  return (
    <>
      <div className="page">
        <Header />
        <Content />
      </div>
      <div className="page-footer">
        <Footer />
      </div>
    </>
  );
};

export default Page;
