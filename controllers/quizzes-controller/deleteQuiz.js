const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Course = require('../../models/course');
const Quiz = require('../../models/quiz');

const deleteQuiz = async (req, res, next) => {
  const requestorId = req.userData.userIdFromToken;
  const quizId = req.params.id;

  let requestor;
  let quizToDelete;
  try {
    requestor = await User.findById(requestorId);
    quizToDelete = await Quiz.findById(quizId);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find a user matching the requestor.', 404);
    return next(error);
  }
  if(!quizToDelete) {
    const error = new HttpError('We did not find the quiz you tried to delete.', 404);
    return next(error);
  }

  let course;
  try {
    course = await Course.findById(quizToDelete.course);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!course) {
    const error = new HttpError('There is not a course related to this quiz. You might not be authorized. Deletion failed.', 404);
    return next(error);
  }

  if(requestor._id.toString() !== course.creator.toString()) {
    const error = new HttpError('You are not authorized to realize this action.', 401);
    return next(error);
  }

  course.quizzes = course.quizzes.filter(id => id.toString() !== quizToDelete._id.toString());

  try {
    if(process.env.NODE_ENV === 'test') {
      await course.save();
      await quizToDelete.remove();
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();
      await course.save({ session: session });
      await quizToDelete.remove({ session: session });
      await session.commitTransaction(); 
    }
  } catch (err) {
    const error = new HttpError('An error occured while trying to delete the quiz. Please try again.', 500);
    return next(error);
  }

  res.status(200).json({message: "Quiz deleted successfully"});

}

module.exports = deleteQuiz;