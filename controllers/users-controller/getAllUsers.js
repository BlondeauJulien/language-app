const HttpError = require('../../models/http-error');
const User = require('../../models/user');

const getAllUsers = async (req, res, next) => {
  let requestor;
  try {
    requestor = await User.findById(req.userData.userIdFromToken)
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find you, please try again.', 404);
    return next(error);
  }

  if(requestor.role !== 'admin' && requestor.role !== 'moderator') {
    const error = new HttpError('You are not authorized to complete this action.', 401);
    return next(error);
  }

  let users;
  try {
    let fieldsToReturn = 'username email role status';
    if(requestor.role === 'admin') {
      users = await User.find({}).select(fieldsToReturn);
    }
    if(requestor.role === 'moderator') {
      users = await User.find({role: 'user'}).select(fieldsToReturn);
    }
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!users) {
    const error = new HttpError('We did not find any users for you request.', 404);
    return next(error);
  }

  res.json({users});
}

module.exports = getAllUsers;