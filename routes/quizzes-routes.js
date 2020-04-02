const express = require('express');
const { check } = require('express-validator');

const quizzesControllers = require('../controllers/quizzes-controller');
const authentication = require('../middleware/check-auth');

const router = express.Router();

router.post('/', [
  authentication, 
  [  
    check('answers').custom(arr => arr.length > 1 && arr.length < 9 )
    .withMessage('Answers are not valid. Should contain at least two and at most 8 answer'),
    check('answers.*.answer').trim().isLength({min : 2, max: 200})
    .withMessage('Answers are not valid. An answer should contain 2 to 200 characters'),
    check('answers.*.translation').trim().isLength({min : 2, max: 200})
    .withMessage('Answers are not valid. A answer translation should contain 2 to 200 characters'),
    check('answers.*.isCorrect').isBoolean()
    .withMessage('Answers are not valid.'),
    check('answers').custom(arr => checkIfAtLeastOneTrue(arr))
    .withMessage('Answers are not valid, should contain at least on correct answer'),
    check('image').trim().isLength({min : 1, max: 100})
    .withMessage('Image link is not valid. Should contain at most 200 characters'),
    check('difficultyLevel').isNumeric()
    .withMessage('The difficulaty number is not valid.'),
    check('tags').custom(arr => arr.length >= 0 && arr.length <= 10 )
    .withMessage('The tags are not valid. Should contain at most 10 tags.'),
    check('tags').custom(arr => checkLengthOfStringInArr(arr, 4, 16))
    .withMessage('The tags are not valid. Each tags should be at least 4 characters long and at most 16.'),

  ]
], quizzesControllers.createQuiz);

router.delete('/:id', authentication, quizzesControllers.deleteQuiz);

const checkIfAtLeastOneTrue = (array) => {
  for(let i = 0; i < array.length; i++) {
    if(array[i].isCorrect.toString() === 'true') {
      return true;
    }
  }
  return false;
}

const checkLengthOfStringInArr = (array, min, max) => {
  for(let i =0; i < array.length; i++) {
    if(array[i].trim().length < min || array[i].trim().length > max) {
      return false;
    }
  }
  return true;
}

module.exports = router;