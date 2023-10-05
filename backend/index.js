// server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { todoRouter } = require("./routes/todoRouter");

const app = express();
const port = process.env.PORT || 7000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/tasks", todoRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
