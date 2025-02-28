import React from 'react';
import { Link } from 'react-router-dom';

const FailurePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl border border-gray pt-2 overflow-hidden transform transition-all">
          {/* Failure icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-red-500 p-5 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-8 pt-12 pb-8 text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
              Account Setup Failed
            </h1>
            
            <div className="h-1 w-16 bg-red-500 mx-auto my-4"></div>
            
            <p className="text-gray-600 mb-8">
              We encountered an issue while setting up your account.
              Please review the information below and try again.
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
              <div className="flex-grow h-0.5 bg-red-500 mx-2"></div>
              <div className="flex flex-col items-center">
                <div className="bg-red-500 rounded-full h-6 w-6 flex items-center justify-center mb-1">
                  <span className="text-xs text-white font-bold">3</span>
                </div>
                <span className="text-xs text-gray-500">Complete</span>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="space-y-3">
              <Link to="/setup/retry" className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 block px-6 rounded-lg transition-colors">
                Try Again
              </Link>
              <Link to="/support" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 block px-6 rounded-lg transition-colors">
                Contact Support
              </Link>
            </div>
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

export default FailurePage;