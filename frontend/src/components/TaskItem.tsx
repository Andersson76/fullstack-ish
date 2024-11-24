import React from "react";
import { Task } from "../../interfaces/task";

interface TaskItemProps {
  task: Task;
  onToggleStatus: (id: number, currentStatus: string) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleStatus,
  onDelete,
}) => {
  return (
    <li className="bg-white p-4 my-2 rounded shadow">
      <div>
        <h2 className="text-lg font-semibold text-gray-600">{task.title}</h2>
        <p className="text-gray-600">Status: {task.status}</p>
      </div>
      <div className="space-x-2">
        <button
          onClick={() => onToggleStatus(task.id, task.status)}
          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          {task.status === "pending" ? "Mark as Done" : "Mark as Pending"}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Radera
        </button>
        <div className="bg-blue">
          <h1 className="text-green">Hej</h1>
        </div>
      </div>
    </li>
  );
};

export default TaskItem;
