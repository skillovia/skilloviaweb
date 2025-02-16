import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../UserLayout/UserLayout';
import Verify from '../Verify/Verify';
import { ChevronRight, Loader2 } from 'lucide-react';

const ExploreSection = () => {
  const [nearbyPeople, setNearbyPeople] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(false);
  const [error, setError] = useState('');
  const [categoriesError, setCategoriesError] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      setIsCategoriesLoading(true);
      setCategoriesError('');

      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          throw new Error('Authentication required');
        }

        const response = await fetch('https://testapi.humanserve.net/api/skills/get/categories', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();

        if (data.status === 'success') {
          setCategories(data.data);
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
    const fetchNearbyPeople = async () => {
      setIsLoading(true);
      setError('');

      try {
        const decodedToken = JSON.parse(localStorage.getItem('decodedToken'));
        const accessToken = localStorage.getItem('accessToken');

        if (!decodedToken || !accessToken) {
          throw new Error('Authentication required');
        }

        const { lat, lon } = decodedToken;
        
        const response = await fetch(`https://testapi.humanserve.net/api/users/people/nearby/38.7945952/-106.5348379`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        
        if (data.status === 'success') {
          setNearbyPeople(data.data);
        } else {
          throw new Error(data.message || 'Failed to fetch nearby people');
        }
      } catch (err) {
        console.error('Error fetching nearby people:', err);
        setError('Unable to load nearby people. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearbyPeople();
  }, []);

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
              {categories.map(category => (
                <Link 
                  key={category.id} 
                  to={`/explore-list`}
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
              ))}
            </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">People nearby</h2>
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

          {!isLoading && !error && (
            <div className="flex gap-8 overflow-x-auto pb-4">
              {nearbyPeople.map((person) => (
                <Link 
                  key={person.id} 
                  to={`/user-profile/${person.id}`}
                  className="flex flex-col items-center flex-shrink-0 hover:opacity-90 transition-opacity"
                >
                  <div className="w-24 h-24 mb-2 overflow-hidden rounded-full">
                    <img
                      src={person.photourl ? `https://${person.photourl}` : 'https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg'}
                      alt={person.firstname}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-sm text-center flex space-x-2 text-gray-800 whitespace-nowrap">
                    <span>{person.firstname}</span>
                    <span>{person.lastname}</span>
                  </p>
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