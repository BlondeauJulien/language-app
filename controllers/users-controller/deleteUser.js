const bcrypt = require('bcryptjs');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');

const deleteUser = async (req, res, next) => {
  const { password } = req.body;

  let requestor;
  try {
    requestor = await User.findById(req.userData.userIdFromToken);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!requestor) {
    const error = new HttpError('We did not find you, please try again.', 404);
    return next(error);
  }

  if(requestor._id.toString() !== req.params.id.toString()) {
    const error = new HttpError('You are not authorized to realise this action.', 401);
    return next(error);
  }

  let passwordMatch;
  try {
    passwordMatch = await bcrypt.compare(password, requestor.password)
  } catch (err) {
    const error = new HttpError('An error occured, please try again', 500);
    return next(error);
  }

  if(!passwordMatch) {
    const error = new HttpError(`Wrong password passed. We didn't delete your account.`, 401);
    return next(error);
  }

  try {
    await requestor.remove();
  } catch (err) {
    const error = new HttpError('An error occured, please try again', 500);
    return next(error);
  }
  res.status(200).json({message: 'Your account has been deleted successfully.'})
}

module.exports = deleteUser;
