import { Upload } from 'lucide-react';
import { useLocation,  useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserLayout from '../../UserLayout/UserLayout';
import BackButton from '../../../../componets/Back';

const BookingForm = () => {
  const location = useLocation();
  const history = useNavigate();
  const { user, skill } = location.state || {};

  const user_id = user.id;
  console.log(user_id);
  
  
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    date: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!formData.description || !formData.location || !formData.date) {
      alert("Please fill in all required fields.");
      return;
    }


    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      throw new Error("Access token not found");
    }

    setLoading(true);

    const bookingData = new FormData();
    bookingData.append("skills_id", skill.skill_id);
    bookingData.append("booked_user_id", user_id);
    bookingData.append("title", `Booking for ${skill.skill_type}`);
    bookingData.append("description", formData.description);
    bookingData.append("booking_location", formData.location);
    bookingData.append("booking_date", formData.date);
    if (formData.image) {
      bookingData.append("file", formData.image);
    }

    try {
      const response = await fetch("https://testapi.humanserve.net/api/bookings", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
        body: bookingData,
      });

      const result = await response.json();
      if (response.ok) {
        setSuccess(true);
       
        setFormData({ description: '', location: '', date: '', image: null });
        setImagePreview(null);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        history('/bookings');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [success, history]);

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
            <BackButton label="Book service" />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`ml-auto px-6 font-semibold py-2 rounded-full ${
                loading ? "bg-gray-400" : "bg-primary hover:bg-green-500 text-secondary"
              }`}
            >
              {loading ? "Booking..." : "Book"}
            </button>
          </div>

          {success && (
            <div className="mb-4 text-center text-green-500">
              Booking successfully created!
            </div>
          )}

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
                  {formData.image ? formData.image.name : "Click to upload image"}
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
              {imagePreview && (
                <div className="mt-4">
                  <img src={imagePreview} alt="Preview" className="max-w-full h-auto rounded-lg" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default BookingForm;