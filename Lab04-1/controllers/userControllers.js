const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { password } = req.body;
  req.body.password = await bcrypt.hash(password, 10);
  const user = await User.create(req.body);
  const savedUser = await user.save();
  const token = jwt.sign(
    { userId: savedUser._id },
    "literally-Random-SecretKey"
  );
  res
    .status(201)
    .json({ message: "User registered successfully", user: savedUser, token });
  res.status(201).json({
    message: "User registered successfully ✔️",
    user: savedUser,
    token,
  });
};

const getUsers = async (req, res) => {
  const users = await User.find({}); //, "firstName"
  res.status(200).json(users);
};

const deleteUserByID = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "User deleted successfully ✔️" });
};

const editUserById = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.json({ user: updatedUser });
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid username or password !" });
  }
  const token = jwt.sign({ userId: user._id }, "literally-Random-SecretKey");
  res.json({ username: username, token });
};

module.exports = {
  registerUser,
  getUsers,
  deleteUserByID,
  editUserById,
  loginUser,
};
