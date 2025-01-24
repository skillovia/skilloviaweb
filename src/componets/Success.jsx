// AccountCreationSuccess.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GiCheckMark } from "react-icons/gi";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F6FCEB]">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Success checkmark icon */}
        <div className="mx-auto flex items-center justify-center h-36 w-36 rounded-full bg-green-100">
        <GiCheckMark  className='text-secondary text-[4rem]'/>
        </div>

        {/* Success message */}
        <div className="mt-6 text-center">
          <h2 className="text-3xl font-extrabold text-text">
            Account Created Successfully!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Your account has been created and is ready to use.
          </p>
        </div>
      </div>

      {/* Card content */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-input border border-gray py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            {/* Success details */}
            <div className="rounded-md bg-green-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg 
                    className="h-5 w-5 text-green-400" 
                    fill="none" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-green-800">
                    All set to go!
                  </h3>
                  <div className="mt-2 text-sm text-green-700">
                    <p>
                      You can now access all features of your account. We recommend completing your profile for the best experience.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
             Login
              </button>
              
       
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;