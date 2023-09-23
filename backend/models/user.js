// eslint-disable-next-line no-undef
const mongoose = require('mongoose');
// eslint-disable-next-line no-undef
const validator = require('validator');
// eslint-disable-next-line no-undef
const bcrypt = require('bcryptjs');
// eslint-disable-next-line no-undef
const AuthError = require('../errors/errorAuth');

const {
  DEFAULT_NAME,
  DEFAULT_ABOUT,
  DEFAULT_AVATAR,
// eslint-disable-next-line no-undef
} = require('../config/config');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: DEFAULT_NAME,
      minlength: [2, 'Имя не может быть короче 2 символов'],
      maxlength: [30, 'Имя не может быть длиннее 30 символов'],
    },
    about: {
      type: String,
      default: DEFAULT_ABOUT,
      minlength: [2, 'Информация о себе не может быть короче 2 символов'],
      maxlength: [30, 'Информация о себе не может быть длиннее 30 символов'],
    },
    avatar: {
      type: String,
      default: DEFAULT_AVATAR,
      validate: {
        validator: (url) => validator.isURL(url),
        message: 'Некорректный URL',
      },
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неверно указана почта',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  // попытаемся найти пользователя по почте
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) { // не нашёлся — отклоняем промис
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }
      // нашёлся — сравниваем хеши
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) { // отклоняем промис
            return Promise.reject(new AuthError('Неправильные почта или пароль'));
          }
          return user;
        });
    });
};

// eslint-disable-next-line no-undef
module.exports = mongoose.model('user', userSchema);
