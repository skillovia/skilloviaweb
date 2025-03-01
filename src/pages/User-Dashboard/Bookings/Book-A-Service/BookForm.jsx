import { Upload, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserLayout from '../../UserLayout/UserLayout';
import BackButton from '../../../../componets/Back';
import { loadStripe } from '@stripe/stripe-js';
import { 
  Elements, 
  useStripe, 
  useElements, 
  PaymentElement,
  AddressElement 
} from '@stripe/react-stripe-js';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QrcLQ09r1sd9IYht35RhBj1DoUQHGdeSUQx85N9gOzUW8vwBzurLss9Yq7SbeeioMr9HDi39f2gN3OV14oM7N9H00vEoA1iDS');

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, skill } = location.state || {};
  
  const user_id = user?.id;
  
  const [formData, setFormData] = useState({
    description: '',
    location: '',
    date: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState('');
  
  // Price calculation
  const calculatePrice = () => {
    return skill?.price || 5000; // Default to 5000 cents ($50.00)
  };

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

  const validateForm = () => {
    if (!formData.description || !formData.location || !formData.date) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };
  const handleProceedToPayment = async () => {
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Get user ID and access token from localStorage
      const userId = localStorage.getItem('decodedToken') 
        ? JSON.parse(localStorage.getItem('decodedToken')).id 
        : null;
      const accessToken = localStorage.getItem("accessToken");
      
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      
      // First fetch the Stripe account ID
      const stripeAccountResponse = await fetch(`https://testapi.humanserve.net/api/users/stripe/get/account/${userId}`, {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${accessToken}`
        },
      });
      
      const stripeAccountResult = await stripeAccountResponse.json();
      if (!stripeAccountResponse.ok) {
        throw new Error(`Error fetching Stripe account: ${stripeAccountResult.message}`);
      }
      
      const stripeAccountId = stripeAccountResult.data.stripe_account_id;
      console.log("Stripe account ID:", stripeAccountId);
      
      
      // Now create payment intent with the fetched Stripe account ID
      const response = await fetch("https://testapi.humanserve.net/api/users/stripe/payment/intent", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          amount: calculatePrice(),
          currency: "usd",
          customerEmail: "customer@example.com", 
          stripeAccountId: stripeAccountId 
        }),
      });
      
      const result = await response.json();
      if (response.ok) {
        setClientSecret(result.data);
        setShowPaymentModal(true);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error creating payment intent:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleBookingSubmit = async (paymentIntentId) => {
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
    bookingData.append("payment_intent_id", paymentIntentId);
    
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
        setPaymentSuccess(true);
        setShowPaymentModal(false);
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
        navigate('/bookings');
      }, 3000); // Extended time to see success message

      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

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
              onClick={handleProceedToPayment}
              disabled={loading}
              className="ml-auto px-6 font-semibold py-2 rounded-full bg-primary hover:bg-green-500 text-secondary disabled:bg-gray-300 disabled:text-gray-500"
            >
              {loading ? "Loading..." : "Book Now"}
            </button>
          </div>

          {paymentSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Payment successful! Your booking has been confirmed.</span>
            </div>
          )}

          {success && !paymentSuccess && (
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

        {/* Payment Modal */}
        {showPaymentModal && clientSecret && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Complete Payment</h3>
                <button 
                  onClick={() => setShowPaymentModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-sm font-medium mb-2">Service: {skill.skill_type}</p>
                <p className="text-sm font-medium mb-4">Amount: ${skill.hourly_rate}</p>
                <div className="h-px bg-gray-200 w-full mb-4"></div>
              </div>
              
              <Elements 
                stripe={stripePromise} 
                options={{
                  clientSecret,
                  appearance: {
                    theme: 'stripe',
                    variables: {
                      colorPrimary: '#10b981',
                    },
                  },
                }}
              >
                <CheckoutForm onSuccess={handleBookingSubmit} />
              </Elements>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

// Enhanced Payment Form Component
const CheckoutForm = ({ onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + '/payment-confirmation',
        },
        redirect: 'if_required'
      });

      if (error) {
        setError(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment successful
        onSuccess(paymentIntent.id);
      } else {
        setError("Something went wrong with your payment. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement className="mb-6" />
      
      {error && (
        <div className="mb-4 text-red-500 text-sm">
          {error}
        </div>
      )}
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className={`w-full px-6 py-2 rounded-full font-semibold ${
          !stripe || processing
            ? "bg-gray-400 text-gray-700"
            : "bg-primary hover:bg-green-500 text-secondary"
        }`}
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default BookingForm;