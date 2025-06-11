import React, { useState } from "react";
import LandingUtili from "../../utils/LandingUtili";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    message: "",
    privacyPolicy: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission logic here
  };

  return (
    <LandingUtili>
      <div className="min-h-screen bg-[#F6FCEB] lg:p-6 pt-[6rem] lg:pt-[10rem] px-4 mb-4 flex flex-col items-center">
        <div>
          <h1 className="lg:text-4xl text-3xl font-bold mb-2">
            Get in Touch with Us
          </h1>
          <p className="text-gray-600">
            Have questions or feedback? We're here to help.
          </p>
        </div>
        <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-16 mt-16">
          {/* Form Section */}
          <div className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border bg-[#F0F6E6] border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="First name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border bg-[#F0F6E6] border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-3 py-2 border bg-[#F0F6E6] border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Write your message"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  name="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onChange={handleChange}
                  className="h-4 w-4 text-green-500 focus:ring-green-500 bg-[#F0F6E6] border-slate-300 0 rounded"
                />
                <label
                  htmlFor="privacyPolicy"
                  className="ml-2 text-sm text-gray-600"
                >
                  You agree to our friendly{" "}
                  <a href="/privacy" className="underline">
                    privacy policy
                  </a>
                  .
                </label>
              </div>

              <button
                type="submit"
                className="bg-primary hover:bg-green-500 text-secondary font-semibold px-6 py-2 rounded-full transition-colors duration-200"
              >
                Send message
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div className="hidden md:block">
            <img
              src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327895/2f6bf24a71339516ec7a37ef56b8641a_vzi24o.jpg"
              alt="Contact"
              className="w-full h-[30rem] object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </LandingUtili>
  );
};

export default ContactForm;
