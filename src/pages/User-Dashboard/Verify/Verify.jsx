// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ArrowRight, X } from "lucide-react";
// import { jwtDecode } from "jwt-decode";

// const Verify = () => {
//   const [email, setEmail] = useState("");
//   const [visibleCards, setVisibleCards] = useState({
//     emailVerification: true,
//     completeProfile: true,
//   });

//   useEffect(() => {
//     try {
//       const accessToken = localStorage.getItem("accessToken");

//       if (!accessToken) {
//         throw new Error("❌ Access token not found in localStorage");
//       }

//       const decodedToken = jwtDecode(accessToken); // ✅ Decode the token
//       console.log("🔑 Decoded Token:", decodedToken); // Debugging log

//       const user_id = decodedToken?.id;
//       if (!user_id) {
//         throw new Error("❌ User ID not found in token");
//       }

//       setEmail(decodedToken?.email || "your email");
//     } catch (error) {
//       console.error("❌ Error in useEffect:", error.message);
//     }
//   }, []);

//   const closeCard = (cardName) => {
//     setVisibleCards((prev) => ({
//       ...prev,
//       [cardName]: false,
//     }));
//   };

//   return (
//     <div className="max-w-4xl mx-auto px-4 mb-4">

//       <div className="grid grid-cols-1  gap-4">
//         {/* Complete Profile Card */}
//         {visibleCards.completeProfile && (
//           <div className="relative">
//             <button
//               onClick={() => closeCard("completeProfile")}
//               className="absolute top-2 right-2 p-1 rounded-full hover:bg-green-600 transition-colors"
//               aria-label="Close complete profile card"
//             >
//               <X className="w-5 h-5 text-secondary" />
//             </button>
//             <Link
//               to="/user"
//               className="block bg-primary text-secondary p-6 rounded-lg  transition-colors"
//             >
//               <h2 className="text-xl font-semibold mb-2">
//                 Complete your profile
//               </h2>
//               <p className="text-gray-700 mb-4">
//                 Add your skills and interests, set your availability time and find
//                 clients.
//               </p>

//               <div className="w-full mt-6">
//         <Link
//           to="/user"
//           className="flex items-center justify-between bg-green-100 border border-green-400 rounded-lg px-4 py-3 hover:bg-green-200 transition-colors cursor-pointer"
//         >
//           <div className="lg:flex items-center">
//             <div className="w-32 h-3 bg-green-300 rounded-full overflow-hidden mr-4">

//               <div className="h-full bg-green-600" style={{ width: "14%" }}></div>
//             </div>
//             <span className="font-semibold text-green-900">
//               Profile complete 1/7
//             </span>
//           </div>
//           <span className="flex items-center text-green-800 hover:underline">
//             Click here to complete profile <ArrowRight className="w-4 h-4 ml-1" />
//           </span>
//         </Link>
//       </div>
//             </Link>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// };

// export default Verify;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, X, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { jwtDecode } from "jwt-decode";

const Verify = () => {
  const [email, setEmail] = useState("");
  const [profileData, setProfileData] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState({
    emailVerification: true,
    completeProfile: true,
  });

  // Profile completion steps
  const steps = [
    {
      name: "Profile image",
      completed: !!(profileData && profileData.photourl),
      link: "/settings/profile",
    },
    {
      name: "Add at least one skill",
      completed: skills.length > 0,
      link: "/settings/skill/add",
    },
    {
      name: "Complete KYC",
      completed: !!(profileData && profileData.kyc_status === "approved"),

      link: "/settings/kyc",
    },
    {
      name: "Add payment method",
      completed: !!(profileData && profileData.payment_method),
      link: "/settings/payment",
    },
    {
      name: "Link Stripe",
      completed: !!(profileData && profileData.linked_account),
      link: "/create-stripe-account",
    },
    {
      name: "Fill out bio",
      completed: !!(profileData && profileData.bio),
      link: "/settings/profile",
    },
  ];

  const completedSteps = steps.filter((s) => s.completed).length;
  const completionPercentage = (completedSteps / steps.length) * 100;

  // Fetch Profile Data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          throw new Error("❌ Access token not found in localStorage");
        }

        const decodedToken = jwtDecode(accessToken);
        console.log("🔑 Decoded Token:", decodedToken);

        const user_id = decodedToken?.id;
        if (!user_id) {
          throw new Error("❌ User ID not found in token");
        }

        setEmail(decodedToken?.email || "your email");

        // Fetch profile data
        const profileResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/users/profile/${user_id}`,
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );

        if (!profileResponse.ok) {
          throw new Error("❌ Failed to fetch profile");
        }

        const profileData = await profileResponse.json();
        setProfileData(profileData.data);

        // Fetch skills data
        const skillsResponse = await fetch(
          `${import.meta.env.VITE_BASE_URL}/skills/user/all`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (skillsResponse.ok) {
          const skillsData = await skillsResponse.json();
          setSkills(skillsData.data || []);
        }
      } catch (error) {
        console.error("❌ Error fetching data:", error.message);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const closeCard = (cardName) => {
    setVisibleCards((prev) => ({
      ...prev,
      [cardName]: false,
    }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <div className="flex justify-center items-center h-32">
          <Loader2 className="animate-spin w-8 h-8 text-secondary" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mb-4">
      <div className="grid grid-cols-1 gap-4">
        {/* Complete Profile Card */}
        {visibleCards.completeProfile && (
          <div className="relative">
            <button
              onClick={() => closeCard("completeProfile")}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-green-600 transition-colors z-10"
              aria-label="Close complete profile card"
            >
              <X className="w-5 h-5 text-secondary" />
            </button>

            <div className="bg-primary text-secondary p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                Complete your profile
              </h2>
              <p className="text-gray-700 mb-4">
                Add your skills and interests, set your availability time and
                find clients.
              </p>
              <span className="font-semibold text-green-900">
                Profile completion: {completedSteps}/{steps.length}
              </span>

              {/* Main CTA */}
              <div className="w-full mt-6">
                <Link
                  to="/user"
                  className="flex items-center justify-between bg-green-100 border border-green-400 rounded-lg px-4 py-3 hover:bg-green-200 transition-colors cursor-pointer"
                >
                  <div className="lg:flex items-center">
                    <div className="w-32 h-3 bg-green-300 rounded-full overflow-hidden mr-4">
                      <div
                        className="h-full bg-green-600 transition-all duration-300"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <span className="font-semibold text-green-900">
                      {Math.round(completionPercentage)}% Complete
                    </span>
                  </div>
                  <span className="flex text-[12px] md:text-sm items-center text-green-800 hover:underline">
                    View Profile <ArrowRight className="w-4 h-4 ml-1" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Verify;
