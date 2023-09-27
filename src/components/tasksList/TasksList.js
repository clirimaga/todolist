
import Task from "../task/Task";
import './TasksList.css'

export default function TasksList({ tasks,removeTodo,toggleTaskCompletion}) {
  return (
    <ul className="tasksList">
      {tasks.map((task,id) => {
        return <Task task={task} key={id} id={id}  removeTodo={removeTodo} toggleTaskCompletion={toggleTaskCompletion}/>;
      })}
    </ul>
  );
}
