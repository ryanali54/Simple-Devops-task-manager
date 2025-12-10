import { useEffect, useState } from "react";
import { fetchTasks, createTask, deleteTask } from "./api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      console.error("Failed to fetch tasks", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    await createTask(form);
    setForm({ title: "", description: "" });
    await loadTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  return (
    <div style={{ maxWidth: "600px", margin: "20px auto", fontFamily: "sans-serif" }}>
      <h1>DevOps Task Manager</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "8px" }}>
          <input
            type="text"
            placeholder="Task title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: "8px" }}>
          <textarea
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            style={{ width: "100%", padding: "8px", minHeight: "60px" }}
          />
        </div>
        <button type="submit" style={{ padding: "8px 16px", cursor: "pointer" }}>
          Add Task
        </button>
      </form>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks yet. Add one!</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task) => (
            <li
              key={task.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                padding: "10px",
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <strong>{task.title}</strong>
                {task.description && (
                  <p style={{ margin: "4px 0 0 0" }}>{task.description}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                style={{
                  padding: "4px 8px",
                  border: "none",
                  background: "#e74c3c",
                  color: "white",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
