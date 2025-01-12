import React from 'react';
import { ArrowLeft } from 'lucide-react';
import BackButton from '../../../componets/Back';
import UserLayout from '../UserLayout/UserLayout';

const ExploreList = () => {
  const suggestions = [
    { id: '1', name: 'Sophia Johnson', username: '@sophiaJJ', image: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { id: '2', name: 'Emily Davis', username: '@davis', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '3', name: 'Oliver Smith', username: '@oliverSmith', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '4', name: 'Ava Brown', username: '@avaBrown', image: 'https://randomuser.me/api/portraits/women/3.jpg' },
    { id: '5', name: 'Noah Wilson', username: '@WilsonNoah', image: 'https://randomuser.me/api/portraits/men/2.jpg' },
    { id: '6', name: 'Emma Martinez', username: '@emmaMtz', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
  ];

  return (
    <UserLayout>

   

    <div className="max-w-4xl mx-auto min-h-screen">
      <div className="flex items-center gap-3 p-4 ">
       <BackButton label='Explore'/>
        <h1 className="text-xl font-semibold">DIY</h1>
      </div>

      <div className="p-4 space-y-4">
        {suggestions.map((person) => (
          <div key={person.id} className="flex items-center justify-between border border-gray bg-input p-4 rounded-lg">
            <div className="flex items-center gap-3">
              {person.image ? (
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-lg">
                    {person.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h3 className="font-medium">{person.name}</h3>
                <p className="text-sm text-gray-600">{person.username}</p>
              </div>
            </div>
            <button className="px-4 py-1.5 border border-gray-300 rounded-full hover:bg-gray-50 text-sm">
              Follow
            </button>
          </div>
        ))}
      </div>
    </div>

    </UserLayout>
  );
};

export default ExploreList;