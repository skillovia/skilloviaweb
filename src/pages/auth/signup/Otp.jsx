import React, { useState, useRef, useEffect } from 'react';

import Slider from '../Slider';





const Otp = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const [timer, setTimer] = useState(10);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  
    useEffect(() => {
      if (timer > 0) {
        const interval = setInterval(() => {
          setTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
      }
    }, [timer]);
  
    const handleChange = (index, value) => {
      if (value.length <= 1 && /^[0-9-]*$/.test(value)) {
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
      if (e.key === 'Backspace' && !otp[index] && index > 0) {
        inputRefs[index - 1].current.focus();
      }
    };
  return (
    <div className="flex min-h-screen bg-gray-50 md:p-8 p-4 space-x-11 item  bg-[#f6fceb]">
     <div className=" lg:w-[50%] pt-[8rem]">
      <div className="w- lg:pl-[8rem]">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Create account</h2>
        <p className="text-sm text-gray-600 mb-4">Input OTP verification</p>
        
        <div className="flex gap-2 lg:space-x-8 space-x-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="lg:w-[40%] w-[50%] lg:h-[6rem] h-[4remer border-gray-300 rounded-lg text-center text-xl font-semibold bg-[#f6fceb] focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none"
              maxLength={1}
            />
          ))}
        </div>

        <button 
          className="w-full bg-primary text-secondary font-medium py-3 rounded-full hover:bg-green-500 transition-colors mb-4"
        >
          Verify OTP
        </button>

        <div className="text-sm text-gray-600 mb-4">
          Resend OTP in {timer}s
        </div>

        <div className="text-sm text-gray-600">
          Already have an account? 
          <a href="#" className="text-green-600 hover:text-green-700 ml-1">Log in</a>
        </div>

        <div className="text-xs text-gray-500 mt-6">
          By continuing to use Skillovia, you agree to our{' '}
          <a href="#" className="text-green-600 hover:text-green-700">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-green-600 hover:text-green-700">Privacy Policy</a>
        </div>
      </div>
    </div>
      <Slider />
 
    </div>
  );
};

export default Otp;



