const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const AuthError = require("../errors/authError");
const NotFoundError = require("../errors/notFoundError");
const ConflictError = require("../errors/conflictError");

// TODO why are the error locations not being found?
// TODO They link goes to the correct location, however eslint is having issues with them

function login(req, res, next) {
  // gets the email and password from the REQUEST
  const { email, password, name } = req.body;
  // checks if email already exists
  User.findUserByCredentials(email, password, name)
    .then((user) => {
      if (!user) {
        throw new AuthError('Authorization Error: Incorrect email or password');
      }

      const token = generateToken(user._id);
      // console.log('token', token); //works
      // console.log(user._id); //returns id
      // assign token to a cookie
      res.cookie('token', token, { httpOnly: true });
      res.send({ token });
    })
    .catch(next);
}

function getUsers(req, res, next) {
  return User.find({})
    .then((users) => {
      if (users) {
        return res.status(200).send(users);
      }
      return Promise.reject(new NotFoundError('User not found'));
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    name, email, password,
  } = req.body;
  if (!email || !password) {
    return Promise.reject(new NotFoundError('email or password invalid'));
  }
  // check to see if email already exists
  return User.findOne({ email }).then((exists) => {
    if (exists) {
      return Promise.reject(new ConflictError('Email already exists'));
    }

    // hashing the password
    return bcrypt
      .hash(req.body.password, 10)
      .then((hash) => User.create({
        name,
        email,
        password: hash,
      }))
      .then((user) => res.status(200).send({
        email: user.email,
        _id: user._id,
      }));
  })
    .catch(next);
}

module.exports = { getUsers, login, createUser };
