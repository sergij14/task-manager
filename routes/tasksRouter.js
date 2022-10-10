const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  deleteTask,
  createTask,
  updateTask,
  getTask,
} = require("../controllers/taskController");

router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
