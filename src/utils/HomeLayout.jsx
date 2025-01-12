import React from 'react'
import Header from '../pages/LandingPage/Header'
import Banner from '../pages/LandingPage/Banner'
import Footer from '../pages/LandingPage/Footer'
import HomeHeader from '../pages/LandingPage/HomeHeader'
import Loader from '../componets/Loader'

const HomeLayout = ({children}) => {
  return (
    <div>
      <Loader />
        <HomeHeader/>
      {children}
      <Banner />
      <Footer />
    </div>
  )
}

export default HomeLayout
