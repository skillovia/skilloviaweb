import React, { useState, useEffect } from "react";
import { Facebook, Apple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate
import Slider from "../Slider";
import axios from "axios";

const Phone = () => {
  const navigate = useNavigate(); // Initialize the navigation hook
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/resend/code`,
        { email }
      );
      setSuccess(
        response.data.message || "Verification code sent successfully!"
      );

      // Add a short delay before navigation to show the success message
      setTimeout(() => {
        // Navigate to the OTP page, passing email as state
        navigate("/otp", { state: { email } });
      }, 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const redirectToGoogle = () => {
    console.log("Redirecting to Google OAuth...");
    window.location.href = `${import.meta.env.VITE_BASE_URL}/auth/google`;
  };
  // useEffect(() => {
  //   const urlParams = new URLSearchParams(window.location.search);
  //   const accessToken = urlParams.get("accessToken");
  //   const refreshToken = urlParams.get("refreshToken");

  //   console.log("🚀 Full URL:", window.location.href);
  //   console.log("🔑 Access Token from URL:", accessToken);
  //   console.log("🔄 Refresh Token from URL:", refreshToken);

  //   if (accessToken && refreshToken) {
  //     console.log("✅ Tokens found! Saving to localStorage...");

  //     try {
  //       localStorage.setItem("accessToken", accessToken);
  //       localStorage.setItem("refreshToken", refreshToken);
  //       console.log("📝 Tokens successfully saved to localStorage!");

  //       setTimeout(() => {
  //         navigate("/explore", { replace: true });
  //       }, 500);
  //     } catch (error) {
  //       console.error("❌ Error saving tokens:", error);
  //     }
  //   } else {
  //     console.log("❌ No tokens found in URL.");
  //   }
  // }, [navigate]);
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
          // Navigate directly to Explore after saving tokens
          navigate("/explore", { replace: true });
        }, 500); // Delay to ensure token storage is complete
      } catch (error) {
        console.error("❌ Error saving tokens:", error);
      }
    } else {
      console.log("❌ No tokens found in URL.");
    }
  }, [navigate]);
  return (
    <div className="flex min-h-screen bg-gray-50 md:p-8 p-4 bg-[#f6fceb]">
      <div className="flex flex-col w-full md:w-1/2 md:p-8">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold mb-1">Create Account</h2>
          <p className="mb-6">We need your email</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Input your email
              </label>
              <input
                type="email" // Changed to 'email' for consistency
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 bg-[#f0f6e6] focus:ring-green-400 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading
                  ? "bg-secondary text-white"
                  : "bg-primary text-secondary"
              } text-center font-bold py-2 rounded-full hover:bg-green-500 transition-colors focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none`}
            >
              {loading ? "Sending..." : "Verify"}
            </button>

            <div className="text-center text-gray-500">Or</div>

            {/*<button
              type="button"
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none"
            >
              <Facebook size={20} />
              Continue with Facebook
            </button>
            
            <button
              type="button"
              className="w-full bg-white text-gray-700 py-2 rounded-full hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            >
              <FcGoogle size={30} />
              Continue with Google
            </button>
            
            <button
              type="button"
              className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:outline-none"
            >
              <Apple size={20} />
              Continue with Apple
            </button>*/}
          </form>
          <div className="mt-6">
            <button
              onClick={redirectToGoogle}
              className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <FcGoogle size={24} className="mr-2" />
              Continue with Google
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?
            <a href="/login" className="text-blue-600 hover:underline ml-1">
              Login
            </a>
          </p>

          <p className="mt-4 text-xs text-gray-500">
            By continuing to use Skillovia you agree to our Terms of Service and
            Privacy Policy
          </p>
        </div>
      </div>

      <Slider />
    </div>
  );
};

export default Phone;
