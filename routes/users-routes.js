const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controller');
const authentication = require('../middleware/check-auth');

const router = express.Router();

router.get('/', authentication, usersControllers.getAllUsers);

router.get('/loggeduser', authentication, usersControllers.getLoggedInUser);

router.get('/:id/courses', usersControllers.getAllCoursesFromUser);

router.post('/signup', [
  check('username').isLength({min : 4, max: 16})
  .withMessage('Username should contain 4 to 16 characters'),
  check('email').normalizeEmail().isEmail()
  .withMessage('Please use a valid email'),
  check('password').isLength({min : 6})
  .withMessage('Password must contain at least 6 characters')
], usersControllers.signup);

router.post('/login', usersControllers.login);

router.patch('/:id', [
  authentication,
  [  
    check('username').optional().isLength({min : 4, max: 16})
    .withMessage('Username should contain 4 to 16 characters'),
    check('email').optional().normalizeEmail().isEmail()
    .withMessage('Please use a valid email'),
    check('password').optional().isLength({min : 6, max: 32})
    .withMessage('Password should contain 6 to 32 characters')
  ]
], usersControllers.updateUserInfos);

router.patch('/:id/role', [
  authentication,
  [  
    check('role').isIn(['user', 'moderator'])
    .withMessage('Invalid role passed, should be moderator or user')
  ]
], usersControllers.updateUserRole);

router.patch('/:id/status', [
  authentication,
  [  
    check('status').isIn(['active', 'banned'])
    .withMessage('Invalid status passed, should be moderator or user')
  ]
], usersControllers.updateUserStatus);

router.delete('/:id', authentication, usersControllers.deleteUser);

module.exports = router;