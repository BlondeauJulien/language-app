const HttpError = require('../../models/http-error');
const Course = require('../../models/course');

const getCourses = async (req, res, next) => {
  let filter = {};
  let username;

  for(let query in req.query) {
    if(query === 'username') {
      username = new RegExp(req.query[query], 'i');
    } else {
      filter[query] = new RegExp(req.query[query], 'i')
    }
  }

  let courses;
  try {
    courses = await Course.find(filter).select('-vocabulary -quizzes').populate('creator', 'username');
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(username) {
    courses = courses.filter(course => username.test(course.creator.username));
  }

  res.status(200).json({courses});
}

module.exports = getCourses;
