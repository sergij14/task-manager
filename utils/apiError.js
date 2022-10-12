class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const createApiError = (msg, statusCode) => {
  return new APIError(msg, statusCode);
};

module.exports = { APIError, createApiError };
