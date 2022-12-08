const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const AuthError = require('../errors/AuthError');
const {
  ERROR_MESSAGE,
} = require('../utils/utils');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v) => isEmail(v),
      message: ERROR_MESSAGE.WRONG_EMAIL,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password').orFail(new AuthError(ERROR_MESSAGE.NO_SUCH_USER))
    .then((user) => bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          throw new AuthError(ERROR_MESSAGE.WRONG_EMAIL_OR_PASS);
        }
        return user;
      }));
};

module.exports = mongoose.model('user', userSchema);
