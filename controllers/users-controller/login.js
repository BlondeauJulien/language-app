const bcrypt = require('bcryptjs');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const { createJWT } = require('../../utils/createJWT');

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email }).populate('imageToReview');
  } catch (err) {
    const error = new HttpError('Login failed, please try again.', 500);
    return next(error);
  }

  if(!user) {
    const error = new HttpError(`We didn't find an user for ${email}`, 401);
    return next(error);
  }

  let passwordMatch;
  try {
    passwordMatch = await bcrypt.compare(password, user.password)
  } catch (err) {
    const error = new HttpError('Login failed, please try again.', 500);
    return next(error);
  }

  if(!passwordMatch) {
    const error = new HttpError(`Wrong password, check it and try again`, 401);
    return next(error);
  }

  if(user.status === 'banned') {
    const error = new HttpError(`You are banned from the website & can't access your account`, 403);
    return next(error);
  }

  const token = createJWT(user._id, user.email);

  if(!token) {
    const error = new HttpError('Login failed, please try again.', 500);
    return next(error);
  }

  const userInfos = {userId: user._id, username : user.username, email, token};
  if(user.role === 'admin' || user.role === 'moderator') {
    userInfos.role = user.role;
    userInfos.imageToReview = user.imageToReview;
  } 

  res.json(userInfos);
}

module.exports = login;