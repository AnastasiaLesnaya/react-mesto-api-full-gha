const mongoose = require('mongoose');

const { ValidationError, CastError } = mongoose.Error;

const Card = require('../models/card');

// 201
const { SUCCESS_CREATED } = require('../utils/response');
// 400
const BadRequests = require('../utils/errors/BadRequest');
// 403
const Forbidden = require('../utils/errors/Forbidden');
// 404
const NotFound = require('../utils/errors/NotFound');

// Получаем карточки
const getCardList = (req, res, next) => {
  Card.find({})
    .then((cardList) => res.send(cardList))
    .catch((error) => next(error));
};

// Создаём новые карточки
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cardObject) => res.status(SUCCESS_CREATED).send(cardObject))
    .catch((error) => {
      if (error instanceof ValidationError) {
        next(new BadRequests('Переданы некорректные данные при создании карточки'));
      } else {
        next(error);
      }
    });
};

// ставим лайк карточе
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) => {
      if (selectedCard) {
        res.send(selectedCard);
      } else {
        next(new NotFound('Карточка не найдена'));
      }
    })
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequests('Некорректные данные для добавления лайка'));
      } else {
        next(error);
      }
    });
};

// убираем лайк карточки
const removeLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((selectedCard) => {
      if (selectedCard) {
        res.send(selectedCard);
      } else {
        next(new NotFound('Карточка не найдена'));
      }
    })
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequests('Некорректные данные, чтобы убрать лайк'));
      } else {
        next(error);
      }
    });
};

// удаляем карточку
const deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((selectedCard) => {
      if (!selectedCard) {
        // карточки не существует
        return next(new NotFound('Карточка не найдена'));
        // карточка не принадлежит пользователю
      } if (!selectedCard.owner.equals(req.user._id)) {
        return next(new Forbidden('Вы не можете удалить чужую карточку'));
      }
      // удаление своей карточки
      return Card.findByIdAndDelete(req.params.cardId)
        .orFail(() => new NotFound('Карточка не найдена'))
        .then(() => { res.send({ message: 'Карточка удалена' }); });
    })
    .catch((error) => {
      if (error instanceof CastError) {
        next(new BadRequests('Некорректные данные карточки'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getCardList,
  createCard,
  likeCard,
  removeLikeCard,
  deleteCard,
};
