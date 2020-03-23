const signup = require('./users-controller/signup');
const login = require('./users-controller/login');
const updateUserInfos = require('./users-controller/updateUserInfos');
const updateUserRole = require('./users-controller/updateUserRole');
const updateUserStatus = require('./users-controller/updateUserStatus');


module.exports = {
  signup,
  login,
  updateUserInfos,
  updateUserRole,
  updateUserStatus
}
