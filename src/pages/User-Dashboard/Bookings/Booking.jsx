import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../UserLayout/UserLayout';

const BookingCard = ({ title, description, date, status, id, link }) => (
  <Link 
    to={link}
    className="block bg-input border border-gray p-4 rounded-lg mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-start gap-4">
      <div className="rounded-lg flex items-center justify-center">
        <img 
          src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736676897/cfa21e3a40d7c9b2264ad825ec570dbf_bf6ebf.jpg"
          alt="AC Unit Icon"
          className="w-24 h-24 rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="text-[12px] text-gray-600 mt-1">{description}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-500">{date}</span>
          <span className="px-2 py-1 text-xs rounded-lg bg-primary text-secondary">
            {status}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const Bookings = () => {
  const [activeTab, setActiveTab] = useState('inward');

  const inwardBookings = [
    {
      id: 'in-1',
      title: "AC Unit Repair",
      description: "This is a booking description for this particular card. You can click on this card to view this in extension.",
      date: "23 Sept, 2022 - 12:39 AM",
      status: "Active",
      link: "/inward-details"
    },
   
    
  ];

  const outwardBookings = [
    {
      id: 'out-1',
      title: "Window Cleaning",
      description: "Regular maintenance window cleaning service.",
      date: "24 Sept, 2022 - 2:00 PM",
      status: "Active",
      link: "/outward-progress"
    }
  ];

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`pb-2 font-medium border-b-2 transition-colors ${
        activeTab === id
          ? 'text-secondary border-secondary border-b-4'
          : 'text-gray-400 border-transparent hover:text-gray-600'
      }`}
    >
      {label}
    </button>
  );

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-xl font-semibold mb-6">Bookings</h2>
        
        <div className="flex gap-8 mb-6">
          <TabButton id="inward" label="Inward Bookings" />
          <TabButton id="outward" label="Outward Bookings" />
        </div>

        <div>
          {activeTab === 'inward' && inwardBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              id={booking.id}
              title={booking.title}
              description={booking.description}
              date={booking.date}
              status={booking.status}
              link={booking.link}
            />
          ))}
          {activeTab === 'outward' && outwardBookings.map((booking) => (
            <BookingCard
              key={booking.id}
              id={booking.id}
              title={booking.title}
              description={booking.description}
              date={booking.date}
              status={booking.status}
              link={booking.link}
            />
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default Bookings;