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

quizSchema.pre('remove', async function(next) {
  try {
    let quiz = this;

    await quiz.model('User').updateMany(
      { imageToReview: {$in: [quiz._id]}}, 
      { $pull: {imageToReview: quiz._id} }, 
      { multi: true }, 
    )
  } catch (err) {
    return next(new HttpError('An error occured, please try again.', 500));
  }
});

module.exports = mongoose.model('Quiz', quizSchema);