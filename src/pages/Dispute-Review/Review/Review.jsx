import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserLayout from "../../User-Dashboard/UserLayout/UserLayout";
import BackButton from "../../../componets/Back";

import { Star, Loader2 } from "lucide-react";

const Review = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { skillId, bookingUserId, bookingId, title, booked_user_id } = location.state || {};
  
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  console.log("[LOG] Component loaded with data:", { skillId, bookingId, title, booked_user_id });

  const handleRatingChange = (selectedRating) => {
    console.log("[LOG] Rating selected:", selectedRating);
    setRating(selectedRating);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.warn("[WARN] No access token found in localStorage.");
    } else {
      console.log("[LOG] Access token retrieved successfully.");
    }

    const reviewData = {
      skillId: skillId,
      revieweeId: booked_user_id,
      rating: rating,
      comment: comment,
     
    };

    console.log("[LOG] Review data being submitted:", reviewData);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/reviews`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData)
        }
      );

      console.log("[LOG] Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json();
        console.error("[ERROR] Submission failed:", errorData);
        throw new Error(errorData?.message || "Failed to submit review");
      }

      const result = await response.json();
      console.log("[LOG] Review submitted successfully:", result);

      alert("Review submitted successfully");
      navigate("/bookings");
    } catch (err) {
      console.error("[ERROR] Exception during submission:", err.message);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
      console.log("[LOG] Submission attempt finished.");
    }
  };

  if (!skillId || !bookingUserId) {
    console.error("[ERROR] Missing required parameters:", { skillId, bookingUserId, booked_user_id });
    return (
      <UserLayout>
        <div className="text-red-500 text-center py-8">
          Missing required information to submit a review. Please go back and try again.
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <BackButton label="Write a Review" />
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">
            Review for: {title || "Service"}
          </h2>

          <form onSubmit={handleSubmitReview}>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingChange(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      fill={star <= rating ? "#FFD700" : "none"}
                      stroke={star <= rating ? "#FFD700" : "currentColor"}
                      className="w-8 h-8"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="comment" className="block text-sm font-medium mb-2">
                Your comments
              </label>
              <textarea
                id="comment"
                rows={4}
                value={comment}
                onChange={(e) => {
                  console.log("[LOG] Comment changed:", e.target.value);
                  setComment(e.target.value);
                }}
                className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                placeholder="Share your experience with this service..."
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm mb-4">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || rating === 0}
              className="w-full bg-secondary text-white py-3 rounded-full text-[15px] font-medium hover:bg-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin w-5 h-5 mr-2" />
                  Submitting...
                </div>
              ) : (
                "Submit Review"
              )}
            </button>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default Review;