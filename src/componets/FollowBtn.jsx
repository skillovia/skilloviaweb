import React, { useState } from 'react';

const FollowButton = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();  // Prevent link navigation if button is inside a link
    setIsFollowing(!isFollowing);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`
        px-4 py-1.5 
        border rounded-full 
        text-sm
        transition-all 
        duration-200 
        ${isFollowing 
          ? 'border-gray-300 bg-gray-50 hover:border-red-200 hover:bg-red-50' 
          : 'border-gray-300 hover:bg-gray-50'
        }
      `}
    >
      <span className={`
        inline-block 
        transition-all 
        duration-200 
        ${isFollowing ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100 w-auto'}
      `}>
        Follow
      </span>
      <span className={`
        inline-block 
        transition-all 
        duration-200
        ${!isFollowing ? 'opacity-0 scale-0 w-0' : 'opacity-100 scale-100 w-auto'}
        ${isHovering ? 'text-red-500' : ''}
      `}>
        {isHovering ? 'Unfollow' : 'Following'}
      </span>
    </button>
  );
};

export default FollowButton;