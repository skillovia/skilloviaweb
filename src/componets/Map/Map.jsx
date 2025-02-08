import React, { useState, useEffect } from "react";


// Dynamic Google Map Component
const DynamicGoogleMap = ({ location }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
//   const API_KEY = "AIzaSyChFAjrSODzkkKl_TaCCslNXdHwIWR-_uw";

 const API_KEY = "AIzaSyChFAjrSODzkkKl_TaCCslNXdHwIWR-_uw";

  useEffect(() => {
    if (location) {
      setLoading(false);
    } else {
      setError('No location provided');
      setLoading(false);
    }
  }, [location]);

  if (loading) {
    return (
      <div className="w-full h-[18rem] flex items-center justify-center bg-gray-100 rounded-xl">
        <span className="text-gray-500">Loading map...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-[18rem] flex items-center justify-center bg-gray-100 rounded-xl">
        <span className="text-red-500">Error loading map: {error}</span>
      </div>
    );
  }

  return (
    <div className="w-full h-[18rem] object-cover">
      <iframe
        title="Google Map"
        className="w-full h-full rounded-xl"
        src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(location)}&zoom=15`}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};


export default DynamicGoogleMap;