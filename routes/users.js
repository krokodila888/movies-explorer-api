const usersRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

/* const {
  URL_PATTERN,
} = require('../utils/utils'); */

const {
  getUser, editUserProfile,
} = require('../controllers/users');

usersRouter.get('/users/me', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUser);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}), editUserProfile);

module.exports = usersRouter;
