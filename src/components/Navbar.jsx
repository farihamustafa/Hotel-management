import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-blue-400 border border-gray-300 rounded-full m-4 shadow-lg">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
      
          <span className="text-xl font-bold text-white">MyWebsite</span>

        {/* User Profile */}
       
         
          <img
            src="https://via.placeholder.com/40"
            alt="User Profile"
            className="h-10 w-10 rounded-full border-2 border-white"
          />
        </div>
    </header>
  );
};

export default Navbar;
