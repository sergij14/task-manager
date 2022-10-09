const mongoose = require("mongoose");

const connectDB = (dbStr) => {
  return mongoose.connect(dbStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
};

module.exports = connectDB;
