// import React from 'react';
// import { useNavigate, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('accessToken'); 

//   return token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;

import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken'); 

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Get current time in seconds

      if (decodedToken.exp < currentTime) {
        // Token has expired
        localStorage.removeItem('accessToken');
        return <Navigate to="/login" />;
      }
    } catch (error) {
      // Error decoding token, navigate to login
      localStorage.removeItem('accessToken');
      return <Navigate to="/login" />;
    }
  } else {
    // No token found, navigate to login
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;