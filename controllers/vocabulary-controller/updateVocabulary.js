const { validationResult } = require('express-validator');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Vocabulary = require('../../models/vocabulary');

const updateVocabulary = async (req, res, next) => { 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }

  const fieldsToUpdate = {...req.body};
  const requestorId = req.userData.userIdFromToken;
  const vocabId = req.params.id;

  let requestor;
  let vocabularyToUpdate;
  try {
    requestor = await User.findById(requestorId).select('-password -email');
    vocabularyToUpdate = await Vocabulary.findById(vocabId)
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find a user for this requestor.', 404);
    return next(error);
  }
  if(!vocabularyToUpdate) {
    const error = new HttpError('We did not find the vocabulary you are trying to update.', 404);
    return next(error);
  }

  if(!requestor.courseCreated.find(courseId => courseId.toString() === vocabularyToUpdate.course.toString())) {
    const error = new HttpError('You are not authorized to realise this action.', 401);
    return next(error);
  }

  vocabularyToUpdate.set(fieldsToUpdate);

  let updatedVocabulary
  try {
    updatedVocabulary = await vocabularyToUpdate.save();
  } catch (err) {
    const error = new HttpError('Update failed, please try again.', 500);
    return next(error);
  }

  res.status(200).json(updatedVocabulary);

}

module.exports = updateVocabulary;
