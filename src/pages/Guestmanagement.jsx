import React from 'react';
import { FaTrash, FaEdit, FaEnvelope,  } from 'react-icons/fa';

function Guestmanagement() {
  return (
   <div className="p-6 bg-light min-h-screen">
         <div className="mb-6">
           <h1 className="text-3xl font-bold text-gray-800">Guest Management</h1>
         </div>
   
         <div className="mb-4">
           <button className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300">
             + Create New Guest
           </button>
         </div>
   
         <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
           <table className="min-w-full text-sm text-left text-gray-800">
             <thead className="bg-secondary text-white text-base uppercase">
               <tr>
                 <th className="px-6 py-3">#</th>
                 <th className="px-6 py-3">Name</th>
                 <th className="px-6 py-3">Email</th>
                 <th className="px-6 py-3">Contact</th>
                 <th className="px-6 py-3">Address</th>
                 <th className="px-6 py-3">National id</th>
                 <th className="px-6 py-3">Status</th>
                 <th className="px-6 py-3 text-center">Actions</th>
               </tr>
             </thead>
             <tbody>
               <tr className="border-b hover:bg-gray-100 transition">
                 <td className="px-6 py-4">1</td>
                 <td className="px-6 py-4">John Doe</td>
                 <td className="px-6 py-4">johndoe@example.com</td>
                 <td className="px-6 py-4">123-456-7890</td>
                 <td className="px-6 py-4">Address</td>
                 <td className="px-6 py-4">13567778888</td>
                 <td className="px-6 py-4">
                   <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md">
                     <button>Active</button></span>
                 </td>
                 <td className="px-6 py-4 flex justify-center items-center space-x-4">
                   <button className="text-blue-500 hover:text-blue-700" title="Edit">
                     <FaEdit size={18} />
                   </button>
                   <button className="text-red-500 hover:text-red-700" title="Delete">
                     <FaTrash size={18} />
                   </button>
                   <button className="text-yellow-500 hover:text-yellow-700" title="Send Email">
                     <FaEnvelope size={18} />
                   </button>
                 </td>
               </tr>
   
               <tr className="border-b hover:bg-gray-100 transition">
                 <td className="px-6 py-4">2</td>
                 <td className="px-6 py-4">Jane Smith</td>
                 <td className="px-6 py-4">janesmith@example.com</td>
                 <td className="px-6 py-4">987-654-3210</td>
                 <td className="px-6 py-4">Address</td>
                 <td className="px-6 py-4">13567778888</td>
                 <td className="px-6 py-4">
                   <span className="px-3 py-1 bg-red-100 text-red-800 rounded-md">Inactive</span>
                 </td>
                 <td className="px-6 py-4 flex justify-center items-center space-x-4">
                   <button className="text-blue-500 hover:text-blue-700" title="Edit">
                     <FaEdit size={18} />
                   </button>
                   <button className="text-red-500 hover:text-red-700" title="Delete">
                     <FaTrash size={18} />
                   </button>
                   <button className="text-yellow-500 hover:text-yellow-700" title="Send Email">
                     <FaEnvelope size={18} />
                   </button>
                 </td>
               </tr>
             </tbody>
           </table>
         </div>
       </div>
  )
}

export default Guestmanagement
