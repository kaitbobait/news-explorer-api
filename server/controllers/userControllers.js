const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const AuthError = require("../errors/authError");
const NotFoundError = require("../errors/notFoundError");
const ConflictError = require("../errors/conflictError");

// TODO why are the error locations not being found?
// TODO They link goes to the correct location, however eslint is having issues with them

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => {
      if (users) {
        return res.status(200).send(users);
      }
      return Promise.reject(new NotFoundError("User not found"));
    })
    .catch(next);
}

module.exports = { getUsers };
