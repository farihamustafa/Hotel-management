import React from 'react';
import { useNavigate } from 'react-router-dom';

const tasks = [
  { id: 1, roomCode: 'R001', taskName: 'Electrical Work', priority: 'Urgent', status: 'Pending', deadline: '2025-02-01' },
  { id: 2, roomCode: 'R002', taskName: 'Plumbing', priority: 'Flexible', status: 'In Progress', deadline: '2025-01-25' },
  { id: 3, roomCode: 'R003', taskName: 'Cleaning', priority: 'Low', status: 'Completed', deadline: '2025-01-10' },
  { id: 4, roomCode: 'R004', taskName: 'Air Conditioning', priority: 'Urgent', status: 'Pending', deadline: '2025-01-20' },
];

function Task() {
  const navigate = useNavigate();

  const handleDetailsClick = (task) => {
   
    navigate('/housekeeping/tasks/taskdetails', { state: { task } });
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
                <td className="px-6 py-2">
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
    </div>
  );
}

export default Task;
