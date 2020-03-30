const getAllCourses = require('./courses-controller/getAllCourses');
const getSingleCourse = require('./courses-controller/getSingleCourse');
const createCourse = require('./courses-controller/createCourse');
const updateCourse = require('./courses-controller/updateCourse');
const deleteCourse = require('./courses-controller/deleteCourse');

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse
}