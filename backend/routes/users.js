// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const { validateGetUser, validateUpdateProfileInfo, validateUpdateProfileAvatar } = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  updateProfileInfo,
  updateProfileAvatar,
  getCurrentUser,
// eslint-disable-next-line no-undef
} = require('../controllers/users');

const userRouter = express.Router();

// вернуть всех пользователей
userRouter.get('/users', getUsers);

// возвращает информацию о текущем пользователе
userRouter.get('/users/me', getCurrentUser);

// вернуть пользователя по _id
userRouter.get('/users/:userId', validateGetUser, getUser);

// обновить профиль
userRouter.patch('/users/me', validateUpdateProfileInfo, updateProfileInfo);

// обновить аватар
userRouter.patch('/users/me/avatar', validateUpdateProfileAvatar, updateProfileAvatar);

// eslint-disable-next-line no-undef
module.exports = { userRouter };
