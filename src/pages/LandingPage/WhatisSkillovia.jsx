import React from "react";
import { motion } from "framer-motion";
import costEffectiveImg from "./c3.png";
import strongerCommunitiesImg from "./c2.png";
import ecoFriendlyImg from "./c1.png";

const WhatisSkillovia = () => {
  const sections = [
    {
      title: "Cost-Effective",
      description: "Save money and resources right around the block",
      bgColor: "bg-primary",
      textColor: "text-gray-800",
      icon: "💰",
      image: costEffectiveImg,
    },
    {
      title: "Stronger Communities",
      description: "Build trust and connections close to your home",
      bgColor: "bg-yellow-300",
      textColor: "text-gray-800",
      icon: "🤝",
      image: strongerCommunitiesImg,
    },
    {
      title: "Eco-Friendly",
      description: "Help reduce your footprint in the city",
      bgColor: "bg-darkSec",
      textColor: "text-white",
      icon: "🌱",
      image: ecoFriendlyImg,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="mx-auto bg-[#bfcab4] pb-16">
      <motion.section
        className="lg:mb-8 px-4 lg:px-16 py-12 lg:py-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={titleVariants}
      >
        <motion.h1
          className="text-3xl lg:text-5xl font-bold text-darkSec"
          variants={titleVariants}
        >
          Hyperlocal Skill Sharing,
        </motion.h1>
        <motion.h2
          className="text-3xl lg:text-5xl font-bold text-darkSec mt-2"
          variants={titleVariants}
          transition={{ delay: 0.2 }}
        >
          Right Around the Corner
        </motion.h2>
      </motion.section>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-3 px-4 lg:px-16 gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {sections.map((section, index) => (
          <motion.div
            key={index}
            className={`${section.bgColor} ${section.textColor} rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl`}
            variants={itemVariants}
            whileHover={{
              scale: 1.03,
              transition: { duration: 0.3 },
            }}
          >
            <motion.div
              className="p-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <div className="flex items-center mb-3">
                <motion.span
                  className="text-3xl mr-3"
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: 0.2 + 0.1 * index,
                    duration: 0.5,
                    type: "spring",
                  }}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  {section.icon}
                </motion.span>
                <motion.h3
                  className="text-2xl font-semibold"
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + 0.1 * index, duration: 0.5 }}
                >
                  {section.title}
                </motion.h3>
              </div>
              <motion.p
                className="opacity-90 text-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 + 0.1 * index, duration: 0.5 }}
              >
                {section.description}
              </motion.p>
            </motion.div>

            <div className="relative overflow-hidden h-64">
              <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-black/20 to-transparent z-10"></div>
              <motion.img
                src={section.image}
                alt={`${section.title} illustration`}
                className="w-full h-full object-cover"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.1, transition: { duration: 0.7 } }}
              />

              <motion.div
                className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + 0.1 * index, duration: 0.5 }}
              >
                <span className="text-white font-medium">
                  Discover {section.title.toLowerCase()} opportunities nearby
                </span>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default WhatisSkillovia;
