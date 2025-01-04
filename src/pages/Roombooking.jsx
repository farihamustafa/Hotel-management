import React, { useState } from 'react';

const RoomBooking = () => {
  // Static data for rooms
  const [rooms, setRooms] = useState([
    {
      id: 1,
      type: 'Single Room',
      status: 'Available',
      price: '$100',
      guest: null,
    },
    {
      id: 2,
      type: 'Double Room',
      status: 'Occupied',
      price: '$150',
      guest: 'John Doe',
    },
    {
      id: 3,
      type: 'Suite',
      status: 'Available',
      price: '$300',
      guest: null,
    },
  ]);

  // Function to handle room booking
  const handleBooking = (roomId, guestName) => {
    setRooms(rooms.map((room) => {
      if (room.id === roomId && room.status === 'Available') {
        return { ...room, status: 'Occupied', guest: guestName };
      }
      return room;
    }));
  };

  return (
    <div className="p-6 bg-light min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Room Booking</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-secondary text-white text-base uppercase">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Room Type</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Guest</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">{room.id}</td>
                <td className="px-6 py-4">{room.type}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-md ${
                      room.status === 'Available' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {room.status}
                  </span>
                </td>
                <td className="px-6 py-4">{room.price}</td>
                <td className="px-6 py-4">{room.guest ? room.guest : 'N/A'}</td>
                <td className="px-6 py-4 flex justify-center items-center space-x-4">
                  {room.status === 'Available' ? (
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        const guestName = prompt('Enter guest name:');
                        if (guestName) {
                          handleBooking(room.id, guestName);
                        }
                      }}
                      title="Book Room"
                    >
                      Book Now
                    </button>
                  ) : (
                    <span className="text-gray-400">Booked</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomBooking;
