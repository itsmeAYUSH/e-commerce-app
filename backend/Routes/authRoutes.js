const express = require('express');
const router = express.Router();
const { signup, login, getMe, verifyToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.get('/verify', protect, verifyToken);

module.exports = router;