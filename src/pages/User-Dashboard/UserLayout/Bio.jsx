import React, { useState, useEffect } from 'react';
import { Pencil, Check, X, Loader, MapPin } from 'lucide-react';

const EditableProfile = ({ 
  initialBio, 
  location, 
  street, 
  zip_code,
  lon,
  lat
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [geocodeError, setGeocodeError] = useState(null);
  const [formData, setFormData] = useState({
    bio: initialBio || '',
    location: location || '',
    street: street || '',
    zip_code: zip_code || '',
    lon: lon || null,
    lat: lat|| null
  });

  // Geocoding effect to convert address to coordinates using Google Geocoding API
  useEffect(() => {
    const geocodeAddress = async () => {
      // Only attempt geocoding if we have a complete address
      if (formData.street && formData.location && formData.zip_code) {
        try {
          // Use Google Geocoding API
          const apiKey = "AIzaSyChFAjrSODzkkKl_TaCCslNXdHwIWR-_uw";
          const address = `${formData.street}, ${formData.location}, ${formData.zip_code}`;
          
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
          );
          
          const data = await response.json();
        console.log(data);
          
          if (data.status === 'OK' && data.results.length > 0) {
            const { lng, lat } = data.results[0].geometry.location;
            
            console.log('Geocoded Coordinates:', { lon: lng, lat: lat });

            setFormData(prev => ({
              ...prev,
              lon: lng,
              lat: lat,
              formatted_address: data.results[0].formatted_address
            }));
            
            setGeocodeError(null);
          } else {
            setGeocodeError('Could not find coordinates for this address');
            setFormData(prev => ({
              ...prev,
              lon: null,
              lat: null,
              formatted_address: null
            }));
          }
        } catch (error) {
          console.error('Geocoding error:', error);
          setGeocodeError('Failed to geocode address');
          setFormData(prev => ({
            ...prev,
            long: null,
            lat: null,
            formatted_address: null
          }));
        }
      }
    };

    // Only run geocoding when in editing mode and address fields are filled
    if (isEditing) {
      geocodeAddress();
    }
  }, [
    formData.street, 
    formData.location, 
    formData.zip_code, 
    isEditing
  ]);

  const handleUpdate = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem('accessToken');

      // Extract longitude and latitude from formData
      const { lon, lat, ...otherFormData } = formData;

      const payload = {
        ...otherFormData,
        lon,
        lat
      };

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/profile/update/bio`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to update profile');
      }

      console.log('Saved Bio:', payload.bio);
      console.log('Saved Location:', payload.location);

      setIsEditing(false);
    } catch (error) {
      console.error('Profile update failed:', {
        timestamp: new Date().toISOString(),
        error: error.message,
        formData,
        stack: error.stack
      });
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
    setGeocodeError(null);
    setFormData(prev => ({
      ...prev,
      bio: initialBio || '',
      location: location || '',
      street: street || '',
      zip_code: zip_code || '',
      lon: lon || null,
      lat: lat || null
    }));
  };

  if (isEditing) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="font-semibold">Edit My Bio</div>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              disabled={isLoading}
              className="text-green-500 hover:text-green-600 disabled:opacity-50"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Check className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={isLoading}
              className="text-red-500 hover:text-red-600 disabled:opacity-50"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-100 border border-red-200 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        {geocodeError && (
          <div className="p-3 bg-yellow-100 border border-yellow-200 text-yellow-700 rounded-md text-sm">
            {geocodeError}
          </div>
        )}

        <div className="space-y-3">
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
            className="w-full p-2 text-sm text-gray-600 border border-gray bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            placeholder="Write your bio..."
            rows={3}
            disabled={isLoading}
          />

          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="w-full p-2 text-sm text-gray-600 border border-gray bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            placeholder="Location"
            disabled={isLoading}
          />

          <input
            type="text"
            value={formData.street}
            onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
            className="w-full p-2 text-sm text-gray-600 border border-gray bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            placeholder="Street"
            disabled={isLoading}
          />

          <input
            type="text"
            value={formData.zip_code}
            onChange={(e) => setFormData(prev => ({ ...prev, zip_code: e.target.value }))}
            className="w-full p-2 text-sm text-gray-600 border border-gray bg-input rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
            placeholder="ZIP Code"
            disabled={isLoading}
          />

          {formData.lon && formData.lat && (
            <div className="text-sm text-gray-500">
              Coordinates: {formData.lon.toFixed(4)}, {formData.lat.toFixed(4)}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h2 className='font-semibold'>My Bio</h2>
        <button
          onClick={() => setIsEditing(true)}
          className="text-gray-500 hover:text-gray-700"
        >
          <Pencil className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">
          {formData.bio || "No bio available"}
        </p>
        {formData.location && (
          <p className="text-sm text-gray-500">
            <span className="font-medium capitalize flex space-x-1 text-secondary">
              <MapPin size={20} />
              <p className="text-sm text-gray-500">
                {formData.location}, {formData.street}, {formData.zip_code}
              </p>
            </span> 
          </p>
        )}
        {formData.lon && formData.lat && (
          <p className="text-xs text-gray-400">
            Coordinates: {formData.lon.toFixed(4)}, {formData.lat.toFixed(4)}
          </p>
        )}
      </div>
    </div>
  );
};

export default EditableProfile;