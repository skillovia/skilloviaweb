import React, { useState, useEffect } from 'react';
import BackButton from '../../componets/Back';
import UserLayout from '../User-Dashboard/UserLayout/UserLayout';
import { Link } from 'react-router-dom';

const Followers = () => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) throw new Error('Access token not found');

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/follows/getfollowers`,
          {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch followers');
        }

        const followersData = await response.json();
        setFollowers(followersData.data || []);
      } catch (err) {
        console.error('Error fetching followers:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowers();
  }, []);

  if (loading) {
    return (
      <UserLayout>

      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
      </div>
      </UserLayout>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <UserLayout>



    <div className='px-4'>
           <span className="flex mb-4">
<BackButton label='' />
      <h2 className="text-xl text-slate-800 mt-2">Following ({followers.length})</h2>
      </span>
      <div className="space-y-4">
        {followers.map((user) => (
          <div 
            key={user.follower_id} 
            className="p-2 border border-gray bg-input rounded-lg "
          >
            <div className="flex items-center space-x-4">
              {/* <Link  to={`/user-profile/${.id}`}>
              </Link> */}
              {user.photourl && (
                <img 
                src={user.photourl ? `https://${user.photourl}` : 'https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg'}
                  alt={user.follower_name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              )}
              <div>
                <h3 className="font-medium">{user.follower_name}</h3>
                <p className="text-gray-600 text-[12px]">{user.follower_email}</p>
                {user.phone && (
                  <p className="text-gray-500 text-[12px]">{user.phone}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </UserLayout>
  );
};

export default Followers;