import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const FollowButton = ({ userId: propUserId }) => {
  const { id: paramUserId } = useParams();
  const userId = propUserId || paramUserId; // Use prop if available, fall back to URL param
  
  const [isLoading, setIsLoading] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isFollowing, setIsFollowing] = useState(() => {
    const stored = localStorage.getItem(`following_${userId}`);
    return stored === 'true';
  });

  // Don't render if we don't have a userId from either source
  if (!userId) {
    console.warn('FollowButton: No userId provided via props or URL params');
    return null;
  }

  const handleFollow = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }

      const url = `${import.meta.env.VITE_BASE_URL}/follows/${isFollowing ? 'unfollow' : 'follow'}/${userId}`;
      const method = isFollowing ? 'DELETE' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.status === "success") {
        const newFollowingState = !isFollowing;
        setIsFollowing(newFollowingState);
        localStorage.setItem(`following_${userId}`, newFollowingState.toString());
      }
    } catch (error) {
      console.error('Error updating follow status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleFollow}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      disabled={isLoading}
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
        ${isLoading ? 'cursor-not-allowed opacity-50' : ''}
      `}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mx-auto" />
      ) : (
        <>
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
        </>
      )}
    </button>
  );
};

export default FollowButton;