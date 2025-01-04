import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-primary border border-gray-300 rounded-full m-4 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
      
          <span className="text-xl font-bold text-white">Hotel Management</span>

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
