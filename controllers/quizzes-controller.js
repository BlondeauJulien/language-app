const createQuiz = require('./quizzes-controller/createQuiz');
const deleteQuiz = require('./quizzes-controller/deleteQuiz');
const updateQuiz = require('./quizzes-controller/updateQuiz');
const approveQuizImage = require('./quizzes-controller/approveQuizImage');

module.exports = {
  createQuiz,
  updateQuiz,
  deleteQuiz,
  approveQuizImage
}