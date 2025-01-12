import React from 'react';

const BookCard = () => {
  return (
    <div className="bg-input p-4 rounded-lg border border-gray flex items-start gap-3">
      <div>
        <img 
          src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736676897/cfa21e3a40d7c9b2264ad825ec570dbf_bf6ebf.jpg"
          alt="Profile"
          className="w-24 h-24 object-cover"
        />
      </div>
      <div className="flex-1">
        <p className="text-gray-600 text-[12px] lg:text-sm mb-1">
          This is a booking description for this particular card. You can click on this card to view this in extension.
        </p>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">23 Sept, 2022 - 12:39 AM</span>
          <span className="bg-primary text-secondary text-xs px-2 py-1 rounded">Active</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;