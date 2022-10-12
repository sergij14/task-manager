const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const tasksRouter = require("./routes/tasksRouter");
const connectDB = require("./db/connect");
const errorHandler = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

dotenv.config({ path: "./.env" });
const app = express();
const port = process.env.PORT || 8000;

__dirname = path.resolve();

//middleware
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());

//implement CORS
app.use(cors());
app.options("*", cors());

//routes
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
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
