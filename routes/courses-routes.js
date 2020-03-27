const express = require('express');
const { check } = require('express-validator');

const coursesControllers = require('../controllers/courses-controller');
const authentication = require('../middleware/check-auth');

const router = express.Router();

router.get('/', coursesControllers.getAllCourses);

router.get('/:id', coursesControllers.getSingleCourse);

module.exports = router;