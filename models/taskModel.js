const mongoose = require("mongoose");

// schema - a structure for the doc
const taskSchema = new mongoose.Schema({ name: String, completed: Boolean });

// creating a Model - provides an interface to the database, wrapps a schema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
