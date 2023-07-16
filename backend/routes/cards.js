const cardRouter = require('express').Router();

// Переменные действий с карточками
// (получить, создать, поставить лайк, убрать лайк, удалить карточку)
const {
  getCardList, createCard, likeCard, removeLikeCard, deleteCard,
} = require('../controllers/cards');

// Валидация
const {
  validateCreateCard, validateCardId,
} = require('../utils/validation');

cardRouter.get('/', getCardList);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.put('/:cardId/likes', validateCardId, likeCard);
cardRouter.delete('/:cardId/likes', validateCardId, removeLikeCard);
cardRouter.delete('/:cardId', validateCardId, deleteCard);

module.exports = cardRouter;
