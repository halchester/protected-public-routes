const Todo = require("../models/todo");
const User = require("../models/user");

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch todos" });
  }
};

const createTodo = async (req, res) => {
  const { text } = req.body;

  try {
    const newTodo = new Todo({
      text,
      userId: req.user.id,
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: "Failed to create todo" });
  }
};

const completeTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { completed: true },
      { new: true }
    );

    if (!todo) return res.status(404).json({ error: "Todo not found" });

    await User.findByIdAndUpdate(req.user.id, { $inc: { completedTodos: 1 } });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ error: "Failed to mark todo as completed" });
  }
};

module.exports = { getTodos, createTodo, completeTodo };
