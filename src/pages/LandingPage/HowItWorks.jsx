import React from 'react';
import { UserPlus, Search, Users, MessageSquare } from 'lucide-react';

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

  return (
    <div className="bg-darkSec min-h-screen text-white px-4 lg:px-[4rem] py-[4rem]">
      <div className=" mx-auto">
        <div className="mb-12">
          <p className="text-sm mb-2">How It Works</p>
          <h1 className="lg:text-[4rem] text-[1.9rem] font-bold lg:leading-[4.2rem]">
            How Does<br />
            Skillovia Work?
          </h1>
        </div>

        <div className="space-y-12 lg:pl-[30rem]">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-6">
              <div className="bg-[#86E461] rounded-full p-3 mt-1">
                <div className="text-black">
                  {step.icon}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
                {index !== steps.length - 1 && (
                  <div className="border-b border-gray-700 mt-12"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowSkilloviaWorks;