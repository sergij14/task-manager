const express = require("express");
const dotenv = require("dotenv");

const tasksRouter = require("./routes/tasksRouter");
const connectDB = require("./db/connect");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 8000;

//middleware
app.use(express.json());
app.use(express.static("./public"));

//routes
app.use("/api/v1/tasks", tasksRouter);

//error-handling middlewares
app.use(notFound);
app.use(errorHandler);

//connecting to DB/starting server
const DB_STRING = process.env.DB.replace("<password>", process.env.DB_PASSWORD);

const start = async () => {
  try {
    await connectDB(DB_STRING);
    app.listen(port, console.log("server is running on port " + port));
  } catch (e) {
    console.log(e);
  }
};

start();
