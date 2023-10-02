const { db } = require("../db");

const getTodos = async (req, res) => {
    const sql = 'SELECT * FROM tasks';
    await db.query(sql, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  };

// const getTodo = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const todos = await db.query(`SELECT  FROM tasks tasks WHERE id=$1`, [id]);
//     res.json(todos.rows);
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).send("bad request");
//   }
// };

const createTodo = async (req, res) => {
    try {
      const { text, completed } = req.body;
      const result = await db.query(
        `INSERT INTO tasks (text, completed) VALUES (?, ?)`,
        [text, completed]
      );
  
      const lastInsertedId = result.insertId;
  
      const newTodo = await db.query(
        'SELECT * FROM tasks WHERE id = ?',
        [lastInsertedId]
      );
  
      res.json(newTodo.rows[0]);
    } catch (error) {
      console.log(error.message);
      res.status(400).send('bad request');
    }
  };

// const createTodo = async (req, res) => {
//     const { text, completed } = req.body;
//     const sql = `INSERT INTO tasks (text, completed) VALUES (${text}, ${completed})`;
//     await db.query(sql, [text, completed], (err, result) => {
//       if (err) {
//         res.status(500).json({ error: err.message });
//       } else {
//         res.status(201).json({ id: result.insertId });
//       }
//     });
//   };


const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, completed } = req.body;
    const updatedTodo = await db.query(
      `UPDATE tasks SET value=$1,status=$2 WHERE id=$5 RETURNING *;`,
      [text, completed, id]
    );
    res.json(updatedTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
    res.status(400).send("bad request");
  }
};

const deleteTodo = async(req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM tasks WHERE id = ${id}`;
    await db.query(sql, [id], (err) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.sendStatus(200);
      }
    });
  };

module.exports = {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};
