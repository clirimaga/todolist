// TaskContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [tasksLoading, setTasksLoading] = useState(false);

  const addTask = (newTask) => {
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
          setTasksLoading(false);
        })
        .catch((error) => {
          console.error("Error adding task:", error);
          setTasksLoading(false);
        });
    }
  };

  const toggleTaskCompletion = (id) => {
    setTasksLoading(true);
    axios
      .put(`http://localhost:7000/tasks/${id}`, {
        completed: !tasks.find((task) => task.id === id).completed,
      })
      .then(() => {
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
      .then(() => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        setTasksLoading(false);
      })
      .catch((error) => {
        console.error("Error removing task:", error);
        setTasksLoading(false);
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

  const contextValue = {
    tasks,
    setTasks,
    tasksLoading,
    setTasksLoading,
    addTask,
    toggleTaskCompletion,
    removeTodo,
    clearCompletedTasks,
  };

  return <TaskContext.Provider value={contextValue}>{children}</TaskContext.Provider>;
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
