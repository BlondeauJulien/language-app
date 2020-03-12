const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controller');

const router = express.Router();

router.post('/signup', [
  check('username').isLength({min : 4, max: 16})
  .withMessage('Username should contain 4 to 16 characters'),
  check('email').normalizeEmail().isEmail()
  .withMessage('Please use a valid email'),
  check('password').isLength({min : 6})
  .withMessage('Password must contain at least 6 characters')
], usersControllers.signup);

router.post('/login', usersControllers.login);

module.exports = router;