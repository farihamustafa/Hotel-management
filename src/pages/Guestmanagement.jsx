import React, { useEffect, useState } from 'react';
import { FaEdit, FaInfoCircle } from 'react-icons/fa';
import { MdToggleOff, MdToggleOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { guestManagement } from '../services/GuestManagement';

function Guestmanagement() {
  const navigate = useNavigate();
  const [guests, setGuests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 5; // Har page par kitne guests dikhenge

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await guestManagement.getGuestList();
      if (response && response.data) {
        const modifiedGuests = response.data.map(guest => ({
          ...guest,
          name: guest.username,
        }));
        setGuests(modifiedGuests);
      } else {
        setGuests([]);
      }
    } catch (error) {
      console.error("Error fetching guest list:", error);
      setGuests([]);
    }
  };

  const statuschange = async (id, newStatus) => {
    try {
      await guestManagement.changestatus(id, newStatus);
      setGuests(prevGuests =>
        prevGuests.map(guest =>
          guest._id === id ? { ...guest, status: newStatus } : guest
        )
      );
    } catch (error) {
      console.log("Error changing status:", error);
    }
  };

  const handleEditGuest = (guest) => {
    navigate('/editguest/:id', { state: { guest } });
  };

  // Search filter
  const filteredGuests = guests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination logic
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = filteredGuests.slice(indexOfFirstGuest, indexOfLastGuest);

  const totalPages = Math.ceil(filteredGuests.length / guestsPerPage);

  return (
    <div className="p-6 bg-light min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Guest Management</h1>
        <div className="flex items-center space-x-4 ml-auto">
          <input
            type="text"
            placeholder="Search guests..."
            className="px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentGuests.map((guest, index) => (
              <tr key={guest._id} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">{indexOfFirstGuest + index + 1}</td>
                <td className="px-6 py-4">{guest.name}</td>
                <td className="px-6 py-4">{guest.email}</td>
                <td className="px-6 py-4">{guest.contact}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-md ${guest.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {guest.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center items-center space-x-4">
                  <button onClick={() => handleEditGuest(guest)} className="text-blue-500 hover:text-blue-700" title="Edit">
                    <FaEdit size={18} />
                  </button>
                  {guest.status === 'Active' ? 
                    <button onClick={() => statuschange(guest._id, "InActive")} className="text-green-500 hover:text-green-700 duration-100 ease-in" title="Change Status">
                      <MdToggleOn size={18} />
                    </button> 
                    : 
                    <button onClick={() => statuschange(guest._id, "Active")} className="text-red-500 hover:text-red-700 duration-100 ease-in" title="Change Status">
                      <MdToggleOff size={18} />
                    </button>
                  }
                  <button className="text-gray-500 hover:text-gray-700" title="Details">
                    <FaInfoCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="mx-1 px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`mx-1 px-4 py-2 border rounded-md ${currentPage === i + 1 ? 'bg-secondary text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="mx-1 px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Guestmanagement;
