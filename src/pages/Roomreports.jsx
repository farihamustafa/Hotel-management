import React from 'react';

const Roomreports = () => {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Room Reports</h1>

      {/* Search Input */}
      <div className="flex flex-wrap items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search by Room Number or Guest Name"
          className="w-full md:w-1/2 lg:w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
        />
      </div>

      {/* Room Reports Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-secondary text-white text-base uppercase">
            <tr>
              <th className="px-4 py-3">Room Code</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Guest Name</th>
              <th className="px-4 py-3">Check-In</th>
              <th className="px-4 py-3">Check-Out</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100 transition">
              <td className="px-4 py-3">101</td>
              <td className="px-4 py-3 font-semibold">Occupied</td>
              <td className="px-4 py-3">John Doe</td>
              <td className="px-4 py-3">2025-01-10</td>
              <td className="px-4 py-3">2025-01-15</td>
              <td className="px-4 py-3">
                <button className="px-3 py-1 text-blue-700 font-semibold hover:text-red-700">
                  View Issues
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-100 transition">
              <td className="px-4 py-3">102</td>
              <td className="px-4 py-3 font-semibold">Available</td>
              <td className="px-4 py-3">N/A</td>
              <td className="px-4 py-3">N/A</td>
              <td className="px-4 py-3">N/A</td>
              <td className="px-4 py-3">
                <button className="px-3 py-1 text-blue-700 font-semibold hover:text-red-700">
                  View Issues
                </button>
              </td>
            </tr>
            <tr className="border-b hover:bg-gray-100 transition">
              <td className="px-4 py-3">103</td>
              <td className="px-4 py-3 font-semibold">Cleaning</td>
              <td className="px-4 py-3">N/A</td>
              <td className="px-4 py-3">N/A</td>
              <td className="px-4 py-3">N/A</td>
              <td className="px-4 py-3">
                <button className="px-3 py-1 text-blue-700 font-semibold hover:text-red-700">
                  View Issues
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Room Issues Section */}
      <h2 className="text-2xl font-bold text-black m-4">Issues for Room 101</h2>
      <ul className="space-y-3">
  <li className="p-3 border rounded bg-gray-50 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <p className="text-lg font-semibold text-gray-800">Air conditioning not working</p>
      <p className="text-sm text-gray-600">Date: 2025-01-12</p>
    </div>
    <div className="mt-2 flex justify-end">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Assign Task</label>
        <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
          <option value="" disabled selected>
            Select Staff
          </option>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
          <option value="Charlie">Charlie</option>
          <option value="Diana">Diana</option>
        </select>
      </div>
    </div>
  </li>
  <li className="p-3 border rounded bg-gray-50 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
    <div>
      <p className="text-lg font-semibold text-gray-800">Water leakage in the bathroom</p>
      <p className="text-sm text-gray-600">Date: 2025-01-13</p>
    </div>
    <div className="mt-2 flex justify-end">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1">Assign Task</label>
        <select className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none">
          <option value="" disabled selected>
            Select Staff
          </option>
          <option value="Alice">Alice</option>
          <option value="Bob">Bob</option>
          <option value="Charlie">Charlie</option>
          <option value="Diana">Diana</option>
        </select>
      </div>
    </div>
  </li>
</ul>

      <button className="mt-4 px-4 py-2 bg-secondary text-white rounded shadow hover:bg-secondary-dark">
        Close
      </button>
    </div>
  );
};

export default Roomreports;
