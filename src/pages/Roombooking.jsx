import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const RoomBooking = () => {
  const navigate = useNavigate();

  const handleCreateNewBooking = () => {
    navigate('/newbooking');
  };


 
  const [rooms] = useState([
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
              <th className="px-6 py-3">Newbooking</th>
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
                <td className="px-6 py-4">
  <button
    onClick={handleCreateNewBooking}
    className="text-blue-700 font-semibold hover:text-red-700"
  >
    Book Now
  </button>
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
