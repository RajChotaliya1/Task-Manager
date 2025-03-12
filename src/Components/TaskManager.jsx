import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./TaskManager.css";

const TaskManager = () => {
  const [task, setTask] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [showCompleted, setShowCompleted] = useState(false);

  const addTask = () => {
    if (newTask) {
      setTask([...task, { task: newTask, completed: false }]);
      setNewTask("");
      toast.success("Task Added Successfully!...", { autoClose: 2000 });
    }
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  const toggleCompleted = (index) => {
    const updatedTasks = task.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item
    );
    setTask(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = task.filter((_, i) => i !== index);
    setTask(updatedTasks);
    toast.success("Task Deleted Successfully!...", { autoClose: 2000 });
  };

  const toggleShowCompleted = () => {
    setShowCompleted(!showCompleted);
  };

  const completedTasks = task.filter((task) => task.completed).length;
  const progress = task.length > 0 ? (completedTasks / task.length) * 100 : 0;

  return (
    <>
      <ToastContainer />
      <div className="Task-container">
        <h1>Task Manager</h1>

        <div className="task-updates">
          <div className="box blue">Total: {task.length}</div>
          <div className="box green">Completed: {completedTasks}</div>
          <div className="box yellow">
            Pending: {task.length - completedTasks}
          </div>
          <div className="box purple">Progress: {progress.toFixed(0)}%</div>
        </div>

        <div className="task-input">
          <input
            type="text"
            onChange={handleChange}
            value={newTask}
            placeholder="Enter new task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <div className="your-task-filter">
          <input
            type="checkbox"
            onChange={toggleShowCompleted}
            checked={showCompleted}
          />
          <p>Show Completed Tasks Only</p>
        </div>

        <div className="your-task">
          {task.length === 0 && <div>No Task to Display</div>}
          {task
            .filter((item) => (showCompleted ? item.completed : true))
            .map((item, index) => (
              <div className="all-tasks" key={index}>
                <div className="task-content">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleCompleted(index)}
                  />
                  <div
                    className={`task-text ${item.completed ? "completed" : ""}`}
                  >
                    {item.task}
                  </div>
                </div>
                <div className="task-delete">
                  <button
                    className="task-btn"
                    onClick={() => deleteTask(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TaskManager;
