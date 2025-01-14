import React from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  return (
    <header className="bg-primary border border-gray-300 rounded-xl m-4 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Breadcrumb */}
        <div className="text-xl font-bold text-white">
          <Breadcrumb />
        </div>

        {/* User Profile */}
        <img
          src="https://th.bing.com/th/id/OIP.M4cV2XkzqBU0CZK4efhDsgHaHa?w=201&h=200&c=7&r=0&o=5&dpr=1.1&pid=1.7"
          alt="User Profile"
          className="h-10 w-10 rounded-full border-2 border-white"
        />
      </div>
    </header>
  );
};

export default Navbar;
