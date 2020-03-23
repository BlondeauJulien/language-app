const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const { createJWT } = require('../../utils/createJWT');

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
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
      'Signup failed, please try again.', 
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
    const error = new HttpError('Signup failed, please try again.', 500);
    return next(error);
  }

  let token = createJWT(newUser._id, newUser.email);

  if(!token) {
    const error = new HttpError('Signup failed, please try again.', 500);
    return next(error);
  }

  res.status(201).json({userId: newUser._id, username, email, token});
}

module.exports = signup;