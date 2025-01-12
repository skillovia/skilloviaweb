import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ label = 'Back', className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)} // Navigate to the previous route
      className={`flex items-center space-x-2   ${className}`}
    >
      <span className="text-lg rounded-full bg-input px-4 py-2 flex justify-center items-center h-12 w-12 text-black hover:bg-secondary hover:text-white"><ArrowLeft /></span> {/* Left Arrow */}
      <span className='text-xl font-medium'>{label}</span>
    </button>
  );
};

export default BackButton;
