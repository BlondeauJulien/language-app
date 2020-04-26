const signup = require('./users-controller/signup');
const login = require('./users-controller/login');
const getLoggedInUser = require('./users-controller/getLoggedInUser');
const updateUserInfos = require('./users-controller/updateUserInfos');
const updateUserRole = require('./users-controller/updateUserRole');
const updateUserStatus = require('./users-controller/updateUserStatus');
const getAllUsers = require('./users-controller/getAllUsers');
const getAllCoursesFromUser = require('./users-controller/getAllCoursesFromUser');
const deleteUser = require('./users-controller/deleteUser');




module.exports = {
  signup,
  login,
  getLoggedInUser,
  updateUserInfos,
  updateUserRole,
  updateUserStatus,
  getAllUsers,
  getAllCoursesFromUser,
  deleteUser
}
