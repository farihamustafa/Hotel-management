import React from 'react';
import { FaBell } from 'react-icons/fa';

const Navbar = () => {
  return (
    <header className="bg-primary border border-gray-300 rounded-xl m-4 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <span className="text-xl font-bold text-white">Hotel Management</span>

        {/* Notification and User Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Button */}
          <button
            className="text-white hover:text-secondary "
            aria-label="Notifications"
          >
            <FaBell className="h-5 w-5" />
          </button>

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
