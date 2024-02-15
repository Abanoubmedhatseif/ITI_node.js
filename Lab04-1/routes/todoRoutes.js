const express = require("express");
const app = express();
app.use(express.json());
const { tryCatchMiddleware } = require("../lib/middleware");
const {
  createTodo,
  editTodo,
  deleteTodo,
  getTodoByID,
  getTodos,
} = require("../controllers/todoControllers");

app.post("/todos", tryCatchMiddleware(createTodo));
app.delete("/todos/:id", tryCatchMiddleware(deleteTodo));
app.patch("/todos/:id", tryCatchMiddleware(editTodo));
app.get("/users/:userId/todos", tryCatchMiddleware(getTodoByID));
app.get("/todos", tryCatchMiddleware(getTodos));

module.exports = app;
