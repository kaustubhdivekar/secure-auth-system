const jwt = require('jsonwebtoken');
const User = require('../models/User'); // To fetch user details if needed, e.g., to check if user still exists
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

// --- Middleware to Protect Routes (Authentication) ---
exports.protect = async (req, res, next) => {
  let token;

  // Check for token in Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]; // "Bearer <token>" -> "<token>"

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user object to the request (excluding password)
      // This makes req.user available in subsequent protected route handlers
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
          // User belonging to token no longer exists
          return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      console.error('Token verification failed:', error.message);
      // Differentiate errors for better client feedback
      if (error.name === 'TokenExpiredError') {
          return res.status(401).json({ success: false, message: 'Not authorized, token expired. Please log in again.' });
      }
      return res.status(401).json({ success: false, message: 'Not authorized, token failed verification.' });
    }
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided.' });
  }
};

// --- Middleware for Role-Based Authorization ---
// Takes an array of allowed roles as arguments
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    // `protect` middleware should have already run and set `req.user`
    if (!req.user || !req.user.role) {
      return res.status(403).json({ success: false, message: 'User role not available for authorization.' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Your role ('${req.user.role}') is not authorized to access this resource.`,
      });
    }
    next(); // User has one of the allowed roles
  };
};