import React from 'react';
import { ArrowLeft, Pencil, Check } from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';
import { Link } from 'react-router-dom';

const SecuritySettings = () => {
  return (
    <UserLayout>

 

    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center mb-6 gap-2">
       <BackButton label='Security' />
       
      </div>

      <div className="space-y-4 " >
        <div className="flex items-center justify-between">
          <span className="font-medium">Password</span>
          <Link to ='/settings/password'>
          <Pencil className="w-5 h-5 text-gray-600 cursor-pointer" />
          </Link>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 border border-gray bg-input">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Check className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-medium">Password has been set</p>
              <p className="text-sm text-gray-600 mt-1">
                You change your password to a more stronger one
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </UserLayout>
  );
};

export default SecuritySettings;