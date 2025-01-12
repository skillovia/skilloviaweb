import React, { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import BackButton from '../../../../../componets/Back';
import UserLayout from '../../../UserLayout/UserLayout';

const PasswordReset = () => {
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false
  });

  return (
    <UserLayout>


    <div className="max-w-4xl mx-auto px-4 ">
      <div className="flex items-center mb-6 gap-2">
        <BackButton label='Password Reset' />
      
      </div>

      <form className="space-y-4">
        {[
          { label: 'Old Password', key: 'old' },
          { label: 'New Password', key: 'new' },
          { label: 'Confirm New Password', key: 'confirm' }
        ].map((field) => (
          <div key={field.key} className="space-y-1">
            <div className="relative">
              <input
                type={showPasswords[field.key] ? 'text' : 'password'}
                placeholder="••••"
                className="w-full p-3 rounded-lg bg-input border-gray border focus:outline-none focus:ring-1 focus:ring-green-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPasswords(prev => ({
                  ...prev,
                  [field.key]: !prev[field.key]
                }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPasswords[field.key] ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-[#8fff7b] text-black rounded-lg py-3 font-medium hover:bg-[#7aee66] transition-colors"
        >
          Save changes
        </button>
      </form>
    </div>
    </UserLayout>
  );
};

export default PasswordReset;