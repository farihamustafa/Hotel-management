import React from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaHotel } from 'react-icons/fa';

const SideNavigation = () => {
  return (
    <div className="min-h-screen flex">
      <nav className="bg-blue-400 rounded-xl shadow-lg w-64 p-4 m-4">
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard" className="flex items-center text-white text-lg hover:text-blue-500 font-bold">
              <FaTachometerAlt className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/staffmanagement" className="flex items-center text-white text-lg hover:text-blue-500 font-bold">
              <FaUsers className="mr-3" /> Staff Management
            </Link>
          </li>
          <li>
            <Link to="/guestmanagement" className="flex items-center text-white text-lg hover:text-blue-500 font-bold">
              <FaHotel className="mr-3" /> Guest Management
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;
