
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../UserLayout/UserLayout";
import BackButton from "../../../../componets/Back";
import BookCard from "../BookCard";
import { Loader2, MessageCircleMore } from "lucide-react";
import DynamicGoogleMap from "../../../../componets/Map/Map";
import FloatingChatButton from "../../../../componets/FloatingChat";

const OutwardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [technicianProfile, setTechnicianProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const accessToken = localStorage.getItem("accessToken");

      try {
        // First fetch booking details
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
        console.log("Booking Data:vhere...........", booking);

        if (!booking) {
          throw new Error("Booking not found");
        }

        setBookingDetails(booking);

        // Then fetch technician profile using the booking's technician ID
        const profileResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/basic/profile/${
            booking.booked_user_id
            
          }`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch technician profile");
        }

        const profileData = await profileResponse.json();
        console.log("Technician Profile:", profileData.data);
        setTechnicianProfile(profileData.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, navigate]);

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
        status: action === "accept" ? "accepted" : "rejected",
      }));

      // If the action is "accept", navigate to the review page
      if (action === "accept") {
        handleNavigateToReview();
      } else {
        // Show success message and redirect for other actions
        alert(`Booking ${action}ed successfully`);
        navigate("/bookings"); // Or your preferred redirect path
      }
    } catch (err) {
      setError(`Error ${action}ing booking: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleNavigateToReview = () => {
    if (bookingDetails) {
      navigate("/review", {
        state: {
          skillId: bookingDetails.skills_id,
          bookingUserId: bookingDetails.booking_user_id,
          bookingId: bookingDetails.id,
          title: bookingDetails.title,
          booked_user_id: bookingDetails.booked_user_id,
        },
      });
    } else {
      alert("Cannot submit review: Missing booking information");
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

  const handleChatClick = () => {
    if (technicianProfile && bookingDetails) {
      navigate(`/chat/${bookingDetails.booked_user_id}`, {
        state: {
          userId: bookingDetails.booked_user_id,
          userName: `${technicianProfile.firstname} ${technicianProfile.lastname}`,
          userPhoto: technicianProfile.photourl ? `${technicianProfile.photourl}` : null,
        },
      });
    }
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(bookingDetails?.id || "");
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

  return (
    <UserLayout>
       <FloatingChatButton onClick={handleChatClick} />
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <BackButton label="Booking Details" />
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-medium my-4">Contact your technician</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={
                  technicianProfile?.photourl
                    ? `${technicianProfile.photourl}`
                    : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                }
                alt="Technician"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">
                {technicianProfile?.firstname} {technicianProfile?.lastname}
              </span>
            </div>
            <button onClick={handleChatClick}>
              <MessageCircleMore className="text-secondary cursor-pointer" />
            </button>
          </div>
        </div>

     

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

        <div className="space-y-6">
          <div className="my-4">
            <span className="flex justify-between">
              <h2 className="text-sm font-medium mb-2">Location</h2>
              <p className="text-sm text-gray-600 mb-2">
                {bookingDetails?.booking_location || "N/A"}
              </p>
            </span>
            <DynamicGoogleMap location={bookingDetails?.booking_location} />
          </div>

          <div>
            <h2 className="text-sm font-medium mb-2">Title</h2>
            <p className="text-sm text-gray-600">
              {bookingDetails?.title || "N/A"}
            </p>
          </div>

          <div>
            <h2 className="text-sm font-medium mb-2">Message</h2>
            <p className="text-sm text-gray-600">
              {bookingDetails?.description || "N/A"}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Booking ID</span>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {bookingDetails?.id || "N/A"}
              </span>
              <button className="text-green-600 text-sm" onClick={handleCopyId}>
                Copy
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Payment method</span>
            <span className="text-sm text-gray-600">
              {bookingDetails?.payment_method || "Exchange for service"}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Price</span>
            <span className="text-sm text-gray-600">
              £{bookingDetails?.price?.toLocaleString() || "10,000"}
            </span>
          </div>
        </div>

        <div className="flex gap-4 my-6">
        
          <button
            onClick={handleOpenDispute}
            disabled={isProcessing}
            className="flex-1 bg-red-100 text-red-600 py-3 rounded-full text-[15px] font-medium hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Open dispute"}
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default OutwardDetails;
