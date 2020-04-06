const HttpError = require('../../models/http-error');
const Course = require('../../models/course');

const getVocabulary = async (req, res, next) => {
  let filter = {};
   for(let query in req.query) {
    if(query !== 'difficultyLevel') {
      filter[query] = new RegExp(req.query[query], 'i')
    }
    if(query === 'difficultyLevel') {
      filter[query] = req.query[query];
    }
  } 

  let course;
  try {
    course = await Course.findById(req.params.id).select('-quizzes').populate('vocabulary', null, filter);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!course) {
    const error = new HttpError('We did not find a course matching your request.', 404);
    return next(error);
  }

  res.status(200).json({course});
}

module.exports = getVocabulary;