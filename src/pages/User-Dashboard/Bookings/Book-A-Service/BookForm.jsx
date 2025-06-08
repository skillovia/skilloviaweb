import {
  Upload,
  X,
  CreditCard,
  Coins,
  CheckCircle,
  Loader2,
  MapPin,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import UserLayout from "../../UserLayout/UserLayout";
import BackButton from "../../../../componets/Back";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { jwtDecode } from "jwt-decode";

const GOOGLE_MAPS_API_KEY = "AIzaSyChFAjrSODzkkKl_TaCCslNXdHwIWR-_uw";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const BookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, skill } = location.state || {};

  const user_id = user?.id;
  const skill_id = skill;

  // Google Places Autocomplete state & refs
  const bookingLocationInputRef = useRef(null);
  const autocompleteRef = useRef(null);
  const [placesApiLoaded, setPlacesApiLoaded] = useState(false);
  const [placesApiLoading, setPlacesApiLoading] = useState(false);
  const [geocodeError, setGeocodeError] = useState(null);

  const [formData, setFormData] = useState({
    description: "",
    location: "",
    date: "",
    thumbnails: [], // array of File
    lon: null,
    lat: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentChoiceModal, setShowPaymentChoiceModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [balanceData, setBalanceData] = useState({
    cash: 0,
    tokens: 0,
    currency: "GBP",
  });
  const [balanceLoading, setBalanceLoading] = useState(false);
  // Load Google Places API
  useEffect(() => {
    if (!window.google && !placesApiLoading) {
      setPlacesApiLoading(true);
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      googleMapScript.onload = () => {
        setPlacesApiLoaded(true);
        setPlacesApiLoading(false);
      };
      googleMapScript.onerror = () => {
        setGeocodeError("Failed to load Google Maps API.");
        setPlacesApiLoading(false);
      };
      document.body.appendChild(googleMapScript);
      return () => {
        if (document.body.contains(googleMapScript)) {
          document.body.removeChild(googleMapScript);
        }
      };
    } else if (window.google) {
      setPlacesApiLoaded(true);
    }
  }, []);

  // Helper for address components
  const extractAddressComponents = (place, componentType) => {
    if (!place.address_components) return null;
    const component = place.address_components.find((comp) =>
      comp.types.includes(componentType)
    );
    return component ? component.long_name : null;
  };

  // Init location autocomplete
  useEffect(() => {
    if (placesApiLoaded && bookingLocationInputRef.current) {
      if (autocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(
          autocompleteRef.current
        );
      }
      try {
        const autocomplete = new window.google.maps.places.Autocomplete(
          bookingLocationInputRef.current,
          {
            types: ["geocode"],
          }
        );
        autocompleteRef.current = autocomplete;
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          if (!place.geometry) {
            setGeocodeError("No details available for this location");
            return;
          }
          setFormData((prev) => ({
            ...prev,
            location: place.formatted_address || place.name || "",
            lon: place.geometry.location.lng(),
            lat: place.geometry.location.lat(),
          }));
          setGeocodeError(null);
        });
      } catch (err) {
        setGeocodeError("Error initializing location autocomplete");
      }
    }
  }, [placesApiLoaded]);

  const calculatePrice = () => {
    return skill?.hourly_rate ? skill.hourly_rate : 9;
  };

  const fetchBalance = async () => {
    try {
      setBalanceLoading(true);
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/wallet/balance`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch balance");
      const data = await response.json();
      setBalanceData({
        cash: data.balance,
        tokens: data.spark_tokens,
        currency: data.currency || "GBP",
      });
    } catch (error) {
      console.error("Error fetching balance:", error);
    } finally {
      setBalanceLoading(false);
    }
  };

  useEffect(() => {
    if (showPaymentChoiceModal) {
      fetchBalance();
    }
  }, [showPaymentChoiceModal]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "location" ? { lon: null, lat: null } : {}),
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Only allow maximum 4 images
    const thumbnails = [...formData.thumbnails, ...files].slice(0, 4);
    setFormData((prev) => ({
      ...prev,
      thumbnails,
    }));
    setImagePreview(thumbnails.map((file) => URL.createObjectURL(file)));
  };
  const handleRemoveThumbnail = (idx) => {
    const newThumbnails = formData.thumbnails.filter((_, i) => i !== idx);
    setFormData((prev) => ({
      ...prev,
      thumbnails: newThumbnails,
    }));
    setImagePreview(newThumbnails.map((file) => URL.createObjectURL(file)));
  };
  const validateForm = () => {
    if (!formData.description || !formData.location || !formData.date) {
      alert("Please fill in all required fields.");
      return false;
    }
    return true;
  };

  const handleBookNowClick = () => {
    if (!validateForm()) return;
    setShowPaymentChoiceModal(true);
  };

  // const handlePaymentChoice = (method) => {
  //   setPaymentMethod(method);
  //   setShowPaymentChoiceModal(false);
  //   if (method === "account") method = "wallet";
  //   if (method === "account") {
  //     handleProceedToPayment();
  //   } else if (method === "sparktoken") {
  //     handleSparkTokenPayment();
  //   }
  // };

  const handlePaymentChoice = (method) => {
    const paymentMethodToUse = method === "account" ? "wallet" : method;

    // Fix: convert "sparktoken" to "spark_token"
    const normalizedPaymentMethod =
      paymentMethodToUse === "sparktoken" ? "spark_token" : paymentMethodToUse;

    setPaymentMethod(normalizedPaymentMethod);
    setShowPaymentChoiceModal(false);

    if (normalizedPaymentMethod === "wallet") {
      handleProceedToPayment();
    } else if (normalizedPaymentMethod === "spark_token") {
      handleSparkTokenPayment();
    }
  };

  const handleSparkTokenPayment = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");
      const decodedToken = jwtDecode(accessToken);
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/stripe/payment/intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            amount: calculatePrice(),
            currency: "gbp",
            paymentMethod: "spark_token",
          }),
        }
      ).then(async (response) => {
        const result = await response.json();
        if (response.ok) {
          alert("SparkToken payment successful!");
          handleBookingSubmit();
        } else {
          alert(`Error: ${result.message}`);
        }
      });
    } catch (error) {
      console.error("SparkToken payment error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleProceedToPayment = async () => {
    setLoading(true);
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) throw new Error("Access token not found");
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/stripe/payment/intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            amount: calculatePrice(),
            currency: "gbp",
            paymentMethod: "wallet",
          }),
        }
      ).then(async (response) => {
        const result = await response.json();
        if (response.ok) {
          alert("Wallet payment successful!");
          handleBookingSubmit();
        } else {
          alert(`Error: ${result.message}`);
        }
      });
    } catch (error) {
      console.error("Wallet payment error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // const handleBookingSubmit = async (paymentIntentId) => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (!accessToken) {
  //     throw new Error("Access token not found");
  //   }
  //   setLoading(true);
  //   const bookingData = new FormData();
  //   bookingData.append("skills_id", skill.skill_id);
  //   bookingData.append("booked_user_id", user_id);
  //   bookingData.append("title", `Booking for ${skill.skill_type}`);
  //   bookingData.append("description", formData.description);
  //   bookingData.append("booking_location", formData.location);
  //   bookingData.append("booking_lon", formData.lon);
  //   bookingData.append("booking_lat", formData.lat);
  //   bookingData.append("booking_date", formData.date);
  //   bookingData.append("payment_intent_id", paymentIntentId);
  //   bookingData.append("payment_method", paymentMethod);
  //   bookingData.append("thumbnails", formData.image);

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/bookings`,
  //       {
  //         method: "POST",
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //         body: bookingData,
  //       }
  //     );
  //     const result = await response.json();
  //     if (response.ok) {
  //       setPaymentSuccess(true);
  //       setShowPaymentModal(false);
  //       setSuccess(true);
  //       setShowSuccessModal(true);
  //       setFormData({
  //         description: "",
  //         location: "",
  //         date: "",
  //         image: null,
  //         lon: null,
  //         lat: null,
  //       });
  //       setImagePreview(null);
  //     } else {
  //       alert(`Error: ${result.message}`);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting booking:", error);
  //     alert("Something went wrong. Please try again.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
    bookingData.append("booking_lon", formData.lon);
    bookingData.append("booking_lat", formData.lat);
    bookingData.append("booking_date", formData.date);
    bookingData.append("payment_intent_id", paymentIntentId);
    bookingData.append("payment_method", paymentMethod);

    formData.thumbnails.forEach((file) => {
      // bookingData.append("thumbnails[]", file);
      bookingData.append("thumbnails", file);
    });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/bookings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: bookingData,
        }
      );
      const result = await response.json();
      if (response.ok) {
        setPaymentSuccess(true);
        setShowPaymentModal(false);
        setSuccess(true);
        setShowSuccessModal(true);
        setFormData({
          description: "",
          location: "",
          date: "",
          thumbnails: [],
          lon: null,
          lat: null,
        });
        setImagePreview([]);
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
  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate("/bookings");
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

  const formatCurrency = (amount, currency = "GBP") => {
    const currencySymbols = {
      GBP: "£",
      USD: "$",
      EUR: "€",
    };
    const symbol = currencySymbols[currency.toUpperCase()] || currency;
    return `${symbol}${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4 rounded-lg">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <BackButton label="Book service" />
            <button
              onClick={handleBookNowClick}
              disabled={loading}
              className="ml-auto px-6 font-semibold py-2 rounded-full bg-primary hover:bg-green-500 text-secondary disabled:bg-gray-300 disabled:text-gray-500"
            >
              {loading ? "Loading..." : "Book Now"}
            </button>
          </div>

          {paymentSuccess && (
            <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Payment successful! Your booking has been confirmed.</span>
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
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
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
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  placeholder="Search location"
                  ref={bookingLocationInputRef}
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-input border border-gray rounded-lg"
                  autoComplete="off"
                  disabled={placesApiLoading}
                />
                <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Start typing to see address suggestions
              </p>
              {geocodeError && (
                <div className="mt-2 text-xs text-yellow-600">
                  {geocodeError}
                </div>
              )}
              {formData.lon && formData.lat && (
                <div className="text-xs text-gray-400 mt-2">
                  Coordinates: {formData.lon.toFixed(6)},{" "}
                  {formData.lat.toFixed(6)}
                </div>
              )}
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
              <label className="block text-sm font-medium mb-2">
                Upload Images (max 4)
              </label>
              <div
                onClick={() =>
                  document.getElementById("thumbnailsUpload").click()
                }
                className="bg-input border border-gray rounded-lg p-8 text-center cursor-pointer"
              >
                <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  {formData.thumbnails.length > 0
                    ? `${formData.thumbnails.length} image(s) selected`
                    : "Click to upload up to 4 images"}
                </p>
                <p className="text-xs text-gray-400 mt-1">SVG, PNG, or JPG</p>
                <input
                  id="thumbnailsUpload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={formData.thumbnails.length >= 4}
                />
              </div>
              {imagePreview && imagePreview.length > 0 && (
                <div className="mt-4 flex gap-4 flex-wrap">
                  {imagePreview.map((src, idx) => (
                    <div key={idx} className="relative w-24 h-24">
                      <img
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                        className="object-cover rounded-lg w-full h-full"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-white rounded-full p-0.5 shadow hover:bg-gray-100"
                        onClick={() => handleRemoveThumbnail(idx)}
                        tabIndex={-1}
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="text-xs text-gray-500 mt-2">
                Maximum 4 images allowed.
              </p>
            </div>
          </div>
        </div>

        {/* Payment Choice Modal with Balance Information */}
        {showPaymentChoiceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 px-4 flex items-center justify-center z-50">
            <div className="bg-input rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Choose Payment Method</h3>
                <button
                  onClick={() => setShowPaymentChoiceModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>
              {balanceLoading ? (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg flex justify-center">
                  <Loader2 className="animate-spin w-6 h-6 text-gray-500" />
                </div>
              ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Your Balance</h4>
                  <div className="flex justify-between">
                    <span>Cash:</span>
                    <span className="font-bold">
                      {formatCurrency(balanceData.cash, balanceData.currency)}
                    </span>
                  </div>
                  <div className="flex justify-between mt-1">
                    <span>SparkTokens:</span>
                    <span className="font-bold">
                      {balanceData.tokens} Tokens
                    </span>
                  </div>
                </div>
              )}
              <div className="space-y-4">
                <button
                  onClick={() => handlePaymentChoice("account")}
                  disabled={parseFloat(balanceData.cash) < calculatePrice()}
                  className={`w-full p-4 border border-gray rounded-lg flex items-center transition-colors ${
                    parseFloat(balanceData.cash) < calculatePrice()
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <CreditCard className="w-6 h-6 mr-3 text-blue-500" />
                  <div className="text-left flex-grow">
                    <p className="font-medium">Pay with Account</p>
                    <p className="text-sm text-gray-500">
                      Use your wallet balance
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => handlePaymentChoice("sparktoken")}
                  disabled={balanceData.tokens < skill.spark_token}
                  className={`w-full p-4 border border-gray rounded-lg flex items-center transition-colors ${
                    balanceData.tokens < skill.spark_token
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <Coins className="w-6 h-6 mr-3 text-purple-500" />
                  <div className="text-left flex-grow">
                    <p className="font-medium">Pay with SparkToken</p>
                    <p className="text-sm text-gray-500">
                      Use your available SparkTokens
                    </p>
                  </div>
                </button>
              </div>

              <div className="fundacc">
                <Link
                  to="/user"
                  className="bg-secondary py-2 px-3 rounded-md text-white flex justify-center my-4 w-full"
                >
                  Fund Account
                </Link>
              </div>
              {parseFloat(balanceData.cash) < calculatePrice() &&
                balanceData.tokens < skill.spark_token && (
                  <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                    Insufficient funds. Please top up your wallet or tokens.
                  </div>
                )}
            </div>
          </div>
        )}

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
                <p className="text-sm font-medium mb-2">
                  Service: {skill.skill_type}
                </p>
                <p className="text-sm font-medium mb-4">
                  Amount: £{skill.hourly_rate}
                </p>
                <div className="h-px bg-gray-200 w-full mb-4"></div>
              </div>
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                  appearance: {
                    theme: "stripe",
                    variables: {
                      colorPrimary: "#10b981",
                    },
                  },
                }}
              >
                <CheckoutForm onSuccess={handleBookingSubmit} />
              </Elements>
            </div>
          </div>
        )}

        {/* Success Modal with OK button */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full text-center">
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
              <h3 className="text-xl font-medium mb-2">Booking Successful!</h3>
              <p className="text-gray-600 mb-6">
                Your booking for {skill.skill_type} has been confirmed.
              </p>
              <button
                onClick={handleSuccessConfirm}
                className="px-6 py-2 bg-primary text-white rounded-full font-medium hover:bg-green-600 transition-colors"
              >
                OK
              </button>
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
          return_url: window.location.origin + "/payment-confirmation",
        },
        redirect: "if_required",
      });
      if (error) {
        setError(`Payment failed: ${error.message}`);
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
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
      {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}
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
