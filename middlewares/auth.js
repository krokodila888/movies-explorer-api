const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const {
  ERROR_MESSAGE,
} = require('../utils/utils');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new AuthError(ERROR_MESSAGE.AUTH_ERROR);
  }
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'strong-secret');
  } catch (err) {
    next(new AuthError(ERROR_MESSAGE.AUTH_ERROR));
  }
  req.user = payload;
  next();
};
