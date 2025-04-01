// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";

// const GoogleAuth = () => {
//   const navigate = useNavigate();
//   const [authError, setAuthError] = useState(null);

//   // Effect to handle the auth response
//   useEffect(() => {
//     // Add message listener to handle popup communication
//     const handleMessage = (event) => {
//       console.log("Received message from popup:", event); // Log the message event
//       // Verify origin for security
//       if (event.origin !== import.meta.env.VITE_BASE_URL) return;

//       const { data } = event;
//       if (data?.status === "success") {
//         console.log("Authentication successful:", data);
//         console.log(data.data.accessToken);

//         localStorage.setItem("accessToken", data.data.accessToken);
//         localStorage.setItem("refreshToken", data.data.refreshToken);
//         navigate("/explore");
//       } else {
//         console.log("Authentication failed:", data);
//         setAuthError("Authentication failed. Please try again.");
//       }
//     };

//     window.addEventListener("message", handleMessage);
//     return () => window.removeEventListener("message", handleMessage);
//   }, [navigate]);

//   const handleGoogleAuth = () => {
//     try {
//       console.log("Opening Google Auth Popup...");
//       const width = 500;
//       const height = 600;
//       const left = window.screenX + (window.outerWidth - width) / 2;
//       const top = window.screenY + (window.outerHeight - height) / 2;

//       const popup = window.open(
//         // `https://dreamsimuapi.vercel.app/api/google`,
//         `${import.meta.env.VITE_BASE_URL}/auth/google`,
//         "Google Login",
//         `width=${width},height=${height},left=${left},top=${top}`
//       );

//       if (!popup) {
//         console.error("Failed to open popup. Please check pop-up blockers.");
//         setAuthError("Failed to open Google Login popup. Please try again.");
//         return;
//       }

//       console.log("Popup opened successfully.");

//       // Add popup check
//       const checkPopup = setInterval(() => {
//         if (popup.closed) {
//           console.log("Popup closed.");
//           clearInterval(checkPopup);
//         }
//       }, 1000);
//     } catch (error) {
//       console.error("Google auth error:", error);
//       setAuthError("Google authentication failed. Please try again.");
//     }
//   };

//   return (
//     <div className="mt-6 ">
//       {authError && <div className="text-red-500 mb-4">{authError}</div>}
//       <button
//         onClick={handleGoogleAuth}
//         className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
//       >
//         <FcGoogle size={24} className="mr-2" />
//         Continue with Google
//       </button>
//     </div>
//   );
// };

// export default GoogleAuth;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";

// const GoogleAuth = () => {
//   const navigate = useNavigate();
//   const [authError, setAuthError] = useState(null);

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const accessToken = urlParams.get("accessToken");
//     const refreshToken = urlParams.get("refreshToken");

//     if (accessToken && refreshToken) {
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);
//       navigate("/explore");
//     }
//   }, [navigate]);

//   const redirectToGoogle = () => {
//     console.log("Redirecting to Google OAuth...");
//     window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
//   };

//   return (
//     <div className="mt-6">
//       {authError && <div className="text-red-500 mb-4">{authError}</div>}
//       <button
//         onClick={redirectToGoogle}
//         className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
//       >
//         <FcGoogle size={24} className="mr-2" />
//         Continue with Google
//       </button>
//     </div>
//   );
// };

// // export default GoogleAuth;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";

// const GoogleAuth = () => {
//   const navigate = useNavigate();
//   const [authError, setAuthError] = useState(null);

//   // Redirect to Google OAuth
//   const redirectToGoogle = () => {
//     console.log("Redirecting to Google OAuth...");
//     // Trigger Google OAuth and redirect back to your backend for authentication
//     window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
//   };

//   useEffect(() => {
//     console.log("GoogleOauth useEffect triggered");
//     console.log("Full URL:", window.location.href); // Check the URL for any discrepancies

//     // Extract URL parameters
//     const urlParams = new URLSearchParams(window.location.search);
//     const accessToken = urlParams.get("accessToken");
//     const refreshToken = urlParams.get("refreshToken");

//     console.log("Access Token from URL:", accessToken);
//     console.log("Refresh Token from URL:", refreshToken);

//     // Ensure tokens exist before saving
//     if (accessToken && refreshToken) {
//       console.log("Tokens found! Saving them to localStorage...");

//       // Save tokens to localStorage
//       localStorage.setItem("accessToken", accessToken);
//       localStorage.setItem("refreshToken", refreshToken);

//       // Verify tokens are saved in localStorage
//       if (
//         localStorage.getItem("accessToken") &&
//         localStorage.getItem("refreshToken")
//       ) {
//         console.log("Tokens saved to localStorage.");
//         axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
//         console.log("Tokens saved to localStorage.");

//         setTimeout(() => {
//           navigate("/explore");
//         }, 500);
//       } else {
//         console.error("Failed to save tokens to localStorage.");
//       }
//     } else {
//       console.log("Tokens not found in the URL.");
//     }
//   }, [navigate]);

//   return (
//     <div className="mt-6">
//       {authError && <div className="text-red-500 mb-4">{authError}</div>}
//       <button
//         onClick={redirectToGoogle}
//         className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
//       >
//         <FcGoogle size={24} className="mr-2" />
//         Continue with Google
//       </button>
//     </div>
//   );
// };

// export default GoogleAuth;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import axios from "axios";

// const GoogleAuth = () => {
//   const navigate = useNavigate();
//   const [authError, setAuthError] = useState(null);

//   // Redirect to Google OAuth
//   const redirectToGoogle = () => {
//     console.log("Redirecting to Google OAuth...");
//     // Trigger Google OAuth and redirect back to your backend for authentication
//     window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
//   };

//   useEffect(() => {
//     console.log("GoogleOauth useEffect triggered");
//     console.log("Full URL:", window.location.href); // Check the URL for any discrepancies

//     // Ensure that we're on the /login route and the URL has the tokens
//     if (window.location.pathname === "/login") {
//       const urlParams = new URLSearchParams(window.location.search);
//       const accessToken = urlParams.get("accessToken");
//       const refreshToken = urlParams.get("refreshToken");

//       console.log("Access Token from URL:", accessToken);
//       console.log("Refresh Token from URL:", refreshToken);

//       // Ensure tokens exist before saving
//       if (accessToken && refreshToken) {
//         console.log("Tokens found! Saving them to localStorage...");

//         // Save tokens to localStorage
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);

//         // Verify tokens are saved in localStorage
//         if (
//           localStorage.getItem("accessToken") &&
//           localStorage.getItem("refreshToken")
//         ) {
//           console.log("Tokens saved to localStorage.");

//           // Optionally set authorization header for API requests
//           axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//           // Navigate to the explore page after saving tokens
//           setTimeout(() => {
//             navigate("/explore");
//           }, 500);
//         } else {
//           console.error("Failed to save tokens to localStorage.");
//         }
//       } else {
//         console.log("Tokens not found in the URL.");
//       }
//     }
//   }, [navigate]);

//   return (
//     <div className="mt-6">
//       {authError && <div className="text-red-500 mb-4">{authError}</div>}
//       <button
//         onClick={redirectToGoogle}
//         className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
//       >
//         <FcGoogle size={24} className="mr-2" />
//         Continue with Google
//       </button>
//     </div>
//   );
// };

// // export default GoogleAuth;
// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FcGoogle } from "react-icons/fc";
// import axios from "axios";

// const GoogleAuth = () => {
//   const navigate = useNavigate();
//   const [authError, setAuthError] = useState(null);

//   // Redirect to Google OAuth
//   const redirectToGoogle = () => {
//     console.log("Redirecting to Google OAuth...");
//     // Trigger Google OAuth and redirect back to your backend for authentication
//     window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
//   };

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const accessToken = urlParams.get("accessToken");
//     const refreshToken = urlParams.get("refreshToken");

//     console.log("Full URL:", window.location.href); // Debugging
//     console.log("Access Token from URL:", accessToken);
//     console.log("Refresh Token from URL:", refreshToken);

//     if (accessToken && refreshToken) {
//       console.log("Tokens found! Saving to localStorage...");

//       try {
//         localStorage.setItem("accessToken", accessToken);
//         localStorage.setItem("refreshToken", refreshToken);
//         axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

//         console.log("Tokens saved successfully!");

//         // Remove tokens from URL after saving
//         window.history.replaceState(null, "", "/explore");
//       } catch (error) {
//         console.error("Error saving tokens to localStorage:", error);
//         setAuthError("An error occurred while saving tokens.");
//       }
//     } else {
//       console.log("Tokens not found in URL.");
//     }
//   }, [navigate]);

//   return (
//     <div className="mt-6">
//       {authError && <div className="text-red-500 mb-4">{authError}</div>}
//       <button
//         onClick={redirectToGoogle}
//         className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
//       >
//         <FcGoogle size={24} className="mr-2" />
//         Continue with Google
//       </button>
//     </div>
//   );
// };

// export default GoogleAuth;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);

  const redirectToGoogle = () => {
    console.log("Redirecting to Google OAuth...");
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");
    const refreshToken = urlParams.get("refreshToken");

    console.log("🚀 Full URL:", window.location.href);
    console.log("🔑 Access Token from URL:", accessToken);
    console.log("🔄 Refresh Token from URL:", refreshToken);

    if (accessToken && refreshToken) {
      console.log("✅ Tokens found! Saving to localStorage...");

      try {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        console.log("📝 Tokens successfully saved to localStorage!");

        setTimeout(() => {
          navigate("/explore", { replace: true });
        }, 500);
      } catch (error) {
        console.error("❌ Error saving tokens:", error);
      }
    } else {
      console.log("❌ No tokens found in URL.");
    }
  }, [navigate]);

  return (
    <div className="mt-6">
      {authError && <div className="text-red-500 mb-4">{authError}</div>}
      <button
        onClick={redirectToGoogle}
        className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
      >
        <FcGoogle size={24} className="mr-2" />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleAuth;
