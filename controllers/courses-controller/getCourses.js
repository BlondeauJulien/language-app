const HttpError = require('../../models/http-error');
const Course = require('../../models/course');

const getCourses = async (req, res, next) => {
  let filter = {};

  for(let query in req.query) {
    filter[query] = new RegExp(req.query[query], 'i')
  }

  let courses;
  try {
    courses = await Course.find(filter).select('-vocabulary -quizzes').populate('creator', 'username');
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  res.status(200).json({courses});
}

module.exports = getCourses;
