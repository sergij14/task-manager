const express = require("express");
const tasksRouter = require("./routes/tasksRouter");

const app = express();
const port = 8000;

//middleware
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("task maanger app");
});

app.use("/api/v1/tasks", tasksRouter);

app.listen(port, console.log("server is running on port - " + port));
