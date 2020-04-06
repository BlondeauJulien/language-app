const getCourses = require('./courses-controller/getCourses');
const getSingleCourse = require('./courses-controller/getSingleCourse');
const createCourse = require('./courses-controller/createCourse');
const updateCourse = require('./courses-controller/updateCourse');
const deleteCourse = require('./courses-controller/deleteCourse');

const getVocabulary = require('./courses-controller/getVocabulary');
const getQuizzes = require('./courses-controller/getQuizzes');

module.exports = {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getVocabulary,
  getQuizzes
}