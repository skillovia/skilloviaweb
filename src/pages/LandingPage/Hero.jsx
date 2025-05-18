import React from 'react';
import { PlayCircle, Apple } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <>
      <section className="relative w-full lg:h-[100vh] h-[80vh]">
        <figure className="relative w-full h-full">
          {/* Image with motion */}
          <motion.img
            src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736692788/rsz_3c499517bc106130c733eb5c4c6549ec_wcp5mq_uiuang.jpg"
            alt="Hero background"
            className="w-full h-full object-cover"
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5 }}
          />
          
          {/* Dark overlay with motion */}
          <motion.div 
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          
          {/* Text content with motion */}
          <motion.figcaption 
            className="absolute bottom-20 left-12 z-10 lg:px-[4rem]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-8xl font-bold text-[#BFCAB4] leading-tight"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                SWAP SKILLS,
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3, duration: 0.6 }}
              >
                SAVE<span className="sty font-medium"> money!</span>
              </motion.span>
            </motion.h1>
          </motion.figcaption>
        </figure>
      </section>
      
      <motion.section 
        className="min-h-[60vh] bg-[#bfcab4] flex flex-col items-center justify-center text-center px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Main content */}
        <div className="lg:max-w-4xl mx-auto">
          <motion.h1 
            className="text-3xl md:text-6xl font-medium text-darkSec mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Empower your community
            <br />
            by sharing
          </motion.h1>
          
          <motion.h2 
            className="text-4xl md:text-6xl sty text-darkSec mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            skills and services.
          </motion.h2>
          
          {/* Download buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="flex items-center gap-2 bg-darkSec text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlayCircle size={24} />
              <span>Download for Android</span>
            </motion.button>
            
            <motion.button 
              className="flex items-center gap-2 bg-darkSec text-white px-6 py-4 rounded-full hover:bg-gray-800 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Apple size={24} />
              <span>Download for iOS</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
      
      <motion.section 
        className="ad"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.img 
          src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327662/Img2_w2pzsc.png" 
          className='h-[100vh] w-full object-cover' 
          alt=""
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
        />
      </motion.section>
    </>
  );
};

export default Hero;