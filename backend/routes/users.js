const userRouter = require('express').Router();

// Переменные действий с пользователем
// (получить список пользователей, найти конкретного пользователя, создать пользователя,
// обновить данные пользователя, обновить аватар пользователя)
const {
  getUserList, getUserId, getUserProfile, updateUserData, updateUserAvatar,
} = require('../controllers/users');

// Валидация
const {
  validateUserId, validateUserUpdate, validateUserAvatar,
} = require('../utils/validation');

userRouter.get('/', getUserList);
userRouter.get('/me', getUserProfile);
userRouter.get('/:userId', validateUserId, getUserId);
userRouter.patch('/me', validateUserUpdate, updateUserData);
userRouter.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = userRouter;
