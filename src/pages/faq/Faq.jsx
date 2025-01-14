import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import LandingUtili from '../../utils/LandingUtili';
import Loader from '../../componets/Loader';

const FAQSection = () => {
  const [openItem, setOpenItem] = useState(0);

  const faqData = [
    {
      id: 0,
      question: "What is Skillovia and how does it work?",
      answer: "Skillovia is a community-driven platform where users can list their skills and services or request services from others. It enables people to exchange knowledge, rent tools, or offer services locally using Spark tokens, a barter currency that eliminates the need for money in many transactions."
    },
    {
      id: 1,
      question: "How do I sign up?",
      answer: "Signing up is easy! Just click here to create your free profile, then start listing your skills or browsing available services in your area."
    },
    {
      id: 2,
      question: "What are Spark tokens?",
      answer: "Spark tokens are Skillovia's barter system, allowing users to trade services without exchanging money. These tokens make it easy to rent items, offer services, or barter for help in a seamless and secure way."
    },
    {
      id: 3,
      question: "Is Skillovia safe?",
      answer: "Yes! Skillovia takes safety seriously by verifying users and providing a trusted platform for community interactions. You can review others' experiences through ratings and reviews, ensuring peace of mind when engaging with services or skill swaps."
    },
    {
      id: 4,
      question: "Can I use Skillovia on both desktop and mobile?",
      answer: "Absolutely! Skillovia is designed to work seamlessly across devices. Whether you’re on your desktop or mobile phone, you can easily browse services, book requests, and manage your profile wherever you go."
    }
  ];
  

  const handleClick = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <LandingUtili>
{/* <Loader /> */}
 
    <div className="min-h-screen bg-[#F6FCEB] lg:p-6 lg:pt-[10rem] px-4 pt-[6rem]">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="lg:text-4xl text-3xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-gray-600">
            Here are answers to some of the most common questions about using Skillovia.
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg overflow-hidden border border-slate-300"
            >
              <button
                onClick={() => handleClick(item.id)}
                className="w-full px-6 py-4 text-left flex bg-[#F0F6E6]  justify-between items-center hover:bg-gray-50 transition-colors duration-150"
              >
                <span className="font-medium text-gray-900">{item.question}</span>
                {openItem === item.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              
              {openItem === item.id && item.answer && (
                <div className="px-6 py-4 text-gray-600 border-t bg-[#F0F6E6] border-slate-300">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 lg:flex justify-center space-y-3 lg:space-y-0 gap-4 mb-8" >
          <button className="bg-primary hover:bg-green-500 text-secondary w-full font-semibold px-6 py-3 rounded-full transition-colors duration-200">
            Sign Up for Free
          </button>
          <button className="border border-gray-300 font-semibold w-full  hover:border-gray-400 px-6 py-3 rounded-full transition-colors duration-200">
            Explore Skillovia Now
          </button>
        </div>
      </div>
    </div>

    </LandingUtili>
  );
};

export default FAQSection;