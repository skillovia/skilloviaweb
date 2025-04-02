import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../UserLayout/UserLayout";
import { Loader2, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const BookingCard = ({
  id,
  title,
  description,
  date,
  status,
  location,
  fileUrl,
  type,
}) => {
  return (
    <div className="block bg-input border border-gray p-4 rounded-lg mb-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-4">
        <div className="rounded-lg flex items-center justify-center">
          <img
            src={`${fileUrl}`}
            alt="Booking"
            className="w-28 h-28 rounded-lg object-cover"
          />
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
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title={`${
                  type.charAt(0).toUpperCase() + type.slice(1)
                } Booking Details`}
              >
                {type === "outward" ? (
                  <ArrowUpRight className="w-4 h-4 text-gray-600" />
                ) : (
                  <ArrowDownLeft className="w-4 h-4 text-gray-600" />
                )}
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
    </div>
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
                type={activeTab}
              />
            ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Bookings;
