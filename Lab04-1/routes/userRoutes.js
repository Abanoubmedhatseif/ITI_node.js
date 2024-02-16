const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");
const secretKey = require("../config");
// const authenticateUser = require('../index')

const {
  registerUser,
  getUsers,
  deleteUserByID,
  editUserById,
  loginUser,
} = require("../controllers/userControllers");
const { tryCatchMiddleware, authenticateUser } = require("../lib/middleware");

app.post("/users", tryCatchMiddleware(registerUser));
app.get("/users", tryCatchMiddleware(getUsers));
app.delete("/users/:id", tryCatchMiddleware(deleteUserByID));
app.patch("/users/:id", tryCatchMiddleware(editUserById));
app.post("/users/login", authenticateUser, tryCatchMiddleware(loginUser));

module.exports = app;
