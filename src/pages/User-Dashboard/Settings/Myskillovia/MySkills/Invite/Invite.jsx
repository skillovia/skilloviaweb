import React, { useState, useEffect } from 'react';
import { 
  FaCopy, 
  FaWhatsapp, 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin,
  FaUsers,
  FaGift,
  FaDollarSign,
  FaCheckCircle,
  FaSpinner
} from 'react-icons/fa';
import UserLayout from '../../../../UserLayout/UserLayout';

const Invite = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('decodedToken') 
    ? JSON.parse(localStorage.getItem('decodedToken')).id 
    : null;

  useEffect(() => {
    fetchProfile();
  }, [userId]);

  const fetchProfile = async () => {
    if (!userId) {
      setError('User ID not found');
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/profile/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const responseData = await response.json();
      
      // Access the referral_code from the correct path in the response
      if (responseData.data && responseData.data.referral_code) {
        setReferralCode(responseData.data.referral_code);
        setError(''); // Clear any existing errors
      } else {
        setError('No referral code found in profile');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error fetching profile:', err);
    } finally {
      setLoading(false);
    }
  };

  const referralLink = referralCode ? `${window.location.origin}/signup?ref=${referralCode}` : '';

  const handleCopyLink = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy the link:", err);
    }
  };

  const handleShare = async (platform, url) => {
    if (!referralLink) return;
    window.open(url, '_blank');
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-screen">
          <FaSpinner className="animate-spin text-4xl text-primary" />
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
            <FaUsers className="mr-2" size={32} /> Invite Friends
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share the benefits with your friends and earn rewards for every successful referral!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaGift className="mr-2" /> Your Referral Link
          </h2>

          {error ? (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg">
              {error}
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-6">
                <input
                  type="text"
                  value={referralLink}
                  readOnly
                  className="flex-1 p-3 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  disabled={!referralLink}
                  className="bg-primary px-4 py-3 text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {copySuccess ? (
                    <>
                      <FaCheckCircle size={16} />
                      Copied!
                    </>
                  ) : (
                    <>
                      <FaCopy size={16} />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => handleShare('whatsapp', `https://wa.me/?text=Join%20me!%20${encodeURIComponent(referralLink)}`)}
                  disabled={!referralLink}
                  className="p-3 bg-[#25D366] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaWhatsapp size={20} />
                  WhatsApp
                </button>
                <button
                  onClick={() => handleShare('twitter', `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Join%20me!`)}
                  disabled={!referralLink}
                  className="p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaTwitter size={20} />
                  Twitter
                </button>
                <button
                  onClick={() => handleShare('facebook', `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`)}
                  disabled={!referralLink}
                  className="p-3 bg-[#1877F2] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaFacebook size={20} />
                  Facebook
                </button>
                <button
                  onClick={() => handleShare('linkedin', `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(referralLink)}`)}
                  disabled={!referralLink}
                  className="p-3 bg-[#0077B5] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <FaLinkedin size={20} />
                  LinkedIn
                </button>
              </div>
            </>
          )}
        </div>

        {/* Rest of the component remains the same */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaGift className="mr-2" /> How it Works
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Share your unique referral link</p>
                  <p className="text-sm text-gray-600">Send your link to friends via any platform</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Friends sign up</p>
                  <p className="text-sm text-gray-600">They create an account using your link</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Earn rewards</p>
                  <p className="text-sm text-gray-600">Get bonuses for successful referrals</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaUsers className="mr-2" /> Your Referral Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-primary text-xl" />
                  <span>Total Referrals</span>
                </div>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-primary text-xl" />
                  <span>Successful Referrals</span>
                </div>
                <span className="font-semibold">0</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaDollarSign className="text-primary text-xl" />
                  <span>Rewards Earned</span>
                </div>
                <span className="font-semibold">$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Invite;