import React, { useState, useEffect, useRef } from 'react';
import { FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close the dropdown when the "See all" button is clicked
  const handleSeeAllClick = () => {
    setIsDropdownVisible(false);
  };

  return (
    <header className="bg-primary border border-gray-300 rounded-xl m-4 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <span className="text-xl font-bold text-white">Hotel Management</span>

        {/* Notification and User Profile */}
        <div className="flex items-center space-x-4 relative">
          {/* Notification Button */}
          <button
            className="text-white hover:text-secondary relative"
            aria-label="Notifications"
            onClick={toggleDropdown}
          >
            <FaBell className="h-5 w-5" />
          </button>

          {/* Dropdown */}
          {isDropdownVisible && (
            <div
              ref={dropdownRef}
              className="absolute top-full right-full mt-2 w-60 bg-white rounded-md shadow-lg py-2 z-50"
            >
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                  <span>Notification 1</span>
                  <span className="text-gray-500 text-xs">12:00 PM</span>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                  <span>Notification 2</span>
                  <span className="text-gray-500 text-xs">9:45 AM</span>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-between items-center">
                  <span>Notification 3</span>
                  <span className="text-gray-500 text-xs">8:30 PM</span>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-center items-center">
                  <Link to="/notifications" className="text-gray-500 text-sm" onClick={handleSeeAllClick}>
                    See all
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {/* User Profile */}
          <img
            src="https://th.bing.com/th/id/OIP.M4cV2XkzqBU0CZK4efhDsgHaHa?w=201&h=200&c=7&r=0&o=5&dpr=1.1&pid=1.7"
            alt="User Profile"
            className="h-10 w-10 rounded-full border-2 border-white"
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
