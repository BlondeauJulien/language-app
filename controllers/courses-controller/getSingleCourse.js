const HttpError = require('../../models/http-error');
const Course = require('../../models/course');

const getSingleCourse = async (req, res, next) => {
  let course;
  try {
    course = await Course.findById(req.params.id).select('-vocabulary -quizzes').populate('creator', 'username');
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!course) {
    const error = new HttpError('We did not find the requested course.', 404);
    return next(error);
  }

  res.status(200).json({course});
}

module.exports = getSingleCourse;