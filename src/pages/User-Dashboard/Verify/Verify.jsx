import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const Verify = () => {
  const [email, setEmail] = useState("");
  const [visibleCards, setVisibleCards] = useState({
    emailVerification: true,
    completeProfile: true,
  });

  useEffect(() => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("❌ Access token not found in localStorage");
      }

      const decodedToken = jwtDecode(accessToken); // ✅ Decode the token
      console.log("🔑 Decoded Token:", decodedToken); // Debugging log

      const user_id = decodedToken?.id;
      if (!user_id) {
        throw new Error("❌ User ID not found in token");
      }

      setEmail(decodedToken?.email || "your email");
    } catch (error) {
      console.error("❌ Error in useEffect:", error.message);
    }
  }, []);

  const closeCard = (cardName) => {
    setVisibleCards((prev) => ({
      ...prev,
      [cardName]: false,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 mb-4">
    
 

      <div className="grid grid-cols-1  gap-4">
        {/* Complete Profile Card */}
        {visibleCards.completeProfile && (
          <div className="relative">
            <button
              onClick={() => closeCard("completeProfile")}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-green-600 transition-colors"
              aria-label="Close complete profile card"
            >
              <X className="w-5 h-5 text-secondary" />
            </button>
            <Link
              to="/user"
              className="block bg-primary text-secondary p-6 rounded-lg  transition-colors"
            >
              <h2 className="text-xl font-semibold mb-2">
                Complete your profile
              </h2>
              <p className="text-gray-700 mb-4">
                Add your skills and interests, set your availability time and find
                clients.
              </p>
         
              <div className="w-full mt-6">
        <Link
          to="/user"
          className="flex items-center justify-between bg-green-100 border border-green-400 rounded-lg px-4 py-3 hover:bg-green-200 transition-colors cursor-pointer"
        >
          <div className="lg:flex items-center">
            <div className="w-32 h-3 bg-green-300 rounded-full overflow-hidden mr-4">
             
              <div className="h-full bg-green-600" style={{ width: "14%" }}></div>
            </div>
            <span className="font-semibold text-green-900">
              Profile complete 1/7
            </span>
          </div>
          <span className="flex items-center text-green-800 hover:underline">
            Click here to complete profile <ArrowRight className="w-4 h-4 ml-1" />
          </span>
        </Link>
      </div>
            </Link>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Verify;