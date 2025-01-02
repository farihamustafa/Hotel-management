import React from 'react';

function Staffmanagement() {
  return (
    <div>
      {/* Create New Staff Button */}
      <div className="mb-4">
        <button className="px-6 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition duration-300">
          Create New Staff
        </button>
      </div>

      {/* Table (Responsive) */}
      <div className="overflow-x-auto min-w-full">
        <table className="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-400">
          <thead className="text-xl text-gray-700 uppercase bg-blue-400 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Address</th>
              <th className="px-4 py-3">CNIC</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
              <td className="px-4 py-3 border border-gray-300">1</td>
              <td className="px-4 py-3 border border-gray-300">John Doe</td>
              <td className="px-4 py-3 border border-gray-300">johndoe@example.com</td>
              <td className="px-4 py-3 border border-gray-300">123-456-7890</td>
              <td className="px-4 py-3 border border-gray-300 text-left">Address</td>
              <td className="px-4 py-3 border border-gray-300">13567778888</td>
              <td className="px-4 py-3 border border-gray-300 flex space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                  Delete
                </button>
                <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                  Status
                </button>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300">
                  Send Email
                </button>
              </td>
            </tr>
            <tr className="bg-gray-50 hover:bg-gray-100 transition-colors">
              <td className="px-4 py-3 border border-gray-300">2</td>
              <td className="px-4 py-3 border border-gray-300">Jane Smith</td>
              <td className="px-4 py-3 border border-gray-300">janesmith@example.com</td>
              <td className="px-4 py-3 border border-gray-300">987-654-3210</td>
              <td className="px-4 py-3 border border-gray-300">Address</td>
              <td className="px-4 py-3 border border-gray-300">13567778888</td>
              <td className="px-4 py-3 border border-gray-300 flex space-x-2">
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300">
                  Delete
                </button>
                <button className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300">
                  Status
                </button>
                <button className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300">
                  Send Email
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staffmanagement;
