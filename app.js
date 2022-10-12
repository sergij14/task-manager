const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');

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

//limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);


//data sanitization against NoSQL query injection
app.use(mongoSanitize());

//data sanitization against XSS
app.use(xss());

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
