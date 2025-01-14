import React from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import UserLayout from './UserLayout';
import SlidingPockets from './CashToken';
import { Link } from 'react-router-dom';

const ProfileCard = () => {
  // Helper function to render star rating
  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          index < rating ? 
            <FaStar key={index} className="text-yellow-400 text-sm" /> :
            <FaRegStar key={index} className="text-gray-300 text-sm" />
        ))}
      </div>
    );
  };

  return (
    <UserLayout>


   
    <div className="max-w-4xl   px-4 space-y-4">
      {/* Header - Profile Section */}
      <div className="flex justify-between items-start">
        <div className="text-lg font-semibold">Profile</div>
        <Link to ='/settings'>
        <IoMdSettings className="text-gray-500" />
        </Link>
      </div>

      {/* Profile Info */}
      <div className="flex items-center gap-4">
        <img 
          src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736640844/85c053224d98bfd7e680608c07f3c239_mkwnxc.png" 
          alt="Profile" 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold">Darnell Mertz</div>
          <div className="text-sm text-gray-500">@techsound23</div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-4 text-sm">
        <div>
          <div className="font-semibold">1.2k</div>
          <div className="text-gray-500">followers</div>
        </div>
        <div>
          <div className="font-semibold">404</div>
          <div className="text-gray-500">following</div>
        </div>
      </div>

      {/* Pockets Section */}
    <SlidingPockets />

      {/* Bio Section */}
      <div>
        <div className="font-semibold mb-2">Bio</div>
        <p className="text-sm text-gray-600">
          Passionate about creativity and innovation, this individual thrives on exploring new ideas and pushing boundaries. With a love for nature and travel, they find...
        </p>
      </div>

      {/* Skills Section */}
      <div>
        <div className="font-semibold mb-2">Skills</div>
        <div className="space-y-3">
          {[4, 5, 4].map((rating, index) => (
            <div key={index} className="bg-input border border-gray rounded-lg p-3">
              <div className="flex justify-between items-center mb-1">
                <div className="text-sm font-medium">Dog walking</div>
                <StarRating rating={rating} />
              </div>
              <div className="text-xs text-gray-500">Experience level: Expert</div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </UserLayout>
  );
};

export default ProfileCard;