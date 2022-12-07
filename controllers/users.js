const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/NotFoundError');
const RequestError = require('../errors/RequestError');
const DoubleEmailError = require('../errors/DoubleEmailError');

const { NODE_ENV, JWT_SECRET } = process.env;

const User = require('../models/user');
const {
  ERROR_MESSAGE,
} = require('../utils/utils');

module.exports.getUsers = (req, res, next) => {
  User.findById(req.user._id)
    .then((users) => res.send({ data: users }))
    .catch((err) => next(err));
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email,
  } = req.body;
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      User.create({
        name, email, password: hash,
      })
        .then((user) => res.send({
          name: user.name, _id: user._id, email: user.email,
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new RequestError(ERROR_MESSAGE.USER_POST);
          }
          if (err.code === 11000) {
            throw new DoubleEmailError('Такой email уже существует.');
          } else {
            next(err);
          }
        });
    })
    .catch((err) => next(err));
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('Пользователь не найден');
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new RequestError(ERROR_MESSAGE.USER_GET_ID));
      } else {
        next(err);
      }
    })
    .catch((err) => next(err));
};

module.exports.editUserProfile = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERROR_MESSAGE.USER_GET_ID);
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new RequestError(ERROR_MESSAGE.USER_PATCH_PROFILE_INV_DATA));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'strong-secret',
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
          sameSite: true,
          // secure: true,
        })
        // .send({ message: 'Вход выполнен' });
        .send({ token });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt').send({ message: 'Вы точно вышли из профиля' })
    .catch(next);
};
