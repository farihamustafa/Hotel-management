import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RoomInventory = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tempStatus, setTempStatus] = useState('');
  const [rooms, setRooms] = useState([
    { id: 1, code: 'R001', type: 'Single Room', availability: 'Available', status: 'Available', price: '$100' },
    { id: 2, code: 'R002', type: 'Double Room', availability: 'Occupied', status: 'Occupied', price: '$150' },
    { id: 3, code: 'R003', type: 'Suite', availability: 'Available', status: 'Available', price: '$300' },
    { id: 4, code: 'R004', type: 'Single Room', availability: 'Available', status: 'Cleaning', price: '$100' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const openStatusModal = (room) => {
    setSelectedRoom(room);
    setTempStatus(room.status);
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedRoom(null);
  };

  const handleTempStatusChange = (newStatus) => {
    setTempStatus(newStatus);
  };

  const saveStatus = () => {
    const updatedRooms = rooms.map((room) =>
      room.id === selectedRoom.id ? { ...room, status: tempStatus } : room
    );
    setRooms(updatedRooms);
    closeStatusModal();
  };

  const validationSchema = Yup.object({
    maintenanceType: Yup.string().required('Maintenance type is required'),
    priority: Yup.string().required('Priority is required'),
    deadline: Yup.date().required('Deadline is required'),
    assignTo: Yup.string().required('Assign to is required'),
    additionalServices: Yup.string(),
  });

  const handleMaintenanceSubmit = (values) => {
    console.log('Maintenance scheduled:', values);
    closeModal();
  };

  const filteredRooms = rooms.filter((room) =>
    room.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 flex flex-col">
    
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Room Inventory</h1>
        <div className="flex items-center space-x-4 ml-auto">
          <button
            onClick={() => navigate('/roommanagement/createroom')}
            className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
          >
            + Create New Room
          </button>
          <input
            type="text"
            placeholder="Search Room..."
            className="px-4 py-2 border rounded-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="bg-secondary text-white uppercase text-base">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Room Code</th>
              <th className="px-6 py-3">Room Type</th>
              <th className="px-6 py-3">Availability</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.id} className="border-b hover:bg-gray-100 transition duration-200">
                <td className="px-4 py-2">{room.id}</td>
                <td className="px-4 py-2">{room.code}</td>
                <td className="px-4 py-2">{room.type}</td>
                <td className="px-4 py-2">{room.availability}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-3 py-1 rounded-md font-medium cursor-pointer ${room.status === 'Available'
                      ? 'bg-green-100 text-green-800'
                      : room.status === 'Occupied'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                      }`}
                    onClick={() => openStatusModal(room)}
                  >
                    {room.status}
                  </span>
                </td>
                <td className="px-4 py-2">{room.price}</td>
                <td className="px-4 py-2 flex justify-center gap-4">
                  <button className="text-red-500 text-lg hover:text-red-700" title="Delete Room">
                    <FaTrash />
                  </button>
                  <button
                    className="text-blue-500 text-lg hover:text-blue-700"
                    title="Edit Room"
                    onClick={() => navigate('/roommanagement/createroom')} // Redirect to RoomCreate page
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md flex items-center gap-2"
                    onClick={() => openModal(room)}
                  >
                    Schedule Maintenance
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
                <h3 className="text-xl font-medium text-gray-900">Change Room Status</h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex flex-col space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="Available"
                      checked={tempStatus === 'Available'}
                      onChange={(e) => handleTempStatusChange(e.target.value)}
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
                      onChange={(e) => handleTempStatusChange(e.target.value)}
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
                      onChange={(e) => handleTempStatusChange(e.target.value)}
                      className="mr-2"
                    />
                    Cleaning
                  </label>
                </div>
              </div>
              <div className="flex items-center justify-end p-6 space-x-2 border-t border-gray-200 rounded-b">
                <button
                  onClick={closeStatusModal}
                  className="px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={saveStatus}
                  className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
                >
                  Save Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Maintenance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h2 className="text-2xl font-bold mb-4">Schedule Maintenance</h2>
            <Formik
              initialValues={{
                maintenanceType: '',
                priority: '',
                deadline: '',
                assignTo: '',
                additionalServices: [],
              }}
              validationSchema={validationSchema}
              onSubmit={handleMaintenanceSubmit}
            >
              <Form>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="maintenanceType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Maintenance Type
                    </label>
                    <Field
                      as="select"
                      name="maintenanceType"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    >
                      <option value="">Select type</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electricity">Electricity</option>
                      <option value="cleaning">Cleaning</option>
                    </Field>
                    <ErrorMessage
                      name="maintenanceType"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="priority"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Priority
                    </label>
                    <Field
                      as="select"
                      name="priority"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    >
                      <option value="">Select priority</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </Field>
                    <ErrorMessage
                      name="priority"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="deadline"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Deadline
                    </label>
                    <Field
                      type="date"
                      name="deadline"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                    <ErrorMessage
                      name="deadline"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="assignTo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Assign To
                    </label>
                    <Field
                      name="assignTo"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                    <ErrorMessage
                      name="assignTo"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="additionalServices"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Additional Services
                    </label>
                    <Field
                      name="additionalServices"
                      as="textarea"
                      rows="3"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 bg-secondary hover:bg-hoverbutton text-white rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-secondary hover:bg-hoverbutton text-white rounded-md"
                  >
                    Schedule Maintenance
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomInventory;
