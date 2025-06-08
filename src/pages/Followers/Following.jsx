import React, { useState, useEffect } from "react";
import UserLayout from "../User-Dashboard/UserLayout/UserLayout";
import BackButton from "../../componets/Back";
import { Link } from "react-router-dom";

const Following = () => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) throw new Error("Access token not found");

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/follows/getfollowings`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch following");
        }

        const followingData = await response.json();
        console.log(followingData);
        setFollowing(followingData.data || []);
      } catch (err) {
        console.error("Error fetching following:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowing();
  }, []);

  if (loading) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return (
      <UserLayout>
        <div className="p-4 text-red-500">Error: {error}</div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="px-4">
        <span className="flex mb-4">
          <BackButton label="" />
          <h2 className="text-xl text-slate-800 mt-2">
            Following ({following.length})
          </h2>
        </span>
        <div className="space-y-4">
          {following.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              Not following anyone yet
            </div>
          ) : (
            following.map((followData) => {
              const user = followData.following_id; // Extract the nested user object
              return (
                <Link key={user._id} to={`/user-profile/${user._id}`}>
                  <div className="p-2 border border-gray bg-input mb-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-center space-x-4">
                      <img
                        src={
                          user.photourl ||
                          "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                        }
                        alt={`${user.firstname} ${user.lastname}`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-medium">
                          {user.firstname} {user.lastname}
                        </h3>
                        <p className="text-gray-600 text-[12px]">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default Following;
