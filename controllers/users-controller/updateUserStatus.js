const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Course = require('../../models/course');

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

  if(requestor.role !== 'admin' && requestor.role !== 'moderator') {
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
  
  if(req.body.status === 'banned') {
    try {
      for(const courseId of userToUpdate.courseCreated) {
        const course = await Course.findById(courseId);
        await course.remove();
      }
    } catch (err) {
      const error = new HttpError('An error occured when deleting user courses.', 500);
      return next(error);
    }
  }

  const toSet = {status: req.body.status};
  if(req.body.status === 'banned') {
    toSet.courses = [];
  }

  userToUpdate.set(toSet);

  let updatedUser;
  try {
    updatedUser = await userToUpdate.save();

  } catch (err) {
    const error = new HttpError('Failed to update status, please try again.', 500);
    return next(error);
  }

  res.status(200).json({message: `Successfully updated status for ${userToUpdate.username} to: ${updatedUser.status}`});

}

module.exports = updateUserRole;