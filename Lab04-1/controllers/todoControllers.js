const Todo = require("../models/todoModel");

const createTodo = async (req, res) => {
  const { title, tags } = req.body;
  const userId = req.user._id;
  const todo = new Todo({
    userId,
    title,
    tags,
  });

  const savedTodo = await todo.save();
  res
    .status(201)
    .json({ message: "Todo created successfully", todo: savedTodo });
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Todo deleted successfully ✔️" });
};

const editTodo = async (req, res) => {
  const { id } = req.params;
  const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ todo: updatedTodo });
};

const getTodoByID = async (req, res) => {
  const userId = req.params.userId;
  const userTodos = await Todo.find({ userId });
  res.json(userTodos);
};

const getTodos = async (req, res) => {
  const { limit = 10, skip = 0, status } = req.query;
  const filter = {};
  if (status) {
    filter.status = status;
  }
  const todos = await Todo.find(filter)
    .limit(parseInt(limit))
    .skip(parseInt(skip));
  res.json(todos);
};

module.exports = {
  createTodo,
  editTodo,
  deleteTodo,
  getTodoByID,
  getTodos,
};
