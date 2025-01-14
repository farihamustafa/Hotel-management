import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaHotel, FaDoorOpen, FaBed, FaCalendarCheck } from 'react-icons/fa';

const SideNavigation = () => {
  const [isRoomDropdownOpen, setRoomDropdownOpen] = useState(false);
  const location = useLocation();  // Get current route

  // Toggle Room Management dropdown
  const toggleRoomDropdown = () => {
    setRoomDropdownOpen(!isRoomDropdownOpen);
  };

  // Helper function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="min-h-screen w-64 p-4 shadow-lg bg-white text-secondary">
      <ul className="space-y-2">
        {/* Logo */}
        <li className="flex justify-center">
  <Link to="/" className="w-full p-2">
    <img 
      src="https://www.designmantic.com/logo-images/727.png?company=Company%20Name&keyword=hotel&slogan=&verify=1"  // Logo URL
      alt="Logo"
      className="w-48 h-16 object-contain"  // Adjust width to 48 and height to 16 to make the logo rectangular
    />
  </Link>
</li>


        {/* Dashboard */}
        <li>
          <Link
            to="/"
            className={`flex items-center p-2 rounded-lg transition-all ${isActive('/') ? 'bg-primary text-white' : 'hover:bg-primary hover:shadow-md hover:text-white'}`}
          >
            <FaTachometerAlt className="text-xl mr-4" />
            <span className="text-lg font-semibold">Dashboard</span>
          </Link>
        </li>

        {/* Staff Management */}
        <li>
          <Link
            to="/staffmanagement"
            className={`flex items-center p-2 rounded-lg transition-all ${isActive('/staffmanagement') ? 'bg-primary text-white' : 'hover:bg-primary hover:shadow-md hover:text-white'}`}
          >
            <FaUsers className="text-xl mr-4" />
            <span className="text-lg font-semibold">Staff Management</span>
          </Link>
        </li>

        {/* Guest Management */}
        <li>
          <Link
            to="/guestmanagement"
            className={`flex items-center p-2 rounded-lg transition-all ${isActive('/guestmanagement') ? 'bg-primary text-white' : 'hover:bg-primary hover:shadow-md hover:text-white'}`}
          >
            <FaHotel className="text-xl mr-4" />
            <span className="text-lg font-semibold">Guest Management</span>
          </Link>
        </li>

        {/* Room Management */}
        <li>
          <div
            onClick={toggleRoomDropdown}
            className={`flex items-center p-2 rounded-lg cursor-pointer transition-all ${isRoomDropdownOpen ? 'bg-primary text-white' : 'hover:bg-primary hover:shadow-md hover:text-white'}`}
          >
            <FaDoorOpen className="text-xl mr-4" />
            <span className="text-lg font-semibold">Room Management</span>
            <span className={`ml-auto text-sm transition-transform ${isRoomDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </div>
          {isRoomDropdownOpen && (
            <ul className="ml-6 mt-1 space-y-1">
              <li>
                <Link
                  to="/roommanagement/roominventory"
                  className={`flex items-center p-1 rounded-lg transition-all ${isActive('/roommanagement/roominventory') ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'}`}
                >
                  <FaBed className="text-xl mr-4" />
                  <span className="text-md">Room Inventory</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/roommanagement/roombooking"
                  className={`flex items-center p-1 rounded-lg transition-all ${isActive('/roombooking') ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'}`}
                >
                  <FaCalendarCheck className="text-xl mr-4" />
                  <span className="text-md">Room Booking</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/roommanagement/createroom"
                  className={`flex items-center p-1 rounded-lg transition-all ${isActive('/roombooking') ? 'bg-primary text-white' : 'hover:bg-primary hover:text-white'}`}
                >
                  <FaCalendarCheck className="text-xl mr-4" />
                  <span className="text-md">Create Room</span>
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
