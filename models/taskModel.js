const mongoose = require("mongoose");

// schema - a structure for the doc
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// creating a Model - provides an interface to the database, wrapps a schema
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
