import React, { useState, useEffect } from "react";
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
  FaSpinner,
} from "react-icons/fa";
import UserLayout from "../../../../UserLayout/UserLayout";
import { jwtDecode } from "jwt-decode";

const Invite = () => {
  const [copySuccess, setCopySuccess] = useState(false);
  const [referralCode, setReferralCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [referredUsers, setReferredUsers] = useState([]);
  const [loadingReferrals, setLoadingReferrals] = useState(false);
  const [referralsError, setReferralsError] = useState("");

  const accessToken = localStorage.getItem("accessToken");
  const userId = accessToken ? jwtDecode(accessToken).id : null;

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    if (referralCode) {
      fetchReferredUsers(referralCode);
    }
    // eslint-disable-next-line
  }, [referralCode]);

  const fetchProfile = async () => {
    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const responseData = await response.json();

      if (responseData.data && responseData.data.referral_code) {
        setReferralCode(responseData.data.referral_code);
        setError("");
      } else {
        setError("No referral code found in profile");
      }
    } catch (err) {
      setError(err.message);
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch referred users by referral code
  const fetchReferredUsers = async (code) => {
    setLoadingReferrals(true);
    setReferralsError("");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/get/myreferred/${code}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch referred users");
      }
      const result = await response.json();
      setReferredUsers(result.data || []);
    } catch (err) {
      setReferralsError(err.message);
      setReferredUsers([]);
    } finally {
      setLoadingReferrals(false);
    }
  };

  const referralLink = referralCode ? referralCode : "";

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
    window.open(url, "_blank");
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex items-center justify-center min-h-screen">
          <FaSpinner className="animate-spin text-4xl text-secondary" />
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
            Share the benefits with your friends and earn rewards for every
            successful referral!
          </p>
        </div>

        <div className="bg-input border-gray border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaGift className="mr-2" /> Your Referral Code
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
                  className="w-[60%] p-3 border rounded-lg text-center bg-gray-50 focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <button
                  onClick={handleCopyLink}
                  disabled={!referralLink}
                  className="bg-secondary px-4 py-3 text-white rounded-lg hover:bg-opacity-90 transition-colors flex items-center gap-2 disabled:opacity-50"
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
            </>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-input p-6 border rounded-lg border-gray">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaGift className="mr-2" /> How it Works
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <p className="font-medium">Share your unique referral code</p>
                  <p className="text-sm text-gray-600">
                    Send your code to friends via any platform
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <p className="font-medium">Friends sign up</p>
                  <p className="text-sm text-gray-600">
                    They create an account using your code
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <p className="font-medium">Earn rewards</p>
                  <p className="text-sm text-gray-600">
                    Get bonuses for successful referrals
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-input p-6 border rounded-lg border-gray">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaUsers className="mr-2" /> Your Referral Stats
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaUsers className="text-secondary text-xl" />
                  <span>Total Referrals</span>
                </div>
                <span className="font-semibold">{referredUsers.length}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-secondary text-xl" />
                  <span>Successful Referrals</span>
                </div>
                <span className="font-semibold">
                  {
                    referredUsers.filter((u) => u.status === "successful")
                      .length
                  }
                </span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <FaDollarSign className="text-secondary text-xl" />
                  <span>Rewards Earned</span>
                </div>
                <span className="font-semibold">
                  $
                  {referredUsers
                    .filter((u) => u.status === "successful")
                    .reduce((sum, u) => sum + (u.rewardAmount || 0), 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
            {/* List referred users */}
            <div className="mt-6">
              <h4 className="font-bold mb-2">People You Referred:</h4>
              {loadingReferrals ? (
                <div className="flex items-center">
                  <FaSpinner className="animate-spin mr-2" />
                  Loading...
                </div>
              ) : referralsError ? (
                <div className="text-red-500">{referralsError}</div>
              ) : referredUsers.length === 0 ? (
                <div>No one has used your referral code yet.</div>
              ) : (
                <ul className="divide-y">
                  {referredUsers.map((user, idx) => (
                    <li
                      key={user.id || user.email || idx}
                      className="py-3 flex items-center gap-4"
                    >
                      <img
                        src={user.photourl}
                        alt={user.firstname}
                        className="w-12 h-12 rounded-full object-cover border"
                        onError={(e) => {
                          e.target.src = "/default-avatar.png";
                        }}
                      />
                      <div className="flex-1">
                        <div className="font-semibold">
                          {user.firstname} {user.lastname}
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.email}
                        </div>
                        <div className="text-sm text-gray-600">
                          {user.phone}
                        </div>
                      </div>
                      {user.status === "successful" && (
                        <FaCheckCircle className="text-green-500" />
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Invite;
