const {
  ERROR_MESSAGE,
} = require('../utils/utils');

module.exports = ((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? ERROR_MESSAGE.SERVER_ERROR
        : message,
    });
  next();
});
