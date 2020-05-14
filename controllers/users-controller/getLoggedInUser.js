const HttpError = require('../../models/http-error');
const User = require('../../models/user');

const getLoggedInUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.userData.userIdFromToken);
  } catch (err) {
    const error = new HttpError('Login failed, please try again.', 500);
    return next(error);
  }

  if(!user) {
    const error = new HttpError(`We didn't find an user for ${email}`, 401);
    return next(error);
  }

  if(user.status === 'banned') {
    const error = new HttpError(`You are banned from the website & can't access your account`, 403);
    return next(error);
  }

  const userInfos = {userId: user._id, username : user.username, email: user.email, token: req.userData.token};
  if(user.role === 'admin' || user.role === 'moderator') {
    userInfos.role = user.role;
  } 

  res.json(userInfos);
}

module.exports = getLoggedInUser;