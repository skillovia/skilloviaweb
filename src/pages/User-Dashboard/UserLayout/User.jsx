import React, { useState, useEffect } from "react";
import { FaStar, FaRegStar, FaPlus } from "react-icons/fa";
import { IoMdSettings, IoMdWallet } from "react-icons/io";
import UserLayout from "./UserLayout";
import SlidingPockets from "./CashToken";
import { Link } from "react-router-dom";
import { Loader2, Plus } from "lucide-react";
import Bio from "./Bio";

import { HiOutlineExternalLink } from "react-icons/hi";
import { IoBriefcaseOutline } from "react-icons/io5";
import EmptyState from "../../../componets/EmptyState";

const ProfileCard = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [skills, setSkills] = useState([]);



  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("File size should be less than 5MB");
      return;
    }

    setUploading(true);

    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");
      console.log(accessToken);

      const formData = new FormData();
      formData.append("photo", file);

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/profile/upload`,

        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();

      // Update profile data with new photo URL
      setProfileData((prev) => ({
        ...prev,
        photourl:data.photourl || data.data?.photourl,
      }));
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const decodedToken = JSON.parse(localStorage.getItem("decodedToken"));
        const user_id = decodedToken?.id;

        if (!user_id) {
          throw new Error("User ID not found in token");
        }

        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await response.json();
        // Ensure photourl uses https before setting profile data
        const updatedData = {
          ...data.data,
          photourl: data.data.photourl,
        };
        setProfileData(updatedData);
        console.log("Updated profile data:", updatedData);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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

        if (!response.ok) {
          throw new Error("Failed to fetch skills");
        }

        const data = await response.json();
        setSkills(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) =>
          index < rating ? (
            <FaStar key={index} className="text-yellow-400 text-sm" />
          ) : (
            <FaRegStar key={index} className="text-gray-300 text-sm" />
          )
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin w-12 h-12 text-secondary" />
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="max-w-4xl px-4 py-8 text-red-500">
          Error loading profile: {error}
        </div>
      </UserLayout>
    );
  }

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
        <div className="flex justify-between items-start">
          <div className="text-lg font-semibold">Profile</div>
          <section className="flex space-x-4">
  <Link to="/settings">
    <IoMdSettings className="text-gray-500" />
  </Link>
  

</section>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
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
            <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
                disabled={uploading}
              />
              <span className="text-white text-xs">
                {uploading ? "Uploading..." : "Change"}
              </span>
            </label>
          </div>
          <div>
            <div className="font-semibold">
              {profileData.firstname} {profileData.lastname}
            </div>
            <div className="text-sm text-gray-500">{profileData.email}</div>
          </div>
        </div>

        <div className="flex gap-8 text-sm">
          <Link to="/followers">
            <p  className="font-semibold">
              {profileData.total_followers}
            </p>
            <div className="text-gray-500">followers</div>
          </Link>
          <div>
            <Link to="/following" className="font-semibold">
              {profileData.total_following}
            </Link>
            <div className="text-gray-500">following</div>
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
              key={skill.id}
              className="mb-4 p-4 bg-input border border-gray rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h2 className="font-medium">{skill.skill_type}</h2>
                </div>
                <Link to={`/settings/skills/${skill.id}`}>
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

              {/* Thumbnails */}
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
