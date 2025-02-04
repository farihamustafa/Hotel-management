import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'flowbite';
import { jwtDecode } from 'jwt-decode';
import { apiService } from '../services/apiservice';

function Task() {
  const [tasksData, setTasksData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tasklistdata = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = jwtDecode(token);
        console.log(user.id);
        const response = await apiService.getData(`housekeeping/tasklist/${user.id}`);

        // Ensure response.data is an array
        setTasksData(Array.isArray(response.data) ? response.data : []);
        console.log(response.data);
      } catch (err) {
        console.log(err);
        setTasksData([]); // Fallback to empty array in case of error
      }
    };
    tasklistdata();
  }, []);

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tempStatus, setTempStatus] = useState('');

  const handleDetailsClick = (task) => {
    navigate('/housekeeping/tasks/taskdetails', { state: { task } });
  };

  const openStatusModal = (task) => {
    setSelectedTask(task);
    setTempStatus(task.read === "true" ? "Done" : "Pending"); // Convert string "true"/"false" to proper status
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedTask(null);
  };

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleDateString('en-GB'); // Convert to readable date
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Management</h1>

      <div className="overflow-x-auto rounded-lg shadow-md bg-white">
        <table className="w-full text-sm text-left text-gray-800">
          <thead className="bg-gray-700 text-white uppercase text-base">
            <tr>
              <th className="px-6 py-2">Room Code</th>
              <th className="px-6 py-2">Task Name</th>
              <th className="px-6 py-2">Priority</th>
              <th className="px-6 py-2">Status</th>
              <th className="px-6 py-2">Deadline</th>
              <th className="px-6 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasksData.length > 0 ? (
              tasksData.map((task) => (
                <tr key={task._id} className="border-b hover:bg-gray-100 transition duration-200">
                  <td className="px-6 py-2">{task.room?.roomCode || 'N/A'}</td>
                  <td className="px-6 py-2">{task.task}</td>
                  <td className="px-6 py-2">{task.priority}</td>
                  <td className="px-6 py-2 cursor-pointer" onClick={() => openStatusModal(task)}>
                    <span className={`px-3 py-1 rounded-md font-medium ${task.read === "true" ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {task.read === "true" ? "Done" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-2">{formatDate(task.deadline)}</td>
                  <td className="px-6 py-2 text-center flex justify-center gap-4">
                    <button className="text-white bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md flex items-center gap-2" onClick={() => handleDetailsClick(task)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No tasks available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Status Modal */}
      {isStatusModalOpen && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center p-5 rounded-t border-b bg-gray-100">
              <h3 className="text-xl font-semibold text-gray-900">Change Task Status</h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-sm text-gray-500">Select a new status for the task:</p>
              <div className="flex flex-col space-y-3">
                <label className="flex items-center">
                  <input type="radio" name="status" value="Pending" checked={tempStatus === 'Pending'} onChange={() => setTempStatus("Pending")} className="mr-3 accent-blue-600" />
                  <span className="text-gray-800">Pending</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="status" value="Done" checked={tempStatus === 'Done'} onChange={() => setTempStatus("Done")} className="mr-3 accent-green-500" />
                  <span className="text-gray-800">Done</span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 space-x-3 border-t border-gray-200 bg-gray-50 rounded-b">
              <button onClick={closeStatusModal} className="px-6 py-3 bg-red-700 text-white rounded-md hover:bg-red-800 transition duration-300">Cancel</button>
              <button onClick={() => { closeStatusModal(); }} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300">Save Status</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Task;
