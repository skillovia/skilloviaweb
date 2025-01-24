import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';

const Profile = () => {
  const [formData, setFormData] = useState({
    expertVisibility: true,
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    city: '',
    streetAddress: '',
    aptSuite: '',
    zipCode: '',
    openingTime: '00:00',
    closingTime: '00:00',
    weekendsInclusive: false,
    gender: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  const userId = localStorage.getItem('decodedToken') 
    ? JSON.parse(localStorage.getItem('decodedToken')).id 
    : null;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile/${userId}`,
          
          {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        const data = await response.json();
        console.log(data);
        
        if (data.status === 'success') {
          setFormData(prev => ({
            ...prev,
            ...data.data,
            firstName: data.data.firstname || '',
            lastName: data.data.lastname || '',
          }));
          if (data.data.photo) {
            setPhotoPreview(data.data.photo);
          }
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error loading profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggle = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };
 const uploadPhoto = async () => {
    if (!photoFile) return null;

    const formData = new FormData();
    formData.append('photo', photoFile);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/profile/upload`,
        {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: formData
      });

      const data = await response.json();
      if (data.status === 'success') {
        // Update local storage with new photo URL
        const currentProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
        const updatedProfile = {
          ...currentProfile,
          photourl: data.data.photo
        };
        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        
        // Trigger a custom event to notify other components
        window.dispatchEvent(new Event('profileUpdated'));
        
        return data.data.photo;
      }
      return null;
    } catch (err) {
      console.error('Error uploading photo:', err);
      return null;
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) return;
      
      setIsLoading(true);
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile/${userId}`,
          
          {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        });

        const data = await response.json();
        if (data.status === 'success') {
          // Store the profile data in localStorage
          localStorage.setItem('userProfile', JSON.stringify(data.data));
          
          setFormData(prev => ({
            ...prev,
            ...data.data,
            firstName: data.data.firstname || '',
            lastName: data.data.lastname || '',
          }));
          if (data.data.photo) {
            setPhotoPreview(data.data.photo);
          }
        }
      } catch (err) {
        setError('Failed to load profile data');
        console.error('Error loading profile:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleSubmit = async () => {
    if (!userId) {
      setError('User ID not found');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      // Handle photo upload first if there's a new photo
      if (photoFile) {
        await uploadPhoto();
      }

      // Only send the fields that the API accepts
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/update/${userId}`,
        {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
        },
        body: JSON.stringify({
          email: formData.email,
          firstname: formData.firstName,  
          lastname: formData.lastName,   
          gender: formData.gender,
          password: formData.password
        })
      });

      const data = await response.json();
      if (data.status === 'success') {
        console.log('Profile updated successfully');
      } else {
        setError('Failed to update profile');
      }
    } catch (err) {
      setError('Something went wrong while updating profile');
      console.error('Error updating profile:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Custom Toggle Switch Component
  const Toggle = ({ checked, onChange }) => {
    return (
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors ${
          checked ? 'bg-primary' : 'bg-gray-500'
        }`}
      >
        <div
          className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-secondary transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    );
  };

  // Custom Select Component
  const TimeSelect = ({ value, onChange, name }) => {
    return (
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          name={name}
          className="w-full appearance-none bg-input border-gray border rounded-md px-3 py-2 pr-8"
        >
          {[...Array(24)].map((_, i) => (
            <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
              {`${i.toString().padStart(2, '0')}:00 ${i < 12 ? 'am' : 'pm'}`}
            </option>
          ))}
        </select>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto lg:p-6 px-3">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin w-12 h-12 text-secondary" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <BackButton label='Edit profile' />
              </div>
              <button 
                onClick={handleSubmit}
                disabled={isSaving}
                className="bg-primary text-secondary font-semibold px-4 py-2 rounded-full hover:bg-green-500 transition-colors flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="animate-spin w-4 h-4" />
                    <span>Saving...</span>
                  </>
                ) : (
                  'Save changes'
                )}
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md">
                {error}
              </div>
            )}

            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <img
                      src={photoPreview || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"}
                      alt="Profile"
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
                      <Check className="w-4 h-4 text-secondary" />
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="font-medium mb-1">Expert visibility</h3>
                  <p className="text-sm text-gray-500">Make yourself visible to clients</p>
                </div>
                <Toggle 
                  checked={formData.expertVisibility}
                  onChange={() => handleToggle('expertVisibility')}
                />
              </div>

              <form className="space-y-6">
                <h3 className="font-medium">Personal details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">First name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Last name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Website link</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Enter your website"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Gender</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                    >
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Location details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">City</label>
                        <input
                          type="text"
                          name="city"
                          value={formData.location}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                          placeholder="Your city"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Street address</label>
                        <input
                          type="text"
                          name="streetAddress"
                          value={formData.street}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                          placeholder="St. Address"
                        />
                      </div>

               
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">ZIP/Postal Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.zip_code}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                          placeholder="ZIP code"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-4">Work times</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Weekdays</label>
                        <div className="flex space-x-4">
                          <TimeSelect
                            value={formData.openingTime}
                            onChange={handleInputChange}
                            name="openingTime"
                          />
                          <TimeSelect
                            value={formData.closingTime}
                            onChange={handleInputChange}
                            name="closingTime"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium">Weekends inclusive</h3>
                          <p className="text-sm text-gray-500">Make times applicable to weekends</p>
                        </div>
                        <Toggle
                          checked={formData.weekendsInclusive}
                          onChange={() => handleToggle('weekendsInclusive')}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </UserLayout>
  );
}

export default Profile;