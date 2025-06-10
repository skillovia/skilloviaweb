// import React, { useState, useEffect } from "react";
// import { Search, Loader2, ArrowLeft, User, X } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import BackButton from "../../componets/Back";

// const UserSearch = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [users, setUsers] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSkillLoading, setIsSkillLoading] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);

//   useEffect(() => {
//     const debounceTimer = setTimeout(() => {
//       if (searchTerm.length >= 3) {
//         searchUser();
//       }
//       if (searchTerm.length === 0) {
//         setUsers([]);
//       }
//     }, 300);

//     return () => clearTimeout(debounceTimer);
//   }, [searchTerm]);

//   const searchUser = async () => {
//     if (searchTerm.length < 3) return;

//     setIsLoading(true);
//     try {
//       const normalizedSearchTerm = searchTerm.toLowerCase().trim();

//       const response = await fetch(
//         `${
//           import.meta.env.VITE_BASE_URL
//         }/users/searchuser/${normalizedSearchTerm}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       const data = await response.json();

//       if (data.status === "success") {
//         const matchingUsers = Array.isArray(data.data)
//           ? data.data
//           : [data.data];
//         setUsers(matchingUsers);
//       } else {
//         setUsers([]);
//       }
//     } catch (error) {
//       console.error("Error searching user:", error);
//       setUsers([]);
//     }
//     setIsLoading(false);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       searchUser();
//     }
//   };

//   // const handleUserClick = (userId) => {
//   //   navigate(`/user-profile/${userId}`);
//   // };
//   const handleUserClick = (userId) => {
//     console.log("Navigating to user ID:", userId);
//     if (!userId) {
//       alert("Invalid user ID.");
//       return;
//     }
//     navigate(`/user-profile/${userId}`);
//   };

//   const clearSearch = () => {
//     setSearchTerm("");
//     setUsers([]);
//   };

//   return (
//     <section className="con bg-[#F6FCEB]">
//       <div className="w-full max-w-2xl mx-auto h-screen   overflow-hidden ">
//         <div
//           className={`sticky top-0  p-4 border-b border-b-gray transition-all duration-200 `}
//         >
//           <div className="flex items-center justify-between gap-3">
//             <BackButton label="" />

//             <div className="relative flex-1">
//               <div
//                 className={`relative flex items-center  rounded-full transition-all duration-200 `}
//               >
//                 <Search className="absolute left-3 text-gray-400" size={18} />
//                 <input
//                   type="text"
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   onKeyPress={handleKeyPress}
//                   onFocus={() => setIsFocused(true)}
//                   onBlur={() => setIsFocused(false)}
//                   placeholder="Search users..."
//                   className="w-full py-3 pl-10 pr-10 bg-input border rounded-full border-gray focus:outline-none text-gray-700 placeholder-gray-400"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={clearSearch}
//                     className="absolute right-3 p-1 hover:bg-gray-200 rounded-full transition-colors"
//                   >
//                     <X size={16} className="text-gray-500" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {isLoading && (
//           <div className="flex justify-center items-center py-8">
//             <Loader2 className="animate-spin text-secondary" size={24} />
//             <span className="ml-2 text-secondary font-medium">
//               Searching...
//             </span>
//           </div>
//         )}

//         {users.length > 0 && !isLoading && (
//           <div className="divide-y">
//             {users.map((user, index) => (
//               <div
//                 key={user._id || index}
//                 onClick={() => handleUserClick(user._id)}
//                 className="flex items-center p-4 bg-input border border-gray cursor-pointer transition-colors"
//               >
//                 <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-3 border border-gray-200">
//                   <img
//                     src={
//                       user.photourl
//                         ? `${user.photourl}`
//                         : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
//                     }
//                     alt={user.firstname}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-medium  text-[12px] text-gray-900">
//                     {`${user.firstname} ${user.lastname}`}
//                   </h3>
//                   <p className="text-sm text-gray-500">{user.email}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {!isLoading && searchTerm.length >= 3 && users.length === 0 && (
//           <div className="text-center py-8">
//             <p className="text-gray-500 font-medium">No users found</p>
//             <p className="text-sm text-gray-400 mt-1">
//               Try a different search term
//             </p>
//           </div>
//         )}

//         {searchTerm.length < 3 && searchTerm.length > 0 && !isLoading && (
//           <div className="text-center py-8">
//             <p className="text-gray-500 font-medium">Keep typing...</p>
//             <p className="text-sm text-gray-400 mt-1">
//               At least 3 characters needed
//             </p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default UserSearch;
import React, { useState, useEffect } from "react";
import { Search, Loader2, ArrowLeft, User, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../componets/Back";

const UserSearch = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [skills, setSkills] = useState([]); // <-- new
  const [isLoading, setIsLoading] = useState(false);
  const [isSkillLoading, setIsSkillLoading] = useState(false); // <-- new
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (searchTerm.length >= 3) {
        searchUser();
        searchSkill();
      }
      if (searchTerm.length === 0) {
        setUsers([]);
        setSkills([]);
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
    // eslint-disable-next-line
  }, [searchTerm]);

  const searchUser = async () => {
    if (searchTerm.length < 3) return;

    setIsLoading(true);
    try {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();

      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/users/searchuser/${normalizedSearchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();

      if (data.status === "success") {
        const matchingUsers = Array.isArray(data.data)
          ? data.data
          : [data.data];
        setUsers(matchingUsers);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("Error searching user:", error);
      setUsers([]);
    }
    setIsLoading(false);
  };

  const searchSkill = async () => {
    if (searchTerm.length < 3) return;
    setIsSkillLoading(true);

    try {
      const normalizedSearchTerm = searchTerm.toLowerCase().trim();
      const response = await fetch(
        `https://skilloviaapi.vercel.app/api/skills/searchname/${normalizedSearchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();

      if (data.status === "success" && Array.isArray(data.data)) {
        setSkills(data.data);
      } else {
        setSkills([]);
      }
    } catch (error) {
      console.error("Error searching skill:", error);
      setSkills([]);
    }
    setIsSkillLoading(false);
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      searchUser();
      searchSkill();
    }
  };

  const handleUserClick = (userId) => {
    if (!userId) {
      alert("Invalid user ID.");
      return;
    }
    navigate(`/user-profile/${userId}`);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setUsers([]);
    setSkills([]);
  };

  return (
    <section className="con bg-[#F6FCEB]">
      <div className="w-full max-w-2xl mx-auto h-screen overflow-hidden ">
        <div className="sticky top-0 p-4 border-b border-b-gray transition-all duration-200 ">
          <div className="flex items-center justify-between gap-3">
            <BackButton label="" />
            <div className="relative flex-1">
              <div className="relative flex items-center rounded-full transition-all duration-200 ">
                <Search className="absolute left-3 text-gray-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Search users, Skills..."
                  className="w-full py-3 pl-10 pr-10 bg-input border rounded-full border-gray focus:outline-none text-gray-700 placeholder-gray-400"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 p-1 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <X size={16} className="text-gray-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {(isLoading || isSkillLoading) && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="animate-spin text-secondary" size={24} />
            <span className="ml-2 text-secondary font-medium">
              Searching...
            </span>
          </div>
        )}

        {/* SKILL SEARCH RESULTS */}
        {skills.length > 0 && !isSkillLoading && (
          <div className="divide-y px-4">
            <div className="p-2 text-xs font-bold text-gray-600">Skills</div>
            {skills.map((skill, index) => (
              <div
                key={skill._id || index}
                onClick={() =>
                  navigate(
                    `/explore-list?id=${
                      skill._id
                    }&category=${encodeURIComponent(skill.title)}`
                  )
                }
                className="flex items-center p-4 bg-input border border-gray rounded-xl cursor-pointer transition-colors hover:bg-gray-100"
                style={{ userSelect: "none" }}
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-3 border border-gray-200">
                  {skill.thumbnail ? (
                    <img
                      src={skill.thumbnail}
                      alt={skill.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                      SKILL
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[12px] text-gray-900">
                    {skill.title}
                  </h3>
                  <p className="text-xs text-gray-500">{skill.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* USER SEARCH RESULTS */}
        {users.length > 0 && !isLoading && (
          <div className="divide-y">
            <div className="p-2 text-xs font-bold text-gray-600">Users</div>
            {users.map((user, index) => (
              <div
                key={user._id || index}
                onClick={() => handleUserClick(user._id)}
                className="flex items-center p-4 bg-input border border-gray cursor-pointer transition-colors"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 mr-3 border border-gray-200">
                  <img
                    src={
                      user.photourl
                        ? `${user.photourl}`
                        : "https://i.pinimg.com/736x/4c/85/31/4c8531dbc05c77cb7a5893297977ac89.jpg"
                    }
                    alt={user.firstname}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-[12px] text-gray-900">
                    {`${user.firstname} ${user.lastname}`}
                  </h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading &&
          !isSkillLoading &&
          searchTerm.length >= 3 &&
          users.length === 0 &&
          skills.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 font-medium">
                No users or skills found
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Try a different search term
              </p>
            </div>
          )}

        {searchTerm.length < 3 &&
          searchTerm.length > 0 &&
          !isLoading &&
          !isSkillLoading && (
            <div className="text-center py-8">
              <p className="text-gray-500 font-medium">Keep typing...</p>
              <p className="text-sm text-gray-400 mt-1">
                At least 3 characters needed
              </p>
            </div>
          )}
      </div>
    </section>
  );
};

export default UserSearch;
