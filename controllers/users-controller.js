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

  const { username, email, password } = req.body;
  
  let existingUser;
  try {
    existingUser = await User.findOne({ $or: [{username}, {email}] }, '-password');
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, try again.', 
      500
    );
    return next(error);
  }

  if(existingUser) {
    let errorMessage;
    if(existingUser.username === username) {
      errorMessage = "This username is already used. Please pick another one";
    }
    if(existingUser.email === email) {
      errorMessage = "This email is already used. Maybe try to login instead?";
    }

    const error = new HttpError(
      errorMessage, 
      409
    );
    return next(error);
  }

  let hashedPassword ;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.', 
      500
    );
    return next(error);
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
  } catch (err) {
    const error = new HttpError('signup failed, please try again', 500);
    return next(error);
  }

  res.status(201).json({message: 'user created!'});
}

exports.signup = signup;
