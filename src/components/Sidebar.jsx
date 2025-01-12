import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaHotel, FaDoorOpen, FaBed, FaCalendarCheck } from 'react-icons/fa';

const SideNavigation = () => {
  const [isRoomDropdownOpen, setRoomDropdownOpen] = useState(false);

  const toggleRoomDropdown = () => {
    setRoomDropdownOpen(!isRoomDropdownOpen);
  };

  return (
    <nav className="text-secondary min-h-screen w-64 p-4 shadow-lg bg-white">
      <ul className="space-y-2"> {/* Reduced margin between list items */}
        {/* Dashboard */}
        <li className="group">
          <Link
            to="/"
            className="flex items-center p-2 rounded-lg group-hover:bg-primary hover:shadow-md hover:text-white transition-all"
          >
            <FaTachometerAlt className="text-xl mr-4" />
            <span className="text-lg font-semibold">Dashboard</span>
          </Link>
        </li>

        {/* Staff Management */}
        <li className="group">
          <Link
            to="/staffmanagement"
            className="flex items-center p-2 rounded-lg group-hover:bg-primary hover:shadow-md hover:text-white transition-all"
          >
            <FaUsers className="text-xl mr-4" />
            <span className="text-lg font-semibold">Staff Management</span>
          </Link>
        </li>

        {/* Guest Management */}
        <li className="group">
          <Link
            to="/guestmanagement"
            className="flex items-center p-2 rounded-lg group-hover:bg-primary hover:shadow-md hover:text-white transition-all"
          >
            <FaHotel className="text-xl mr-4" />
            <span className="text-lg font-semibold">Guest Management</span>
          </Link>
        </li>

        {/* Room Management */}
        <li className="group">
          <div
            onClick={toggleRoomDropdown}
            className="flex items-center p-2 rounded-lg cursor-pointer group-hover:bg-primary hover:shadow-md hover:text-white transition-all"
          >
            <FaDoorOpen className="text-xl mr-4" />
            <span className="text-lg font-semibold">Room Management</span>
            <span className={`ml-auto text-sm transition-transform ${isRoomDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
          {isRoomDropdownOpen && (
            <ul className="ml-6 mt-1 space-y-1"> {/* Reduced margin in dropdown */}
              <li className="group">
                <Link
                  to="/roommanagement/roominventory"
                  className="flex items-center p-1 rounded-lg group-hover:bg-primary hover:text-white transition-all"
                >
                  <FaBed className="text-xl mr-4" />
                  <span className="text-md">Room Inventory</span>
                </Link>
              </li>
              <li className="group">
                <Link
                  to="/roombooking"
                  className="flex items-center p-1 rounded-lg group-hover:bg-primary hover:text-white transition-all"
                >
                  <FaCalendarCheck className="text-xl mr-4" />
                  <span className="text-md">Room Booking</span>
                </Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
