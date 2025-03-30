import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const ChatMobile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
          throw new Error('No access token found');
        }

        const response = await fetch('https://skilloviaapi.vercel.app/api/message/chat/history/users', {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        console.log(data);
        
        
        if (data.status === 'success' && Array.isArray(data.data)) {
          const formattedUsers = data.data.map(user => ({
            id: user.user_id,
            name: user.name,
            message: user.
            lastmessage || 'Recent..',
            time: formatTime(user.lastmessagetime
            ) || '1 mins',
            unreadCount: user.
            unreadmessagecount
             || 0,
            photoUrl: user.photourl 
              ? `${user.photourl}`
              : 'https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg'
          }));
          setUsers(formattedUsers);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching users:', err);
        if (err.message.includes('token')) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

  const formatTime = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { 
      hour: 'numeric',
      minute: 'numeric',
      hour12: true 
    }).toLowerCase();
  };

  const handleUserClick = (user) => {
    navigate(`/chat/${user.id}`, {
      state: {
        userId: user.id,
        userName: user.name,
        userPhoto: user.photoUrl
      }
    });
  };

  return (
    <div className="block lg:hidden ">
      <div className=" overflow-y-auto">
        {loading && (
          <div className="p-4 text-center">
            Loading...
          </div>
        )}
        
        {error && (
          <div className="p-4 text-center text-red-500">
            Error: {error}
          </div>
        )}

        {!loading && !error && users.map((user) => (
          <div
            key={user.id}
            onClick={() => handleUserClick(user)}
            className="flex items-center p-4 border-b border-gray cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          >
            <img
              src={user.photoUrl}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-medium text-gray-900">
                  {user.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">
                    {user.time}
                  </span>
                  {user.unreadCount > 0 && (
                    <span className="bg-green-500 text-white text-sm font-medium px-2 py-0.5 rounded-full min-w-[20px] text-center">
                      {user.unreadCount}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-gray-500 truncate mt-1">
                {user.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMobile;