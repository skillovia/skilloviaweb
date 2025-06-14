

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import UserLayout from "../../UserLayout/UserLayout";
import BookCard from "../BookCard";
import { Check, Loader2 } from "lucide-react";
import BackButton from "../../../../componets/Back";

const OutwardProgress = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const accessToken = localStorage.getItem("accessToken");

      try {
        const bookingResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/bookings/get/user/outward`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!bookingResponse.ok) {
          throw new Error("Failed to fetch booking details");
        }

        const bookingData = await bookingResponse.json();
        // const numericId = parseInt(id);
        // const booking = bookingData.data.find(
        //   (booking) => booking.id === numericId
        // );
        const booking = bookingData.data.find(
          (booking) => booking.id === id // compare with string id directly
        );
        if (!booking) {
          throw new Error("Booking not found");
        }

        setBookingDetails(booking);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const handleBookingAction = async (action) => {
    setIsProcessing(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/bookings/${action}/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${action} booking`);
      }

      // Update local booking status
      setBookingDetails((prev) => ({
        ...prev,
        status:
          action === "accept"
            ? "accepted"
            : action === "in-progress"
            ? "in_progress"
            : "completed",
      }));

      // Show success message and redirect
      const actionVerb =
        action === "in-progress"
          ? "started"
          : action === "complete"
          ? "completed"
          : "accepted";
      alert(`Booking ${actionVerb} successfully`);

      if (action === "complete") {
        navigate("/bookings");
      }
    } catch (err) {
      setError(`Error with booking action: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenDispute = () => {
    // Navigate to the dispute page with all booking data passed via navigate state
    if (bookingDetails) {
      navigate("/open-dispute", {
        state: {
          bookingId: bookingDetails.id,
          bookedUserId: bookingDetails.booked_user_id,
          bookingTitle: bookingDetails.title,
          description: bookingDetails.description,
        },
      });
    } else {
      alert("Cannot open dispute: Missing booking information");
    }
  };

  const getTimelineData = (status) => {
    // Define status check logic
    const statusChecks = {
      pending: 1,
      accepted: 2,
      in_progress: 3,
      completed: 4,
      disputed: 4,
    };

    const currentStep = statusChecks[status] || 0;

    return [
      {
        status: "Booking request sent",
        // timestamp: bookingDetails?.createdAt || "-",
        timestamp: bookingDetails?.createdAt
          ? new Date(bookingDetails.createdAt).toLocaleString()
          : "-",
        hasCheck: currentStep >= 1, // Always checked as it's the first step
      },
      {
        status: "Booking request confirmed",
        // timestamp: bookingDetails?.updated_at || "-",
        timestamp: bookingDetails?.updatedAt
          ? new Date(bookingDetails.updatedAt).toLocaleString()
          : "-",
        hasCheck: currentStep >= 2, // Checked for accepted, in_progress, completed
      },
      {
        status: "Payment confirmed",
        // timestamp: bookingDetails?.updated_at || "-",
        timestamp: bookingDetails?.updatedAt
          ? new Date(bookingDetails.updatedAt).toLocaleString()
          : "-",
        hasCheck: currentStep >= 2, // Checked same time as confirmation
      },
      {
        status: "Service in progress",
        // timestamp: bookingDetails?.booking_date || "-",
        timestamp: bookingDetails?.booking_date
          ? new Date(bookingDetails.booking_date).toLocaleString()
          : "-",
        hasCheck: currentStep >= 3, // Checked for in_progress, completed
      },
      {
        status: "Service completed",
        // timestamp: bookingDetails?.updated_at || "-",
        timestamp: bookingDetails?.updatedAt
          ? new Date(bookingDetails.updatedAt).toLocaleString()
          : "-",
        hasCheck: currentStep >= 4, // Only checked when completed
      },
    ];
  };

  const renderActionButton = () => {
    if (!bookingDetails) return null;

    switch (bookingDetails.status) {
      case "pending":
        // Return a disabled button when status is pending
        return (
          <button
            disabled={true}
            className="flex-1 bg-gray-300 text-gray-600 py-3 rounded-full text-[15px] font-medium cursor-not-allowed"
          >
            Start Service (Awaiting Acceptance)
          </button>
        );
      case "accepted":
        return (
          <button
            onClick={() => handleBookingAction("in-progress")}
            disabled={isProcessing}
            className="flex-1 bg-blue-400 text-white py-3 rounded-full text-[15px] font-medium hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Service
          </button>
        );
      case "in_progress":
        return (
          <button
            onClick={() => handleBookingAction("complete")}
            disabled={isProcessing}
            className="flex-1 bg-green-400 text-white py-3 hidden rounded-full text-[15px] font-medium hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
      
          </button>
        );
      case "completed":
        return (
          <button
            disabled={true}
            className="flex-1 bg-gray-300 text-gray-600 py-3 rounded-full text-[15px] font-medium disabled:cursor-not-allowed"
          >
            Service Completed
          </button>
        );
      default:
        return null;
    }
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
        <div className="text-red-500 text-center py-8">Error: {error}</div>
      </UserLayout>
    );
  }

  const timelineData = getTimelineData(bookingDetails?.status);

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4">
        <span className="flex my-6">
          <BackButton />
        </span>
        {bookingDetails && (
          <BookCard
            key={bookingDetails.id}
            id={bookingDetails.id}
            title={bookingDetails.title}
            description={bookingDetails.description}
            date={bookingDetails.booking_date}
            status={bookingDetails.status}
            location={bookingDetails.booking_location}
            fileUrl={bookingDetails.file_url}
            thumbnails={[
              bookingDetails.thumbnail01,
              bookingDetails.thumbnail02,
              bookingDetails.thumbnail03,
              bookingDetails.thumbnail04,
            ].filter(Boolean)} // Filter out null/undefined values
          />
        )}

        <div className="mb-6 mt-4">
          <div className="flex justify-between mb-4">
            <h2 className="font-medium">Progress</h2>
            <Link
              to={`/outward-details/${id}`}
              className="text-secondary font-medium text-sm"
            >
              View Details
            </Link>
          </div>
          <div className="relative">
            {timelineData.map((item, index) => (
              <div key={index} className="relative pl-6 pb-8 last:pb-0">
                {index !== timelineData.length - 1 && (
                  <div
                    className="absolute left-[11px] top-6 w-[2px] h-full bg-gray-200"
                    aria-hidden="true"
                  />
                )}

                <div className="absolute left-0 top-1">
                  {item.hasCheck ? (
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white" />
                  )}
                </div>
                <div className="px-4">
                  <p className="font-medium text-gray-900 mb-1">
                    {item.status}
                  </p>
                  <p className="text-sm text-gray-500">{item.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4 my-6">
          {renderActionButton()}

          {bookingDetails && bookingDetails.status !== "completed" && (
            <button
              onClick={handleOpenDispute}
              disabled={isProcessing}
              className="flex-1 bg-red-100 text-red-600 py-3 rounded-full text-[15px] font-medium hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Open dispute
            </button>
          )}
        </div>
      </div>
    </UserLayout>
  );
};

export default OutwardProgress;
