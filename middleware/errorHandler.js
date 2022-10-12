const { APIError } = require("../utils/apiError.js");

const errorHandler = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res
      .status(err.statusCode)
      .json({ status: "fail", message: err.message });
  }
  return res
    .status(500)
    .json({
      status: "fail",
      message: "Something went wrong, please try again",
    });
};

module.exports = errorHandler;
