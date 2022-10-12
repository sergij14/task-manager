const Task = require("../models/taskModel");
const { createApiError } = require("../utils/apiError");
const asyncWrapper = require("../utils/asyncWrapper");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({
    status: "success",
    results: tasks.length,
    data: {
      tasks,
    },
  });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      task,
    },
  });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createApiError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createApiError(`No task with id : ${taskID}`, 404));
  }
  res.status(204).json({ status: "success", data: null });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createApiError(`No task with id : ${taskID}`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

module.exports = {
  getAllTasks,
  deleteTask,
  updateTask,
  getTask,
  createTask,
};
