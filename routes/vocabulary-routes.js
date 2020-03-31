const express = require('express');
const { check } = require('express-validator');

const vocabularyControllers = require('../controllers/vocabulary-controller');
const authentication = require('../middleware/check-auth');

const router = express.Router();

router.delete('/:id', authentication, vocabularyControllers.deleteVocabulary);

module.exports = router;