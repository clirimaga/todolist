// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT ||  7000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'db4free.net',
  user: 'clirim',
  password: 'Clirim.1',
  database: 'todolistclirim',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});
app.post('/tasks', (req, res) => {
  const { text, completed } = req.body;
  const sql = `INSERT INTO tasks (text, completed) VALUES (${text}, ${completed})`;
  db.query(sql, [text, completed], (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

// Read
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
});

// Update
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  const sql = `UPDATE tasks SET completed = ? WHERE id = ${id}`;
  db.query(sql, [completed, id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.sendStatus(200);
    }
  });
});

app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  const sql = `DELETE FROM tasks WHERE id = ${id}`;
  db.query(sql, [id], (err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.sendStatus(200);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
