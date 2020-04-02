const mongoose = require('mongoose');

const Course = require('./course');
const HttpError = require('./http-error');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 16,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'moderator', 'admin']
  },
  status: {
    type: String,
    default: 'active',
    enum: ['active', 'banned']
  },
  imageToReview: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'Quiz'
    }]
  },
  courseCreated: [{
    type: mongoose.Types.ObjectId,
    required:true,
    ref: 'Course'
  }],
  courseFollowed: [{
    type: mongoose.Types.ObjectId,
    required:true,
    ref: 'Course'
  }]

});

userSchema.pre('remove', async function(next) {
  try {
    for(const courseId of this.courseCreated) {
      const course = await Course.findById(courseId);
      await course.remove();
    }
  } catch (err) {
    return next(new HttpError('An error occured, please try again.', 500));
  }
});

module.exports = mongoose.model('User', userSchema);