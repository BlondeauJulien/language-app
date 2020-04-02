const getAllCourses = require('./courses-controller/getAllCourses');
const getSingleCourse = require('./courses-controller/getSingleCourse');
const createCourse = require('./courses-controller/createCourse');
const updateCourse = require('./courses-controller/updateCourse');
const deleteCourse = require('./courses-controller/deleteCourse');

const getVocabulary = require('./courses-controller/getVocabulary');
const getQuizzes = require('./courses-controller/getQuizzes');

module.exports = {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getVocabulary,
  getQuizzes
}