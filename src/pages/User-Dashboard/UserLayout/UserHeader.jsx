import React, { useState } from "react";
import { Search, MapPin, Bell } from "lucide-react";

const UserHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (

    <>

<nav className="w-full bg px-4 lg:px-[8rem] pt-[1.5rem] py-2 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1735327781/WHT_Horiz._Logo_bbkq77.png"
          alt="Logo"
          className="w-[150px] h-auto md:w-[200px] object-contain"
        />
      </div>

      {/* Search Bar */}
      <div className="flex-1 max-w-full md:max-w-2xl mx-4 md:mx-8 relative hidden sm:block">
        <div className="relative">
          <input
            type="text"
            placeholder="Search people, skills and communities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="jw-full px-4 py-2 pl-10 pr-4 rounded-full bg-transparent  w-[70%] border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Location */}
        <div className="hidden sm:flex items-center gap-2 text-gray-700">
          <MapPin className="h-5 w-5" />
          <section className="block">
            <span className="block text-[12px]">Location</span>
            <span className="text-sm truncate max-w-[100px] sm:max-w-none">
              3329 Joyce St
            </span>
          </section>
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <Bell className="h-6 w-6 text-gray-700 cursor-pointer" />
          {/* Optional: Add a notification badge */}
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            3
          </span>
        </div>

        {/* Profile */}
        <div className="relative">
          <div
            className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white cursor-pointer"
            onClick={toggleDropdown}
          >
            <img
              src="https://res.cloudinary.com/dmhvsyzch/image/upload/v1736640844/85c053224d98bfd7e680608c07f3c239_mkwnxc.png"
              alt="Profile"
              className="h-full w-full rounded-full object-cover"
            />
          </div>

        </div>
      </div>

    
    </nav>
    
    <div className="w-full md:hidden px-4 py-4 md:max-w-2xl md:mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search people, skills and communities"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-full border border-gray-300 bg-transparent focus:outline-none focus:ring-2 focus:primary focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
        </div>
      </div>
    </>

  );
};

export default UserHeader;
