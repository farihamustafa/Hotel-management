import React, { useEffect, useState } from 'react';
import { FaTrash, FaEdit, FaEnvelope, FaInfoCircle } from 'react-icons/fa';
import { MdToggleOff, MdToggleOn } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiservice';
import ProtectedRoute from '../components/PrivateRoute';

function Staffmanagement() {
  const navigate = useNavigate();

  const [housekeepingList, setHousekeepingList] = useState([]);
  const [managerList, setManagerList] = useState([]);
  const [receptionistList, setReceptionistList] = useState([]);
  
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const staffPerPage = 10;

  useEffect(() => {
    fetchHouseKeeper();
    fetchManager();
    fetchReceptionist();
  }, []);

  const fetchHouseKeeper = async () => {
    try {
      const response = await apiService.postData('auth/list', { role_name: 'housekeeping' });
      setHousekeepingList(response.data);  // Assuming response contains a data field
    } catch (error) {
      console.error('Error fetching housekeeping staff:', error);
    }
  };

  const fetchManager = async () => {
    try {
      const response = await apiService.postData('auth/list', { role_name: 'manager' });
      setManagerList(response.data); // Assuming response contains a data field
    } catch (error) {
      console.error('Error fetching manager staff:', error);
    }
  };

  const fetchReceptionist = async () => {
    try {
      const response = await apiService.postData('auth/list', { role_name: 'receptionist' });
      setReceptionistList(response.data); // Assuming response contains a data field
    } catch (error) {
      console.error('Error fetching receptionist staff:', error);
    }
  };

  const handleEditStaff = (staff) => {
    navigate(`/editstaff/${staff._id}`, { state: { staff } });
  };

  const handleViewDetails = (staff) => {
    setSelectedStaff(staff);
  };

  const closeModal = () => {
    setSelectedStaff(null);
  };

  const handleStatusChange = (id, newStatus) => {
    const updateStatus = (staffList) =>
      staffList.map((staff) =>
        staff.id === id ? { ...staff, status: newStatus } : staff
      );
    if (staffList === 'housekeeping') {
      setHousekeepingList(updateStatus(housekeepingList));
    } else if (staffList === 'manager') {
      setManagerList(updateStatus(managerList));
    } else {
      setReceptionistList(updateStatus(receptionistList));
    }
  };

  const renderStaffList = (staffList) => {
   
    return staffList.map((staff,index) => (
      <tr key={staff.id} className="border-b hover:bg-gray-100 transition">
        <td className="px-6 py-4">{index+1}</td>
        <td className="px-6 py-4">{staff.username}</td>
        <td className="px-6 py-4">{staff.email}</td>
        <td className="px-6 py-4">{staff.contact}</td>
        <td className="px-6 py-4">{staff.address || "no Address found"}</td>
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
              onClick={() => handleStatusChange(staff.id, 'Inactive')}
              className="text-red-500 hover:text-green-700"
              title="Deactivate"
            >
              <FaTrash size={18} />
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
    ));
  };

  return (
    <div className="p-6 bg-light min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Staff Management</h1>
      </div>

      {/* Role-based Navigation */}
      <div className="mb-6">
        <ul className="flex space-x-4">
          <li>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition"
            >
              Housekeeping
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage(2)}
              className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition"
            >
              Manager
            </button>
          </li>
          <li>
            <button
              onClick={() => setCurrentPage(3)}
              className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition"
            >
              Receptionist
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/createstaff")}
              className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition"
            >
             + Create Staff
            </button>
          </li>
        </ul>
      </div>

      {/* Staff List for the selected role */}
      {currentPage === 1 && (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <p className='font-bold py-4 text-center'>House Keeper</p>
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead className="bg-secondary text-white text-base uppercase">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>{renderStaffList(housekeepingList)}</tbody>
          </table>
        </div>
      )}

      {currentPage === 2 && (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <p className='font-bold py-4 text-center'>Manager</p>
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead className="bg-secondary text-white text-base uppercase">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>{renderStaffList(managerList)}</tbody>
          </table>
        </div>
      )}

      {currentPage === 3 && (
        <div className="overflow-x-auto rounded-lg shadow-lg bg-white">
          <p className='font-bold py-4 text-center'>Receptionist</p>
          <table className="min-w-full text-sm text-left text-gray-800">
            <thead className="bg-secondary text-white text-base uppercase">
              <tr>
                <th className="px-6 py-3">#</th>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>{renderStaffList(receptionistList)}</tbody>
          </table>
        </div>
      )}

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
                <span className="text-gray-800">{selectedStaff?.username}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Email:</strong>
                <span className="text-gray-800">{selectedStaff?.email}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Role:</strong>
                <span className="text-gray-800">{selectedStaff?.role.role_name}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Phone:</strong>
                <span className="text-gray-800">{selectedStaff?.contact}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Address:</strong>
                <span className="text-gray-800">{selectedStaff?.address|| "No Address Found"}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">CNIC:</strong>
                <span className="text-gray-800">{selectedStaff?.CNIC || "No CNIC Found"}</span>
              </div>
              <div className="flex items-center">
                <strong className="w-24 text-gray-600">Status:</strong>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedStaff?.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {selectedStaff?.status}
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
