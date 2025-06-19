const jwt = require('jsonwebtoken');
const User = require('../Models/User.js');

// Protect routes
const protect = async (req, res, next) => {
  let token;

  try {
    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');

      // Get user from token
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        console.error('Auth middleware: User not found for token:', {
          decodedId: decoded.id,
          token: token.substring(0, 10) + '...' // Log only first 10 chars of token
        });
        return res.status(401).json({
          success: false,
          message: 'User not found'
        });
      }

      // Set user in request object with explicit ID conversion
      req.user = {
        id: user._id.toString(), // Convert ObjectId to string
        name: user.name,
        email: user.email,
        role: user.role
      };

      console.log('Auth middleware: User authenticated:', {
        userId: req.user.id,
        userEmail: req.user.email
      });

      next();
    } else {
      console.error('Auth middleware: No token provided');
      return res.status(401).json({
        success: false,
        message: 'Not authorized, no token provided'
      });
    }
  } catch (error) {
    console.error('Auth middleware detailed error:', {
      error: error.message,
      stack: error.stack,
      token: token ? token.substring(0, 10) + '...' : 'no token'
    });
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    return res.status(401).json({
      success: false,
      message: 'Not authorized, token failed'
    });
  }
};

module.exports = { protect };