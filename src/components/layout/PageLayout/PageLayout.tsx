
import './PageLayout.css';
import Header from '../Header';
import Footer from '../Footer/v2';
import Content from '@/features/portfolio/MainContent';

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
