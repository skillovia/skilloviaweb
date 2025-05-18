import React from 'react';
import { UserPlus, Search, Users, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const HowSkilloviaWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="w-6 h-6" />,
      title: "Sign Up and Create Your Profile",
      description: "Create a free account and personalize your profile with the skills you can offer or services you need. You can choose to accept Spark tokens (our barter currency) or micro-payments. List any tools you're willing to rent out to neighbors for short-term use."
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "Discover Local Skills and Tools",
      description: "Use Skillovia's search filters to explore services in your neighborhood. Whether you need help with a home project, want to learn something new, or need to borrow equipment, Skillovia's local search makes it simple."
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Connect & Exchange",
      description: "Send a message, book a service, arrange a skill swap, or rent a tool from verified neighbors. It's a safe and transparent way to exchange knowledge, services, and build community bonds."
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Leave Reviews & Strengthen Your Community",
      description: "After each exchange, leave a review to help others in the community make informed choices. Build your reputation, gain trust, and become a valued member of your local network."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.4,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="bg-darkSec min-h-screen text-white px-4 lg:px-[4rem] py-[4rem]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="mx-auto">
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.p 
            className="text-sm mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.p>
          <motion.h1 
            className="lg:text-[4rem] text-[1.9rem] font-bold lg:leading-[4.2rem]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
          >
            How Does<br />
            Skillovia Work?
          </motion.h1>
        </motion.div>

        <motion.div 
          className="space-y-12 lg:pl-[30rem]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              className="flex items-start gap-6"
              variants={itemVariants}
            >
              <motion.div 
                className="bg-[#86E461] rounded-full p-3 mt-1"
                variants={iconVariants}
                whileHover={{ 
                  scale: 1.1,
                  rotate: 10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="text-black">
                  {step.icon}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <motion.h3 
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (0.1 * index), duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {step.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-300 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 + (0.1 * index), duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {step.description}
                </motion.p>
                {index !== steps.length - 1 && (
                  <motion.div 
                    className="border-b border-gray-700 mt-12"
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ delay: 0.3 + (0.1 * index), duration: 0.8 }}
                    viewport={{ once: true }}
                  ></motion.div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HowSkilloviaWorks;