import { ArrowLeft, Upload } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import UserLayout from '../../UserLayout/UserLayout';
import BackButton from '../../../../componets/Back';

const BookingForm = () => {
  const location = useLocation();
  const { user, skill } = location.state || {};
  
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    date: '',
    image: null,
    paymentMethod: ''
  });

  // Calculate charges
  const serviceCharge = skill ? parseFloat(skill.hourly_rate) * 0.1 : 0; // 10% service charge
  const totalAmount = skill ? parseFloat(skill.hourly_rate) + serviceCharge : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = () => {
    // Here you can handle the form submission
    console.log({
      ...formData,
      skillType: skill?.skill_type,
      provider: user,
      totalAmount
    });
  };

  if (!user || !skill) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p>Booking information not available.</p>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 rounded-lg">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <BackButton label='Book service' />
            <button 
              onClick={handleSubmit}
              className="ml-auto px-6 font-semibold py-2 bg-primary text-secondary rounded-full hover:bg-green-500"
            >
              Next
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Skill</label>
              <input
                type="text"
                value={skill.skill_type}
                disabled
                className="w-full p-3 bg-input border border-gray rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full p-3 bg-input border border-gray rounded-lg min-h-[100px]"
                placeholder={`Describe what you need for ${skill.skill_type}...`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Search location"
                className="w-full p-3 bg-input border border-gray rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-3 bg-input border border-gray rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload Image</label>
              <div 
                onClick={() => document.getElementById('imageUpload').click()}
                className="bg-input border border-gray rounded-lg p-8 text-center cursor-pointer"
              >
                <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {formData.image ? formData.image.name : 'Click to upload image'}
                </p>
                <p className="text-xs text-gray-400 mt-1">SVG, PNG, or JPG</p>
                <input
                  id="imageUpload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-4">Summary</h3>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="font-medium">{skill.skill_type}</p>
                  <p className="text-sm text-gray-600">
                    {formData.date ? new Date(formData.date).toLocaleDateString() : 'Date not selected'}
                  </p>
                </div>
                <p className="font-medium">${skill.hourly_rate}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p>Service charge</p>
                <p>${serviceCharge.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center font-medium">
                <p>Total</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4">Payment method</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <input 
                    type="radio" 
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="w-4 h-4" 
                  />
                  <span>Debit/Credit Card</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <input 
                    type="radio" 
                    name="paymentMethod"
                    value="barter"
                    checked={formData.paymentMethod === 'barter'}
                    onChange={handleInputChange}
                    className="w-4 h-4" 
                  />
                  <span>Barter service</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default BookingForm;