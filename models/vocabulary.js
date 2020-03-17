const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vocabularySchema = new Schema({
  word: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  },
  translation: [{
    type: String,
    required: true,
    minlength: 1,
    maxlength: 30
  }],
  phrases: [{
    origin: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200
    },
    translation: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200
    }
  }],
  conjugationLink: {
    type: String,
    default: null
  },
  personalNote: {
    type: String,
    default: null,
    minlength: 1,
    maxlength: 400
  },
  difficultyLevel: {
    type: Number,
    required: true
  },
  tags: Array

});

module.exports = mongoose.model('Vocabulary', vocabularySchema);