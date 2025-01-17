import React from 'react';

function TaskDetails() {
  const task = {
    assignedBy: "John Doe",
    roomCode: "R103",
    taskName: "Clean the room",
    priority: "Low",
    status: "Pending",
    deadline: "2025-01-20",
    guest: "Jane Smith",
    instructions: "Please focus on the bathroom area and change the linens.",
  };

 

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
              <td className="py-3 px-4 border border-gray-300">{task.assignedBy}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Room Code</td>
              <td className="py-3 px-4 border border-gray-300">{task.roomCode}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Task Name</td>
              <td className="py-3 px-4 border border-gray-300">{task.taskName}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Priority</td>
              <td className="py-3 px-4 border border-gray-300">
                <span
                  className={`px-2 py-1 text-white rounded-full ${
                    task.priority === 'High'
                      ? 'bg-red-500'
                      : task.priority === 'Medium'
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                >
                  {task.priority}
                </span>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Status</td>
              <td className="py-3 px-4 border border-gray-300">{task.status}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Deadline</td>
              <td className="py-3 px-4 border border-gray-300">{task.deadline}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Guest</td>
              <td className="py-3 px-4 border border-gray-300">{task.guest}</td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-3 px-4 border border-gray-300">Additional Instructions</td>
              <td className="py-3 px-4 border border-gray-300">{task.instructions}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-right">
        <button
        
          className="bg-secondary text-white py-3 px-6 rounded-lg shadow-md hover:hoverbutton transition-all"
        >
          Mark as Done
        </button>
      </div>
    </div>
  );
}

export default TaskDetails;
