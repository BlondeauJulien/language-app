const { validationResult } = require('express-validator');
require('dotenv').config();

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Course = require('../../models/course');

const updateCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }

  const fieldsToUpdate = {...req.body};
  const requestorId = req.userData.userIdFromToken;

  let requestor;
  try {
    requestor = await User.findById(requestorId);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find a user matching requestor', 404);
    return next(error);
  }

  let courseToUpdate;
  try {
    courseToUpdate = await Course.findById(req.params.id);
  } catch (err) {
    const error = new HttpError('An error occured, please try again. not found', 500);
    return next(error);
  }

  if(!courseToUpdate) {
    const error = new HttpError('The course you tried to update was not found.', 404);
    return next(error);
  }

  if(courseToUpdate.creator.toString() !== requestorId.toString()) {
    const error = new HttpError('You are not authorized to realise this action.', 401);
    return next(error);
  }


  courseToUpdate.set(fieldsToUpdate);

  let updatedCourse
  try {
    updatedCourse = await courseToUpdate.save();
  } catch (err) {
    const error = new HttpError('Update failed, please try again.', 500);
    return next(error);
  }

  res.status(200).json({
    creator: {
      id: requestor._id,
      username: requestor.username
    },
    courseId: updatedCourse._id,
    name: updatedCourse.name,
    language: updatedCourse.language,
    learningFrom: updatedCourse.learningFrom,
    countryFlag: updatedCourse.countryFlag,
  });

}

module.exports = updateCourse;
