import React, { createContext, useState, useContext, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

// Create the context
const UserProfileContext = createContext();

// Custom hook to use the profile context
export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};

// Helper function to ensure HTTPS URLs
const ensureHttps = (url) => {
  if (!url) return '';
  if (url.startsWith('https://')) return url;
  if (url.startsWith('http://')) return url.replace('http://', 'https://');
  return `https://${url}`;
};

// Provider component
export const UserProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const updateProfile = async () => {
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

      const response = await fetch(`https://testapi.humanserve.net/api/users/profile/${user_id}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      const updatedData = {
        ...data.data,
        photourl: ensureHttps(data.data.photourl)
      };
      setProfileData(updatedData);
      
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      throw new Error('Please upload an image file');
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      throw new Error('File size should be less than 5MB');
    }

    setUploading(true);
    
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) throw new Error('Access token not found');

      const formData = new FormData();
      formData.append('photo', file);

      const response = await fetch('https://testapi.humanserve.net/api/users/profile/upload', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      
      setProfileData(prev => ({
        ...prev,
        photourl: ensureHttps(data.photourl || data.data?.photourl)
      }));

      return data;
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    updateProfile();
  }, []);

  // Loading component
  if (loading) {
    return <div className=" justify-center items-center hidden">
      <Loader2 className="animate-spin w-12 h-12 text-secondary" />
    </div>;
  }

  // Error component
  if (error) {
    return <div className="text-red-500">Error loading profile: {error}</div>;
  }

  const value = {
    profile: profileData,
    loading,
    error,
    uploading,
    updateProfile,
    handleImageUpload,
    // Convenience getters
    fullName: profileData ? `${profileData.firstname} ${profileData.lastname}` : '',
    photoUrl: profileData?.photourl || '/default-avatar.png',
    email: profileData?.email || '',
    bio: profileData?.bio || '',
    skills: profileData?.skills || [],
  };

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};