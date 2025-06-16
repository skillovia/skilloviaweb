import React, { useState, useEffect } from "react";
import { Search, MapPin, Bell, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserHeader = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState({
    bookings: [],
    followers: [],
    followees: [],
    message: [],
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
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("❌ Access token not found in localStorage");
      }
      const decodedToken = jwtDecode(accessToken);
      const user_id = decodedToken?.id;
      if (!user_id) {
        throw new Error("❌ User ID not found in token");
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
        throw new Error("❌ Failed to fetch profile");
      }
      const data = await response.json();
      const updatedData = {
        ...data.data,
        photourl: ensureHttps(data.data.photourl),
      };
      setProfileData(updatedData);
    } catch (err) {
      console.error("❌ Error fetching profile:", err.message);
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
      const [bookingsRes, followersRes, followeesRes, messageRes] =
        await Promise.all([
          fetch(`${import.meta.env.VITE_BASE_URL}/notifications/bookings`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          fetch(`${import.meta.env.VITE_BASE_URL}/notifications/follower`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          fetch(`${import.meta.env.VITE_BASE_URL}/notifications/followees`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          fetch(`${import.meta.env.VITE_BASE_URL}/notifications/message`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);
      const bookingsData = await bookingsRes.json();
      const followersData = await followersRes.json();
      const followeesData = await followeesRes.json();
      const messageData = await messageRes.json();
      setNotifications({
        bookings: bookingsData.data || [],
        followers: followersData.data || [],
        followees: followeesData.data || [],
        message: messageData.data || [],
      });
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(err.message);
    }
  };

  const getTotalNotificationCount = () => {
    const unseen = [
      ...notifications.bookings,
      ...notifications.followers,
      ...notifications.followees,
      ...notifications.message,
    ].filter((n) => n.markAsSeen === "NO");

    return unseen.length;
  };

  // Listen for profile updates from anywhere in the app
  useEffect(() => {
    fetchProfile();
    fetchNotifications();

    const handleProfileUpdated = () => {
      setLoading(true);
      fetchProfile();
    };
    window.addEventListener("profileUpdated", handleProfileUpdated);
    return () => {
      window.removeEventListener("profileUpdated", handleProfileUpdated);
    };
    // eslint-disable-next-line
  }, []);

  const renderNotificationsDropdown = () => {
    const allNotifications = [
      ...notifications.bookings.map((n) => ({ ...n, type: "bookings" })),
      ...notifications.followers.map((n) => ({ ...n, type: "followers" })),
      ...notifications.followees.map((n) => ({ ...n, type: "followees" })),
      ...notifications.message.map((n) => ({ ...n, type: "message" })),
    ];
    const handleMarkAsSeen = async (notification) => {
      try {
        if (notification.markAsSeen === "NO") {
          const token = localStorage.getItem("accessToken");
          const updated = await markNotificationAsSeen(notification._id, token);

          setNotifications((prev) => {
            const updateList = (list) =>
              list.map((n) =>
                n._id === updated._id ? { ...n, markAsSeen: "YES" } : n
              );

            return {
              bookings: updateList(prev.bookings),
              followers: updateList(prev.followers),
              followees: updateList(prev.followees),
              message: updateList(prev.message),
            };
          });
        }
      } catch (err) {
        console.error("Failed to mark as seen:", err.message);
      }
    };
    return (
      <div className="lg:absolute right-0 mt-5 lg:w-80 fixed h-[20rem] overflow-y-auto w-full bg-input border border-secondary md:rounded-lg py-2 z-50">
        <div className="px-4 py-4 b rounded-b-2xl">
          <h3 className="font-semibold">Notifications</h3>
          {allNotifications
            .filter((notification) => notification.markAsSeen === "NO")
            .map((notification) => (
              <div
                key={`${notification.type}-${notification._id}`}
                onClick={() => handleMarkAsSeen(notification)}
                className={`p-2 cursor-pointer border border-gray my-2 rounded-md ${
                  notification.markAsSeen === "NO" ? "bg-red-50" : "bg-input"
                }`}
              >
                <p className="text-secondary text-[13px] font-semibold">
                  {notification.title}
                </p>
                <p className="text-[12px]">{notification.description}</p>
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
        <div className="flex items-center gap-4 lg:space-x-9">
          {/* Location */}
          <Link
            to="/settings/profile"
            className="hidden sm:flex items-center gap-2 text-gray-700"
          >
            <MapPin className="h-5 w-5 text-secondary" />
            <section className="block">
              <p className="font-semibold capitalize leading-[12px] text-secondary text-[14px] block">
                {profileData?.locationName || "Not set"}
              </p>
              <span className="text-[12px] text-secondary truncate max-w-[100px] capitalize sm:max-w-none">
                {profileData?.street || "Not set"}{" "}
                {profileData?.zip_code || "Not set"}
              </span>
            </section>
          </Link>

          {/* Notification Bell */}
          <div className="relative">
            <section
              onClick={toggleNotifications}
              className="not bg-red border-2  h-8 w-8 lg:w-10 lg:h-10 rounded-full flex justify-center items-center border-secondary"
            >
              <Bell className="h-6 w-6 text-secondary cursor-pointer" />
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {getTotalNotificationCount()}
              </span>
            </section>
            {notificationDropdown && renderNotificationsDropdown()}
          </div>

          {/* Profile Photo */}
          <div className="relative">
            <Link to="/user" className="flex space-x-2">
              <div className="h-10 w-10 rounded-full bg-gray-200 border-2 border-white cursor-pointer relative">
                {loading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Loader2 className="animate-spin w-4 h-4 text-secondary" />
                  </div>
                ) : (
                  <img
                    src={
                      profileData?.photourl ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKaiKiPcLJj7ufrj6M2KaPwyCT4lDSFA5oog&s"
                    }
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
