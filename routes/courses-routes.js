const express = require('express');
const { check } = require('express-validator');

const coursesControllers = require('../controllers/courses-controller');
const authentication = require('../middleware/check-auth');

const router = express.Router();

router.get('/', coursesControllers.getCourses);

router.get('/:id', coursesControllers.getSingleCourse);

router.get('/:id/vocabulary', coursesControllers.getVocabulary);

router.get('/:id/quizzes', coursesControllers.getQuizzes);

router.post('/', [
  authentication, 
  [  
    check('name').isLength({min : 4, max: 40})
    .withMessage('Invalid course name, it should contain 4 to 40 characters'),
    check('language').isLength({min : 2, max: 24})
    .withMessage('Invalid language name, it should contain 2 to 24 characters'),
    check('learningFrom').isLength({min : 2, max: 24})
    .withMessage('Invalid language (learning from) name, it should contain 2 to 24 characters'),
    check('countryFlag').isLength({min : 2, max: 2})
    .withMessage('Invalid country flag input')
  ]
], coursesControllers.createCourse);


router.patch('/:id', [
  authentication, 
  [  
    check('name').optional().isLength({min : 4, max: 40})
    .withMessage('Invalid course name, it should contain 4 to 40 characters'),
    check('language').optional().isLength({min : 2, max: 24})
    .withMessage('Invalid language name, it should contain 2 to 24 characters'),
    check('learningFrom').optional().isLength({min : 2, max: 24})
    .withMessage('Invalid language (learning from) name, it should contain 2 to 24 characters'),
    check('countryFlag').optional().isLength({min : 2, max: 2})
    .withMessage('Invalid country flag input')
  ]
], coursesControllers.updateCourse);

router.delete('/:id', authentication, coursesControllers.deleteCourse);

module.exports = router;