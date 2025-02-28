import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-g border border-gray pt-2 overflow-hidden transform transition-all">
          {/* Success icon */}
          <div className="flex justify-center --10">
            <div className="rounded-full bg-secondary p-5 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-8 pt-12 pb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              Account Setup Successful!
            </h1>
            
            <div className="h-1 w-16 bg-green-500 mx-auto my-4"></div>
            
            <p className="text-gray-600 mb-8">
              Your account has been successfully created and is ready to use. 
              We're excited to have you onboard!
            </p>
            
            {/* Progress indicators */}
            <div className="flex justify-between items-center mb-8 px-6">
              <div className="flex flex-col items-center">
                <div className="bg-green-500 rounded-full h-6 w-6 flex items-center justify-center mb-1">
                  <span className="text-xs text-white font-bold">1</span>
                </div>
                <span className="text-xs text-gray-500">Register</span>
              </div>
              <div className="flex-grow h-0.5 bg-green-500 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="bg-green-500 rounded-full h-6 w-6 flex items-center justify-center mb-1">
                  <span className="text-xs text-white font-bold">2</span>
                </div>
                <span className="text-xs text-gray-500">Verify</span>
              </div>
              <div className="flex-grow h-0.5 bg-green-500 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="bg-green-500 rounded-full h-6 w-6 flex items-center justify-center mb-1">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <span className="text-xs text-gray-500">Complete</span>
              </div>
            </div>
            
    {/* Buttons */}
<Link to="/explore" className="bg-secondary hover:bg-blue-700 text-white font-medium py-2 block px-6 rounded-lg transition-colors">
  Go to Dashboard
</Link>
          
          </div>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-gray-500 text-sm">
            Need assistance? <span className="text-blue-600 hover:underline cursor-pointer">Contact Support</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;