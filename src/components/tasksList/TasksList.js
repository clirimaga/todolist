
import Task from "../task/Task";
import './TasksList.css'

export default function TasksList({ tasks,removeTodo,toggleTaskCompletion}) {
  return (
    <ul className="tasksList">
      {tasks.map((task,index) => {
        return <Task task={task} key={task.text} index={index}  removeTodo={removeTodo} toggleTaskCompletion={toggleTaskCompletion}/>;
      })}
    </ul>
  );
}
