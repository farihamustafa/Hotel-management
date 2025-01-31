import React, { createContext, useContext, useEffect } from 'react';
import Navbar from '../components/Navbar';
import SideNavigation from '../components/Sidebar';
import { jwtDecode } from 'jwt-decode';
import { UseAPiContext } from '../App';

const context = createContext();

export function useAuthContext()  {
  return useContext(context);
};

function AuthLayout({ children }) {
  const {setuser} = UseAPiContext();
  const [authAllow , setAuthAllow] = React.useState(false);
  const token = localStorage.getItem('token');
  
  const user = token ? jwtDecode(token) : null;
  

  useEffect(()=>{
    if(!user || !user.id || !token || user.rolename != "SuperAdmin"){ 
      window.location.href = '/login';
      setTimeout(() => {
        window.location.reload();
    }, 100);
      }
      else{
        setAuthAllow(true)
      }
  },[])

  return (
    authAllow ? (
      <context.Provider value={{token,user}} >
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
      </context.Provider>
      
    ) : (
      <div class="relative items-center block h-screen bg-white border border-gray-100 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-800 dark:hover:bg-gray-700">
      <div role="status" class="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-200" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg>
          <span class="sr-only">Loading...</span>
      </div>
  </div>
      
      )
  );
}

export default AuthLayout;
