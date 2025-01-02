import React from 'react';
import { Link } from 'react-router-dom';

const SideNavigation = () => {
  return (
    <div className="min-h-screen bg-blue-100 flex">
      {/* Side Navigation with margin, color, and rounded border */}
      <nav className="bg-white rounded-lg shadow-lg w-64 p-4 m-4 bg-gray-50 border border-gray-300">
        <ul className="space-y-4">
          <li>
            <Link to="/staffmanagement" className="block text-gray-700 hover:text-blue-500">
              Staff management
            </Link>
          </li>
          <li>
            <Link to="/guestmanagement" className="block text-gray-700 hover:text-blue-500">
              Guest management
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;
