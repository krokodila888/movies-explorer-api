const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const moviesRouter = require('./movies');
const usersRouter = require('./users');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const {
  ERROR_MESSAGE, MESSAGE,
} = require('../utils/utils');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).required().max(30),
  }),
}), createUser);
router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use(moviesRouter);
router.use(usersRouter);
router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: MESSAGE.EXIT });
});

router.use('*', () => {
  throw new NotFoundError(ERROR_MESSAGE.RETURN_BACK);
});

module.exports = router;
