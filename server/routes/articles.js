const express = require('express');

const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { getArticles } = require('../controllers/articleControllers');

function validateUrl(string) {
  const result = validator.isURL(string);
  if (result) {
    return string;
  }
  throw new Error('URL validation err');
}

// returns all articles saved by the user
router.get('/cards', getArticles);
