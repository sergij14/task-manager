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

const updateTask = async (req, res) => {
  const id = req.params.id;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true }
    );
    res.status(200).json({
      status: "success",
      data: {
        task: updatedTask,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;

  try {
    await Task.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
      message: e.message,
    });
  }
};

module.exports = {
  getAllTasks,
  deleteTask,
  updateTask,
  getTask,
  createTask,
};
