const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controller');

const router = express.Router();

router.post('/signup', [
  check('username').isLength({min : 4, max: 16}),
  check('email').normalizeEmail().isEmail(),
  check('password').isLength({min : 6})
], usersControllers.signup);

module.exports = router;