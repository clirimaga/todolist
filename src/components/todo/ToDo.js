import React, { useState, useEffect } from "react";
import axios from "axios";
import CreateTask from "../createTask/CreateTask";
import TasksList from "../tasksList/TasksList";
import StatusBar from "../statusBar/StatusBar";
import "./ToDo.css";
import SkeletonTask from "../skeletons/SkeletonTask";

export default function ToDo() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [tasksLoading, setTasksLoading] = useState(false);

  const addTask = () => {
    setTasksLoading(true);
    if (newTask.trim() === "") {
      alert("Please add a task.");
    } else {
      axios
        .post("http://localhost:7000/tasks", {
          text: newTask,
          completed: false,
        })
        .then((response) => {
          setTasks([
            ...tasks,
            { id: response.data.id, text: newTask, completed: false },
          ]);
          setNewTask("");
          setTasksLoading(false);
          console.log(tasks);
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasksLoading(true);
    axios
      .put(`http://localhost:7000/tasks/${id}`, {
        completed: !tasks.find((task) => task.id === id).completed,
      })
      .then((response) => {
        // console.log('Backend Response:', response.data);
        const updatedTasks = tasks.map((task) => {
          if (task.id === id) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        setTasks(updatedTasks);
        setTasksLoading(false);
      })
      .catch((error) => {
        console.error("Error toggling task completion:", error);
        setTasksLoading(false);
      });
  };

  const removeTodo = (id) => {
    setTasksLoading(true);
    axios
      .delete(`http://localhost:7000/tasks/${id}`)
      .then((res) => {
        // console.log(res);
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        setTasksLoading(false);
      })
      .catch((error) => {
        console.error("Error removing task:", error);
        setTasksLoading(true);
      });
  };

  const clearCompletedTasks = () => {
    setTasksLoading(true);
    const completedTaskIds = tasks
      .filter((task) => task.completed)
      .map((task) => task.id);
    axios
      .delete("http://localhost:7000/tasks", {
        data: { ids: completedTaskIds },
      })
      .then(() => {
        const incompleteTasks = tasks.filter((task) => !task.completed);
        setTasks(incompleteTasks);
        setTasksLoading(false);
      })
      .catch((error) => {
        console.error("Error clearing completed tasks:", error);
        setTasksLoading(false);
      });
  };

  useEffect(() => {
    setTasksLoading(true);
    axios
      .get("http://localhost:7000/tasks")
      .then((response) => {
        setTasks(response.data);
        // console.log(tasks);
        setTasksLoading(false);
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  },[]);

  return (
    <section className="todo">
      <CreateTask addTask={addTask} newTask={newTask} setNewTask={setNewTask} />
      <StatusBar tasks={tasks} />
      {tasksLoading && (
        <div className="skeletons">
          <SkeletonTask />
          <SkeletonTask />
          <SkeletonTask />
        </div>
      )}
      {!tasksLoading && (
        <TasksList
          tasks={tasks}
          newTask={newTask}
          removeTodo={removeTodo}
          toggleTaskCompletion={toggleTaskCompletion}
        />
      )}

      {tasks.some((task) => task.completed) && (
        <button onClick={clearCompletedTasks} className="clearButton">
          Clear Completed Tasks
        </button>
      )}
    </section>
  );
}

// using localstorage
// useEffect(() => {
//   const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   setTasks(storedTasks);
// }, []);

// useEffect(() => {
//   localStorage.setItem("tasks", JSON.stringify(tasks));
// }, [tasks]);

// const addTask = () => {
//   if (newTask.trim() === "") {
//     alert("Please add a task.");
//   } else {
//     setTasks([...tasks, { text: newTask, completed: false }]);
//     setNewTask("");
//   }
// };

// const toggleTaskCompletion = (index) => {
//   const updatedTasks = [...tasks];
//   updatedTasks[index].completed = !updatedTasks[index].completed;
//   setTasks(updatedTasks);
// };

// const removeTodo = (index) => {
//   const updatedTasks = [...tasks];
//   updatedTasks.splice(index, 1);
//   setTasks(updatedTasks);
// };

// const clearCompletedTasks = () => {
//   const incompleteTasks = tasks.filter((task) => task.completed === false);
//   setTasks(incompleteTasks);
// };
