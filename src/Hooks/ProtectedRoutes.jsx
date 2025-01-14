import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken'); 

  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;