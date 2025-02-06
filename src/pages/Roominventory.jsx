import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { apiService } from '../services/apiservice';
import ReactPaginate from 'react-paginate';
import { startOfDay } from 'date-fns';
import { MdToggleOff, MdToggleOn } from 'react-icons/md';
import toast from 'react-hot-toast';
import { UseAPiContext } from '../App';

const RoomInventory = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [tempStatus, setTempStatus] = useState('');
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const roomsPerPage = 10;
  const {setRoom} = UseAPiContext()
  const [loading, setLoading] = useState(true);
 const [maintenanceTypes, setMaintenanceTypes] = useState([]);
 const [user, setuser] = useState([]);

  const maintenanceList = async () => {
    try {
      const response = await apiService.getData("housekeeping/maintenancelist");
      console.log(response.data)
      setMaintenanceTypes(response.data)


    } catch (error) {
      console.error("Error fetching Additional Service list:", error);

    }
  };
  const userList = async () => {
    try {
      const response = await apiService.postData("auth/list",{role_name:"housekeeping"});
      console.log(response.data)
      setuser(response.data)


    } catch (error) {
      console.error("Error fetching Additional Service list:", error);

    }
  };
  useEffect(()=>{
    maintenanceList()
    userList();
  },[])
  const avaibility_Record = async (id) => {
    try {
      const room = rooms.find((room) => room._id === id);

      if (room.avaibility === "occupied") {
        toast.error("You cannot change the status of an occupied room.");
        return;
      }

      const response = await apiService.postData(`room/status/${id}`);
      console.log(response);
      toast.success(response.msg);

      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room._id === id
            ? { ...room, avaibility: room.avaibility === 'available' ? 'disabled' : 'available' }
            : room
        )
      );
    } catch (error) {
      console.error("Error updating room availability:", error);
    }
  };

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const filteredRooms = rooms.filter((room) =>
    room.roomCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.roomType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedRooms = filteredRooms.slice(
    currentPage * roomsPerPage,
    (currentPage + 1) * roomsPerPage
  );

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const response = await apiService.getData("room/list");
      console.log(response.roomdata);
      setRooms(response.roomdata);
      setLoading(false)
    };
    getData();
  }, []);

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
    setTempStatus(room.avaibility);
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
      room._id === selectedRoom._id ? { ...room, avaibility: tempStatus } : room
    );
    setRooms(updatedRooms);
    closeStatusModal();
  };

  const validationSchema = Yup.object({
    maintenance: Yup.string().required('Maintenance type is required'),
    priority: Yup.string().required('Priority is required'),
    deadline: Yup.date()
    .required('Deadline date is required')
    .min(startOfDay(new Date()), 'Deadline date must be today or in the future'), 
    housekeeper: Yup.string().required('Assign to is required'),
    task: Yup.string(),
  });

  const handleMaintenanceSubmit = async(values) => {
    try{
    const response = await apiService.postData("housekeeping/taskassign",values)
    console.log(response)
    toast.success("Maintenance schedule Successfully")
    console.log('Maintenance scheduled:', values);
    closeModal();
    }
    catch(err){
      console.log(err)
    }
  };

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
              <th className="px-6 py-3">Room Name</th>
              <th className="px-6 py-3">Room Code</th>
              <th className="px-6 py-3">Room Type</th>
              <th className="px-6 py-3">Availability</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
          {loading ? (
  <tr>
    <td colSpan="6" className="px-6 py-4 text-center">
      <div className="spinner">Loading...</div>
    </td>
  </tr>
) : (
  displayedRooms.map((room) => (
    <tr key={room._id} className="border-b hover:bg-gray-100 transition duration-200">
      <td className="px-4 py-2">{room.roomTitle}</td>
      <td className="px-4 py-2">{room.roomCode}</td>
      <td className="px-4 py-2">{room.roomType}</td>
      <td className="px-4 py-2">
        <span
          className={`px-3 py-1 rounded-md font-medium ${room.avaibility === 'available'
            ? 'bg-green-100 text-green-800'
            : room.avaibility === 'occupied'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-red-100 text-red-800'
            }`}
          onClick={() => openStatusModal(room)}
        >
          {room.avaibility}
        </span>
      </td>
      <td className="px-4 py-2">${room.price}</td>
      <td className="px-4 py-2 flex justify-center gap-4">
        {room.avaibility === 'available' ? (
          <button
            onClick={() => avaibility_Record(room._id)}
            className="text-green-500 hover:text-green-700 duration-100 ease-in"
            title="Change Status"
          >
            <MdToggleOn size={18} />
          </button>
        ) : (
          <button
            onClick={() => avaibility_Record(room._id)}
            className="text-red-500 hover:text-red-700 duration-100 ease-in"
            title="Change Status"
          >
            <MdToggleOff size={18} />
          </button>
        )}
        <button
          className="text-blue-500 text-lg hover:text-blue-700"
          title="Edit Room"
          onClick={() => { setRoom(room); navigate('/roommanagement/editroom'); }}
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
  ))
)}
          </tbody>
        </table>
      </div>

      {/* Maintenance Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/2">
            <h2 className="text-2xl font-bold mb-4">Schedule Maintenance</h2>
            <Formik
              initialValues={{
                maintenance: '',
                priority: '',
                deadline: '',
                housekeeper: '',
                task: '',
                room: selectedRoom ? selectedRoom._id : '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleMaintenanceSubmit}
            >
              <Form>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="maintenance"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Maintenance Type
                    </label>
                    <Field
                      as="select"
                      name="maintenance"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    >
                      <option value="">Select type</option>
                      {maintenanceTypes.map((type, index) => (
  <option key={index} value={type._id}>{type.type}</option>
))}

                    </Field>
                    <ErrorMessage
                      name="maintenance"
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
                      htmlFor="housekeeper"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Assign Housekeeper
                    </label>
                    <Field
                      as="select"
                      name="housekeeper"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3"
                    >
                      <option value="">Assign Housekeeper</option>
                      {user.map((type, index) => (
  <option value={type._id}>{type.email}</option>
))}

                    </Field>
                    <ErrorMessage
                      name="housekeeper"
                      component="div"
                      className="text-red-600 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="task"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Additional Notes
                    </label>
                    <Field
                      name="task"
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

      {/* Pagination */}
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={Math.ceil(filteredRooms.length / roomsPerPage)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center mt-6 space-x-2'}
        pageClassName={'px-3 py-1 bg-gray-200 rounded-md cursor-pointer'}
        activeClassName={'bg-secondary text-white'}
        previousClassName={'px-3 py-1 bg-gray-300 rounded-md cursor-pointer'}
        nextClassName={'px-3 py-1 bg-gray-300 rounded-md cursor-pointer'}
      />
    </div>
  );
};

export default RoomInventory;
