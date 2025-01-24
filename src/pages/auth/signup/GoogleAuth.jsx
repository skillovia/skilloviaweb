import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  // Effect to handle the auth response
  useEffect(() => {
    // Add message listener to handle popup communication
    const handleMessage = (event) => {
      console.log('Received message from popup:', event); // Log the message event
      // Verify origin for security
      if (event.origin !== import.meta.env.VITE_BASE_URL) return;

      const { data } = event;
      if (data?.status === 'success') {
        console.log('Authentication successful:', data);
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        navigate('/explore');
      } else {
        console.log('Authentication failed:', data);
        setAuthError('Authentication failed. Please try again.');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  const handleGoogleAuth = () => {
    try {
      console.log('Opening Google Auth Popup...');
      const width = 500;
      const height = 600;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        `${import.meta.env.VITE_BASE_URL}/auth/google`,
        'Google Login',
        `width=${width},height=${height},left=${left},top=${top}`
      );

      if (!popup) {
        console.error('Failed to open popup. Please check pop-up blockers.');
        setAuthError('Failed to open Google Login popup. Please try again.');
        return;
      }

      console.log('Popup opened successfully.');

      // Add popup check
      const checkPopup = setInterval(() => {
        if (popup.closed) {
          console.log('Popup closed.');
          clearInterval(checkPopup);
        }
      }, 1000);
    } catch (error) {
      console.error('Google auth error:', error);
      setAuthError('Google authentication failed. Please try again.');
    }
  };

  return (
    <div className="mt-6 ">
      {authError && <div className="text-red-500 mb-4">{authError}</div>}
      <button
        onClick={handleGoogleAuth}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      >
        <FcGoogle size={24} className="mr-2" />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
