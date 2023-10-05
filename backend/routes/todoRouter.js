const express = require("express");

const todoRouter = express.Router();

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteCompletedTodos,
} = require("../controllers/todoController");

todoRouter.get("/", getTodos);

// todoRouter.get("/", getTodo);

todoRouter.post("/", createTodo);

todoRouter.put("/:id", updateTodo);

todoRouter.delete("/:id", deleteTodo);
todoRouter.delete("/", deleteCompletedTodos);

module.exports = {
  todoRouter,
};
