const usersRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getUser, editUserProfile,
} = require('../controllers/users');

usersRouter.get('/users/me', getUser);

usersRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), editUserProfile);

module.exports = usersRouter;
