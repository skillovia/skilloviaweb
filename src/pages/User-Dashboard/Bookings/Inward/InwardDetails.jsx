import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserLayout from "../../UserLayout/UserLayout";
import BackButton from "../../../../componets/Back";
import BookCard from "../BookCard";
import { Loader2, MessageCircleMore, X, CheckCircle } from "lucide-react";
import DynamicGoogleMap from "../../../../componets/Map/Map";

const InwardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [clientProfile, setClientProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const accessToken = localStorage.getItem("accessToken");

      try {
        // First fetch booking details
        const bookingResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/bookings/get/user/inward`,
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
        const numericId = parseInt(id, 10);
        const booking = bookingData.data.find(
          (booking) => booking.id === numericId
        );

        if (!booking) {
          throw new Error("Booking not found");
        }

        setBookingDetails(booking);

        // Then fetch client profile using the booking's client ID
        const profileResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/basic/profile/${
            booking.booking_user_id
          }`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch client profile");
        }

        const profileData = await profileResponse.json();
        setClientProfile(profileData.data);
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

      // Show success message
      alert(`Booking ${action}ed successfully`);
    } catch (err) {
      setError(`Error ${action}ing booking: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCompleteBooking = async () => {
    setIsProcessing(true);
    const accessToken = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/bookings/completed/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: "completed"
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to complete booking");
      }

      // Update local booking status
      setBookingDetails((prev) => ({
        ...prev,
        status: "completed",
      }));

      // Close confirmation modal and show success modal
      setShowCompletionModal(false);
      setShowSuccessModal(true);
      
      // Redirect after delay
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/bookings");
      }, 3000); // Redirect after 3 seconds
    } catch (err) {
      setError(`Error completing booking: ${err.message}`);
      setShowCompletionModal(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChatClick = () => {
    if (clientProfile) {
      navigate(`/chat/${id}`, {
        state: {
          userId: id,
          userName: `${clientProfile.firstname} ${clientProfile.lastname}`,
          userPhoto: clientProfile.photourl
            ? `https://${clientProfile.photourl}`
            : null,
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
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <BackButton label="Booking Progress" />
        </div>

        <div className="mb-4">
          <h2 className="text-sm font-medium my-4">Client</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={
                  clientProfile?.photourl
                    ? `${clientProfile.photourl}`
                    : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                }
                alt="Client"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-medium">
                {clientProfile?.firstname} {clientProfile?.lastname}
              </span>
            </div>
            <button className="text-red-600 hidden">
              <MessageCircleMore
                onClick={handleChatClick}
                className="text-secondary cursor-pointer"
              />
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
          {bookingDetails.status === "completed" ? (
            <button
              disabled
              className="flex-1 bg-gray-300 text-white py-3 rounded-full text-[15px] font-medium cursor-not-allowed"
            >
              Completed
            </button>
          ) : bookingDetails.status === "accepted" ? (
            <button
              onClick={() => setShowCompletionModal(true)}
              disabled={isProcessing}
              className="flex-1 bg-green-400 text-white py-3 rounded-full text-[15px] font-medium hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Complete booking"}
            </button>
          ) : (
            <button
              onClick={() => handleBookingAction("accept")}
              disabled={isProcessing}
              className="flex-1 bg-green-400 text-white py-3 rounded-full text-[15px] font-medium hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Processing..." : "Accept booking"}
            </button>
          )}
          <button
            onClick={() => handleBookingAction("reject")}
            disabled={isProcessing || bookingDetails.status === "completed"}
            className="flex-1 bg-red-100 text-red-600 py-3 rounded-full text-[15px] font-medium hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? "Processing..." : "Reject booking"}
          </button>
        </div>
      </div>

      {/* Completion Confirmation Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-input rounded-lg p-6 max-w-md w-full shadow-xl animate-fadeIn">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Complete Booking</h3>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-8">
              <p className="text-gray-600 mb-6">
                Are you sure you want to mark this booking as completed? This action cannot be undone.
              </p>
              
              <div className="bg-input p-4 rounded-lg border border-gray">
                <h4 className="text-sm font-semibold mb-3 text-gray-700">Booking Details:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">ID:</span>
                    <span className="text-sm font-medium">{bookingDetails?.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Client:</span>
                    <span className="text-sm font-medium">{clientProfile?.firstname} {clientProfile?.lastname}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Title:</span>
                    <span className="text-sm font-medium">{bookingDetails?.title}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={handleCompleteBooking}
                disabled={isProcessing}
                className="flex-1 bg-secondary text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={18} className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Confirm Completion"
                )}
              </button>
              <button
                onClick={() => setShowCompletionModal(false)}
                className="flex-1 bg-gray-100 text-red-600 py-3 px-4 border border-red-500 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl animate-fadeIn text-center">
            <div className="mb-4 flex justify-center">
              <CheckCircle size={64} className="text-secondary" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Booking Completed!</h3>
            <p className="text-gray-600 mb-6">
              You have successfully marked this booking as completed.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-6">
              <div className="text-sm text-gray-600">
                You will be redirected to the bookings page in a few seconds...
              </div>
            </div>
            <button
              onClick={() => {
                setShowSuccessModal(false);
                navigate("/bookings");
              }}
              className="w-full bg-secondary text-white py-3 px-4 rounded-lg text-sm font-medium hover:bg-green-600 transition-colors"
            >
              Go to Bookings
            </button>
          </div>
        </div>
      )}
    </UserLayout>
  );
};

export default InwardDetails;