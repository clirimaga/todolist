require("dotenv").config();
const express = require('express');
const cors = require("cors");


require("./db");
const app = express();

app.use(express.json());


app.get('/',(req,res) => {
    res.send("Hello")
})

app.use(cors());

const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
})