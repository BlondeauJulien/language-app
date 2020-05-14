const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');

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
    const error = new HttpError(`The password you entered does not match this account`, 401);
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

  const updatedUserInfos = {userId: updatedUser._id, username : updatedUser.username, email: updatedUser.email}
  if(updatedUser.role === 'admin' || updatedUser.role === 'moderator') {
    updatedUserInfos.role = updatedUser.role;
  } 

  res.status(200).json(updatedUserInfos);
}

module.exports = updateUserInfos;