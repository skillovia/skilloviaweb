import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import UserLayout from '../../../UserLayout/UserLayout';
import BackButton from '../../../../../componets/Back';

// Custom Toggle Switch Component
const Toggle = ({ checked, onChange }) => {
  return (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors ${
        checked ? 'bg-primary' : 'bg-gray-500'
      }`}
    >
      <div
        className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-secondary transition-transform ${
          checked ? 'translate-x-5' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

// Custom Select Component
const TimeSelect = ({ value, onChange, name }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={onChange}
        name={name}
        className="w-full appearance-none bg-input border-gray border rounded-md px-3 py-2 pr-8"
      >
        {[...Array(24)].map((_, i) => (
          <option key={i} value={`${i.toString().padStart(2, '0')}:00`}>
            {`${i.toString().padStart(2, '0')}:00 ${i < 12 ? 'am' : 'pm'}`}
          </option>
        ))}
      </select>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
};

const Profile = () => {
  const [formData, setFormData] = useState({
    expertVisibility: true,
    firstName: 'John',
    lastName: 'John',
    email: 'emailname@example.com',
    website: '',
    city: '',
    streetAddress: '',
    aptSuite: 'John',
    zipCode: '',
    openingTime: '00:00',
    closingTime: '00:00',
    weekendsInclusive: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggle = (name) => {
    setFormData(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  return (
    <UserLayout>

   
    <div className="max-w-4xl mx-auto lg:p-6 px-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          {/* <button className="p-2 hover:bg-gray-100 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </button> */}
          <BackButton label='Set your rate' />

         
        </div>
        <button className="bg-primary text-secondary font-semibold px-4 py-2 rounded-full hover:bg-green-500 transition-colors">
          Save changes
        </button>
      </div>

      {/* Profile Section */}
      <div className="mb-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1732326507/9d48ce83863147361d369d469dcf3993_yaemuc.jpg"
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-primary rounded-full p-1">
              <Check className="w-4 h-4 text-secondary" />
            </div>
          </div>
        </div>

        {/* Expert Visibility Toggle */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-medium mb-1">Expert visibility</h3>
            <p className="text-sm text-gray-500">Make yourself visible to clients</p>
          </div>
          <Toggle 
            checked={formData.expertVisibility}
            onChange={() => handleToggle('expertVisibility')}
          />
        </div>

        {/* Personal Details Form */}
        <form className="space-y-6">
          <h3 className="font-medium">Personal details</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">First name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border  rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Enter your first name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Last name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Enter your last name"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Website link</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md  bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                placeholder="Enter your website"
              />
            </div>

            <div>
              <h3 className="font-medium mb-4">Location details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md  bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                    placeholder="Your city"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Street address</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md  bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                    placeholder="St. Address"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">Apt/Suite</label>
                  <input
                    type="text"
                    name="aptSuite"
                    value={formData.aptSuite}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md  bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                    placeholder="Apartment or suite number"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">ZIP/Postal Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded-md bg-input border-gray focus:outline-none focus:ring-1 focus:ring-green-400"
                    placeholder="ZIP code"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Work times</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Weekdays</label>
                  <div className="flex space-x-4">
                    <TimeSelect
                      value={formData.openingTime}
                      onChange={handleInputChange}
                      name="openingTime"
                    />
                    <TimeSelect
                      value={formData.closingTime}
                      onChange={handleInputChange}
                      name="closingTime"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Weekends inclusive</h3>
                    <p className="text-sm text-gray-500">Make times applicable to weekends</p>
                  </div>
                  <Toggle
                    checked={formData.weekendsInclusive}
                    onChange={() => handleToggle('weekendsInclusive')}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
    </UserLayout>
  );
};

export default Profile;