import React, { useState } from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RoomInventory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const rooms = [
    { id: 1, type: 'Single Room', availability: 'Available', status: 'Available', price: '$100' },
    { id: 2, type: 'Double Room', availability: 'Occupied', status: 'Occupied', price: '$150' },
    { id: 3, type: 'Suite', availability: 'Available', status: 'Available', price: '$300' },
    { id: 4, type: 'Single Room', availability: 'Available', status: 'Cleaning', price: '$100' },
  ];

  const openModal = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
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
                <td className="px-6 py-4">{room.id}</td>
                <td className="px-6 py-4">{room.type}</td>
                <td className="px-6 py-4">{room.availability}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-md font-medium ${
                      room.status === 'Available'
                        ? 'bg-green-100 text-green-800'
                        : room.status === 'Occupied'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {room.status}
                  </span>
                </td>
                <td className="px-6 py-4">{room.price}</td>
                <td className="px-6 py-4 flex justify-center gap-4">
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

      {/* Modal */}
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
                additionalServices: '',
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
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" disabled>
                        Select Type
                      </option>
                      <option value="Electrical">Electrical</option>
                      <option value="Plumbing">Plumbing</option>
                      <option value="Cleaning">Cleaning</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage name="maintenanceType" component="div" className="text-red-500 text-sm" />
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
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="" disabled>
                        Select Priority
                      </option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </Field>
                    <ErrorMessage name="priority" component="div" className="text-red-500 text-sm" />
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
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage name="deadline" component="div" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="assignTo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Assign To
                  </label>
                  <Field
                    as="select"
                    name="assignTo"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select Person/Team
                    </option>
                    <option value="Team A">Team A</option>
                    <option value="Team B">Team B</option>
                    <option value="John Doe">John Doe</option>
                    <option value="Jane Doe">Jane Doe</option>
                  </Field>
                  <ErrorMessage name="assignTo" component="div" className="text-red-500 text-sm" />
                </div>

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
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition duration-300"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-secondary text-white rounded-md hover:bg-hoverbutton transition duration-300"
                  >
                    Submit
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
