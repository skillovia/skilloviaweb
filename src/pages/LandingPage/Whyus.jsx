import React from 'react';
import { Wallet, Leaf, Shield, Clock } from 'lucide-react';

const NumberDisplay = ({ number }) => (
  <div className="relative w-32 h-32">
    <svg viewBox="0 0 100 100" className="w-full h-full">
      <defs>
        <clipPath id={`clip-${number}`}>
          <text
            x="50"
            y="75"
            fontSize="180"
            fontWeight="bold"
            textAnchor="middle"
            // fontFamily="sans-serif"
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
  </div>
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

  return (
    <>
      <div className="bg-[#bfcab4] min-h-screen">
        <div className="mx-auto">
          <section className="desc px-4 lg:px-[4rem] py-8 lg:py-[5rem]">
            <p className="text-lg text-gray-600 mb-2">Why Join Skillovia?</p>
            <h2 className="lg:text-[4rem] text-[2rem] font-bold lg:leading-[4.2rem] text-gray-800">
              Why You'll Love<br />
              Skillovia
            </h2>
          </section>

          <div className=" pb-16 grid lg:grid-cols-2 gap-10 px-4 lg:px-[4rem]  ">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-off rounded-xl py-[4rem] px-4 lg:px-[5rem] transition-all hover:shadow-xl group relative overflow-hidden"
              >
               
                    <section className=" flex rounded-r-2xl bnorder">

                  <NumberDisplay number={benefit.number} />
                  <div className="flevx items-center gap-3 ">
                      <div className="p-3 bg-gray-50 rounded-xl shadow-sm">
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold text-secondary">
                        {benefit.title}
                      </h3>
                    </div>
                    </section>


                  <div className="">
                  
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
              
                
               
              </div>
            ))}
          </div>
        </div>
      </div>
  
      <section className="ad">
        <img src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736693122/rsz_iphone_mockup3_nvown8_s3wrr2.png" className='h-[120vh] w-full object-cover' alt="" />
    </section>
    </>
  );
};

export default WhyLoveSkillovia;

