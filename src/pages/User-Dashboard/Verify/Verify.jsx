import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Verify = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Email Verification Card */}
      <Link
        to="/settings/kyc"
        className="bg-[#246868] text-white p-6 rounded-lg hover:bg-teal-800 transition-colors"
      >
        <h2 className="text-xl font-semibold mb-2">Please verify your email</h2>
        <p className="text-teal-100 mb-4">
          We sent a confirmation email to example@gmail.com, please visit your 
          email to review and activate your account
        </p>
        <div className="flex items-center text-teal-100 hover:text-white">
          <span className="font-medium">Activate your account</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </div>
      </Link>

      {/* Complete Profile Card */}
      <Link 
        to="/settings/profile"
        className="bg-primary text-secondary p-6 rounded-lg hover:bg-green-500 transition-colors"
      >
        <h2 className="text-xl font-semibold mb-2">Complete your profile</h2>
        <p className="text-gray-700 mb-4">
          Add your skills and interests, set your availability time and find clients.
        </p>
        <div className="flex items-center text-gray-700 hover:text-gray-900">
          <span className="font-medium">Complete profile</span>
          <ArrowRight className="w-5 h-5 ml-2" />
        </div>
      </Link>
    </div>
  );
};
export default Verify;