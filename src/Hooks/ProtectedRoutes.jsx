// import React from 'react';
// import { useNavigate, Navigate } from 'react-router-dom';
// import {jwtDecode} from 'jwt-decode';

// const ProtectedRoute = ({ children }) => {
//   const navigate = useNavigate();
//   const token = localStorage.getItem('accessToken');

//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000; // Get current time in seconds

//       if (decodedToken.exp < currentTime) {
//         // Token has expired
//         localStorage.removeItem('accessToken');
//         return <Navigate to="/login" />;
//       }
//     } catch (error) {
//       // Error decoding token, navigate to login
//       localStorage.removeItem('accessToken');
//       return <Navigate to="/login" />;
//     }
//   } else {
//     // No token found, navigate to login
//     return <Navigate to="/login" />;
//   }

//   return children;
// };

// // export default ProtectedRoute;
// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

// const ProtectedRoute = ({ children }) => {
//   const [authStatus, setAuthStatus] = useState("loading"); // 'loading', 'authenticated', 'unauthenticated'

//   useEffect(() => {
//     const token = localStorage.getItem("accessToken");

//     console.log("🔍 Checking token in localStorage:", token);

//     if (!token) {
//       console.log("❌ No token found, redirecting to login...");
//       setAuthStatus("unauthenticated");
//       return;
//     }

//     try {
//       const decodedToken = jwtDecode(token);
//       const currentTime = Date.now() / 1000;

//       console.log("🔓 Decoded Token:", decodedToken);
//       console.log(
//         "⏳ Expiration Time:",
//         decodedToken.exp,
//         "| Current Time:",
//         currentTime
//       );

//       if (decodedToken.exp < currentTime) {
//         console.log("⚠️ Token expired, redirecting to login...");
//         localStorage.removeItem("accessToken");
//         setAuthStatus("unauthenticated");
//       } else {
//         console.log("✅ Token is valid, allowing access...");
//         setAuthStatus("authenticated");
//       }
//     } catch (error) {
//       console.error("❌ Invalid token:", error);
//       localStorage.removeItem("accessToken");
//       setAuthStatus("unauthenticated");
//     }
//   }, []);

//   if (authStatus === "loading") {
//     return <div>Loading authentication...</div>; // Prevent redirecting before checking
//   }

//   return authStatus === "authenticated" ? (
//     children
//   ) : (
//     <Navigate to="/login" replace />
//   );
// };

// export default ProtectedRoute;

import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const [authStatus, setAuthStatus] = useState("loading"); // 'loading', 'authenticated', 'unauthenticated'

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    console.log("🔍 Checking token in localStorage:", token);

    if (!token) {
      console.log("❌ No token found, redirecting to login...");
      setAuthStatus("unauthenticated");
      return;
    }

    // try {
    //   const decodedToken = jwtDecode(token);
    //   const currentTime = Date.now() / 1000;

    //   console.log("🔓 Decoded Token:", decodedToken);
    //   console.log(
    //     "⏳ Expiration Time:",
    //     decodedToken.exp,
    //     "| Current Time:",
    //     currentTime
    //   );

    //   if (decodedToken.exp < currentTime) {
    //     console.log("⚠️ Token expired, redirecting to login...");
    //     localStorage.removeItem("accessToken");
    //     setAuthStatus("unauthenticated");
    //   } else {
    //     console.log("✅ Token is valid, allowing access...");
    //     setAuthStatus("authenticated");
    //   }
    try {
      const token = localStorage.getItem("accessToken"); // Ensure token is from localStorage

      if (!token) {
        console.log("🚫 No token found, redirecting to login...");
        setAuthStatus("unauthenticated");
        return;
      }

      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      console.log("🔓 Decoded Token:", decodedToken);
      console.log(
        "⏳ Expiration Time:",
        decodedToken.exp,
        "| Current Time:",
        currentTime
      );

      if (decodedToken.exp < currentTime) {
        console.log("⚠️ Token expired, redirecting to login...");
        localStorage.removeItem("accessToken");
        setAuthStatus("unauthenticated");
      } else {
        console.log("✅ Token is valid, allowing access...");
        setAuthStatus("authenticated");
      }
    } catch (error) {
      console.error("❌ Invalid token:", error);
      localStorage.removeItem("accessToken");
      setAuthStatus("unauthenticated");
    }

    // } catch (error) {
    //   console.error("❌ Invalid token:", error);
    //   localStorage.removeItem("accessToken");
    //   setAuthStatus("unauthenticated");
    // }
  }, []);

  if (authStatus === "loading") {
    return <div>Loading authentication...</div>; // Prevent redirecting before checking
  }

  return authStatus === "authenticated" ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
