const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Course = require('../../models/course');
const Quiz = require('../../models/quiz');

const createQuiz = async (req, res, next) => { 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }

  if(req.body.imageIsApprouved) {
    const error = new HttpError('You are not authorized to approuve your own image.', 401);
    return next(error);
  }

  const quizToCreate = {...req.body};
  const requestorId = req.userData.userIdFromToken;

  let requestor;
  let course;
  try {
    requestor = await User.findById(requestorId).select('-password -email');
    course = await Course.findById(quizToCreate.course)
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find a user for this requestor.', 404);
    return next(error);
  }
  if(!course) {
    const error = new HttpError('We did not find the course in which you wanted to add a quiz.', 404);
    return next(error);
  }

  if(requestorId.toString() !== course.creator.toString()) {
    const error = new HttpError('You are not authorized to realise this action.', 401);
    return next(error);
  }

  let newQuiz = new Quiz(quizToCreate);

  let adminsAndMods = await User.find({ $or: [ { role: 'admin' }, { role: 'moderator' } ] });

  let createdQuiz;
  try{
    if(process.env.NODE_ENV === 'test') {
      // As session doesn't work on our local test DB
      createdQuiz = await newQuiz.save();
      course.quizzes.push(createdQuiz);
      await course.save();
      for(let adminMod of adminsAndMods) {
        adminMod.imageToReview.push(createdQuiz);
        await adminMod.save();
      }
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();
      createdQuiz = await newQuiz.save({ session: session });
      course.quizzes.push(createdQuiz);
      await course.save({ session: session });
      for(let adminMod of adminsAndMods) {
        adminMod.imageToReview.push(createdQuiz);
        await adminMod.save({ session: session });
      }
      await session.commitTransaction(); 
    }
  } catch (err) {
    const error = new HttpError('Could not create quiz, please try again', 500);
    return next(error);
  }

  res.status(201).json(createdQuiz);

}

module.exports = createQuiz;
