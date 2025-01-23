import React, { useState } from 'react';
import { FaTrash, FaEdit, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Guestmanagement() {
  const navigate = useNavigate();

  // State to manage the guests list
  const [guests, setGuests] = useState([
    {
      id: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      contact: '123-456-7890',
      address: 'Address',
      nationalId: '13567778888',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      contact: '987-654-3210',
      address: 'Address',
      nationalId: '13567778888',
      status: 'Inactive',
    },
    {
      id: 3,
      name: 'Ali Gattie',
      email: 'Ali@example.com',
      contact: '123-456-7890',
      address: 'Address',
      nationalId: '13567778888',
      status: 'Active',
    },
    {
      id: 4,
      name: 'Rose William',
      email: 'Ali@example.com',
      contact: '987-654-3210',
      address: 'Address',
      nationalId: '13567778888',
      status: 'Inactive',
    },
    // Add more guests here if needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 2; // Adjust the number of guests per page as needed

  const handleCreateNewGuest = () => {
    navigate('/createguest');
  };

  const handleEditGuest = (guest) => {
    navigate('/editguest/:id', { state: { guest } });
  };

  const handleDeleteGuest = (id) => {
    const updatedGuests = guests.filter((guest) => guest.id !== id);
    setGuests(updatedGuests);
  };

  const filteredGuests = guests.filter((guest) =>
    guest.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil(filteredGuests.length / guestsPerPage);

  // Get guests for the current page
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = filteredGuests.slice(indexOfFirstGuest, indexOfLastGuest);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-light min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <button
            onClick={handleCreateNewGuest}
            className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
          >
            + Create New Guest
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search guest..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
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
              <th className="px-6 py-3">National ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentGuests.map((guest, index) => (
              <tr key={guest.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">{index + 1 + (currentPage - 1) * guestsPerPage}</td>
                <td className="px-6 py-4">{guest.name}</td>
                <td className="px-6 py-4">{guest.email}</td>
                <td className="px-6 py-4">{guest.contact}</td>
                <td className="px-6 py-4">{guest.address}</td>
                <td className="px-6 py-4">{guest.nationalId}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-md ${
                      guest.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {guest.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center items-center space-x-4">
                  <button
                    onClick={() => handleEditGuest(guest)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteGuest(guest.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrash size={18} />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700" title="Send Email">
                    <FaEnvelope size={18} />
                  </button>
                </td>
              </tr>
            ))}
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
}

export default Guestmanagement;
