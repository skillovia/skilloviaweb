import React from 'react';
import { Wallet, Leaf, Shield, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const NumberDisplay = ({ number }) => (
  <motion.div 
    className="relative w-32 h-32"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <clipPath id={`clip-${number}`}>
          <text
            x="50"
            y="75"
            fontSize="180"
            fontWeight="bold"
            textAnchor="middle"
          >
            {number}
          </text>
        </clipPath>
      </defs>
      
      {/* Background pattern */}
      <rect
        x="0"
        y="0"
        width="100"
        height="100"
        fill="white"
        clipPath={`url(#clip-${number})`}
        className="stroke-2"
      />
      
      {/* Diagonal lines pattern */}
      <g clipPath={`url(#clip-${number})`}>
        {[...Array(20)].map((_, i) => (
          <line
            key={i}
            x1={-20 + (i * 10)}
            y1="0"
            x2={20 + (i * 10)}
            y2="100"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
        ))}
      </g>
      
      {/* Stroke outline */}
      <text
        x="50"
        y="75"
        fontSize="80"
        fontWeight="bold"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        textAnchor="middle"
        fontFamily="sans-serif"
        className="text-secondary"
      >
        {number}
      </text>
    </svg>
  </motion.div>
);

const WhyLoveSkillovia = () => {
  const benefits = [
    {
      number: "01",
      title: "Save Money",
      description: "Create a free account and personalize your profile with the skills you can offer or services you need. You can choose to accept Spark tokens (our barter currency) or micro-payments to rent out to neighbors for short-term use.",
      icon: <Wallet className="w-6 h-6 text-secondary" />
    },
    {
      number: "02",
      title: "Eco-Friendly",
      description: "Use Skillovia's search filters to explore services in your neighborhood. Whether you need help with a home project, want to learn something new, or need to borrow equipment, Skillovia's local search makes it simple.",
      icon: <Leaf className="w-6 h-6 text-secondary" />
    },
    {
      number: "03",
      title: "Build Trust",
      description: "Send a message, book a service, arrange a skill swap, or rent a tool from verified neighbors. It's a safe and transparent way to exchange knowledge, services, and build community bonds.",
      icon: <Shield className="w-6 h-6 text-secondary" />
    },
    {
      number: "04",
      title: "Convenience",
      description: "After each exchange, leave a review to help others in the community make informed choices. Build your reputation, gain trust, and become a valued member of your local network.",
      icon: <Clock className="w-6 h-6 text-secondary" />
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <>
      <div className="bg-[#bfcab4] min-h-screen">
        <div className="mx-auto">
          <motion.section 
            className="desc px-4 lg:px-[4rem] py-8 lg:py-[5rem]"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.p 
              className="text-lg text-gray-600 mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Why Join Skillovia?
            </motion.p>
            <motion.h2 
              className="lg:text-[4rem] text-[2rem] font-bold lg:leading-[4.2rem] text-gray-800"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Why You'll Love<br />
              Skillovia
            </motion.h2>
          </motion.section>

          <motion.div 
            className="pb-16 grid lg:grid-cols-2 gap-10 px-4 lg:px-[4rem]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-off rounded-xl py-[4rem] px-4 lg:px-[5rem] transition-all hover:shadow-xl group relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <section className="flex rounded-r-2xl">
                  <NumberDisplay number={benefit.number} />
                  <motion.div 
                    className="flevx items-center gap-3"
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <motion.div 
                      className="p-3 bg-gray-50 rounded-xl shadow-sm"
                      whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                    >
                      {benefit.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold text-secondary">
                      {benefit.title}
                    </h3>
                  </motion.div>
                </section>

                <motion.div 
                  className=""
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + (0.1 * index), duration: 0.5 }}
                >
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
  
      <motion.section 
        className="ad"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <motion.img 
          src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736693122/rsz_iphone_mockup3_nvown8_s3wrr2.png" 
          className='h-[120vh] w-full object-cover' 
          alt=""
          initial={{ scale: 1.1 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.2 }}
        />
      </motion.section>
    </>
  );
};

export default WhyLoveSkillovia;