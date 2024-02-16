const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRouter = require("./routes/userRoutes");
const todoRouter = require("./routes/todoRoutes");

app.use(express.json());

// connecting to dataBase
mongoose.connect("mongodb://127.0.0.1:27017/NewTodo-db");




// routes
app.use("/", userRouter);
app.use("/", todoRouter);


// page not found middleware
app.use("*", (req, res) => {
  res.status(404).json({ Error: "Error 404 not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("server is online");
});
