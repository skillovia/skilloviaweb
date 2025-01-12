import React from 'react'
import Button from '../../componets/Button'
import LandingUtili from '../../utils/LandingUtili'
import Hero from './Hero'
import WhatisSkillovia from './WhatisSkillovia'
import HowSkilloviaWorks from './HowItWorks'
import WhyLoveSkillovia from './Whyus'
import HomeLayout from '../../utils/HomeLayout'
import Loader from '../../componets/Loader'

const LandingPage = () => {
  return (

    <>
<Loader />
    <HomeLayout>

 




<Hero />
<WhatisSkillovia />
<HowSkilloviaWorks />
<WhyLoveSkillovia />

   
    </HomeLayout>
    </>
  )
}

export default LandingPage
