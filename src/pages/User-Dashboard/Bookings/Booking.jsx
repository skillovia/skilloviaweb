
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../UserLayout/UserLayout";
import {
  Loader2,
  ArrowUpRight,
  ArrowDownLeft,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const BookingCard = ({
  id,
  title,
  description,
  date,
  status,
  location,
  fileUrl,
  thumbnails,
  type,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Function to get all available images
  const getAllImages = () => {
    if (thumbnails && thumbnails.length > 0) {
      return thumbnails;
    }
    return fileUrl ? [fileUrl] : [];
  };

  const images = getAllImages();
  const primaryImage = images[0];
  const hasMultipleImages = images.length > 1;

  const openModal = () => {
    setIsModalOpen(true);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <div className="block bg-input border border-gray p-4 rounded-lg mb-4 hover:bg-gray-50 transition-colors">
        <div className="flex items-start gap-4">
          <div className="relative rounded-lg flex items-center justify-center">
            {/* Display primary image */}
            {primaryImage && (
              <div className="relative">
                <img
                  src={primaryImage}
                  alt="Booking"
                  className="w-28 h-28 rounded-lg object-cover"
                />

                {/* Overlay for multiple images */}
                {hasMultipleImages && (
                  <div
                    onClick={openModal}
                    className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-all"
                  >
                    <div className="text-white text-center">
                      <div className="text-xs font-medium">
                        +{images.length - 1}
                      </div>
                      <div className="text-xs">View more</div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-gray-900 text-[12px] lg:text-[20px]">
                {title}
              </h3>
              <div className="flex gap-2">
                <Link
                  to={
                    type === "outward"
                      ? `/outward-progress/${id}`
                      : `/inward-details/${id}`
                  }
                  className=" hover:bg-gray-100 bg-secondary p-2 px-4 hidden lg:block text-white rounded-lg capitalize text-[12px] transition-colors"
                  title={`${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } Booking Details`}
                >
                 
                  view progress
                </Link>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {description}
            </p>
            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{date}</p>
            <div className="flex items-center gap-4 mt-2">
              <span
                className={`px-2 py-1 text-xs rounded-lg ${
                  status === "accepted"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </span>
          
            </div>
          </div>
        </div>
        <Link
                  to={
                    type === "outward"
                      ? `/outward-progress/${id}`
                      : `/inward-details/${id}`
                  }
                  className=" hover:bg-gray-100 bg-secondary p-2 justify-center px-4 lg:hidden flex mt-4 text-white rounded-lg capitalize text-[12px] transition-colors"
                  title={`${
                    type.charAt(0).toUpperCase() + type.slice(1)
                  } Booking Details`}
                >
                 
                  view progress
                </Link>
      </div>

      {/* Image Gallery Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full max-h-full">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Main image */}
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`Booking image ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[70vh] object-contain rounded-lg"
              />

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
                  >
                    <ChevronRight className="w-6 h-6 text-white" />
                  </button>
                </>
              )}

              {/* Image counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} of {images.length}
              </div>
            </div>

            {/* Thumbnail navigation */}
            {images.length > 1 && (
              <div className="flex justify-center gap-2 mt-4 overflow-x-auto">
                {images.map((imageUrl, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`flex-shrink-0 ${
                      index === currentImageIndex
                        ? "ring-2 ring-white ring-opacity-60"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("inward");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      const accessToken = localStorage.getItem("accessToken");

      const apiUrl =
        activeTab === "outward"
          ? `${import.meta.env.VITE_BASE_URL}/bookings/get/user/outward`
          : `${import.meta.env.VITE_BASE_URL}/bookings/get/user/inward`;

      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        console.log(data.data);

        setBookings(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [activeTab]);

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`pb-2 font-medium border-b-2 border-gray transition-colors ${
        activeTab === id
          ? "text-secondary border-secondary border-b-4 "
          : "text-gray-400 border-transparent hover:text-gray-600"
      }`}
    >
      {label}
    </button>
  );

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h2 className="text-2xl font-semibold mb-6">Bookings</h2>

        <div className="flex gap-8 mb-6 border-b border-b-secondary">
          <TabButton id="inward" label="Inward Bookings" />
          <TabButton id="outward" label="Outward Bookings" />
        </div>

        <div>
          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="animate-spin w-12 h-12 text-secondary" />
            </div>
          )}

          {error && (
            <div className="text-center py-8 text-red-500">
              Error loading bookings: {error}
            </div>
          )}

          {!loading && !error && bookings.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No {activeTab} bookings found
            </div>
          )}

          {!loading &&
            !error &&
            bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                id={booking.id}
                title={booking.title}
                description={booking.description}
                date={booking.booking_date}
                status={booking.status}
                location={booking.booking_location}
                fileUrl={booking.file_url}
                thumbnails={[
                  booking.thumbnail01,
                  booking.thumbnail02,
                  booking.thumbnail03,
                  booking.thumbnail04,
                ].filter(Boolean)} 
                type={activeTab}
              />
            ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Bookings;
