import React from 'react';

function Staffmanagement() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <table className="table-auto bg-white border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border border-gray-300 text-left">#</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Name</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Email</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Phone</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Address</th>
              <th className="px-4 py-2 border border-gray-300 text-left">CNIC</th>
              <th className="px-4 py-2 border border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border border-gray-300">1</td>
              <td className="px-4 py-2 border border-gray-300">John Doe</td>
              <td className="px-4 py-2 border border-gray-300">johndoe@example.com</td>
              <td className="px-4 py-2 border border-gray-300">123-456-7890</td>
              <td className="px-4 py-2 border border-gray-300 text-left">Address</td>
              <td className="px-4 py-2 border border-gray-300">13567778888</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2">
                  Delete
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-red-600 ml-2">
                  Status
                </button>
                <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-red-600 ml-2">
                  Send an email
                </button>
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border border-gray-300">2</td>
              <td className="px-4 py-2 border border-gray-300">Jane Smith</td>
              <td className="px-4 py-2 border border-gray-300">janesmith@example.com</td>
              <td className="px-4 py-2 border border-gray-300">987-654-3210</td>
              <td className="px-4 py-2 border border-gray-300">Address</td>
              <td className="px-4 py-2 border border-gray-300">13567778888</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Edit
                </button>
                <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2">
                  Delete
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-red-600 ml-2">
                  Status
                </button>
                <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-red-600 ml-2">
                  Send an email
                </button>
              </td>
            </tr>
            {/* More rows can be added here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staffmanagement;
