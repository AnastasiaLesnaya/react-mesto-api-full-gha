const mainRouter = require('express').Router();

const { registerUser, authorizeUser } = require('../controllers/users');
const { validateUserAuth, validateUserReg } = require('../utils/validation');

const auth = require('../middlewares/auth');
const cardRouter = require('./cards');
const userRouter = require('./users');

const NotFound = require('../utils/errors/NotFound');

// Регистрация, авторизация (+валидация)
mainRouter.post('/signup', validateUserReg, registerUser);
mainRouter.post('/signin', validateUserAuth, authorizeUser);

// Страницы для авторизованных пользователей
mainRouter.use('/cards', auth, cardRouter);
mainRouter.use('/users', auth, userRouter);

mainRouter.use('*', auth, (req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

module.exports = mainRouter;
