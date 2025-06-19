    const express = require('express');
    const router = express.Router();
    const { register, signup, login, getMe, updateProfile, googleAuth, verifyToken, deleteAccount } = require('../Controllers/authController.js');
    const { protect } = require('../middleware/authMiddleware.js');

    // Auth routes
    router.post('/register', register);
    router.post('/signup', signup);
    router.post('/login', login);
    router.post('/google', googleAuth);
    router.get('/me', protect, getMe);
    router.put('/update-profile', protect, updateProfile);
    router.get('/verify', protect, verifyToken);
    router.delete('/delete-account', protect, deleteAccount);

    module.exports = router;