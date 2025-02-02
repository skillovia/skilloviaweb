import React from 'react';

const UserList = ({ users }) => (
  <div className="space-y-4">
    {users.length === 0 ? (
      <div className="text-center py-8 text-gray-500">
        <div className="text-4xl mb-2">👥</div>
        <div>No users found</div>
      </div>
    ) : (
      users.map((user) => (
        <div key={user.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
          <img
            src={user.photourl || ''}
            alt={`${user.firstname} ${user.lastname}`.trim() || 'User'}
            className="w-10 h-10 rounded-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${user.firstname}+${user.lastname}`;
            }}
          />
          <div className="flex-1">
            <div className="font-medium">
              {`${user.firstname} ${user.lastname}`.trim() || 'Anonymous User'}
            </div>
            {user.email && (
              <div className="text-sm text-gray-500">{user.email}</div>
            )}
            {user.phone && (
              <div className="text-sm text-gray-500">{user.phone}</div>
            )}
          </div>
        </div>
      ))
    )}
  </div>
);

export default UserList;