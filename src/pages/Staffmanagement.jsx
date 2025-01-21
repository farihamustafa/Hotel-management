import React, { useState } from 'react';
import { FaTrash, FaEdit, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Staffmanagement() {
  const navigate = useNavigate();

  const [staffList, setStaffList] = useState([
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

  const handleCreateNewStaff = () => {
    navigate('/createstaff');
  };

  const handleEditStaff = (staff) => {
    navigate('/editstaff/:id', { state: { staff } });
  };

  const handleDeleteStaff = (id) => {
    const updatedList = staffList.filter((staff) => staff.id !== id);
    setStaffList(updatedList);
  };

  return (
    <div className="p-6 bg-light min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Staff Management</h1>
      </div>

      <div className="mb-4">
        <button
          onClick={handleCreateNewStaff}
          className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
        >
          + Create New Staff
        </button>
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
            {staffList.map((staff) => (
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Staffmanagement;