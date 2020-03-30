require('dotenv').config();
const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Course = require('../../models/course');

const deleteCourse = async (req, res, next) => {
  const requestorId = req.userData.userIdFromToken;
  const courseId = req.params.id;

  let requestor;
  let courseToDelete;
  try {
    requestor = await User.findById(requestorId);
    courseToDelete = await Course.findById(courseId);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find a user matching the requestor.', 404);
    return next(error);
  }
  if(!courseToDelete) {
    const error = new HttpError('The course you tried to delete does not exist.', 404);
    return next(error);
  }

  if(requestor._id.toString() !== courseToDelete.creator.toString()) {
    const error = new HttpError('You are not authorized to realize this action.', 401);
    return next(error);
  }

  requestor.courseCreated.filter(id => id.toString() !== courseToDelete._id.toString);

  try {
    if(process.env.NODE_ENV === 'test') {
      // As session doesn't work on our local test DB
      await requestor.save();
      await courseToDelete.remove();
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();
      await requestor.save({ session: session });
      await courseToDelete.remove({ session: session });
      await session.commitTransaction(); 
    }
  } catch (err) {
    const error = new HttpError('An error occured while trying to delete the course. Please try again.', 500);
    return next(error);
  }

  res.status(200).json({message: "Course deleted successfully"});

}

module.exports = deleteCourse;