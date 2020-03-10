const mongoose = require('mongoose');

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
    type: Array,
    default: []
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

module.exports = mongoose.model('User', userSchema);