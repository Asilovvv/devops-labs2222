import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./style.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const loadTasks = async () => {
    const response = await axios.get(`${API_URL}/api/data`);
    setTasks(response.data);
  };

  const addTask = async (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    await axios.post(`${API_URL}/api/data`, { title });
    setTitle("");
    loadTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/api/data/${id}`);
    loadTasks();
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Full-Stack CI/CD Lab</h1>
        <p><b>Student:</b> Bektur Asilov</p>
        <p><b>Student ID:</b>220207046</p>
        <p><b>API URL:</b> {API_URL}</p>

        <form onSubmit={addTask} className="form">
          <input
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>

        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks yet</p>
        ) : (
          <ul>
            {tasks.map((task) => (
              <li key={task.id}>
                <span>{task.title}</span>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
