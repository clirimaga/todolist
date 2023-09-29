const express = require('express');
const router = express.Router();
const todolist = require('../services/todolist');

router.get('/', async function(req, res, next) {
  try {
    res.json(await todolist.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting tasks `, err.message);
    next(err);
  }
});

module.exports = router;