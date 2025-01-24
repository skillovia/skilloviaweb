import React, { useState } from 'react';
import { 
  FaCopy, 
  FaShare, 
  FaWhatsapp, 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin,
  FaUsers,
  FaGift,
  FaDollarSign,
  FaCheckCircle
} from 'react-icons/fa';
import UserLayout from '../../../../UserLayout/UserLayout';

const Invite = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const referralLink = `${window.location.origin}/signup?ref=au-lex`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy the link:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me!',
          text: 'Check out this amazing platform!',
          url: referralLink,
        });
      } catch (err) {
        console.error("Failed to share:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  const handleWhatsAppShare = () => {
    const whatsappUrl = `https://wa.me/?text=Join%20me%20on%20this%20amazing%20platform!%20${encodeURIComponent(referralLink)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(referralLink)}&text=Join%20me%20on%20this%20amazing%20platform!`;
    window.open(twitterUrl, '_blank');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`;
    window.open(facebookUrl, '_blank');
  };

  const handleLinkedInShare = () => {
    const linkedInUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(referralLink)}&title=Join%20me%20on%20this%20amazing%20platform!`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <UserLayout>

 

    <div className="max-w-4xl mx-auto p-4 md:p-8 text-text">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center justify-center">
          <FaUsers className="mr-2" size={32} /> Invite Friends
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Share the benefits with your friends and earn rewards for every successful referral!
        </p>
      </div>

      <div className="bg-input border border-gray rounded-lg  p-3 mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaGift className="mr-2" /> Your Referral Link
        </h2>
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 p-3 border rounded-lg bg-input border-gray focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button
            onClick={handleCopyLink}
            className=" bg-secondary px-2 py-3
             text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2"
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

        <div className="flex flex-wrap gap-4">
     
          <button
            onClick={handleWhatsAppShare}
            className="flex-1 min-w-[200px] p-3 bg-[#25D366] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
          >
            <FaWhatsapp size={20} />
            Share via WhatsApp
          </button>
          <button
            onClick={handleTwitterShare}
            className="flex-1 min-w-[200px] p-3 bg-[#1DA1F2] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
          >
            <FaTwitter size={20} />
            Share on Twitter
          </button>
          <button
            onClick={handleFacebookShare}
            className="flex-1 min-w-[200px] p-3 bg-[#1877F2] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
          >
            <FaFacebook size={20} />
            Share on Facebook
          </button>
          <button
            onClick={handleLinkedInShare}
            className="flex-1 min-w-[200px] p-3 bg-[#0077B5] text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center justify-center gap-2"
          >
            <FaLinkedin size={20} />
            Share on LinkedIn
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-input border border-gray rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <FaGift className="mr-2" /> How it Works
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium">Share your unique referral link</p>
                <p className="text-sm text-gray-600">Send your link to friends via any platform</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium">Friends sign up</p>
                <p className="text-sm text-gray-600">They create an account using your link</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <p className="font-medium">Earn rewards</p>
                <p className="text-sm text-gray-600">Get bonuses for successful referrals</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-input border hidden border-gray rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <FaUsers className="mr-2" /> Your Referral Stats
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <FaUsers className="text-secondary text-[2rem]" />
                <span>Total Referrals</span>
              </div>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-secondary text-[1.5rem]" />
                <span>Successful Referrals</span>
              </div>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <FaDollarSign className="text-secondary text-[2rem]"/>
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