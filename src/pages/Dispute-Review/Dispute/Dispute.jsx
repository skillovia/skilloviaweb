import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Loader2, Upload } from "lucide-react";
import UserLayout from "../../User-Dashboard/UserLayout/UserLayout";
import BackButton from "../../../componets/Back";

const OpenDisputePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get all data passed from the previous page via navigate state
  const { bookingId, bookedUserId, bookingTitle, description } = location.state || {};
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); 

  const [message, setMessage] = useState("The service was not rendered");
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Preview the image if it's an image file
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setPreviewUrl(event.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setPreviewUrl(null); // Reset preview if not an image
      }
    }
  };

  const handleSubmitDispute = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    const accessToken = localStorage.getItem("accessToken");
  
    try {
      
      if (!bookingId) {
        throw new Error("Missing booking information");
      }
      
      const formData = new FormData();
      
    
      formData.append("bookingId", bookingId);
      formData.append("message", message);
      
      // Add file if selected
      if (file) {
        formData.append("file", file);
      }
  
      // Send the request to the endpoint shown in Postman
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/dispute/open`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to open dispute");
      }
  
      const responseData = await response.json();
      console.log("Dispute submitted successfully:", responseData);
  
      // Show modal on success
      setShowModal(true);
    } catch (err) {
      console.error("Dispute submission error:", err);
      setError(`Error opening dispute: ${err.message}`);
      alert(`Failed to submit dispute: ${err.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/bookings"); // Redirect to bookings page
  };

 
  if (!bookingId) {
    return (
      <UserLayout>
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <BackButton label="Open Dispute" />
          </div>
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            Missing booking information. Please try again.
          </div>
          <button
            onClick={() => navigate("/bookings")}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            Return to Bookings
          </button>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-2 mb-6">
          <BackButton label="Open Dispute" />
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-medium">Open a Dispute for Booking #{bookingId}</h2>
          {bookingTitle && (
            <h3 className="text-md text-gray-700 mt-2">{bookingTitle}</h3>
          )}
      
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmitDispute} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the issue with your booking"
              rows={4}
              className="w-full px-3 py-2 border border-gray bg-input rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload File
            </label>
            <label htmlFor="file" className="border border-dashed border-gray-300 bg-input rounded-md p-4 flex flex-col items-center justify-center">
              <Upload size={24} className="text-gray-500 mb-2" />
              <p className="text-sm text-gray-500 mb-2">
                Click to upload supporting document
              </p>
              <input
                id="file"
                type="file"
                onChange={handleFileChange}
                className="w-full hidden"
              />
          
              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium">Image Preview:</p>
                  <img
                    src={previewUrl}
                    alt="Selected Preview"
                    className="mt-2 max-h-48 rounded-md border"
                  />
                </div>
              )}
            </label>
          </div>
          
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-full text-[15px] font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="flex-1 bg-red-500 text-white py-3 rounded-full text-[15px] font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Submitting...
                </span>
              ) : (
                "Submit Dispute"
              )}
            </button>
          </div>
        </form>

        {showModal && (
          <div className="fixed inset-0 flex items-center px-4 justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-medium text-center mb-4">Success</h3>
              <p className="text-center text-gray-700 mb-6">
                Your dispute has been submitted successfully.
              </p>
              <button
                onClick={closeModal}
                className="w-full bg-secondary text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Go to Bookings
              </button>
            </div>
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default OpenDisputePage;