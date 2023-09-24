const express = require('express');
const { validateGetUser, validateUpdateProfileInfo, validateUpdateProfileAvatar } = require('../middlewares/validation');

const {
  getUsers,
  getUser,
  updateProfileInfo,
  getCurrentUser,
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
userRouter.patch('/users/me/avatar', validateUpdateProfileAvatar, updateProfileInfo);

module.exports = { userRouter };
