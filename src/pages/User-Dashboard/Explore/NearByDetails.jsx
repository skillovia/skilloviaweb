import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Loader2,
  MessageCircleMore,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import UserLayout from "../UserLayout/UserLayout";
import BackButton from "../../../componets/Back";
import FollowButton from "../../../componets/FollowBtn";
import { Star } from "lucide-react";

const NearByDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log("userId:", id); // This should NEVER be undefined

  const [profile, setProfile] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reviewsError, setReviewsError] = useState("");
  const [expandedSkills, setExpandedSkills] = useState({});

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      setError("");

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/basic/profile/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        console.log(data);

        setProfile(data.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError(err.message || "Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchUserReviews = async () => {
      setReviewsLoading(true);
      setReviewsError("");

      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("Access token not found");
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/reviews/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user reviews");
        }

        console.log("Response:", response);

        const data = await response.json();
        console.log("Reviews data:", data);

        if (data.status === "success" && Array.isArray(data.data)) {
          setReviews(data.data);
        } else {
          setReviews([]);
        }
      } catch (err) {
        console.error("Error fetching user reviews:", err);
        setReviewsError(err.message || "Failed to load reviews");
      } finally {
        setReviewsLoading(false);
      }
    };

    fetchUserProfile();
    fetchUserReviews();
  }, [id]);

  const handleChatClick = () => {
    if (profile) {
      navigate(`/chat/${id}`, {
        state: {
          userId: id,
          userName: `${profile.firstname} ${profile.lastname}`,
          userPhoto: profile.photourl ? `${profile.photourl}` : null,
        },
      });
    }
  };

  const toggleReviews = (skillId) => {
    setExpandedSkills((prev) => ({
      ...prev,
      [skillId]: !prev[skillId],
    }));
  };

  if (isLoading) {
    return (
      <UserLayout>
        <div className="flex justify-center items-center py-8">
          <Loader2 className="animate-spin w-8 h-8 text-gray-500" />
        </div>
      </UserLayout>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (!profile) {
    return (
      <div className="text-gray-500 text-center py-4">
        No profile data available.
      </div>
    );
  }

  const {
    firstname,
    lastname,
    email,
    total_followers,
    total_following,
    bio,
    skills,
    photourl,
  } = profile;

  // Function to render star rating
  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ));
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter reviews by skill ID
  const getReviewsBySkill = (skillId) => {
    return reviews.filter((review) => review.skill_id === skillId);
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 rounded-lg">
        <div className="flex items-center justify-between gap-4 mb-6">
          <BackButton label="Profile" />

          <MessageCircleMore
            onClick={handleChatClick}
            className="text-secondary cursor-pointer"
          />
        </div>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={
              photourl
                ? `${photourl}`
                : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
            }
            alt={firstname}
            className="w-16 rounded-lg h-16 object-cover"
          />
          <div>
            <h2 className="text-lg font-semibold">
              {firstname} {lastname}
            </h2>
            <p className="text-gray-600 text-[12px]">@{email}</p>
            <div className="flex gap-4 mt-1 text-sm text-gray-600">
              <span>
                <strong>{total_followers || 0}</strong> followers
              </span>
              <span>
                <strong>{total_following || 0}</strong> following
              </span>
            </div>
          </div>
          <FollowButton />
        </div>

        <div className="mb-8">
          <h3 className="font-semibold mb-2">Bio</h3>
          <p className="text-gray-600">{bio || "No bio available."}</p>
        </div>

        {skills && skills.length > 0 && (
          <div className="mb-8">
            <h3 className="font-semibold mb-4">Skills</h3>
            <div className="space-y-4">
              {skills.map((skill) => {
                const skillReviews = getReviewsBySkill(
                  skill.id || skill.skill_id
                );
                const isExpanded = expandedSkills[skill.id || skill.skill_id];
                const displayedReviews = isExpanded
                  ? skillReviews
                  : skillReviews.slice(0, 1);

                return (
                  <div
                    key={skill.id || skill.skill_id}
                    className="bg-input p-4 border border-gray rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-[14px] font-medium">
                          {skill.skill_type}
                        </h3>
                        <h4 className="text-[12px]">
                          Description: {skill.description}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Experience level:{" "}
                          {skill.experience_level || "Unknown"}
                        </p>
                        <h3 className="text-[14px] font-medium">
                          hourly_rate: £{skill.hourly_rate} -{" "}
                          {skill.spark_token} Spark Token
                        </h3>
                      </div>
                      <Link
                        to="/book-service"
                        state={{
                          user: {
                            id,
                            firstname,
                            lastname,
                            email,
                            bio,
                            photourl,
                          },
                          skill: {
                            ...skill,
                            thumbnail01: skill.thumbnail01,
                            thumbnail02: skill.thumbnail02,
                            thumbnail03: skill.thumbnail03,
                            thumbnail04: skill.thumbnail04,
                          },
                        }}
                        className="px-4 py-2 bg-yellow-100 rounded-full text-sm hover:bg-yellow-200"
                      >
                        Book
                      </Link>
                    </div>

                    {/* Reviews Section within each skill */}
                    <div className="mt-4 border-t pt-3 border-t-secondary">
                      <h4 className="text-sm font-medium mb-2">Reviews</h4>

                      {reviewsLoading ? (
                        <div className="flex justify-center items-center py-2">
                          <Loader2 className="animate-spin w-4 h-4 text-gray-500" />
                        </div>
                      ) : skillReviews.length === 0 ? (
                        <p className="text-gray-500 text-sm italic">
                          No reviews yet for this skill.
                        </p>
                      ) : (
                        <>
                          <div className="space-y-3">
                            {displayedReviews.map((review) => (
                              <div
                                key={review.id}
                                className="bg-gray-50 p-3 rounded"
                              >
                                <div className="flex justify-between items-start mb-1">
                                  <div className="flex items-center gap-1">
                                    {renderStars(review.rating)}
                                    <span className="text-xs ml-1">
                                      ({review.rating}/5)
                                    </span>
                                  </div>
                                  <span className="text-xs text-gray-500">
                                    {formatDate(review.created_at)}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-700">
                                  {review.comment}
                                </p>
                              </div>
                            ))}
                          </div>

                          {skillReviews.length > 1 && (
                            <button
                              onClick={() =>
                                toggleReviews(skill.id || skill.skill_id)
                              }
                              className="flex items-center gap-1 text-xs text-secondary font-bold mt-2 hover:underline"
                            >
                              {isExpanded ? (
                                <>
                                  <ChevronUp size={14} />
                                  Show less
                                </>
                              ) : (
                                <>
                                  <ChevronDown size={14} />
                                  View {skillReviews.length - 1} more{" "}
                                  {skillReviews.length - 1 === 1
                                    ? "review"
                                    : "reviews"}
                                </>
                              )}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default NearByDetails;
