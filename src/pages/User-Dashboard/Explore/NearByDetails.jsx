import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Loader2, MessageCircleMore } from 'lucide-react';
import UserLayout from '../UserLayout/UserLayout';
import BackButton from '../../../componets/Back';
import FollowButton from '../../../componets/FollowBtn';
import { Star } from 'lucide-react';

const NearByDetails = () => {
    
  const navigate = useNavigate();
  const { id } = useParams(); // Extract user ID from URL
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError('');

      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found');
        }

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/basic/profile/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        console.log(data);
        
        setProfile(data.data);
      } catch (err) {
        console.error('Error fetching user profile:', err);
        setError(err.message || 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (isLoading) {
    return (
      <UserLayout>

      <div className="flex justify-center items-center py-8">
        <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
      </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-gray-500 text-center py-4">
        No profile data available.
      </div>
    );
  }

  const { firstname,lastname,email,total_followers
    ,
    total_following,
     bio, skills, photourl } = profile;
  console.log(profile);
  console.log(skills);


  const handleChatClick = () => {
    if (profile) {
      navigate(`/chat/${id}`, {
        state: {
          userId: id,
          userName: `${profile.firstname} ${profile.lastname}`,
          userPhoto: profile.photourl ? `${profile.photourl}` : null
        }
      });
    }
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 rounded-lg">
        <div className="flex items-center justify-between gap-4 mb-6">
          <BackButton label="Profile" />
         
          <MessageCircleMore  onClick={handleChatClick}  className='text-secondary cursor-pointer'/>
        </div>

        <div className="flex items-center gap-4 mb-6">
        <img
        src={photourl ? `${photourl}` : 'https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg'}
        alt={firstname}
        className="w-16 rounded-lg h-16 object-cover"
      />
          <div>
            <h2 className="text-lg font-semibold">{firstname}  {lastname}</h2>
            <p className="text-gray-600 text-[12px]">@{email}</p>
            <div className="flex gap-4 mt-1 text-sm text-gray-600">
              <span>
                <strong>{total_followers || 0}</strong> followers
              </span>
              <span>
                <strong>{total_following || 0}</strong> following
              </span>
            </div>
          </div>
          <FollowButton />
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Bio</h3>
          <p className="text-gray-600">{bio || 'No bio available.'}</p>
        </div>

        {skills && skills.length > 0 && (
          <div>
            <h3 className="font-semibold mb-4">Skills</h3>
            <div className="space-y-4">

            {skills.map((skill) => (
  <div
    key={skill.name}
    className="bg-input p-4 border border-gray rounded-lg flex items-center justify-between"
  >
    <div>
      <h3 className='text-[14px] font-medium'>{skill.skill_type}</h3>
      <h4 className="text-[12px]">Description: {skill.description}</h4>
      <p className="text-sm text-gray-600">
        Experience level: {skill.experience_level || 'Unknown'}
      </p>
      <h3 className='text-[14px] font-medium'>
        hourly_rate: ${skill.hourly_rate}
      </h3>
    </div>
    <Link
      to="/book-service"
      state={{ 
        user: {id,
          firstname,
          lastname,
          email,
          bio,
          photourl
        },
        skill: {
          ...skill,
          thumbnail01: skill.thumbnail01,
          thumbnail02: skill.thumbnail02,
          thumbnail03: skill.thumbnail03,
          thumbnail04: skill.thumbnail04
        }
      }}
      className="px-4 py-2 bg-yellow-100 rounded-full text-sm hover:bg-yellow-200"
    >
      Book
    </Link>
  </div>
))}
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default NearByDetails;
