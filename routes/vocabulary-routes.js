const express = require('express');
const { check } = require('express-validator');

const vocabularyControllers = require('../controllers/vocabulary-controller');
const authentication = require('../middleware/check-auth');

const router = express.Router();

router.post('/', [
  authentication, 
  [  
    check('word').trim().isLength({min : 1, max: 30})
    .withMessage('Word is not valid, it should contain 1 to 30 characters'),
    check('translation').custom(arr => arr.length > 0 && arr.length < 9 )
    .withMessage('Translations are not valid. Should contain at least one and at most 8 translation'),
    check('translation').custom(arr => checkLengthOfStringInArr(arr, 1, 30))
    .withMessage('Translations are not valid. A translation should contain 1 to 30 characters'),
    check('phrases').custom(arr => arr.length >= 0 && arr.length < 9 )
    .withMessage('Phrases are not valid. Should contain at least one and at most 8 phrase'),
    check('phrases.*.origin').optional().trim().isLength({min : 1, max: 200})
    .withMessage('Phrases are not valid. A Phrase should contain 1 to 200 characters'),
    check('phrases.*.translation').optional().trim().isLength({min : 1, max: 200})
    .withMessage('Phrases are not valid. A Phrase should contain 1 to 200 characters'),
    check('conjugationLink').optional().trim().isLength({min : 1, max: 100})
    .withMessage('Link to conjugation is not valid. Should contain at most 100 characters'),
    check('personalNote').optional().trim().isLength({min : 1, max: 400})
    .withMessage('Your note is not valid. Should contain at most 400 characters'),
    check('difficultyLevel').isNumeric()
    .withMessage('The difficulaty number is not valid.'),
    check('tags').custom(arr => arr.length >= 0 && arr.length <= 10 )
    .withMessage('The tags are not valid. Should contain at most 10 tags.'),
    check('tags').custom(arr => checkLengthOfStringInArr(arr, 4, 16))
    .withMessage('The tags are not valid. Each tags should be at least 4 characters long and at most 16.'),

  ]
], vocabularyControllers.createVocabulary);

router.patch('/:id', [
  authentication, 
  [  
    check('word').optional().trim().isLength({min : 1, max: 30})
    .withMessage('Word is not valid, it should contain 1 to 30 characters'),
    check('translation').optional().custom(arr => arr.length > 0 && arr.length < 9 )
    .withMessage('Translations are not valid. Should contain at least one and at most 8 translation'),
    check('translation').optional().custom(arr => checkLengthOfStringInArr(arr, 1, 30))
    .withMessage('Translations are not valid. A translation should contain 1 to 30 characters'),
    check('phrases').optional().custom(arr => arr.length >= 0 && arr.length < 9 )
    .withMessage('Phrases are not valid. Should contain at least one and at most 8 phrase'),
    check('phrases.*.origin').optional().trim().isLength({min : 1, max: 200})
    .withMessage('Phrases are not valid. A Phrase should contain 1 to 200 characters'),
    check('phrases.*.translation').optional().trim().isLength({min : 1, max: 200})
    .withMessage('Phrases are not valid. A Phrase should contain 1 to 200 characters'),
    check('conjugationLink').optional().trim().isLength({min : 1, max: 100})
    .withMessage('Link to conjugation is not valid. Should contain at most 100 characters'),
    check('personalNote').optional().trim().isLength({min : 1, max: 400})
    .withMessage('Your note is not valid. Should contain at most 400 characters'),
    check('difficultyLevel').optional().isNumeric()
    .withMessage('The difficulaty number is not valid.'),
    check('tags').optional().custom(arr => arr.length >= 0 && arr.length <= 10 )
    .withMessage('The tags are not valid. Should contain at most 10 tags.'),
    check('tags').optional().custom(arr => checkLengthOfStringInArr(arr, 4, 16))
    .withMessage('The tags are not valid. Each tags should be at least 4 characters long and at most 16.'),
  ]
], vocabularyControllers.updateVocabulary);

router.delete('/:id', authentication, vocabularyControllers.deleteVocabulary);

const checkLengthOfStringInArr = (array, min, max) => {
  for(let i =0; i < array.length; i++) {
    if(array[i].trim().length < min || array[i].trim().length > max) {
      return false;
    }
  }
  return true;
}

module.exports = router;