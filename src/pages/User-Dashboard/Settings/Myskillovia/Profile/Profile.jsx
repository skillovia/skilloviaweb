import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';
import ProfilePhotoUpload from './ProfileUpload';

const Profile = () => {
  const [formData, setFormData] = useState({
    expertVisibility: true,
    firstName: '',
    lastName: '',
    email: '',
    website: '',
    city: '',
    streetAddress: '',
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
          }
        );

        const data = await response.json();
        if (data.status === 'success') {
          setFormData(prev => ({
            ...prev,
            firstName: data.data.firstname || '',
            lastName: data.data.lastname || '',
            email: data.data.email || '',
            website: data.data.website || '',
            city: data.data.location || '',
            streetAddress: data.data.street || '',
            zipCode: data.data.zip_code || '',
            gender: data.data.gender || ''
          }));
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

  const handleSubmit = async () => {
    if (!userId) {
      setError('User ID not found');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
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
            password: formData.password,
            location: formData.city,
            street: formData.streetAddress,
            zip_code: formData.zipCode,
            website: formData.website
          })
        }
      );

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

              <ProfilePhotoUpload />
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
                          value={formData.city}
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
                          value={formData.streetAddress}
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
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                          placeholder="ZIP code"
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