import React, { useState } from 'react';
import { Facebook, Apple, Loader2 } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import Slider from '../Slider';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://testapi.humanserve.net/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        
        // Navigate to explore page
        navigate('/explore');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 md:p-8 p-4 bg-[#f6fceb]">
      <div className="flex flex-col w-full md:w-1/2 md:p-8">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-6">Welcome back!</h2>
          
          {error && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 bg-[#f0f6e6] focus:ring-green-400 focus:outline-none"
                placeholder="john@example.com"
                disabled={isLoading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-[#BFCAB4] bg-[#f0f6e6] rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-secondary font-bold py-2 rounded-full hover:bg-green-500 transition-colors focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Verifying...
                </>
              ) : (
                'Verify'
              )}
            </button>

            <div className="text-center text-gray-500">Or</div>

            <button
              type="button"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
            >
              <Facebook size={20} />
              Continue with Facebook
            </button>

            <button
              type="button"
              disabled={isLoading}
              className="w-full bg-white text-gray-700 py-2 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            >
              <FcGoogle size={30} />
              Continue with Google
            </button>

            <button
              type="button"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            >
              <Apple size={20} />
              Continue with Apple
            </button>
          </form>

          <p className="mt-4 text-sm text-gray-600">
            Don't have an account? 
            <a href="/signup" className="text-blue-600 hover:underline ml-1">
              Sign up
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

export default LoginPage;