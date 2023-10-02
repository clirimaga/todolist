const mysql = require("mysql");

const db = mysql.createConnection({
  host: "db4free.net",
  user: "clirim",
  password: "Clirim.1",
  database: "todolistclirim",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

module.exports = { db };