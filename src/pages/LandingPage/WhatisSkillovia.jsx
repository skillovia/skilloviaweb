import React from 'react';

const WhatisSkillovia = () => {
  const sections = [
    {
      title: "Cost-Effective",
      description: "Save money and resources right around the block",
      bgColor: "bg-primary",
      textColor: "text-gray-800"
    },
    {
      title: "Stronger Communities",
      description: "Build trust and connections close to your home",
      bgColor: "bg-yellow-300",
      textColor: "text-gray-800"
    },
    {
      title: "Eco-Friendly",
      description: "Help reduce your footprint in the city",
      bgColor: "bg-darkSec",
      textColor: "text-white"
    }
  ];

  return (
    <div className=" mx-autvo  bg-[#bfcab4] pb-[7rem]">
      <section className="lg:mb-8 px-4 lg:px-[4rem] py-12 lg:py-[5rem]">
        <h1 className="tlg:ext-[4rem] text-[1.8rem] font-bold  text-darkSec ">
          Hyperlocal Skill Sharing,
        </h1>
        <h2 className="lg:text-[4rem]  text-[1.8rem] font-bold lg:leading-[3rem] text-darkSec">
          Right Around the Corner
        </h2>
      </section>

      <div className="space--[4rem] grid grid-cols-1 lg:grid-cols-3 px-4 lg:px-[4rem] gap-8">
        {sections.map((section, index) => (
          <div
            key={index}
            className={`${section.bgColor} ${section.textColor} rounded-t-3xl  p-6 pb-0 transition-transform hover:scale-102`}
          >
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
              <p className="opacity-90">{section.description}</p>
            </div>
            
            <div className="bg-gray-800 rounded-t-3xl overflow-hidden">
              <img 
                src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327698/Section_image_wtvp13.png" 
                alt="Skill sharing illustration"
                className="w-full h-[17rem] object-cover opacity-90"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhatisSkillovia;