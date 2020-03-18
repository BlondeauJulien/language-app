const mongoose = require('mongoose');

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

module.exports = mongoose.model('Course', courseSchema);