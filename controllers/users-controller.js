const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    next(new HttpError('Invalid inputs passed, please check all fields and try again ', 422));
  }
}

exports.signup = signup;
