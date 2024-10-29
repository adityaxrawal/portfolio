import React from 'react'
import './page.component.css'
import Header from './Header/header.component'
import Footer from './Footer/footer.component'
import Content from './Content/content.component'

const Page = () => {
    return (
        <React.Fragment>
            <div className='page'>
                <Header />
                <Content />
                <Footer />
            </div>
        </React.Fragment>
    )
}

export default Page