import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  // Animation variants for different sections
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (custom) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + custom * 0.1,
        duration: 0.4,
      },
    }),
    hover: {
      x: 5,
      color: "#374151",
      transition: { duration: 0.2 },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const bottomSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="bg-off lg:px-[4rem]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container mx-auto py-12">
        {/* Top Section with Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
          {/* Logo Section */}
          <motion.div
            className="col-span-1 md:col-span-2 lg:col-span-1"
            variants={itemVariants}
          >
            <div className="space-y-4">
              <motion.img
                src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327781/WHT_Horiz._Logo_bbkq77.png"
                className="lg:w-[180px] w-[100px] h-auto object-contain"
                alt="Logo"
                variants={logoVariants}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              />
              <motion.p
                className="text-sm text-gray-600 mt-4 max-w-xs"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
              >
                Join our community and stay updated with the latest news and
                updates.
              </motion.p>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3
              className="text-base font-semibold"
              variants={itemVariants}
            >
              Quick Links
            </motion.h3>
            <nav className="flex flex-col space-y-2">
              {["About Us", "Our Services", "Blog", "Contact"].map(
                (link, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                    variants={linkVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    {link}
                  </motion.a>
                )
              )}
            </nav>
          </motion.div>

          {/* Support */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3
              className="text-base font-semibold"
              variants={itemVariants}
            >
              Support
            </motion.h3>
            <nav className="flex flex-col space-y-2">
              {[
                "Help Center",
                "FAQs",
                "Privacy Policy",
                "Terms of Service",
              ].map((link, index) => {
                // Define correct paths
                let href = "#";
                if (link === "Privacy Policy") href = "/privacy-policy";
                if (link === "Terms of Service") href = "/terms-and-condition";

                return (
                  <motion.a
                    key={index}
                    href={href}
                    className="text-sm text-gray-600 hover:text-gray-900"
                    variants={linkVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    {link}
                  </motion.a>
                );
              })}
            </nav>
          </motion.div>

          {/* Connect */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <motion.h3
              className="text-base font-semibold"
              variants={itemVariants}
            >
              Connect
            </motion.h3>
            <nav className="flex flex-col space-y-2">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map(
                (link, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                    variants={linkVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    {link}
                  </motion.a>
                )
              )}
            </nav>
          </motion.div>
        </div>

        {/* Bottom Section with Copyright */}
        <motion.div
          className="mt-12 pt-8 border-t border-gray-200"
          variants={bottomSectionVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center px-6 space-y-4 md:space-y-0">
            <motion.p
              className="text-sm text-gray-600"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              viewport={{ once: true }}
            >
              © 2024 Present. All rights reserved.
            </motion.p>
            <motion.div
              className="flex space-x-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {["Accessibility", "Cookie Policy", "Legal Notice"].map(
                (link, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900"
                    whileHover={{
                      color: "#374151",
                      transition: { duration: 0.2 },
                    }}
                  >
                    {link}
                  </motion.a>
                )
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Footer;
