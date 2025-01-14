import React, { useState, useEffect } from 'react';
import { Facebook, Apple } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import Slider from '../Slider';





const Phone = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="flex min-h-screen bg-gray-50 md:p-8 p-4 bg-[#f6fceb]">
      <div className="flex flex-col w-full md:w-1/2 md:p-8">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-1">Create Account</h2>
          <p className='mb-6'>We need your phone number</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
              Input your phone number
              </label>
              <input
                type="number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 bg-[#f0f6e6] focus:ring-green-400 focus:outline-none"
                placeholder="Enter phone number"
              />
            </div>
            
      
            
            <button
              type="submit"
              className="w-full bg-primary text-secondary font-bold py-2 rounded-full hover:bg-green-500 transition-colors focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none"
            >
              Verify
            </button>
            
            <div className="text-center text-gray-500">Or</div>
            
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
            >
              <Facebook size={20} />
              Continue with Facebook
            </button>
            
            <button
              type="button"
              className="w-full bg-white text-gray-700 py-2 rounded-full  hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            >
              <FcGoogle size={30} />
              Continue with Google
            </button>
            
            <button
              type="button"
              className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            >
              <Apple size={20} />
              Continue with Apple
            </button>
          </form>
          
          <p className="mt-4 text-sm text-gray-600">
            Already  have an account? 
            <a href="/login" className="text-blue-600 hover:underline ml-1">
            login
            </a>
          </p>
          
          <p className="mt-4 text-xs text-gray-500">
            By continuing to use SoftSorta, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>

      <Slider />
 
    </div>
  );
};

export default Phone;