import React from 'react';
import { motion } from 'framer-motion';

const Banner = () => {
  // Animation variants for the heading elements
  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.2,
        duration: 0.8,
        ease: "easeOut"
      }
    })
  };

  // Button animation variants
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8 + (custom * 0.15),
        duration: 0.5,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.95
    }
  };

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Main content section */}
      <div className="container bg-darkSec mx-auto px-4 py-16">
        <motion.div 
          className="text-center max-w-2xl mx-auto pt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h1 
            className="text-white text-4xl md:text-6xl font-bold mb-4"
            custom={1}
            variants={headingVariants}
          >
            Ready to
          </motion.h1>
          
          <motion.h2 
            className="text-white text-4xl md:text-6xl font-bold mb-4"
            custom={2}
            variants={headingVariants}
          >
            share your
          </motion.h2>
          
          <motion.h2 
            className="text-white text-4xl md:text-6xl sty mb-12"
            custom={3}
            variants={headingVariants}
          >
            skills and services?
          </motion.h2>
          
          <motion.div 
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className="bg-primary text-gray-900 px-6 py-3 rounded-full hover:bg-green-500 transition-colors"
              variants={buttonVariants}
              custom={1}
              whileHover="hover"
              whileTap="tap"
            >
              Sign Up for Free
            </motion.button>
            
            <motion.button 
              className="bg-off text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
              variants={buttonVariants}
              custom={2}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.span
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                Download for Android
              </motion.span>
            </motion.button>
            
            <motion.button 
              className="bg-off text-gray-900 px-6 py-3 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-2"
              variants={buttonVariants}
              custom={3}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.span
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.4, duration: 0.5 }}
              >
                Download for iOS
              </motion.span>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Banner;