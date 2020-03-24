const HttpError = require('../../models/http-error');
const User = require('../../models/user');

const getAllCoursesFromUser = async (req, res, next) => {
  let user;
  try {
    let fieldsToExclude = '-vocabulary -quizzes';
    user = await User.findById(req.params.id).select('username status').populate('courseCreated', fieldsToExclude);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!user) {
    const error = new HttpError('We did not find an user matching your request.', 404);
    return next(error);
  }

  if(user.status === 'banned') {
    const error = new HttpError('The user you requested the course from is banned.', 403);
    return next(error);
  }

  res.json({user})

/*   const userCourses = user.courses.map(course => {
    return {...course, creatorUsername: user.username}
  })

  res.json({courses: userCourses}); */
}

module.exports = getAllCoursesFromUser;
