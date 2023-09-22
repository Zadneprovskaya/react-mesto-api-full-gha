// eslint-disable-next-line no-undef
const jwt = require('jsonwebtoken');
// eslint-disable-next-line no-undef
const AuthError = require('../errors/errorAuth');
// eslint-disable-next-line no-undef
const { KEY } = require('../config/config');

// eslint-disable-next-line no-undef
module.exports = (req, res, next) => {
  // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // заголовок начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthError('Необходима авторизация'));
  }

  // извлекаем токен
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, KEY);
  } catch (e) {
    // отправим ошибку, если не получилось
    return next(new AuthError('Необходима авторизация'));
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next();
};
