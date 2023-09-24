// eslint-disable-next-line no-undef
const express = require('express');
// eslint-disable-next-line no-undef
const { validateCreateCard, validateUpdateCard } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
// eslint-disable-next-line no-undef
} = require('../controllers/cards');

const cardRouter = express.Router();

// вернуть все карточки
cardRouter.get('/cards', getCards);

// создать карточку
cardRouter.post('/cards', validateCreateCard, createCard);

// удалить карточку по _id
cardRouter.delete('/cards/:cardId', validateUpdateCard, deleteCard);

// поставить лайк карточке по _id
cardRouter.put('/cards/likes/:cardId', validateUpdateCard, likeCard);

// убрать лайк с карточки по _id
cardRouter.delete('/cards/likes/:cardId', validateUpdateCard, dislikeCard);

// eslint-disable-next-line no-undef
module.exports = { cardRouter };
