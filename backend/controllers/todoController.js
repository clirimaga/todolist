const { db } = require("../db");
const util = require("util");
const queryAsync = util.promisify(db.query).bind(db);

const getTodos = async (req, res) => {
  const sql = "SELECT * FROM tasks";
  await db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};

const createTodo = async (req, res) => {
  try {
    const { text, completed } = req.body;
    const result = await db.query(
      "INSERT INTO tasks (text, completed) VALUES (?, ?)",
      [text, completed]
    );

    const lastInsertedId = result.insertId;

    const newTodoResult = await db.query("SELECT * FROM tasks WHERE id = ?", [
      lastInsertedId,
    ]);

    const newTodo = newTodoResult[0];
    res.json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    console.log(id);
    console.log(text, completed);

    // Fetch the existing task details
    const existingTodoResult = await queryAsync(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );
    console.log(existingTodoResult);

    if (!existingTodoResult || existingTodoResult.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const existingTodo = existingTodoResult[0];
    console.log(existingTodo);

    // Use the existing values if new values are not provided
    const updatedText = text !== undefined ? text : existingTodo.text;
    const updatedCompleted =
      completed !== undefined ? completed : existingTodo.completed;

    // Update the task
    await queryAsync("UPDATE tasks SET text = ?, completed = ? WHERE id = ?", [
      updatedText,
      updatedCompleted,
      id,
    ]);

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(400).send("Bad request");
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await db.query(`DELETE FROM tasks WHERE id=?`, [id]);
    res.send("todo deleted");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("bad request");
  }
};

const deleteCompletedTodos = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid request body" });
    }

    // Use the WHERE IN clause to delete multiple tasks at once
    const result = await db.query("DELETE FROM tasks WHERE id IN (?)", [ids]);

    res.status(200).json({ message: "Completed tasks deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  deleteCompletedTodos,
};
