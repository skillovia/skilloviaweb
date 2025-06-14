
import React, { useState, useEffect } from "react";
import { Search, MessageCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { IoLogoWechat } from "react-icons/io5";

const ChatMobile = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
          throw new Error("No access token found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/message/chat/history/users`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        // console.log(data);

        if (data.status === "success" && Array.isArray(data.data)) {
          const formattedUsers = data.data.map((user) => ({
            id: user.user_id,
            name: user.name,

            time: formatTime(user.lastMessageTime),
            unreadCount: user.unreadMessageCount || 0,
            photoUrl: user.photourl
              ? `${user.photourl}`
              : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg",
          }));
          setUsers(formattedUsers);
        }
      } catch (err) {
        setError(err.message);
        if (err.message.includes("token")) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const formatTime = (timestamp) => {
    if (!timestamp) return null;
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    // If within an hour, show X mins ago
    if (diffMinutes < 60) {
      return `${diffMinutes <= 0 ? 1 : diffMinutes} min${
        diffMinutes === 1 ? "" : "s"
      } ago`;
    }
    // If today, show time
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return date
        .toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
        .toLowerCase();
    }
    // If yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    ) {
      return "Yesterday";
    }
    // Else, show date
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleUserClick = (user) => {
    navigate(`/chat/${user.id}`, {
      state: {
        userId: user.id,
        userName: user.name,
        userPhoto: user.photoUrl,
      },
    });
  };

  return (
    <div className="block lg:hidden ">
      <div className="overflow-y-auto px-4">
        {loading && <div className="p-4 text-center">Loading...</div>}

        {error && (
          <div className="p-4 text-center text-red-500">Error: {error}</div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="p-8 text-center flex flex-col text-secondary items-center h-[20rem] justify-center text-gray-400">
            <IoLogoWechat size={48} className="mx-auto mb-2 text-secondary" />
            <span>
              No messages for now... they'll appear here when you have them
            </span>
          </div>
        )}

        {!loading &&
          !error &&
          users.length > 0 &&
          users.map((user) => (
            <div
              key={user?.id}
              onClick={() => handleUserClick(user)}
              className="flex items-center  border bg-input rounded-lg border-gray p-2  cursor-pointer hover:bg-gray-50 transition-colors duration-200"
            >
              <img
                src={user?.photoUrl}
                alt={user?.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between items-center">
                  <span className="block">
                    <h3 className="font-medium text-gray-900">{user?.name}</h3>
                    <span className="text-sm text-gray-500">{user?.time}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {user.unreadCount > 0 && (
                      <span className="bg-green-500 text-white w-5 h-5 text-sm font-medium px-2 py-[0.3px]  rounded-full min-w-[20px] text-center">
                        {user?.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm text-gray-500 truncate mt-1">
                  {user?.message}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ChatMobile;
