import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RoomInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false); // New modal for status
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tempStatus, setTempStatus] = useState(''); // Temp status for the modal
  const [rooms, setRooms] = useState([
    { id: 1, code: 'R001', type: 'Single Room', availability: 'Available', status: 'Available', price: '$100' },
    { id: 2, code: 'R002', type: 'Double Room', availability: 'Occupied', status: 'Occupied', price: '$150' },
    { id: 3, code: 'R003', type: 'Suite', availability: 'Available', status: 'Available', price: '$300' },
    { id: 4, code: 'R004', type: 'Single Room', availability: 'Available', status: 'Cleaning', price: '$100' },
  ]);

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  // Status Modal Functions
  const openStatusModal = (room) => {
    setSelectedRoom(room);
    setTempStatus(room.status); // Set the current status in temp state
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedRoom(null);
  };

  const handleTempStatusChange = (newStatus) => {
    setTempStatus(newStatus); // Update temp status, not the room directly
  };

  const saveStatus = () => {
    const updatedRooms = rooms.map((room) =>
      room.id === selectedRoom.id ? { ...room, status: tempStatus } : room
    );
    setRooms(updatedRooms); // Update room status
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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Room Inventory</h1>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-700 text-white uppercase text-base">
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
            {rooms.map((room) => (
              <tr
                key={room.id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
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
                    onClick={() => openStatusModal(room)} // Open status modal on click
                  >
                    {room.status}
                  </span>
                </td>
                <td className="px-4 py-2">{room.price}</td>
                <td className="px-4 py-2 flex justify-center gap-4">
                  <button
                    className="text-red-500 text-lg hover:text-red-700"
                    title="Delete Room"
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="text-blue-500 text-lg hover:text-blue-700"
                    title="Edit Room"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h2 className="text-xl font-bold mb-4">Change Room Status</h2>
            <div className="mb-4">

              {/* Radio Buttons for Status */}
              <div className="space-y-2">
                <div>
                  <input
                    type="radio"
                    id="available"
                    name="status"
                    value="Available"
                    checked={tempStatus === 'Available'}
                    onChange={(e) => handleTempStatusChange(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="available">Available</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="occupied"
                    name="status"
                    value="Occupied"
                    checked={tempStatus === 'Occupied'}
                    onChange={(e) => handleTempStatusChange(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="occupied">Occupied</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="cleaning"
                    name="status"
                    value="Cleaning"
                    checked={tempStatus === 'Cleaning'}
                    onChange={(e) => handleTempStatusChange(e.target.value)}
                    className="mr-2"
                  />
                  <label htmlFor="cleaning">Cleaning</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={closeStatusModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                onClick={saveStatus} // Save status on button click
              >
                Save
              </button>
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
                  {/* Maintenance Type */}
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

                  {/* Priority */}
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

                  {/* Deadline */}
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

                  {/* Assign To */}
                  <div>
                    <label
                      htmlFor="assignTo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Assign To
                    </label>
                    <Field
                      type="text"
                      name="assignTo"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    />
                    <ErrorMessage
                      name="assignTo"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                </div>

                {/* Additional Services */}
                <div className="mb-4">
                  <label
                    htmlFor="additionalServices"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Additional Services
                  </label>
                  <Field
                    as="textarea"
                    name="additionalServices"
                    rows="3"
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                  />
                </div>

         
                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Schedule
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
