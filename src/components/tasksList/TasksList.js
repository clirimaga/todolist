
import Task from "../task/Task";
import './TasksList.css'

export default function TasksList({ tasks,removeTodo,toggleTaskCompletion}) {
  return (
    <ul className="tasksList">
      {tasks && tasks.map((task,index) => {
        return <Task task={task} key={index} index={index} removeTodo={removeTodo} toggleTaskCompletion={toggleTaskCompletion}/>;
      })}
    </ul>
  );
}
