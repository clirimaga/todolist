require("dotenv").config();
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./db');


require("./db");
const app = express();

app.use(express.json());
app.use(bodyParser.json())
app.use(cors());

app.get('/',(req,res) => {
    res.send("Hello")
})


// example
// app.get('/api/data', (req, res) => {
//     const sql = 'SELECT * FROM your_table_name';
  
//     db.query(sql, (err, result) => {
//       if (err) {
//         console.error('MySQL query error:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//       } else {
//         res.json(result);
//       }
//     });
//   });

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})