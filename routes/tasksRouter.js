const express = require("express");
const router = express.Router();
const { getAllTasks } = require("../constroller/tasksController");

router.route("/").get(getAllTasks);

module.exports = router;
