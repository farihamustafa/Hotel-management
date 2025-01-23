import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RoomBooking = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const roomsPerPage = 2; // Number of rooms per page
  const [searchTerm, setSearchTerm] = useState(''); // For searching rooms

  const handleCreateNewBooking = () => {
    navigate('/newbooking');
  };

  const rooms = [
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
    {
      id: 4,
      type: 'Penthouse',
      status: 'Available',
      price: '$500',
      guest: null,
    },
    {
      id: 5,
      type: 'Family Room',
      status: 'Occupied',
      price: '$250',
      guest: 'Jane Smith',
    },
    {
      id: 6,
      type: 'Single Room',
      status: 'Occupied',
      price: '$250',
      guest: 'Zobie Smith',
    },
  ];

  // Filter rooms based on search term
  const filteredRooms = rooms.filter((room) =>
    room.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log(filteredRooms); // Debugging filtered rooms

  // Calculate the total pages
  const totalPages = Math.ceil(filteredRooms.length / roomsPerPage);

  // Get rooms for the current page
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-light min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Room Booking</h1>
    
        <input
          type="text"
          placeholder="Search Rooms"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            console.log(e.target.value); 
          }}
         className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
        <table className="min-w-full text-sm text-left text-gray-800">
          <thead className="bg-secondary text-white text-base uppercase">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Room Type</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Guest</th>
              <th className="px-6 py-3">New Booking</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">No rooms found</td>
              </tr>
            ) : (
              currentRooms.map((room) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-end mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RoomBooking;
