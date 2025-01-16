import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBell, FaUser } from 'react-icons/fa';

const Breadcrumb = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="bg-primary text-white px-4 py-2 rounded-b-xl shadow-sm">
      <ol className="flex space-x-2 text-lg">
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
                  className="text-white font-bold hover:underline"
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
  const [isNotificationDropdownVisible, setIsNotificationDropdownVisible] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const notificationDropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);

  const toggleNotificationDropdown = () => {
    setIsNotificationDropdownVisible(!isNotificationDropdownVisible);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationDropdownRef.current && !notificationDropdownRef.current.contains(event.target)) {
        setIsNotificationDropdownVisible(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close notification dropdown when "See all" is clicked
  const handleSeeAllClick = () => {
    setIsNotificationDropdownVisible(false);
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
            onClick={toggleNotificationDropdown}
          >
            <FaBell className="h-5 w-5" />
          </button>

          {/* Notification Dropdown */}
          {isNotificationDropdownVisible && (
            <div
              ref={notificationDropdownRef}
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

          {/* User Profile Button */}
          <button
            onClick={toggleProfileDropdown}
            className="h-8 w-8 flex items-center justify-center rounded-full border-2 border-white bg-gray-200 hover:bg-gray-300"
          >
            <FaUser className="text-gray-700" />
          </button>

          {/* Profile Dropdown */}
          {isProfileDropdownVisible && (
            <div
              ref={profileDropdownRef}
              className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50"
            >
              <ul>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/settings">Settings</Link>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <Link to="/logout">Logout</Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
