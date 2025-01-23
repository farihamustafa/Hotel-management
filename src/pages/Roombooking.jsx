import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 


const RoomBooking = () => {
  const navigate = useNavigate();
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

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tempStatus, setTempStatus] = useState('');

  const handleCreateNewBooking = () => {
    navigate('/newbooking');
  };

  const openStatusModal = (room) => {
    setSelectedRoom(room);
    setTempStatus(room.status); // Set initial status in modal
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedRoom(null);
  };

  const handleStatusChange = (e) => {
    setTempStatus(e.target.value);
  };

  const saveStatus = () => {
    setRooms(
      rooms.map((room) =>
        room.id === selectedRoom.id ? { ...room, status: tempStatus } : room
      )
    );
    closeStatusModal();
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
              <th className="px-6 py-3">Newbooking</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">{room.id}</td>
                <td className="px-6 py-4">{room.type}</td>
                <td className="px-6 py-4">
                  <button
                    className={`px-3 py-1 rounded-md font-medium ${
                      room.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                    onClick={() => openStatusModal(room)}
                  >
                    {room.status}
                  </button>
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

      {/* Status Modal */}
      {isStatusModalOpen && (
        <div
          id="statusModal"
          tabIndex="-1"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          aria-hidden="true"
        >
          <div className="relative w-full max-w-md">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex justify-between items-center p-5 rounded-t border-b">
                <h3 className="text-xl font-medium text-gray-900">
                  Change Room Status
                </h3>
               
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Available"
                      checked={tempStatus === 'Available'}
                      onChange={handleStatusChange}
                      className="mr-2"
                    />
                    Available
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Occupied"
                      checked={tempStatus === 'Occupied'}
                      onChange={handleStatusChange}
                      className="mr-2"
                    />
                    Occupied
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Cleaning"
                      checked={tempStatus === 'Cleaning'}
                      onChange={handleStatusChange}
                      className="mr-2"
                    />
                    Cleaning
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b">
                <button
                  onClick={closeStatusModal}
                  className="text-gray-500 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 focus:z-10"
                >
                  Cancel
                </button>
                <button
                  onClick={saveStatus}
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5"
                >
                  Save Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomBooking;
