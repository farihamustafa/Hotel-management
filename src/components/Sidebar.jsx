import React from 'react';
import { Link } from 'react-router-dom';

const SideNavigation = () => {
  return (
    <div className="min-h-screen flex">
      {/* Side Navigation with margin, color, and rounded border */}
      <nav className="bg-blue-400 rounded-xl shadow-lg w-64 p-4 m-4">
        <ul className="space-y-4">
          <li>
            <Link to="/staffmanagement" className="block text-white text-lg hover:text-blue-500 font-bold">
              Staff management
            </Link>
          </li>
          <li>
            <Link to="/guestmanagement" className="block text-white text-lg hover:text-blue-500 font-bold">
              Guest management
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideNavigation;
