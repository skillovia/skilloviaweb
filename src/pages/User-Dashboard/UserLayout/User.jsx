import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaPlus } from "react-icons/fa";
import { IoMdSettings, IoMdWallet } from "react-icons/io";
import UserLayout from "./UserLayout";
import SlidingPockets from "./CashToken";
import { Link } from "react-router-dom";
import { Loader2, Plus, CheckCircle, XCircle } from "lucide-react";
import Bio from "./Bio";
import { jwtDecode } from "jwt-decode";
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoBriefcaseOutline } from "react-icons/io5";
import EmptyState from "../../../componets/EmptyState";

const ProfileCard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [skills, setSkills] = useState([]);
  const [profileError, setProfileError] = useState(null);
  const [skillsError, setSkillsError] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [skillsLoading, setSkillsLoading] = useState(true);

  console.log("profileData:", profileData);
 
  const steps = [
    {
      name: "Profile image",
      completed: !!(profileData && profileData.photourl),
      action: null,
      link: "/settings/profile",
    },
    {
      name: "Add at least one skill",
      completed: skills.length > 0,
      action: null,
      link: "/settings/skill/add",
    },

    {
      name: "Set location",
      completed: !!(profileData && profileData.locationName),
      link: "/settings/profile",
    },
    {
      name: "Complete KYC",
      completed: !!(profileData && profileData.kyc_status === "approved"),

      action: null,
      link: "/settings/kyc",
    },

    {
      name: "Link Stripe",
      completed: !!(profileData && profileData.linked_account),
      action: null,
      link: "/create-stripe-account",
    },
    {
      name: "Fill out bio",
      completed: !!(profileData && profileData.bio),
      action: null,
      link: "/settings/profile",
    },
  ];
  const completedSteps = steps.filter((s) => s.completed).length;



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("❌ Access token not found");
        const decodedToken = jwtDecode(accessToken);
        const user_id = decodedToken?.id;
        if (!user_id) throw new Error("❌ User ID not found in token");
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile/${user_id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        if (!response.ok) throw new Error("❌ Failed to fetch profile");
        const data = await response.json();
        setProfileData({ ...data.data, photourl: data.data.photourl });
      } catch (err) {
        setError(err.message);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Fetch Skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/skills/user/all`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch skills");
        const data = await response.json();
        setSkills(data.data || []);
      } catch (err) {
        setSkillsError(err.message);
      } finally {
        setSkillsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Handle Loading State
  if (profileLoading || skillsLoading) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-12 h-12 text-secondary" />
        </div>
      </UserLayout>
    );
  }

  // Handle Error State (only for profile)
  if (profileError) {
    return (
      <UserLayout>
        <div className="max-w-4xl px-4 py-8 text-red-500">
          Error loading profile: {profileError}
        </div>
      </UserLayout>
    );
  }

  // Handle No Data
  if (!profileData) {
    return (
      <UserLayout>
        <div className="max-w-4xl px-4 py-8">No profile data available</div>
      </UserLayout>
    );
  }
  return (
    <UserLayout>
      <div className="max-w-4xl px-4 space-y-4">
        {/* Profile Completion Bar & Steps */}
        <div className="bg-input border border-gray rounded-lg mb-6 p-4">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-green-900">
              Profile completion: {completedSteps}/{steps.length}
            </span>
            <div className="w-56 h-3 bg-primary rounded-full overflow-hidden">
              <div
                className="h-full bg-secondary transition-all duration-300"
                style={{
                  width: `${(completedSteps / steps.length) * 100}%`,
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {steps.map((step, idx) => (
              <div
                key={step.name}
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs 
                  ${
                    step.completed
                      ? "bg-secondary text-white"
                      : "bg-gray-100 text-gray-500 border border-gray-200"
                  }`}
              >
                {step.completed ? (
                  <CheckCircle className="w-4 h-4 text-white" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-400" />
                )}
                {step.link && !step.completed ? (
                  <Link to={step.link} className=" hover:text-green-700">
                    {step.name}
                  </Link>
                ) : (
                  <span>{step.name}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-start">
          <div className="text-lg font-semibold">Profile</div>
          <section className="flex space-x-4">
            <Link to="/settings">
              <IoMdSettings className="text-gray-500" />
            </Link>
          </section>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/settings/profile" className="relative group">
            <img
              src={
                profileData.photourl ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"
              }
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default-avatar.png";
              }}
            />
            
          </Link>
          <div>
            <div className="font-semibold">
              {profileData.firstname} {profileData.lastname}
            </div>
            <div className="text-sm text-gray-500">{profileData.email}</div>
          </div>
        </div>

        <div className="flex gap-8 text-sm">
          <Link to="/followers">
            <p className="font-semibold">{profileData.total_followers}</p>
            <div className="text-gray-500">following</div>
          </Link>
          <div>
            <Link to="/following" className="font-semibold">
              <p className="font-semibold"> {profileData.total_following}</p>

              <div className="text-gray-500">followers</div>
            </Link>
          </div>
          <Link
            to="/settings/skill/add"
            className="flex items-center px-4 py-2 border border-secondary text-secondary rounded-full hover:bg-secondary hover:text-white  transition-colors duration-200"
          >
            <FaPlus className="mr-2 text-lg" />
            Add Skill
          </Link>
        </div>

        <SlidingPockets
          cash_balance={profileData.cash_balance}
          spark_token_balance={profileData.spark_token_balance}
        />

        <div>
          <Bio
            initialBio={profileData.bio || "No bio available"}
            location={profileData.location || "No location available"}
            street={profileData.street || "No street available"}
            zip_code={profileData.zip_code || "No zip code available"}
          />
        </div>
        {/* skill */}
        <div className="max-w-4xl mx-auto ">
          {/* Skills List */}
          {skills.map((skill) => (
            <div
              key={skill._id}
              className="mb-4 p-4 bg-input border border-gray rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                <h2 className="font-medium">
          
          {console.log('Current skill:', skill)}
          {console.log('skill_type value:', skill.skill_type)}
          
          
          {skill.skill_type ? 
            String(skill.skill_type).trim() : 
            skill.skillType ? 
              String(skill.skillType).trim() : 
              "No Skill Type"
          }
        </h2>
                </div>
                <Link to={`/settings/skills/${skill._id}`}>
                  <span>
                    <HiOutlineExternalLink className="text-[1.5rem] text-secondary" />
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-1 mb-2">
                <span className="text-sm text-gray-600">
                  Experience level: {skill.experience_level}
                </span>
              </div>

              <p className="text-gray-600 mb-4 text-[13px]">
                {skill.description || "No description provided"}
              </p>

              {/* Hourly Rate */}
              <div className="">
                <h3 className="text-sm font-medium mb-2">Hourly rate</h3>
                <p className="text-gray-600">
                  £{skill.hourly_rate}
                  {skill.spark_token && ` - ${skill.spark_token} spark tokens`}
                </p>
              </div>
            </div>
          ))}

          {skills.length === 0 && (
            <div className=" flex items-center justify-center  rounded-lg shadow-sm">
              <EmptyState
                title="No Skills Added Yet"
                description="Start adding your professional skills to showcase your expertise."
                icon={() => (
                  <IoBriefcaseOutline className="text-[4rem] text-text" />
                )}
              />
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default ProfileCard;
