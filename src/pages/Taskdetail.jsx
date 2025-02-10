import React from 'react';
import { useLocation } from 'react-router-dom';

function TaskDetails() {
  const location = useLocation();
  const task = location.state?.task || {}; // Navigate se data milega, warna empty object

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Details</h1>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="py-3 px-4 font-semibold text-gray-700 border border-gray-300">Field</th>
              <th className="py-3 px-4 font-semibold text-gray-700 border border-gray-300">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Assigned By</td>
              <td className="py-3 px-4 border border-gray-300">{task.housekeeper.username || "N/A"}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Room Code</td>
              <td className="py-3 px-4 border border-gray-300">{task.room.roomCode || "N/A"}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Task</td>
              <td className="py-3 px-4 border border-gray-300">{task.task || "N/A"}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Priority</td>
              <td className="py-3 px-4 border border-gray-300">
                <span
                  className={`px-2 py-1 text-white rounded-full ${
                    task.priority === 'high'
                      ? 'bg-red-500'
                      : task.priority === 'medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                >
                  {task.priority || "N/A"}
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Status</td>
              <td className="py-3 px-4 border border-gray-300">{task.status || "N/A"}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Deadline</td>
              <td className="py-3 px-4 border border-gray-300">{task.deadline || "N/A"}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-right">
        <button className="bg-secondary text-white py-3 px-6 rounded-lg shadow-md hover:hoverbutton transition-all">
          Mark as Read
        </button>
      </div>
    </div>
  );
}

export default TaskDetails;
