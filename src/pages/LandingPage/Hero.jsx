import React from 'react';
import { PlayCircle, Apple } from 'lucide-react';

const Hero = () => {
  return (

    <>
    
    <section className="relative w-full lg:h-[100vh] h-[80vh] ">
      <figure className="relative w-full h-full ">
        {/* Image */}
        <img 
          src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736692788/rsz_3c499517bc106130c733eb5c4c6549ec_wcp5mq_uiuang.jpg" 
          alt="Hero background" 
          className="w-full h-full object-cover"
          />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Text content */}
        <figcaption className="absolute bottom-20 left-12 z-10 lg:px-[4rem] ">
          <h1 className="text-5xl md:text-8xl font-bold text-[#BFCAB4] leading-tight">
            SWAP SKILLS,<br />
            SAVE<span className="sty font-medium"> money!</span>
          </h1>
        </figcaption>
      </figure>
    </section>


    <section className="min-h-[60vh] bg-[#bfcab4] flex flex-col items-center justify-center text-center px-4">
      {/* Main content */}
      <div className="lg:max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-6xl  font-medium text-darkSec mb-6">
          Empower your community
          <br />
          by sharing
        </h1>
        
        <h2 className="text-4xl md:text-6xl sty text-darkSec mb-12">
          skills and services.
        </h2>

        {/* Download buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="flex items-center gap-2 bg-darkSec text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-colors">
            <PlayCircle size={24} />
            <span>Download for Android</span>
          </button>

          <button className="flex items-center gap-2 bg-darkSec text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-colors">
            <Apple size={24} />
            <span>Download for iOS</span>
          </button>
        </div>
      </div>
    </section>


    <section className="ad">
        <img src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327662/Img2_w2pzsc.png" className='h-[100vh] w-full object-cover' alt="" />
    </section>
          </>
  );
};

export default Hero;


