import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "../Slider";

const Otp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(10);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  useEffect(() => {
    // Redirect if no email is present
    if (!email) {
      navigate("/");
      return;
    }

    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer, email, navigate]);

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input if value is entered
      if (value && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    // Move to previous input on backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // In Otp.jsx
  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const code = otp.join("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/verify/email`,
        {
          email,
          code,
        }
      );

      console.log(response);

      // Make sure to pass the email in the state when navigating
      navigate("/personal-details", {
        state: {
          email: email, // Pass the email explicitly
        },
      });
    } catch (err) {
      setError(
        err.response?.data?.message || "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 md:p-8 p-4 space-x-11 item bg-[#f6fceb]">
      <div className="lg:w-[50%] pt-[8rem]">
        <div className="w- lg:pl-[8rem]">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Create account
          </h2>
          <p className="text-sm text-gray-600 mb-4">Input OTP verification</p>

          {/* Display email */}
          <p className="text-sm text-gray-600 mb-4">
            Verification code sent to: <strong>{email}</strong>
          </p>

          <div className="flex gap-2 lg:space-x-8 space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="lg:w-[40%] w-[50%] lg:h-[6rem] h-[4rem] border-gray rounded-lg border
                  text-center text-xl font-semibold bg-input focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
                maxLength={1}
              />
            ))}
          </div>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            onClick={handleVerify}
            disabled={loading || otp.some((digit) => !digit)}
            className={`w-full ${
              loading || otp.some((digit) => !digit)
                ? "bg-gray-400"
                : "bg-primary text-secondary hover:bg-green-500"
            } block text-center font-medium py-3 rounded-full transition-colors mb-4`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <div className="text-sm text-gray-600 mb-4">
            Resend OTP in {timer}s
          </div>

          <div className="text-sm text-gray-600">
            Already have an account?
            <Link
              to="/login"
              className="text-green-600 hover:text-green-700 ml-1"
            >
              Log in
            </Link>
          </div>

          <div className="text-xs text-gray-500 mt-6">
            By continuing to use Skillovia, you agree to our{" "}
            <a href="#" className="text-green-600 hover:text-green-700">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-green-600 hover:text-green-700">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
      <Slider />
    </div>
  );
};

export default Otp;
