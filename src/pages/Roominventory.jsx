import React, { useState } from 'react';

const RoomInventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const rooms = [
    {
      id: 1,
      type: 'Single Room',
      availability: 'Available',
      status: 'Available',
      price: '$100',
    },
    {
      id: 2,
      type: 'Double Room',
      availability: 'Occupied',
      status: 'Occupied',
      price: '$150',
    },
    {
      id: 3,
      type: 'Suite',
      availability: 'Available',
      status: 'Available',
      price: '$300',
    },
    {
      id: 4,
      type: 'Single Room',
      availability: 'Available',
      status: 'Cleaning',
      price: '$100',
    },
  ];

  const filteredRooms = rooms.filter((room) =>
    Object.values(room).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  return (
    <div className="p-4 bg-light min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Room Inventory</h1>

      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-secondary text-white text-base uppercase">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Room Type</th>
              <th className="px-6 py-3">Availability</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">{room.id}</td>
                <td className="px-6 py-4">{room.type}</td>
                <td className="px-6 py-4">{room.availability}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-md ${
                      room.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : room.status === 'Occupied'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {room.status}
                  </span>
                </td>
                <td className="px-6 py-4">{room.price}</td>
                <td className="px-6 py-4 flex justify-center items-center space-x-4">
                  <button className="text-blue-500 hover:text-blue-700" title="Mark as Occupied">
                    Occupied
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700" title="Mark as Cleaning">
                    Cleaning
                  </button>
                  <button className="text-green-500 hover:text-green-700" title="Mark as Available">
                    Available
                  </button>
                </td>
              </tr>
            ))}
            {filteredRooms.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No matching rooms found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomInventory;
