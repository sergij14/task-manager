const express = require("express");
const mongoose = require("mongoose");
const tasksRouter = require("./routes/tasksRouter");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());

//routes
app.get("/hello", (req, res) => {
  res.send("task maanger app");
});

app.use("/api/v1/tasks", tasksRouter);

const DB_STRING = process.env.DB.replace("<password>", process.env.DB_PASSWORD);
mongoose
  .connect(DB_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((data) => {
    console.log("connected in DB");
  });

app.listen(port, console.log("server is running on port - " + port));
