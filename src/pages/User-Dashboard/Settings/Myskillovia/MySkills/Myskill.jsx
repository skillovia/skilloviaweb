import React from 'react';
import { ChevronLeft, Plus, Edit, Star, Tag } from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';
import { Link } from 'react-router-dom';

const MySkillsPage = () => {
  const skills = [
    {
      id: 1,
      title: "Dog walking",
      category: "Pet Care",
      experienceLevel: "Expert",
      rating: 4,
      description: "Hey there! I'm a dedicated dog lover ready to take your furry friend on exciting walks. With a genuine passion for pets and a commitment to their well-being, I'll ensure your dog gets the exercise and care they deserve. I may not be a designer...",
      hourlyRate: 20,
      sparkTokens: 2,
      link: "/settings/skills-details"
    },
    {
      id: 2,
      title: "Dog walking",
      category: "Pet Care",
      experienceLevel: "Expert",
      rating: 4,
      description: "Hey there! I'm a dedicated dog lover ready to take your furry friend on exciting walks. With a genuine passion for pets and a commitment to their well-being, I'll ensure your dog gets the exercise and care they deserve. I may not be a designer...",
      hourlyRate: 20,
      sparkTokens: 2,
         link: "/settings/skills-details"
      
    }
  ];

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <BackButton label='My Skills' />
          <Link to ='/settings/skill/add' className="px-4 py-2 text-secondary bg-primary rounded-full flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add a skill
          </Link>
        </header>

        {/* Skills List */}
        {skills.map((skill) => (
          <div key={skill.id} className="mb-4 p-4 bg-input border border-gray rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <h2 className="font-medium">{skill.title}</h2>
             
              </div>
              <Link to ={skill.link}>
              <Edit className="w-4 h-4 text-gray-500" />
              </Link>
            </div>
            
            <div className="flex items-center gap-1 mb-2">
              <span className="text-sm text-gray-600">Experience level: {skill.experienceLevel}</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < skill.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{skill.description}</p>

            {/* Hourly Rate */}
            <div className="">
              <h3 className="text-sm font-medium mb-2">Hourly rate</h3>
              <p className="text-gray-600">£{skill.hourlyRate} - {skill.sparkTokens} spark tokens</p>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  );
};

export default MySkillsPage;