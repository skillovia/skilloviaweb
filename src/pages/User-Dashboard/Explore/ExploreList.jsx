// import React, { useState, useEffect } from "react";
// import {
//   ArrowLeft,
//   Loader2,
//   Clock,
//   DollarSign,
//   Award,
//   UserX,
//   Search,
// } from "lucide-react";
// import BackButton from "../../../componets/Back";
// import UserLayout from "../UserLayout/UserLayout";
// import { Link, useLocation } from "react-router-dom";
// import FollowButton from "../../../componets/FollowBtn";

// const ExploreList = () => {
//   const [skills, setSkills] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const location = useLocation();
//   const categoryName =
//     new URLSearchParams(location.search).get("category") || "";

//   useEffect(() => {
//     const fetchSkills = async () => {
//       setIsLoading(true);
//       setError("");

//       try {
//         const accessToken = localStorage.getItem("accessToken");

//         if (!accessToken) {
//           throw new Error("Authentication required");
//         }

//         const response = await fetch(
//           `${import.meta.env.VITE_BASE_URL}/skills/searchname/${categoryName}`,
//           {
//             method: "GET",
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         const data = await response.json();
//         console.log(data, "here ...");

//         if (data.status === "success") {
//           setSkills(data.data || []);
//         } else {
//           throw new Error(data.message || "Failed to fetch skills");
//         }
//       } catch (err) {
//         console.error("Error fetching skills:", err);
//         setError("Unable to load skills. Please try again later.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSkills();
//   }, [categoryName]);

//   const EmptyState = () => (
//     <div className="flex flex-col items-center justify-center py-16 text-gray-500">
//       <Search className="w-16 h-16 mb-4 text-secondary" />
//       <h3 className="text-xl font-medium mb-2 text-secondary">
//         No Skills Found
//       </h3>
//       <p className="text-center max-w-md text-secondary text-[12px]">
//         No one is currently offering skills in {categoryName}. Check back later
//         or try searching for a different category.
//       </p>
//     </div>
//   );

//   const ErrorState = () => (
//     <div className="flex flex-col items-center justify-center py-16 text-red-500">
//       <UserX className="w-16 h-16 mb-4" />
//       <p className="text-center">{error}</p>
//     </div>
//   );

//   return (
//     <UserLayout>
//       <div className="max-w-4xl mx-auto ">
//         <div className="flex items-center gap-3 p-4 ">
//           <BackButton label="Explore" />
//           <h1 className="lg:text-xl capitalize font-semibold">
//             {categoryName}
//           </h1>
//         </div>

//         {isLoading && (
//           <div className="flex justify-center items-center py-16">
//             <Loader2 className="animate-spin w-12 h-12 text-secondary" />
//           </div>
//         )}

//         {error && <ErrorState />}

//         <div className="p-4 space-y-4">
//           {!isLoading && !error && skills?.length === 0 && <EmptyState />}

//           {skills?.map((skill) => (
//             <div
//               key={skill.id}
//               className="flex items-center justify-between border border-gray bg-input p-4 rounded-lg hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center gap-3">
//                 <Link to={`/user-profile/${skill.user_id}`}>
//                   <img
//                     src={
//                       skill.photourl
//                         ? `${skill.photourl}`
//                         : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
//                     }
//                     alt={skill.skill_type}
//                     className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
//                   />
//                 </Link>
//                 <div>
//                   <h3 className="font-medium">{skill.creator_name}</h3>
//                   <div className="flex items-center gap-2 text-sm ">
//                     <p>Exp: {skill.experience_level}</p>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm ">
//                     <p>Rate: £{skill.hourly_rate}/hr</p>
//                   </div>
//                 </div>
//               </div>
//               <FollowButton userId={skill.user_id} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </UserLayout>
//   );
// };

// export default ExploreList;
import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Loader2,
  Clock,
  DollarSign,
  Award,
  UserX,
  Search,
} from "lucide-react";
import BackButton from "../../../componets/Back";
import UserLayout from "../UserLayout/UserLayout";
import { Link, useLocation } from "react-router-dom";
import FollowButton from "../../../componets/FollowBtn";

const ExploreList = () => {
  const [skills, setSkills] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const categoryId = new URLSearchParams(location.search).get("id") || ""; // Use ?id=684660f0... in the URL
  const categoryName =
    new URLSearchParams(location.search).get("category") || "";

  useEffect(() => {
    const fetchSkills = async () => {
      setIsLoading(true);
      setError("");

      try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) throw new Error("Authentication required");

        const response = await fetch(
          `${
            import.meta.env.VITE_BASE_URL
          }/skills/category/${categoryId}/users`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        console.log(data);

        if (data.status === "success") {
          setSkills(data.data || []);
        } else {
          throw new Error(data.message || "Failed to fetch skills");
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Unable to load skills. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchSkills();
    }
  }, [categoryId]);

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-gray-500">
      <Search className="w-16 h-16 mb-4 text-secondary" />
      <h3 className="text-xl font-medium mb-2 text-secondary">
        No Skills Found
      </h3>
      <p className="text-center max-w-md text-secondary text-[12px]">
        No one is currently offering skills in {categoryName}. Check back later
        or try searching for a different category.
      </p>

      <section className="btn">
        <Link to="/explore-all">
          <button
            className="btn btn-primary border-2 block border-secondary text-secondary rounded-lg
    my-4 px-6 py-2 hover:bg-secondary hover:text-white transition-colors duration-200
    "
          >
            Explore More Categories
          </button>
        </Link>
      </section>
    </div>
  );

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-red-500">
      <UserX className="w-16 h-16 mb-4" />
      <p className="text-center">{error}</p>
    </div>
  );

  return (
    <UserLayout>
      <div className="max-w-4xl mx-auto ">
        <div className="flex items-center gap-3 p-4 ">
          <BackButton label="Explore" />
          <h1 className="lg:text-xl capitalize font-semibold">
            {categoryName}
          </h1>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="animate-spin w-12 h-12 text-secondary" />
          </div>
        )}

        {error && <ErrorState />}

        <div className="p-4 space-y-4">
          {!isLoading && !error && skills?.length === 0 && <EmptyState />}

          {skills?.map((skill) => (
            <Link to={`/user-profile/${skill.userId?._id}`}
              key={skill._id}
              className="flex items-center justify-between border border-gray bg-input p-4 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div to={`/user-profile/${skill.userId?._id}`}>
                  <img
                    src={
                      skill.userId?.photourl
                        ? skill.userId.photourl
                        : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                    }
                    alt={skill.userId?.firstname}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                  />
                </div>
                <div>
                  <h3 className="font-medium">
                    {skill.userId?.firstname} {skill.userId?.lastname}
                  </h3>
                  <div className="flex items-center gap-2 text-sm ">
                    <p>Exp: {skill.experience_level}</p>
                  </div>
                  <div className="flex items-center gap-2 text-sm ">
                    <p>Rate: £{skill.hourly_rate}/hr</p>
                  </div>
                </div>
              </div>
              <FollowButton userId={skill.userId?._id} />
            </Link>
          ))}
        </div>
      </div>
    </UserLayout>
  );
};

export default ExploreList;
