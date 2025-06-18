const express = require('express');
const router = express.Router();
const { register, login, getMe, updateProfile, googleAuth, verifyToken } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

// Auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);
router.put('/update-profile', protect, updateProfile);
router.get('/verify', protect, verifyToken);

module.exports = router;