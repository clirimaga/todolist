import React, { useState } from "react";
import CreateTask from "../createTask/CreateTask";
import TasksList from "../tasksList/TasksList";
import StatusBar from "../statusBar/StatusBar";
import './ToDo.css'
export default function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    console.log(tasks);
    if (newTask.trim() !== "") {
      setTasks([...tasks, {text: newTask, completed:false}]);
      setNewTask("");
    }
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTodo = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const clearCompletedTasks = () =>{
    const incompleteTasks = tasks.filter((task) => task.completed === false)
    setTasks(incompleteTasks)
  }

  return (
    <section className="todo">
      <CreateTask addTask={addTask} newTask={newTask} setNewTask={setNewTask} />
      <StatusBar tasks={tasks} />
      <TasksList tasks={tasks} newTask={newTask} removeTodo={removeTodo} toggleTaskCompletion={toggleTaskCompletion}/>
      <button onClick={clearCompletedTasks} className='clearButton' >Clear completed tasks</button>
    </section>
  );
}
