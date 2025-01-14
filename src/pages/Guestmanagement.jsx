import React from 'react';
import { FaTrash, FaEdit, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

function Guestmanagement() {
  const navigate = useNavigate();

  const handleCreateNewGuest = () => {
    navigate('/createguest');
  };

  const guests = [
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
  ];
  
  const handleEditGuest = (guest) => {
    navigate('/editguest/:id', { guest: { guest } });
  };

  return (
    <div className="p-6 bg-light min-h-screen"> 
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Guest Management</h1>
      </div>

      <div className="mb-4">
        <button
          onClick={handleCreateNewGuest}
          className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
        >
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
              <th className="px-6 py-3">National ID</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest, index) => (
              <tr key={guest.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">{index + 1}</td>
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
                  <button className="text-red-500 hover:text-red-700" title="Delete">
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
    </div>
  );
}

export default Guestmanagement;
