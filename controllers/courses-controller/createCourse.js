const { validationResult } = require('express-validator');
require('dotenv').config();
const mongoose = require('mongoose');

const HttpError = require('../../models/http-error');
const User = require('../../models/user');
const Course = require('../../models/course');

const createCourse = async (req, res, next) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return next(new HttpError(errors.errors[0].msg, 422));
  }

  const courseToCreate = {...req.body};
  const requestorId = req.userData.userIdFromToken;

  let creator;
  try {
    creator = await User.findById(requestorId);
  } catch (err) {
    const error = new HttpError('An error occured, please try again.', 500);
    return next(error);
  }

  if(!creator) {
    const error = new HttpError('We did not find a user matching requestor', 404);
    return next(error);
  }

  courseToCreate.creator = creator._id;
  
  const newCourse = new Course({...courseToCreate});

  let createdCourse;
  try{
    if(process.env.NODE_ENV === 'test') {
      // As session doesn't work on our local test DB
      createdCourse = await newCourse.save();
      creator.courseCreated.push(createdCourse);
      await creator.save();
    } else {
      const session = await mongoose.startSession();
      session.startTransaction();
      createdCourse = await newCourse.save({ session: session });
      creator.courseCreated.push(createdCourse);
      await creator.save({ session: session });
      await session.commitTransaction(); 
    }
  } catch (err) {
      const error = new HttpError('Could not create the course, please try again', 500);
      return next(error);
  }

  res.status(201).json({
    creator: {
      _id: creator._id,
      username: creator.username
    },
    _id: createdCourse._id,
    name: createdCourse.name,
    language: createdCourse.language,
    learningFrom: createdCourse.learningFrom,
    countryFlag: createdCourse.countryFlag,
  });

}

module.exports = createCourse;
