import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./style.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const loadTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/data`);
      setTasks(response.data);
      setError("");
    } catch (err) {
      setError("GET error: " + err.message);
    }
  };

  const addTask = async (event) => {
    event.preventDefault();

    try {
      if (!title.trim()) return;

      await axios.post(`${API_URL}/api/data`, {
        title: title
      });

      setTitle("");
      await loadTasks();
    } catch (err) {
      setError("POST error: " + err.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/data/${id}`);
      await loadTasks();
    } catch (err) {
      setError("DELETE error: " + err.message);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1>Full-Stack CI/CD Lab</h1>

        <p><b>Student:</b> Bektur Asilov</p>
        <p><b>Student ID:</b> YOUR_STUDENT_ID</p>
        <p><b>API URL:</b> {API_URL}</p>

        {error && <p style={{ color: "red" }}>{error}</p>}

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