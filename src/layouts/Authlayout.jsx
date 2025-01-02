// import React from 'react'
// import Navbar from '../components/Navbar';
// import SideNavigation from '../components/Sidebar';

// function Authlayout(props) {
//     const {children} = props;
//   return (
//     <>
//     <Navbar/>
//     <SideNavigation/>
//     {children}
//     </>
//   )
// }

// export default Authlayout
import React from 'react';
import Navbar from '../components/Navbar';
import SideNavigation from '../components/Sidebar';

function AuthLayout({ children }) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <SideNavigation />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </>
  );
}

export default AuthLayout;
