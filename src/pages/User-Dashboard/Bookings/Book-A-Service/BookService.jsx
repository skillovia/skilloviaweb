import { ArrowLeft, Star } from 'lucide-react';
import React from 'react';
import UserLayout from '../../UserLayout/UserLayout';
import BackButton from '../../../../componets/Back';
import { Link, useLocation } from 'react-router-dom';

const BookService = () => {
  const location = useLocation();
  const { user, skill } = location.state || {};

  // Extract thumbnail URLs from skill data
  const thumbnails = skill ? [
    skill.thumbnail01,
    skill.thumbnail02,
    skill.thumbnail03,
    skill.thumbnail04
  ].filter(Boolean) : [];  // Filter out any null/undefined values

  if (!user || !skill) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p>No service details available.</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 rounded-lg">
        <div className="flex items-center gap-4 mb-6">
          <BackButton label={skill.skill_type} />
          <Link 
            to="/book-form" 
            state={{ user, skill }}
            className="ml-auto px-4 py-1 bg-book rounded-full hover:bg-yellow-200"
          >
            Book
          </Link>
        </div>

        {/* Image Gallery */}
        <div className="flex overflow-x-auto lg:grid lg:grid-cols-3 gap-4 mb-8">
          {thumbnails.length > 0 ? (
            thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={`https://${thumbnail}`}
                alt={`${skill.skill_type} ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))
          ) : (
            // Fallback image if no thumbnails are available
            <img
              src="https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
              alt="Service default"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}
        </div>

   

        <div className="mb-8">
          <h2 className="font-semibold mb-2">Service Description</h2>
          <p className="text-gray-600">{skill.description}</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-600">Experience Level: {skill.experience_level}</span>
          </div>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <span>Hourly rate</span>
              <span className="font-semibold">${skill.hourly_rate}</span>
            </div>
          </div>
        </div>

   
      </div>
    </UserLayout>
  );
};

export default BookService;