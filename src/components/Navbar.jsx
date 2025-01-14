
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
const Breadcrumb = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="bg-primary text-white px-4 py-2 rounded-b-xl shadow-sm">
      <ol className="flex space-x-2 text-lg"> {/* Updated text size to 'text-lg' */}
        <li>
          <Link to="/" className="text-white font-bold hover:underline">
            Home
          </Link>
        </li>
        {pathParts.map((part, index) => {
          const path = `/${pathParts.slice(0, index + 1).join('/')}`;
          const isLast = index === pathParts.length - 1;

          return (
            <li key={path} className="flex items-center">
              <span className="mx-2 text-white">/</span>
              {isLast ? (
                <span className="text-white font-bold">
                  {part.charAt(0).toUpperCase() + part.slice(1)}
                </span>
              ) : (
                <Link
                  to={path}
                  className="text-white font-semibold hover:underline"
                >
                  {part.charAt(0).toUpperCase() + part.slice(1)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};


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

        {/* Breadcrumb */}
        <div className="text-xl font-bold text-white">
          <Breadcrumb />
        </div>

       

       
        {/* Notification and User Profile */}
        <div className="flex items-center space-x-5 relative">
          {/* Notification Button */}
          <button
            className="text-white hover"
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
