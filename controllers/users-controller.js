const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../models/http-error');
const User = require('../models/user');
const { createJWT } = require('../utils/createJWT');

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

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError('Login failed, please try again.', 500);
    return next(error);
  }

  if(!user) {
    const error = new HttpError(`We didn't find an user for ${email}`, 401);
    return next(error);
  }

  let passwordMatch;
  try {
    passwordMatch = await bcrypt.compare(password, user.password)
  } catch (err) {
    const error = new HttpError('Login failed, please try again.', 500);
    return next(error);
  }

  if(!passwordMatch) {
    const error = new HttpError(`Wrong password, check it and try again`, 401);
    return next(error);
  }

  if(user.status === 'banned') {
    const error = new HttpError(`You are banned from the website & can't access your account`, 403);
    return next(error);
  }

  const token = createJWT(user._id, user.email);

  if(!token) {
    const error = new HttpError('Login failed, please try again.', 500);
    return next(error);
  }

  res.json({userId: user._id, username : user.username, email, token});
}


const updateUserInfos = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }

  if(
    req.params.id !== req.userData.userIdFromToken ||
    req.body.hasOwnProperty('role') || 
    req.body.hasOwnProperty('status')
  ) {
    const error = new HttpError('You are not authorized to realize this action.', 401);
    return next(error);
  }

  let userToUpdate;
  try {
    userToUpdate = await User.findById(req.userData.userIdFromToken);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!userToUpdate) {
    const error = new HttpError('We didn\'t find the user to update. Please try again or refresh your page.', 404);
    return next(error);
  }

  let passwordMatch;
  try {
    passwordMatch = await bcrypt.compare(req.body.currentPassword, userToUpdate.password)
  } catch (err) {
    const error = new HttpError('An error occured, please try again', 500);
    return next(error);
  }

  if(!passwordMatch) {
    const error = new HttpError(`The password you entered doest not match this account`, 401);
    return next(error);
  }

  const fieldsToUpdate = {...req.body};

  delete fieldsToUpdate.currentPassword;

  if(req.body.hasOwnProperty('password')) {
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(req.body.password, 12);
    } catch (err) {
      const error = new HttpError(
        'Updating failed, please try again.', 
        500
      );
      return next(error);
    }
    fieldsToUpdate.password = hashedPassword;
  }

  userToUpdate.set(fieldsToUpdate);

  let updatedUser
  try {
    updatedUser = await userToUpdate.save();

  } catch (err) {
    const error = new HttpError('Update failed, please try again.', 500);
    return next(error);
  }

  res.status(200).json({userId: updatedUser._id, username : updatedUser.username, email: updatedUser.email});
}

const updateUserRole = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }

  let requestor;
  try {
    requestor = await User.findById(req.userData.userIdFromToken);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find requestor account.', 404);
    return next(error);
  }

  if(requestor.role !== 'admin') {
    const error = new HttpError('You are not authorized to realize this action.', 401);
    return next(error);
  }

  let passwordMatch;
  try {
    passwordMatch = await bcrypt.compare(req.body.password, requestor.password)
  } catch (err) {
    const error = new HttpError('An error occured, please try again', 500);
    return next(error);
  }

  if(!passwordMatch) {
    const error = new HttpError(`Wrong password passed.`, 401);
    return next(error);
  }

  let userToUpdate;
  try {
    userToUpdate = await User.findById(req.params.id);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!userToUpdate) {
    const error = new HttpError('The user you try to update does not exist.', 404);
    return next(error);
  }

  userToUpdate.set({role: req.body.role});

  let updatedUser;
  try {
    updatedUser = await userToUpdate.save();

  } catch (err) {
    const error = new HttpError('Failed to update role, please try again.', 500);
    return next(error);
  }

  res.status(200).json({message: `Successfully updatared role for ${userToUpdate.username} to: ${updatedUser.role}`});

}

exports.signup = signup;
exports.login = login;
exports.updateUserInfos = updateUserInfos;
exports.updateUserRole = updateUserRole;
