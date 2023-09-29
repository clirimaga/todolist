const { db } = require('../services/db');
const getTodos = async (req,res)=>{
    try {
    const todos = await db.query(`SELECT * FROM todos;`)
    res.json(todos.rows)
    } catch (error) {
        console.log(error.message)
        res.status(500).send('server error');
    }
};

const createTodo = async (req,res)=>{
    try {
        const {valuee,deadlinee,priorityy} = req.body;
        const newTodo = await db.query(`INSERT INTO todos (value, deadline,priority) VALUES ($1, $2, $3 ) RETURNING *`, [valuee,deadlinee,priorityy]);
        res.json(newTodo.rows[0])
} catch (error) {
    console.log(error.message);
    res.status(400).send('bad request');
}

};

const updateTodo = async (req,res)=>{
    try {
        const {id} = req.params;
        const {valuee,statuss,deadlinee,priorityy,created_att} = req.body;
       const updatedTodo = await db.query(`UPDATE todos SET value=$1,status=$2,deadline=$3,priority=$4 WHERE id=$5 RETURNING *`, [valuee,statuss,deadlinee,priorityy,id]);
        res.json(updatedTodo.rows[0]);
    } catch (error) {
        console.log(error.message);
    res.status(400).send('bad request');
    }
};

const deleteTodo = async (req,res)=>{
    try {
        const {id} = req.params;
       const deletedTodo = await db.query(`DELETE FROM todos WHERE id=$1`, [id]);
        res.send('todo deleted');
    } catch (error) {
        console.log(error.message);
    res.status(400).send('bad request');
    }
}

module.exports = {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
}
