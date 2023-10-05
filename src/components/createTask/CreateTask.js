import "./CreateTask.css";
export default function CreateTask({ newTask, setNewTask, addTask }) {
  const handleKeyDown = (e) => {
    e.key === "Enter" && addTask();
  };

  return (
    <div className="createTask">
      <input
        type="text"
        placeholder="Create Some Tasks..."
        value={newTask}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addTask} title="Add Task">
        +
      </button>
    </div>
  );
}
