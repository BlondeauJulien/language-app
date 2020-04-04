const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Quiz = require('../../models/quiz');

const updateQuiz = async (req, res, next) => { 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }

  if(req.body.imageIsApprouved) {
    const error = new HttpError('You are not authorized to approuve your own image.', 401);
    return next(error);
  }

  const fieldsToUpdate = {...req.body};
  const requestorId = req.userData.userIdFromToken;
  const quizId = req.params.id;

  let requestor;
  let quizToUpdate;
  try {
    requestor = await User.findById(requestorId).select('-password -email');
    quizToUpdate = await Quiz.findById(quizId)
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find a user for this requestor.', 404);
    return next(error);
  }
  if(!quizToUpdate) {
    const error = new HttpError('We did not find the quiz you are trying to update.', 404);
    return next(error);
  }

  if(!requestor.courseCreated.find(courseId => courseId.toString() === quizToUpdate.course.toString())) {
    const error = new HttpError('You are not authorized to realise this action.', 401);
    return next(error);
  }

  if(fieldsToUpdate.hasOwnProperty('image')) {
    fieldsToUpdate.imageIsApprouved = false;
  }
  quizToUpdate.set(fieldsToUpdate);

  let updatedQuiz
  try {
    if(process.env.NODE_ENV === 'test') {
      updatedQuiz = await quizToUpdate.save();

      if(fieldsToUpdate.hasOwnProperty('image')) {
        let adminsAndMods = await User.find({ $or: [ { role: 'admin' }, { role: 'moderator' } ] });
        for(let adminMod of adminsAndMods) {
          adminMod.imageToReview.push(updatedQuiz);
          await adminMod.save();
        }
      }
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();
      updatedQuiz = await quizToUpdate.save({ session: session });

      let adminsAndMods = await User.find({ $or: [ { role: 'admin' }, { role: 'moderator' } ] });
      for(let adminMod of adminsAndMods) {
        adminMod.imageToReview.push(updatedQuiz);
        await adminMod.save({ session: session });
      }
      await session.commitTransaction(); 
    }
    
  } catch (err) {
    const error = new HttpError('Update failed, please try again.', 500);
    return next(error);
  }

  res.status(200).json(updatedQuiz);

}

module.exports = updateQuiz;
