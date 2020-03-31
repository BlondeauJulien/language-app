const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Course = require('../../models/course');
const Vocabulary = require('../../models/vocabulary');

const deleteVocabulary = async (req, res, next) => {
  const requestorId = req.userData.userIdFromToken;
  const vocabularyId = req.params.id;
  const courseId = req.body.courseId;

  let requestor;
  let vocabularyToDelete;
  try {
    requestor = await User.findById(requestorId);
    vocabularyToDelete = await Vocabulary.findById(vocabularyId);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find a user matching the requestor.', 404);
    return next(error);
  }
  if(!vocabularyToDelete) {
    const error = new HttpError('We did not find the word you tried to delete.', 404);
    return next(error);
  }

  let course;
  try {
    course = await Course.findById(vocabularyToDelete.course);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!course) {
    const error = new HttpError('There is not course related to this word. You might not be authorized. Deletion failed.', 404);
    return next(error);
  }

  if(requestor._id.toString() !== course.creator.toString()) {
    const error = new HttpError('You are not authorized to realize this action.', 401);
    return next(error);
  }

  course.vocabulary = course.vocabulary.filter(id => id.toString() !== vocabularyToDelete._id.toString());

  try {
    if(process.env.NODE_ENV === 'test') {
      await course.save();
      await vocabularyToDelete.remove();
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();
      await course.save({ session: session });
      await vocabularyToDelete.remove({ session: session });
      await session.commitTransaction(); 
    }
  } catch (err) {
    const error = new HttpError('An error occured while trying to delete the vocabulary. Please try again.', 500);
    return next(error);
  }

  res.status(200).json({message: "Word deleted successfully"});

}

module.exports = deleteVocabulary;