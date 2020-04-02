const express = require('express');
const { check } = require('express-validator');

const quizzesControllers = require('../controllers/quizzes-controller');
const authentication = require('../middleware/check-auth');

const router = express.Router();


router.delete('/:id', authentication, quizzesControllers.deleteQuiz);

module.exports = router;