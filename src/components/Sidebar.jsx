import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaHotel, FaDoorOpen } from 'react-icons/fa';

const SideNavigation = () => {
  const [isRoomDropdownOpen, setRoomDropdownOpen] = useState(false);

  const toggleRoomDropdown = () => {
    setRoomDropdownOpen(!isRoomDropdownOpen);
  };

  return (
    <div className="min-h-screen flex">
      <nav className="bg-primary rounded-xl shadow-lg w-64 p-4 m-4">
        <ul className="space-y-4">
          <li>
            <Link to="/" className="flex items-center text-white text-lg hover:text-xl font-bold ">
              <FaTachometerAlt className="mr-3" /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/staffmanagement" className="flex items-center text-white text-lg hover:text-xl font-bold">
              <FaUsers className="mr-3" /> Staff Management
            </Link>
          </li>
          <li>
            <Link to="/guestmanagement" className="flex items-center text-white text-lg hover:text-xl font-bold">
              <FaHotel className="mr-3" /> Guest Management
            </Link>
          </li>
          <li>
            <div
              className="flex items-center text-white text-lg hover:text-xl font-bold cursor-pointer"
              onClick={toggleRoomDropdown}
            >
              <FaDoorOpen className="mr-3" /> Room Management
            </div>
            {isRoomDropdownOpen && (
              <ul className="ml-8 mt-2 space-y-2">
                <li>
                  <Link to="/roommanagement/roominventory" className="text-white text-md hover:text-lg">
                    Room Inventory
                  </Link>
                </li>
                <li>
                  <Link to="/roombooking" className="text-white text-md hover:text-lg">
                    Room Booking
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;
