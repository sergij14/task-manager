const Task = require("../models/taskModel");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(201).json({
      status: "success",
      results: tasks.length,
      data: {
        tasks,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e.message,
    });
  }
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
    res.status(404).json({
      status: "fail",
      message: e.message,
    });
  }
};

const getTask = async (req, res) => {
  const id = req.params.id;

  try {
    const task = await Task.findById(id);
    // Task.findOne({_id: id})

    res.status(201).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (e) {
    res.status(404).json({
      status: "fail",
      message: e.message,
    });
  }
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
