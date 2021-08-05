const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require("../utils/jwt");
const AuthError = require("../errors/authError");
const NotFoundError = require("../errors/notFoundError");
const ConflictError = require("../errors/conflictError");

// TODO why are the error locations not being found? 
// TODO They link goes to the correct location, however eslint is having issues with them

