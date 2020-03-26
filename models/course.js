const mongoose = require('mongoose');

const User = require('./user');
const Vocabulary = require('./vocabulary');
const Quiz = require('./quiz');
const HttpError = require('./http-error');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 40
  },
  language: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 24
  },
  countryFlag: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2
  },
  learningFrom: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 24
  },
  vocabulary: [{ type: Schema.Types.ObjectId, ref: 'Vocabulary' }],
  quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }]

});

courseSchema.pre('remove', async function(next) {
  try {
    let course = this;

    for(const vocabId of course.vocabulary) {
      const vocab = await Vocabulary.findById(vocabId);
      await vocab.remove();
    }
    for(const quizId of course.quizzes) {
      const quiz = await Quiz.findById(quizId);
      await quiz.remove();
    }

    await course.model('User').update(
      { courseFollowed: {$in: [course._id]}}, 
      { $pull: {courseFollowed: course._id} }, 
      { multi: true }, 
    )
  } catch (err) {
    return next(new HttpError('An error occured, please try again.', 500));
  }
});

module.exports = mongoose.model('Course', courseSchema);