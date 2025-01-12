import React from 'react';
import UserLayout from '../../UserLayout/UserLayout';
import BackButton from '../../../../componets/Back';
import BookCard from '../BookCard';

const OutwardDetails = () => {
  return (
    <UserLayout>

 
    <div className="max-w-4xl mx-auto px-4">
      <div className="flex items-center gap-2 mb-6">
       <BackButton  label='Booking details'/>
      </div>

<BookCard />

      <div className="space-y-6">
        <div>
          <h2 className="text-sm font-medium my-4">Contact your technician</h2>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1733889808/4dc9bd46c368749f14855e5ffd902e12_wrgm6w.jpg" alt="Technician" className="w-10 h-10 rounded-full object-cover" />
              <span className="font-medium">Abdulmalik Qasim</span>
            </div>
            <button className="text-green-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2">Location</h2>
          <p className="text-sm text-gray-600 mb-2">3329 Joyce St</p>
          <div className="bg-gray-100 h-48 rounded-lg mb-4">
            <img src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1734132538/2d23fb5a6f037ce8ec173ec3ebe08557_igbxvq.png" alt="Map" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2">Title</h2>
          <p className="text-sm text-gray-600">Dolores qui quio vel officiis accusantium eum dolores aut. Eum molestiae qui blanditiis est quia commodi maxime sed quia. Aut mollitia et. Maxime dolores qui voluptas distinctio in...</p>
        </div>

        <div>
          <h2 className="text-sm font-medium mb-2">Message</h2>
          <p className="text-sm text-gray-600">Dolores qui quio vel officiis accusantium eum dolores aut. Eum molestiae qui blanditiis est quia commodi maxime sed quia. Aut mollitia et. Maxime dolores qui voluptas distinctio in...</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Booking ID</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">485748564957479</span>
            <button className="text-green-600 text-sm">Copy</button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Payment method</span>
          <span className="text-sm text-gray-600">Exchange for Dog walking</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Price</span>
          <span className="text-sm text-gray-600">£10,000</span>
        </div>
      </div>
    </div>
    </UserLayout>
  );
};

export default OutwardDetails;