import React, { useState, useEffect } from "react";
import { Search, MapPin, Bell, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const UserHeader = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState({
    bookings: [],
    followers: [],
    followees: []
  });
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  const handleSearchClick = () => {
    navigate("/search");
  };

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

  const fetchNotifications = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found");
      }

      // Fetch different types of notifications concurrently
      const [bookingsRes, followersRes, followeesRes] = await Promise.all([
        fetch("https://skilloviaapi.vercel.app/api/notifications/bookings", {
          headers: { Authorization: `Bearer ${accessToken}` }
        }),
        fetch("https://skilloviaapi.vercel.app/api/notifications/follower", {
          headers: { Authorization: `Bearer ${accessToken}` }
        }),
        fetch("https://skilloviaapi.vercel.app/api/notifications/followees", {
          headers: { Authorization: `Bearer ${accessToken}` }
        })
      ]);

      // Parse responses
      const bookingsData = await bookingsRes.json();
      const followersData = await followersRes.json();
      const followeesData = await followeesRes.json();

      // Update notifications state
      setNotifications({
        bookings: bookingsData.data || [],
        followers: followersData.data || [],
        followees: followeesData.data || []
      });
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.message);
    }
  };

  const getTotalNotificationCount = () => {
    return notifications.bookings.length + 
           notifications.followers.length + 
           notifications.followees.length;
  };

  useEffect(() => {
    fetchProfile();
    fetchNotifications();
  }, []);

  // Render notifications dropdown
  const renderNotificationsDropdown = () => {
    const allNotifications = [
      ...notifications.bookings.map(n => ({ ...n, type: 'bookings' })),
      ...notifications.followers.map(n => ({ ...n, type: 'followers' })),
      ...notifications.followees.map(n => ({ ...n, type: 'followees' }))
    ];

    return (
      <div className="lg:absolute right-0 mt-5 lg:w-80 fixed w-full bg-input border border-secondary md:rounded-lg py-2 z-50">
        <div className="px-4 py-4 b rounded-b-2xl">
          <h3 className="font-semibold">Notifications</h3>
          {allNotifications.map((notification) => (
            <div
              key={`${notification.type}-${notification.id}`}
              className="p-2 bg-input border border-gray my-2 rounded-md"
            >
             <p className="text-secondary text-[13px] font-semibold"> {notification.title} </p>
             <p className="text-[12px]">   {notification.description} </p>
            
            </div>
          ))}
        </div>
      </div>
    );
  };

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
          <Link to="/settings/profile" className="hidden sm:flex items-center gap-2 text-gray-700">
            <MapPin className="h-5 w-5 text-secondary" />
            <section className="block">
              <p className="font-semibold capitalize leading-[12px] text-secondary text-[14px] block">
                {profileData?.location || "Not set"}
              </p>
              <span className="text-[12px] text-secondary truncate max-w-[100px] capitalize sm:max-w-none">
                {profileData?.street || "Not set"} {profileData?.zip_code || "Not set"}
              </span>
            </section>
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <Bell
              className="h-6 w-6 text-gray-700 cursor-pointer"
              onClick={toggleNotifications}
            />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {getTotalNotificationCount()}
            </span>

            {notificationDropdown && renderNotificationsDropdown()}
          </div>

          {/* Profile - Updated section */}
          <div className="relative">
            <Link to="/user" className="flex space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white cursor-pointer relative">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="animate-spin w-4 h-4 text-secondary" />
                  </div>
                ) : (
                  <img
                    src={profileData?.photourl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                )}
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