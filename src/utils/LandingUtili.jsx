import React from 'react'
import Header from '../pages/LandingPage/Header'
import Banner from '../pages/LandingPage/Banner'
import Footer from '../pages/LandingPage/Footer'
import Loader from '../componets/Loader'

const LandingUtili = ({children}) => {
  return (
    <div>
      {/* <Loader /> */}
        <Header/>
      {children}
      <Banner />
      <Footer />
    </div>
  )
}

export default LandingUtili
