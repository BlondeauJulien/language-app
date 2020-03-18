const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const quizSchema = new Schema({
  course: {
    type: mongoose.Types.ObjectId,
    ref: 'Course'
  },
  answers: [{
    answer: {
      type: String,
      required: true
    },
    isCorrect: {
      type: Boolean,
      required: true
    },
    translation: {
      type: String,
      required: true
    },
  }],
  image: {
    type: String, 
    required: true,
  },
  imageIsApprouved: {
    type: Boolean, 
    default: false
  },
  difficultyLevel: {
    type: Number,
    required: true
  },
  tags: Array

});

module.exports = mongoose.model('Quiz', quizSchema);