import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

type Task = {
  id: number;
  title: string;
  status: string;
};

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("/api/tasks") // Anropa backend API:et
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch((error) =>
        console.error("There was a problem with the fetch operation:", error)
      );
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
      .then((task) => setTasks([...tasks, task]));
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
        setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)))
      );
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="flex justify-center space-x-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="w-12 h-12" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="w-12 h-12" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold mt-6">Uppgiftshanterare</h1>

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
          <li key={task.id} className="bg-white p-4 my-2 rounded shadow">
            <div>
              <h2 className="text-lg font-semibold text-gray-600">
                {task.title}
              </h2>
              <p className="text-gray-600">Status: {task.status}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => toggleTaskStatus(task.id, task.status)}
                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                {task.status === "pending" ? "Mark as Done" : "Mark as Pending"}
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Radera
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
