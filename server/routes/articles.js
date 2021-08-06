const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getArticles, createArticle, deleteArticle } = require('../controllers/articleControllers');

function validateUrl(string) {
  const result = validator.isURL(string);
  if (result) {
    return string;
  }
  throw new Error('URL validation err');
}

// returns all articles saved by the user
router.get('/articles', getArticles);

// creates an article w/ the keyword, title, text, date, source, link, and image
router.post(
  '/articles',
  celebrate({
    body: Joi.object().keys({
      keyword: Joi.string().required(),
      title: Joi.string().required(),
      text: Joi.string().required(),
      date: Joi.string().required(),
      source: Joi.string().required(),
      link: Joi.string().required().custom(validateUrl),
      image: Joi.string().required().custom(validateUrl),
    }),
  }),
  createArticle,
);

// deletes the stored article by _id
router.delete('/articles/:articleId',
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().hex().length(24),
    }),
  }),
  deleteArticle);
