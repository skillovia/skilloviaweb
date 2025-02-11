import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';

const Verify = () => {
  const [email, setEmail] = useState('');
  const [visibleCards, setVisibleCards] = useState({
    emailVerification: true,
    completeProfile: true
  });

  useEffect(() => {
    const decodedToken = JSON.parse(localStorage.getItem('decodedToken'));
    const user_id = decodedToken?.id;

    if (!user_id) {
      throw new Error('User ID not found in token');
    }

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      throw new Error('Access token not found');
    }

    setEmail(decodedToken?.email || 'your email');
  }, []);

  const closeCard = (cardName) => {
    setVisibleCards(prev => ({
      ...prev,
      [cardName]: false
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Email Verification Card */}
      {visibleCards.emailVerification && (
        <div className="relative hidden">
          <button
            onClick={() => closeCard('emailVerification')}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-teal-700 transition-colors"
            aria-label="Close email verification card"
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <Link
            to="/settings/kyc"
            className="block bg-[#246868] text-white p-6 rounded-lg hover:bg-teal-800 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Please verify your email</h2>
            <p className="text-teal-100 mb-4">
              We sent a confirmation email to {email}, please visit your 
              email to review and activate your account
            </p>
            <div className="flex items-center text-teal-100 hover:text-white">
              <span className="font-medium">Activate your account</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </Link>
        </div>
      )}

      {/* Complete Profile Card */}
      {visibleCards.completeProfile && (
        <div className="relative">
          <button
            onClick={() => closeCard('completeProfile')}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-green-600 transition-colors"
            aria-label="Close complete profile card"
          >
            <X className="w-5 h-5 text-secondary" />
          </button>
          <Link
            to="/settings/profile"
            className="block bg-primary text-secondary p-6 rounded-lg hover:bg-green-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">Complete your profile</h2>
            <p className="text-gray-700 mb-4">
              Add your skills and interests, set your availability time and find clients.
            </p>
            <div className="flex items-center text-gray-700 hover:text-gray-900">
              <span className="font-medium">Complete profile</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Verify;