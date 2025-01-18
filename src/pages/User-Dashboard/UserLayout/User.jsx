import React, { useState, useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa';
import { IoMdSettings } from 'react-icons/io';
import UserLayout from './UserLayout';
import SlidingPockets from './CashToken';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const ProfileCard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Helper function to ensure URL starts with https://
  const ensureHttps = (url) => {
    if (!url) return '';
    if (url.startsWith('https://')) return url;
    if (url.startsWith('http://')) return url.replace('http://', 'https://');
    return `https://${url}`;
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('File size should be less than 5MB');
      return;
    }

    setUploading(true);
    
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token not found');

      const formData = new FormData();
      formData.append('photo', file);  

      const response = await fetch( 
        `${import.meta.env.VITE_BASE_URL}/users/profile/upload`,
        
        {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      
      // Update profile data with new photo URL
      setProfileData(prev => ({
        ...prev,
        photourl: ensureHttps(data.photourl || data.data?.photourl)
      }));

    } catch (err) {
      console.error('Error uploading image:', err);
      alert('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const decodedToken = JSON.parse(localStorage.getItem('decodedToken'));
        const user_id = decodedToken?.id;
        
        if (!user_id) {
          throw new Error('User ID not found in token');
        }

        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile/${user_id}`,
          {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        // Ensure photourl uses https before setting profile data
        const updatedData = {
          ...data.data,
          photourl: ensureHttps(data.data.photourl)
        };
        setProfileData(updatedData);
        console.log('Updated profile data:', updatedData);
        
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

  if (loading) {
    return (
      <UserLayout>
     <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin w-12 h-12 text-secondary" />
          </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="max-w-4xl px-4 py-8 text-red-500">
          Error loading profile: {error}
        </div>
      </UserLayout>
    );
  }

  if (!profileData) {
    return (
      <UserLayout>
        <div className="max-w-4xl px-4 py-8">
          No profile data available
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl px-4 space-y-4">
        <div className="flex justify-between items-start">
          <div className="text-lg font-semibold">Profile</div>
          <Link to="/settings">
            <IoMdSettings className="text-gray-500" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <img 
              src={profileData.photourl || '/default-avatar.png'}
              alt="Profile" 
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/default-avatar.png';
              }}
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              <span className="text-white text-xs">
                {uploading ? 'Uploading...' : 'Change'}
              </span>
            </label>
          </div>
          <div>
            <div className="font-semibold">{profileData.firstname} {profileData.lastname}</div>
            <div className="text-sm text-gray-500">{profileData.email}</div>
          </div>
        </div>

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

        <SlidingPockets />

        <div>
          <div className="font-semibold mb-2">Bio</div>
          <p className="text-sm text-gray-600">
            {profileData.bio || "No bio available"}
          </p>
        </div>

        <div>
          <div className="font-semibold mb-2">Skills</div>
          <div className="space-y-3">
            {profileData.skills?.map((skill, index) => (
              <div key={index} className="bg-input border border-gray rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <div className="text-sm font-medium">{skill.skill_type}</div>
                  <StarRating rating={parseInt(skill.hourly_rate) || 0} />
                </div>
                <div className="text-xs text-gray-500">
                  Experience level: {skill.experience_level}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {skill.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default ProfileCard;