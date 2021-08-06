const express = require("express");

const router = express.Router();
const { celebrate, Joi } = require("celebrate");
const validator = require("validator");
const { getUsers } = require("../controllers/userControllers");

// add userController functions

function validateUrl(string) {
  const result = validator.isURL(string);
  if (result) {
    return string;
  }
  throw new Error("URL validation err");
}

// returns information about the users - email & name
router.get('/users', getUsers);
