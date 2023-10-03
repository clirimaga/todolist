import { useState, useRef } from "react";
import "./Task.css";

export default function Task({
  task,
  removeTodo,
  index,
  toggleTaskCompletion,
}) {
  const [readOnly, setReadOnly] = useState(true);
  const [inputValue, setInputValue] = useState(task.text);

  const taskClasses = task.completed  ? "task completed" : " task";
  const editSaveButton = readOnly ? "Edit" : "Save";

  const inputRef = useRef(null);

  const handleEditClick = () => {
    setReadOnly((prevVal) => !prevVal);
    if (inputRef.current && editSaveButton === "Edit") {
      inputRef.current.focus();
    }
  };

  return (
    <li className={taskClasses}>
      <div className="inputs">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(task.id)}
        ></input>
        <input
          type="text"
          value={inputValue}
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          readOnly={readOnly}
        />
      </div>
      <div className="buttons">
        <button onClick={() => removeTodo(task.id)} title="Delete Task">
          Delete
        </button>
        <button onClick={handleEditClick} title={`${editSaveButton} Task`}>
          {editSaveButton}
        </button>
      </div>
    </li>
  );
}
