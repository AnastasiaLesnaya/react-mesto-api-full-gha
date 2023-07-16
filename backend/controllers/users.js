const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');

const { NODE_ENV } = process.env;

const { ValidationError, CastError } = mongoose.Error;

const User = require('../models/user');

const { SUCCESS_CREATED, DUPLICATE_ERROR } = require('../utils/response');

// 400
const BadRequests = require('../utils/errors/BadRequest');
// 404
const NotFound = require('../utils/errors/NotFound');
// 409
const ConflictingRequest = require('../utils/errors/ConflictingRequest');

// получаем пользователей
const getUserList = (req, res, next) => {
  User.find({})
    .then((userList) => res.send({ data: userList }))
    .catch(next);
};

// получаем пользователя по Id
const getUserId = (req, res, next) => {
  User.findById(req.params.userId)
    .then((selectedUser) => {
      if (selectedUser) {
        res.send({ data: selectedUser });
      } else {
        next(new NotFound('Пользователь по указанному _id не найден'));
      }
    })
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequests('Некорректный _id запрашиваемого пользователя'));
      } else { next(error); }
    });
};

// регистрируем пользователя
const registerUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  const passwordHash = bcrypt.hash(password, 10);
  passwordHash.then((hash) => User.create({
    name, about, avatar, email, password: hash,
  }))
    // пароль не передаётся
    .then(() => res.status(SUCCESS_CREATED).send({
      name, about, avatar, email,
    }))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequests('Переданы некорректные данные при создании пользователя'));
      } else if (error.code === DUPLICATE_ERROR) {
        next(new ConflictingRequest('Пользователь с указанной почтой уже существует'));
      } else { next(error); }
    });
};

// обновляем профиль пользователя
const updateUserData = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((updatedData) => res.send({ data: updatedData }))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequests('Переданы некорректные данные при обновлении профиля'));
      } else {
        next(error);
      }
    });
};

// обновление аватара пользователя
const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((updatedAvatar) => res.send(updatedAvatar))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequests('Переданы некорректные данные при обновлении аватара'));
      } else {
        next(error);
      }
    });
};

// авторизация
const authorizeUser = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((selectedUser) => {
      const userToken = jwt.sign({ _id: selectedUser._id }, NODE_ENV === 'production' ? JWT_SECRET : 'supersecret', { expiresIn: '7d' });
      res.send({ userToken });
    })
    .catch(next);
};

// получение профиля
const getUserProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((selectedUser) => {
      if (!selectedUser) {
        next(new NotFound('Пользователь по указанному _id не найден'));
      } else { res.send(selectedUser); }
    })
    .catch(next);
};

module.exports = {
  getUserList,
  getUserId,
  registerUser,
  updateUserData,
  updateUserAvatar,
  authorizeUser,
  getUserProfile,
};
