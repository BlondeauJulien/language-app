const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Course = require('../../models/course');
const Vocabulary = require('../../models/vocabulary');

const createVocabulary = async (req, res, next) => { 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }

  const vocabToCreate = {...req.body};
  const requestorId = req.userData.userIdFromToken;

  let requestor;
  let course;
  try {
    requestor = await User.findById(requestorId).select('-password -email');
    course = await Course.findById(vocabToCreate.course)
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find a user for this requestor.', 404);
    return next(error);
  }
  if(!course) {
    const error = new HttpError('We did not find the course in which you wanted to add some vocabulary.', 404);
    return next(error);
  }

  if(requestorId.toString() !== course.creator.toString()) {
    const error = new HttpError('You are not authorized to realise this action.', 401);
    return next(error);
  }

  let newVocabulary = new Vocabulary(vocabToCreate);

  let createdVocabulary;
  try{
    if(process.env.NODE_ENV === 'test') {
      // As session doesn't work on our local test DB
      createdVocabulary = await newVocabulary.save();
      course.vocabulary.push(createdVocabulary);
      await course.save();
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();
      createdVocabulary = await newVocabulary.save({ session: session });
      course.vocabulary.push(createdVocabulary);
      await course.save({ session: session });
      await session.commitTransaction(); 
    }
  } catch (err) {
    const error = new HttpError('Could not create vocabulary, please try again', 500);
    return next(error);
  }

  res.status(201).json(createdVocabulary);

}

module.exports = createVocabulary;
