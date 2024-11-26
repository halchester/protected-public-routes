const express = require("express");

const authenticate = require("../middleware/authenticate");
const {
  getTodos,
  createTodo,
  completeTodo,
} = require("../controllers/todo.controller");

const router = express.Router();

router.get("/", authenticate, getTodos);

router.post("/", authenticate, createTodo);

router.patch("/:id/complete", authenticate, completeTodo);

module.exports = router;
