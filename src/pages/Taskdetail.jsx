import React from 'react';
import { useLocation } from 'react-router-dom';

function TaskDetails() {
  const location = useLocation();
  const { task } = location.state;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Task Details</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p><strong>Room Code:</strong> {task.roomCode}</p>
        <p><strong>Task Name:</strong> {task.taskName}</p>
        <p><strong>Priority:</strong> {task.priority}</p>
        <p><strong>Status:</strong> {task.status}</p>
        <p><strong>Deadline:</strong> {task.deadline}</p>
      </div>
    </div>
  );
}

export default TaskDetails;
