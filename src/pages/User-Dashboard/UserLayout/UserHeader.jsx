import React, { useState, useEffect } from "react";
import { Search, MapPin, Bell, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const UserHeader = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  const handleSearchClick = () => {
    navigate("/search");
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleNotifications = () => setNotificationDropdown((prev) => !prev);

  // Helper function to ensure HTTPS URLs
  const ensureHttps = (url) => {
    if (!url) return "";
    if (url.startsWith("https://")) return url;
    if (url.startsWith("http://")) return url.replace("http://", "https://");
    return `https://${url}`;
  };

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
      const updatedData = {
        ...data.data,
        photourl: ensureHttps(data.data.photourl),
      };
      setProfileData(updatedData);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const notifications = [
    {
      id: 1,
      message: "John liked your post",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "New message from Sarah",
      time: "5 hours ago",
    },
    {
      id: 3,
      message: "You have a new follower",
      time: "1 day ago",
    },
  ];

  if (loading) {
    return     <div className="flex justify-center items-center  inset-0 bg-white   h-screen  z-50">
    <Loader2 className="animate-spin w-12 h-12 text-secondary" />
  </div>
  }

  if (error) {
    return (
      <div className="h-16 bg-red-100 flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <nav className="w-full bg px-4 lg:px-[8rem] pt-[1.5rem] py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327781/WHT_Horiz._Logo_bbkq77.png"
            alt="Logo"
            className="w-[100px] h-auto md:w-[200px] object-contain"
          />
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-full md:max-w-2xl mx-4 md:mx-8 relative hidden sm:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search people, skills and communities"
              onClick={handleSearchClick}
              readOnly
              className="w-full px-4 py-2 pl-10 pr-4 rounded-full bg-transparent w-[70%] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Location */}
          <div className="hidden sm:flex items-center gap-2 text-gray-700">
            <MapPin className="h-5 w-5" />
            <section className="block">
              <span className="block text-[12px]">Location</span>
              <span className="text-sm truncate max-w-[100px] sm:max-w-none">
                3329 Joyce St
              </span>
            </section>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <Bell
              className="h-6 w-6 text-gray-700 cursor-pointer"
              onClick={toggleNotifications}
            />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              3
            </span>

            {notificationDropdown && (
              <div className="lg:absolute right-0 mt-2 lg:w-80 fixed w-full bg-input rounded-lg shadow-lg py-2 z-50">
                <div className="px-4 py-2">
                  <h3 className="font-semibold">Notifications</h3>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <Link to="/user" className="flex space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white cursor-pointer">
                <img
                  src={profileData?.photourl || "/default-avatar.png"}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <span className="pt-2"></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      <div className="w-full md:hidden px-4 py-4 md:max-w-2xl md:mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search people, skills and communities"
            onClick={handleSearchClick}
            readOnly
            className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:primary focus:border-transparent cursor-pointer"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>
    </>
  );
};

export default UserHeader;
