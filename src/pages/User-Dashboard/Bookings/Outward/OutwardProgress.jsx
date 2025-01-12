import React from 'react';
import UserLayout from '../../UserLayout/UserLayout';
import BookCard from '../BookCard';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';


const OutwardProgress = () => {
  const timelineData = [
    {
      status: "Service completed",
      timestamp: "April 19, 2012 3:35 PM",
      hasCheck: false
    },
    {
      status: "Service in progress",
      timestamp: "March 11, 2012 11:08 PM",
      hasCheck: false
    },
    {
      status: "Booking request confirmed",
      timestamp: "November 19, 2012 4:50 AM",
      hasCheck: true
    },
    {
      status: "Booking request sent",
      timestamp: "November 19, 2012 4:50 AM",
      hasCheck: true
    },
    {
      status: "Payment confirmed",
      timestamp: "November 19, 2012 4:50 AM",
      hasCheck: true
    }
  ];
  return (
    <UserLayout>

 
    <div className="max-w-4xl mx-auto px-4">
    <BookCard />

      <div className="mb-6 mt-4">
        <div className="flex justify-between mb-4">
          <h2 className="font-medium">Progress</h2>
          <Link to ='/outward-details' className="text-secondary font-medium text-sm">View Details</Link>
        </div>

        <div className="relative">
        {timelineData.map((item, index) => (
          <div key={index} className="relative pl-6 pb-8 last:pb-0">
            {/* Vertical line */}
            {index !== timelineData.length - 1 && (
              <div 
                className="absolute left-[11px] top-6 w-[2px] h-full bg-gray-200"
                aria-hidden="true"
              />
            )}
            
            {/* Status dot or checkmark */}
            <div className="absolute left-0 top-1">
              {item.hasCheck ? (
                <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white" />
              )}
            </div>

            {/* Content */}
            <div className='px-4'>
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
        <button className="flex-1 bg-green-400  text-white py-3 rounded-full text-[15px] font-medium hover:bg-green-500 transition-colors">
          Confirm completion
        </button>
        <button className="flex-1 bg-red-100 text-red-600 py-3  rounded-full text-[15px] font-medium hover:bg-red-200 transition-colors">
          Open dispute
        </button>
      </div>
    </div>
    </UserLayout>
  );
};

export default OutwardProgress;