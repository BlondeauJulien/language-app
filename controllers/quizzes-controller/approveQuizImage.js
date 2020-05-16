const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Quiz = require('../../models/quiz');

const approveQuizImage = async (req, res, next) => { 
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

  if(requestor.role !== 'admin' && requestor.role !== 'moderator') {
    const error = new HttpError('You are not authorized to realise this action.', 401);
    return next(error);
  }


  quizToUpdate.set({imageIsApprouved: true});

  let updatedQuiz;
  try {
    if(process.env.NODE_ENV === 'test') {
      updatedQuiz = await quizToUpdate.save();

      let adminsAndMods = await User.find({ $or: [ { role: 'admin' }, { role: 'moderator' } ] });
      for(let adminMod of adminsAndMods) {
        adminMod.imageToReview.pull(updatedQuiz);
        await adminMod.save();
      }

    } else {
      const session = await mongoose.startSession();
      session.startTransaction();
      updatedQuiz = await quizToUpdate.save({ session: session });

      let adminsAndMods = await User.find({ $or: [ { role: 'admin' }, { role: 'moderator' } ] });

      for(let adminMod of adminsAndMods) {
        adminMod.imageToReview.pull(updatedQuiz);
        await adminMod.save({ session: session });
      }
      await session.commitTransaction(); 
    }
    
  } catch (err) {
    const error = new HttpError('Update failed, please try again.', 500);
    return next(error);
  }

  res.status(200).json({message: 'Image approved successfully'});
}

module.exports = approveQuizImage;
