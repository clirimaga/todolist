import './Task.css'

export default function Task({ task, id, removeTodo,toggleTaskCompletion }) {

  const taskClasses = task.completed === true ? "task completed" : " task";
  return (
    <li className={taskClasses}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={()=>toggleTaskCompletion(id)}
        ></input>
      {task.text}
      {/* <button onClick={() => removeTodo(id)}>-</button> */}
    </li>
  );
}
