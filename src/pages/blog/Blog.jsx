import React from 'react';
import { ArrowUpRight, ChevronRight } from 'lucide-react';
import LandingUtili from '../../utils/LandingUtili';
import { Link } from 'react-router-dom';

const Blog = () => {
  const stories = [
    {
      id: 1,
      title: 'UX review presentations',
      description: 'How do you make compelling presentations that wow your colleagues and impress your managers?',
      image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1735533079/Image_5_jfw0jg.png',
    },
    {
      id: 2,
      title: 'UX review presentations',
      description: 'How do you make compelling presentations that wow your colleagues and impress your managers?',
      image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1735533076/Image_6_julxht.png',
    },
    {
      id: 3,
      title: 'UX review presentations',
      description: 'How do you make compelling presentations that wow your colleagues and impress your managers?',
      image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1735533072/Image_7_urqzra.png',
    },
    {
      id: 4,
      title: 'UX review presentations',
      description: 'How do you make compelling presentations that wow your colleagues and impress your managers?',
      image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1735533115/Image_8_tqsoxz.png',
    },
    {
      id: 5,
      title: 'UX review presentations',
      description: 'How do you make compelling presentations that wow your colleagues and impress your managers?',
      image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1735533118/Image_9_lwaygh.png',
    },
    {
      id: 6,
      title: 'UX review presentations',
      description: 'How do you make compelling presentations that wow your colleagues and impress your managers?',
      image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1735533123/Image_10_svd4rc.png',
    },
 
  ];

  return (
    <LandingUtili>

  
    <div className="min-h-screen bg-[#F6FCEB] lg:p-6 px-4 pt-[6rem] lg:pt-[10rem]">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="mb-12">
          <div className="lg:flex justify-between items-start mb-6">
            <h1 className="text-4xl font-bold max-w-xl">
              Insights and Stories from the Skillovia Community
            </h1>
            <p className="text-gray-600 max-w-sm">
              Explore stories of success, learn new skills, and stay updated on the latest Skillovia news.
            </p>
          </div>

          <div className="relative w-full h-[400px] rounded-2xl overflow-hidden mb-8">
            <img
              src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327875/1bd862de8ec078433117a636b6b15a20_qynrpz.jpg"
              alt="Community gathering"
              className="w-full h-full object-cover"
            />
          </div>

          <p className="text-gray-600 max-w-3xl">
            The Skillovia Blog is your go-to resource for tips on skill-sharing, community-building, and
            personal growth. Whether you want to learn more about how to make the most of Skillovia, get
            inspired by real stories from users, or find out what's coming next, this is the place to be.
          </p>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <div
              key={story.id}
              className="group cursor-pointer"
            >
              <div className="relative h-[14rem] mb-4 rounded-lg overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex items-start">
                <div className="flex-1">
                  <h3 className="font-medium mb-2">{story.title}</h3>
                  <p className="text-sm text-gray-600">{story.description}</p>
                </div>
                <Link to = "/blog-details">
                <ArrowUpRight  className="w-5 h-5 text-gray-400 mt-1 transition-transform duration-300 group-hover:translate-x-1" />

                </Link>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>


    </LandingUtili>
  );
};

export default Blog;