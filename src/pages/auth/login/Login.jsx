import React, { useState, useEffect } from 'react';
import { Facebook, Apple, Loader2 } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Slider from '../Slider';
import GoogleAuth from '../signup/GoogleAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const decodeAndStoreToken = (accessToken, refreshToken) => {
    try {
      const decodedToken = jwtDecode(accessToken);
      
      // Store both tokens
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('decodedToken', JSON.stringify(decodedToken));
      
      return decodedToken;
    } catch (error) {
      console.error('Error decoding token:', error);
      setError('Invalid token received');
      return null;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/get/refreshtokenweb`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${refreshToken}`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.status === 'success') {
        const decodedToken = decodeAndStoreToken(data.data.accessToken, data.data.refreshToken);
        return decodedToken ? data.data.accessToken : null;
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      // Clear all stored tokens on refresh failure
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('decodedToken');
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (data.status === 'success') {
        const decodedToken = decodeAndStoreToken(
          data.data.accessToken,
          data.data.refreshToken
        );

        console.log(decodedToken);
        
        
        if (decodedToken) {
          navigate('/explore');
        }
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAndRefreshToken = async () => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;
        
        // Refresh token if it expires in less than 5 minutes (300 seconds)
        if (decoded.exp - currentTime < 300) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            return true;
          }
        } else {
          return true;
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    }
    return false;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isValid = await checkAndRefreshToken();
      if (isValid) {
        navigate('/explore');
      }
    };
    
    checkAuth();
  }, [navigate]);

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
            <Link to="/forgot-psw" className='block text-secondary font-semibold'>Forgot password ?</Link>

            <div className="text-center text-gray-500">Or</div>

            <button
              type="button"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
            >
              <Facebook size={20} />
              Continue with Facebook
            </button>
{/* 
            <button
              type="button"
              disabled={isLoading}
              className="w-full bg-white text-gray-700 py-2 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            >
              <FcGoogle size={30} />
              Continue with Google
            </button> */}
            
            <GoogleAuth />

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