import { useState, useRef } from "react";
import "./Task.css";

export default function Task({ task, id, removeTodo, toggleTaskCompletion }) {
  const [readOnly, setReadOnly] = useState(true);
  const [inputValue, setInputValue] = useState(task.text);

  const taskClasses = task.completed === true ? "task completed" : " task";
  const editSaveButton = readOnly ? "Edit" : "Save";

  const inputRef = useRef(null);

  const handleEditClick = () => {
    setReadOnly((prevVal) => !prevVal);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <li className={taskClasses}>
      <div className="inputs">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTaskCompletion(id)}
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
        <button onClick={() => removeTodo(id)}>Delete</button>
        <button onClick={handleEditClick}>{editSaveButton}</button>
      </div>
    </li>
  );
}
