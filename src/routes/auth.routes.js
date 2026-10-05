const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', authenticate, authController.me);

module.exports = router;