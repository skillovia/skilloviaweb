import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import UserLayout from '../../UserLayout/UserLayout';
import BookCard from '../BookCard';
import { Check, Loader2 } from 'lucide-react';
import BackButton from '../../../../componets/Back';

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
          "https://testapi.humanserve.net/api/bookings/get/user/outward",
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
        const numericId = parseInt(id);
        const booking = bookingData.data.find(
          (booking) => booking.id === numericId
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
        `https://testapi.humanserve.net/api/bookings/${action}/${id}`,
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
      setBookingDetails(prev => ({
        ...prev,
        status: action === 'accept' ? 'accepted' : 'rejected'
      }));

      // Show success message and redirect
      alert(`Booking ${action}ed successfully`);
      navigate('/bookings');
    } catch (err) {
      setError(`Error ${action}ing booking: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const getTimelineData = (status) => {
    const statusMap = {
      'pending': 1,
      'accepted': 2,
      'in_progress': 3,
      'completed': 4,
      'disputed': 4,
    };

    const currentStep = statusMap[status] || 0;

    return [
      {
        status: "Service completed",
        timestamp: bookingDetails?.updated_at || "-",
        hasCheck: currentStep >= 4
      },
      {
        status: "Service in progress",
        timestamp: bookingDetails?.booking_date || "-",
        hasCheck: currentStep >= 3
      },
      {
        status: "Booking request confirmed",
        timestamp: bookingDetails?.created_at || "-",
        hasCheck: currentStep >= 2
      },
      {
        status: "Booking request sent",
        timestamp: bookingDetails?.created_at || "-",
        hasCheck: currentStep >= 1
      },
      {
        status: "Payment confirmed",
        timestamp: bookingDetails?.created_at || "-",
        hasCheck: currentStep >= 1
      }
    ];
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
                  <p className="text-sm text-gray-500">
                    {item.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => handleBookingAction('accept')}
            disabled={isProcessing}
            className="flex-1 bg-green-400 text-white py-3 rounded-full text-[15px] font-medium hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Confirm completion'}
          </button>
          <button
            onClick={() => handleBookingAction('reject')}
            disabled={isProcessing}
            className="flex-1 bg-red-100 text-red-600 py-3 rounded-full text-[15px] font-medium hover:bg-red-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Open dispute'}
          </button>
        </div>
      </div>
    </UserLayout>
  );
};

export default OutwardProgress;