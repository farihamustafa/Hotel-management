import React from 'react';
import Navbar from '../components/Navbar';
import SideNavigation from '../components/Sidebar'; // Ensure this import path is correct


function AuthLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-light">
     
      <div className="lg:w-64 w-full">
        <SideNavigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 p-4 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
