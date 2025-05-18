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
{/* <Loader /> */}
    <HomeLayout>


<section className="overflow-hidden">


 




<Hero />
<WhatisSkillovia />
<HowSkilloviaWorks />
<WhyLoveSkillovia />

</section>
   
    </HomeLayout>
    </>
  )
}

export default LandingPage
