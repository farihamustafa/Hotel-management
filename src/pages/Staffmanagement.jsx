import React, { useState } from 'react';
import { FaTrash, FaEdit, FaEnvelope, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Staffmanagement() {
  const navigate = useNavigate();

  const [staffList] = useState([
    {
      id: 1,
      serialNo: 1,
      name: 'John Doe',
      email: 'johndoe@example.com',
      role: 'Manager',
      phone: '123-456-7890',
      address: '123 Main St',
      cnic: '12345-6789012-3',
      status: 'Active',
    },
    {
      id: 2,
      serialNo: 2,
      name: 'Jane Smith',
      email: 'janesmith@example.com',
      role: 'Assistant',
      phone: '987-654-3210',
      address: '456 Elm St',
      cnic: '98765-4321098-7',
      status: 'Inactive',
    },
  ]);

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateNewStaff = () => {
    navigate('/createstaff');
  };

  const handleEditStaff = (staff) => {
    navigate('/editstaff/:id', { state: { staff } });
  };

  const handleDeleteStaff = (id) => {
    const updatedList = staffList.filter((staff) => staff.id !== id);
    console.log(updatedList); // For demonstration
  };

  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
  };

  const closeModal = () => {
    setSelectedStaff(null);
  };

  // Filter staff based on the search query
  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-light min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Staff Management</h1>
        <div className="flex items-center space-x-4 ml-auto">
          <button
            onClick={handleCreateNewStaff}
            className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
          >
            + Create New Staff
          </button>
          <input
            type="text"
            placeholder="Search staff..."
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
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Phone</th>
              <th className="px-6 py-3">Address</th>
              <th className="px-6 py-3">CNIC</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map((staff) => (
              <tr key={staff.id} className="border-b hover:bg-gray-100 transition">
                <td className="px-6 py-4">{staff.serialNo}</td>
                <td className="px-6 py-4">{staff.name}</td>
                <td className="px-6 py-4">{staff.email}</td>
                <td className="px-6 py-4">{staff.role}</td>
                <td className="px-6 py-4">{staff.phone}</td>
                <td className="px-6 py-4">{staff.address}</td>
                <td className="px-6 py-4">{staff.cnic}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-md ${
                      staff.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {staff.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex justify-center items-center space-x-4">
                  <button
                    onClick={() => handleEditStaff(staff)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteStaff(staff.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FaTrash size={18} />
                  </button>
                  <button className="text-yellow-500 hover:text-yellow-700" title="Send Email">
                    <FaEnvelope size={18} />
                  </button>
                  <button
                    onClick={() => handleViewDetails(staff)}
                    className="text-gray-500 hover:text-gray-700"
                    title="View Details"
                  >
                    <FaInfoCircle size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selectedStaff && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg p-8 max-w-lg w-full shadow-lg transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Staff Details</h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Name:</strong>
                <span className="text-gray-800">{selectedStaff.name}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Email:</strong>
                <span className="text-gray-800">{selectedStaff.email}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Role:</strong>
                <span className="text-gray-800">{selectedStaff.role}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Phone:</strong>
                <span className="text-gray-800">{selectedStaff.phone}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Address:</strong>
                <span className="text-gray-800">{selectedStaff.address}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">CNIC:</strong>
                <span className="text-gray-800">{selectedStaff.cnic}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Status:</strong>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedStaff.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedStaff.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Staffmanagement;
