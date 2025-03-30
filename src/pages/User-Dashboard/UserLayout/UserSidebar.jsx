import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiUsers, FiCalendar, FiMail, FiSettings, FiLogOut } from "react-icons/fi";
import { GrHomeRounded } from "react-icons/gr";
import { PiMessengerLogo } from "react-icons/pi";

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const links = [
    { name: "Explore", icon: <GrHomeRounded />, path: "/explore" },
    { name: "Community", icon: <FiUsers />, path: "/community" },
    { name: "Bookings", icon: <FiCalendar />, path: "/bookings" },
    { name: "Messages", icon: <PiMessengerLogo />, path: "/messages" },
    { name: "Settings", icon: <FiSettings />, path: "/settings" },
    { 
      name: "Logout", 
      icon: <FiLogOut />, 
      action: () => setShowLogoutModal(true),
      logout: true 
    },
  ];
  
  const handleLogout = () => {
    // Clear all items from localStorage
    localStorage.clear();
    // Navigate to login page
    navigate("/login");
  };

  return (
    <>
      <div className="flex flex-col md:w-64 md:h-screen md:fixed md:top-[10rem] md:left-[8rem] md:flex md:flex-col">
        {/* Desktop Sidebar */}
        <ul className="hidden md:flex md:flex-col space-y-2">
          {links.map((link, index) => (
            <li key={index}>
              {link.logout ? (
                <button
                  onClick={link.action}
                  className="flex items-center space-x-2 p-2 rounded w-full text-left text-red-600 hover:bg-red-50"
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </button>
              ) : (
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 p-2 rounded ${
                      isActive
                        ? "bg-primary text-secondary font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                >
                  <span className="text-lg">{link.icon}</span>
                  <span>{link.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>

        {/* Mobile Navbar */}
        <ul className="flex md:hidden fixed bottom-0 left-0 z-40 right-0 bg-input border-t-2 border-t-secondary border-gray-200 justify-around p-2">
          {links
            .filter((link) => !link.logout)
            .map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center space-y-1 ${
                      isActive
                        ? "text-secondary font-bold"
                        : "text-slate-600 hover:text-green-700"
                    }`
                  }
                >
                  <span className="text-xl">{link.icon}</span>
                  <span className="text-xs">{link.name}</span>
                </NavLink>
              </li>
            ))}
          <li>
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex flex-col items-center space-y-1 text-slate-600 hover:text-red-600"
            >
              <span className="text-xl"><FiLogOut /></span>
              <span className="text-xs">Logout</span>
            </button>
          </li>
        </ul>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Logout</h3>
            <p className="text-gray-500 mb-5">Are you sure you want to logout from your account?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;