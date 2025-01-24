import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'flowbite';

const tasksData = [
  { id: 1, roomCode: 'R001', taskName: 'Electrical Work', priority: 'Urgent', status: 'Pending', deadline: '2025-02-01' },
  { id: 2, roomCode: 'R002', taskName: 'Plumbing', priority: 'Flexible', status: 'In Progress', deadline: '2025-01-25' },
  { id: 3, roomCode: 'R003', taskName: 'Cleaning', priority: 'Low', status: 'Completed', deadline: '2025-01-10' },
  { id: 4, roomCode: 'R004', taskName: 'Air Conditioning', priority: 'Urgent', status: 'Pending', deadline: '2025-01-20' },
];

function Task() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(tasksData);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tempStatus, setTempStatus] = useState('');

  const handleDetailsClick = (task) => {
    navigate('/housekeeping/tasks/taskdetails', { state: { task } });
  };

  const openStatusModal = (task) => {
    setSelectedTask(task);
    setTempStatus(task.status); // Set initial status
    setIsStatusModalOpen(true);
  };

  const closeStatusModal = () => {
    setIsStatusModalOpen(false);
    setSelectedTask(null);
  };

  const handleStatusChange = (e) => {
    setTempStatus(e.target.value);
  };

  const saveStatus = () => {
    setTasks(
      tasks.map((task) =>
        task.id === selectedTask.id ? { ...task, status: tempStatus } : task
      )
    );
    closeStatusModal();
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
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b hover:bg-gray-100 transition duration-200"
              >
                <td className="px-6 py-2">{task.roomCode}</td>
                <td className="px-6 py-2">{task.taskName}</td>
                <td className="px-6 py-2">{task.priority}</td>
                <td
                  className="px-6 py-2 cursor-pointer"
                  onClick={() => openStatusModal(task)}
                >
                  <span
                    className={`px-3 py-1 rounded-md font-medium ${
                      task.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : task.status === 'In Progress'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="px-6 py-2">{task.deadline}</td>
                <td className="px-6 py-2 text-center flex justify-center gap-4">
                  <button
                    className="text-white bg-green-500 hover:bg-green-600 px-6 py-2 rounded-md flex items-center gap-2"
                    onClick={() => handleDetailsClick(task)}
                  >
                    Details
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
         <div className="relative bg-white rounded-lg shadow-md">
           {/* Modal Header */}
           <div className="flex justify-between items-center p-5 rounded-t border-b bg-gray-100">
             <h3 className="text-xl font-semibold text-gray-900">
               Change Task Status
             </h3>
           </div>
     
           {/* Modal Body */}
           <div className="p-6 space-y-4">
             <p className="text-sm text-gray-500">
               Select a new status for the task:
             </p>
             <div className="flex flex-col space-y-3">
               <label className="flex items-center">
                 <input
                   type="radio"
                   name="status"
                   value="Pending"
                   checked={tempStatus === 'Pending'}
                   onChange={handleStatusChange}
                   className="mr-3 accent-blue-600"
                 />
                 <span className="text-gray-800">Pending</span>
               </label>
               <label className="flex items-center">
                 <input
                   type="radio"
                   name="status"
                   value="In Progress"
                   checked={tempStatus === 'In Progress'}
                   onChange={handleStatusChange}
                   className="mr-3 accent-yellow-500"
                 />
                 <span className="text-gray-800">In Progress</span>
               </label>
               <label className="flex items-center">
                 <input
                   type="radio"
                   name="status"
                   value="Completed"
                   checked={tempStatus === 'Completed'}
                   onChange={handleStatusChange}
                   className="mr-3 accent-green-500"
                 />
                 <span className="text-gray-800">Completed</span>
               </label>
             </div>
           </div>
     
           {/* Modal Footer */}
           <div className="flex items-center justify-end p-6 space-x-3 border-t border-gray-200 bg-gray-50 rounded-b">
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
    </div>
  );
}

export default Task;
