import React from 'react';
import Navbar from '../components/Navbar';
import SideNavigation from '../components/Sidebar'; // Ensure this import path is correct

function AuthLayout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-light">
      {/* Sidebar */}
      <div
        className="lg:w-64 w-full lg:h-screen h-auto flex-shrink-0"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
        }}
      >
        <SideNavigation />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div
          className="flex-1 p-4 overflow-auto"
          style={{
            height: 'calc(100vh - 56px)', // Adjust the height based on Navbar height
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
