import {
  useEffect,
  useState,
} from "react";

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../services/taskService";

function Tasks() {
  const [tasks, setTasks] =
    useState([]);

  const [title, setTitle] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [editingId, setEditingId] =
    useState(null);

  const [editTitle, setEditTitle] =
    useState("");

  const loadTasks =
    async () => {
      try {
        setLoading(true);

        const response =
          await getTasks();

        setTasks(
          response.data.tasks || []
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleCreateTask =
    async () => {
      if (!title) return;

      try {
        setLoading(true);

        await createTask({
          title,
          description:
            "Created from React UI",
        });

        setTitle("");

        await loadTasks();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDeleteTask =
    async (id) => {
      try {
        setLoading(true);

        await deleteTask(id);

        await loadTasks();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setEditTitle(task.title);
  };

  const handleUpdate =
    async (id) => {
      try {
        setLoading(true);

        await updateTask(id, {
          title: editTitle,
          description:
            "Updated from React UI",
        });

        setEditingId(null);
        setEditTitle("");

        await loadTasks();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div>
      <h2>Task Management</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
      />

      <button
        onClick={
          handleCreateTask
        }
        disabled={loading}
      >
        {loading
          ? "Please wait..."
          : "Add Task"}
      </button>

      <hr />

      {loading && (
        <h3>Loading...</h3>
      )}

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border:
              "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          {editingId ===
          task._id ? (
            <>
              <input
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(
                    e.target.value
                  )
                }
              />

              <button
                disabled={
                  loading
                }
                onClick={() =>
                  handleUpdate(
                    task._id
                  )
                }
              >
                Save
              </button>

              <button
                onClick={() =>
                  setEditingId(
                    null
                  )
                }
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h4>
                {task.title}
              </h4>

              <p>
                {
                  task.description
                }
              </p>

              <button
                disabled={
                  loading
                }
                onClick={() =>
                  handleEdit(
                    task
                  )
                }
              >
                Edit
              </button>

              <button
                disabled={
                  loading
                }
                onClick={() =>
                  handleDeleteTask(
                    task._id
                  )
                }
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default Tasks;