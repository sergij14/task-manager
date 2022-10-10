const Task = require("../models/taskModel");

const getAllTasks = (req, res) => {
  res.send("all items");
};

const createTask = async (req, res) => {
  try {
    const newTask = await Task.create({ ...req.body });
    res.status(201).json({
      status: "success",
      data: {
        tour: newTask,
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const getTask = (req, res) => {
  res.send("get single task");
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = {
  getAllTasks,
  deleteTask,
  updateTask,
  getTask,
  createTask,
};
