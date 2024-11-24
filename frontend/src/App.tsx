import { useState, useEffect } from "react";
import { Task } from "../interfaces/task";
import { TaskApiResponse } from "../interfaces/apiResponse";
import TaskItem from "./components/TaskItem";

import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => response.json())
      .then((data: TaskApiResponse) => {
        if (data.success) {
          setTasks(data.tasks);
        } else {
          console.error(data.message);
        }
      })
      .catch((error) => console.error("There was a problem fetching:", error));
  }, []);

  const addTask = () => {
    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTask, status: "pending" }),
    })
      .then((response) => response.json())
      .then((task) => {
        setTasks([...tasks, task]);
        setNewTask("");
      });
  };

  const deleteTask = (id: number) => {
    fetch(`/api/tasks/${id}`, { method: "DELETE" })
      .then(() => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) =>
        console.error("There was a problem with the delete operation:", error)
      );
  };

  const toggleTaskStatus = (id: number, currentStatus: string) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((updatedTask) =>
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, status: updatedTask.status } : task
          )
        )
      );
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-center space-x-4 mt-12">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-12 h-12" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-12 h-12" alt="React logo" />
        </a>
      </div>
      <h1 className="text-2xl font-bold my-6 text-gray-600">
        Uppgiftshanteraren
      </h1>

      <div className="my-4">
        <input
          type="text"
          className="border rounded p-2"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Lägg till en ny uppgift"
        />
        <button
          onClick={addTask}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Lägg till
        </button>
      </div>
      <ul className="w-full max-w-md">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleStatus={toggleTaskStatus}
            onDelete={deleteTask}
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
