import React from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../UserLayout/UserLayout';
import Verify from '../Verify/Verify';
import { ChevronRight } from 'lucide-react';

const categories = [
  { id: '1', name: 'DIY', image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1732441112/Image_1_byedwn.png' },
  { id: '2', name: 'Baby sitting', image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1732441115/Image_sfljtt.png' },
  { id: '3', name: 'Arts & Crafts', image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1732441108/Image_2_dnlbzw.png' },
  { id: '4', name: 'Cooking', image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1732441112/Image_1_byedwn.png' },
  { id: '5', name: 'Photography', image: 'https://res.cloudinary.com/dmhvsyzch/image/upload/v1732441115/Image_sfljtt.png' },
];

const people = [
  { id: '1', name: 'Sophia Johnson', username: '@sophiaJJ', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { id: '2', name: 'Emily Davis', username: '@davis', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', name: 'Oliver Smith', username: '@oliverSmith', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '4', name: 'Ava Brown', username: '@avaBrown', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '5', name: 'Noah Wilson', username: '@WilsonNoah', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '6', name: 'Emma Martinez', username: '@emmaMtz', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
];

const ExploreSection = () => {
  return (
    <UserLayout>
      <Verify />
      <div className="max-w-4xl mx-auto px-4 rounded-lg">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Explore categories</h2>
            <Link 
              to="/explore-list" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {categories.map(category => (
              <Link 
                key={category.id} 
                to={`/explore-list`}
                className="group cursor-pointer flex flex-col items-center flex-shrink-0"
              >
                <div className="w-36 h-36 mb-2 overflow-hidden rounded-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <p className="text-sm text-center text-gray-800">{category.name}</p>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">People nearby</h2>
        
          </div>
          <div className="flex gap-8 overflow-x-auto pb-4">
            {people.map(person => (
              <Link 
                key={person.id} 
                // to={`/profile/${person.id}`}
                to="/book-profile"
                className="flex flex-col items-center flex-shrink-0 hover:opacity-90 transition-opacity"
              >
                <div className="w-24 h-24 mb-2 overflow-hidden rounded-full">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm text-center text-gray-800 whitespace-nowrap">
                  {person.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ExploreSection;