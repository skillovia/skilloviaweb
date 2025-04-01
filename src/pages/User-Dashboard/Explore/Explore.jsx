import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../UserLayout/UserLayout';
import Verify from '../Verify/Verify';
import { ChevronRight, Loader2, MapPin, Route, UserX } from 'lucide-react';

const ExploreSection = () => {
  const [nearbyPeople, setNearbyPeople] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [error, setError] = useState('');
  const [categoriesError, setCategoriesError] = useState('');
  // State for filters
  const [stateFilter, setStateFilter] = useState('lagos');
  const [distanceFilter, setDistanceFilter] = useState('all');
  // User's position from token
  const [userPosition, setUserPosition] = useState(null);
  // User ID from token
  const [userId, setUserId] = useState(null);

  // State options
  const states = [
    { value: 'lagos', label: 'Lagos' },
    { value: 'abuja', label: 'Abuja' },
    { value: 'rivers', label: 'Rivers' },
    { value: 'kano', label: 'Kano' },
    { value: 'oyo', label: 'Oyo' },
    { value: 'kaduna', label: 'Kaduna' },
    { value: 'enugu', label: 'Enugu' },
    { value: 'delta', label: 'Delta' },
    { value: 'anambra', label: 'Anambra' },
    { value: 'ogun', label: 'Ogun' }
  ];

  // Distance options with their values in kilometers
  const distances = [
    { value: 'all', label: 'All Distances' },
    { value: '200', label: '0 - 5 miles' },
    { value: '500', label: '6 - 10 miles' },
    { value: '1000', label: '11 - 20 miles' },
    { value: '2000', label: '20+ miles' }
  ];

  const FilterDropdown = ({ icon: Icon, label, value, options, onChange }) => (
    <div className="relative flex-1">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="w-4 h-4 text-gray-600" />
        <label className="text-sm text-gray-600">{label}</label>
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 bg-input border border-gray rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  // Get user data from token
  useEffect(() => {
    try {
      const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
      const user_id = decodedToken?.id;
    
      console.log("Decoded token:", decodedToken);
      
      if (!user_id) {
        throw new Error("User ID not found in token");
      }
      
      setUserId(user_id);
      
      // Check if lat and lon are available in the token
      if (decodedToken?.lat && decodedToken?.lon) {
        const lat = parseFloat(decodedToken.lat);
        const lon = parseFloat(decodedToken.lon);
        
        if (!isNaN(lat) && !isNaN(lon)) {
          setUserPosition({
            latitude: lat,
            longitude: lon
          });
          
          console.log("User position from token:", { latitude: lat, longitude: lon });
        } else {
          console.error("Invalid coordinates in token:", decodedToken.lat, decodedToken.lon);
        }
      } else {
        console.log("No coordinates found in token, will use geolocation if available");
      }
    } catch (err) {
      console.error("Error reading user data from token:", err);
    }
  }, []);

  // Fallback to geolocation if no coordinates in token
  useEffect(() => {
    if (!userPosition && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          };
          setUserPosition(userPos);
          console.log("User position from geolocation:", userPos);
        },
        (error) => {
          console.error("Error getting location:", error);
          // Use default position if geolocation fails
          setUserPosition({
            latitude: 6.448270099999999,
            longitude: 7.5138947
          });
          console.log("Using default position due to geolocation error");
        }
      );
    }
  }, [userPosition]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsCategoriesLoading(true);
      setCategoriesError('');

      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          throw new Error('Authentication required');
        }

        const response = await fetch('https://skilloviaapi.vercel.app/api/skills/get/categories', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.status === 'success') {
          setCategories(data.data || []);
          console.log(data, "catg");
          
        } else {
          throw new Error(data.message || 'Failed to fetch categories');
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        setCategoriesError('Unable to load categories. Please try again later.');
      } finally {
        setIsCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPeople = async () => {
      // Don't fetch if we don't have position data yet
      if (!userPosition) {
        console.log("Waiting for user position data...");
        return;
      }
      
      setIsLoading(true);
      setError('');

      try {
        const accessToken = localStorage.getItem('accessToken');

        if (!accessToken) {
          throw new Error('Authentication required');
        }

        let url;
        
        if (distanceFilter === 'all') {
          // If no distance filter, use the state filter
          url = `https://skilloviaapi.vercel.app/api/users/people/within/${stateFilter}`;
          console.log("Fetching by state:", url);
        } else {
          // If distance filter is active, use the /nearby endpoint with coordinates and distance
          url = `https://skilloviaapi.vercel.app/api/users/people/nearby/${userPosition.latitude}/${userPosition.longitude}/${distanceFilter}`;
          console.log("Fetching by distance:", url);
        }
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        console.log("API response:", data);
        
        if (data.status === 'success') {
          // Ensure we set an empty array if data.data is null or undefined
          setNearbyPeople(data.data || []);
        } else {
          throw new Error(data.message || 'Failed to fetch people');
        }
      } catch (err) {
        console.error('Error fetching people:', err);
        setError('Unable to load people. Please try again later.');
        // Set to empty array when there's an error
        setNearbyPeople([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPeople();
  }, [stateFilter, distanceFilter, userPosition]); // Re-fetch when filters or position change

  // If we're still waiting for user position, show loading
  if (!userPosition) {
    return (
      <UserLayout>
        <Verify />
        <div className="max-w-4xl mx-auto px-4 rounded-lg">
          <div className="flex justify-center items-center py-16">
            <Loader2 className="animate-spin w-8 h-8 text-gray-500 mr-2" />
            <p>Loading your location data...</p>
          </div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <Verify />
      <div className="max-w-4xl mx-auto px-4 rounded-lg">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Explore categories</h2>
            <Link 
              to="/explore-list" 
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
            >
              View all
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {isCategoriesLoading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
            </div>
          )}

          {categoriesError && (
            <div className="text-red-500 text-center py-4">
              {categoriesError}
            </div>
          )}

          {!isCategoriesLoading && !categoriesError && (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {categories.length > 0 ? (
                categories.map(category => (
                  <Link 
                    key={category.id} 
                    to={`/explore-list?category=${encodeURIComponent(category.title)}`}
                    className="group cursor-pointer flex flex-col items-center p-2 rounded-md border bg-input border-gray flex-shrink-0"
                  >
                    <div className="w-36 h-36 mb-2 overflow-hidden rounded-lg">
                      <img
                        src={category.thumbnail ? `https://${category.thumbnail}` : 'https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg'}
                        alt={category.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <p className="text-sm text-left text-gray-800">{category.title}</p>
                  </Link>
                ))
              ) : (
                <div className="text-gray-500 text-center py-4 w-full">
                  No categories available.
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">People nearby</h2>
          </div>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg shadow-sm">
            <div className="flex gap-4">
              <FilterDropdown
                icon={MapPin}
                label="State"
                value={stateFilter}
                options={states}
                onChange={(value) => {
                  setStateFilter(value);
                  // Reset distance filter when state changes
                  setDistanceFilter('all');
                }}
              />
              <FilterDropdown
                icon={Route}
                label="Distance"
                value={distanceFilter}
                options={distances}
                onChange={(value) => {
                  setDistanceFilter(value);
                }}
              />
            </div>
          </div>
          {isLoading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center py-4">
              {error}
            </div>
          )}

          {!isLoading && !error && nearbyPeople.length === 0 && (
            <div className="flex flex-col items-center justify-center text-gray-500 text-center py-8">
              <UserX className="w-12 h-12 mb-2 text-gray-400" />
              <p>
                {distanceFilter === 'all' 
                  ? `No people found in ${states.find(s => s.value === stateFilter)?.label}.` 
                  : `No people found within ${distances.find(d => d.value === distanceFilter)?.label}.`}
              </p>
              <p className="text-sm mt-2">Try selecting different filters.</p>
            </div>
          )}

          {!isLoading && !error && nearbyPeople.length > 0 && (
            <div className="flex gap-8 overflow-x-auto pb-4">
              {nearbyPeople.map((person) => (
                <Link 
                  key={person.id} 
                  to={`/user-profile/${person.id}`}
                  className="flex flex-col items-center flex-shrink-0 hover:opacity-90 transition-opacity"
                >
                  <div className="w-24 h-24 mb-2 overflow-hidden rounded-full">
                    <img
                      src={person.photourl ? `${person.photourl}` : 'https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg'}
                      alt={person.firstname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-center flex space-x-2 text-gray-800 whitespace-nowrap">
                    <span>{person.firstname}</span>
                    <span>{person.lastname}</span>
                  </p>
                  {person.distance !== undefined && (
                    <p className="text-xs text-gray-500 mt-1">
                      {person.distance === 0 ? 'Less than 1 km' : `${person.distance.toFixed(1)} km away`}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default ExploreSection;