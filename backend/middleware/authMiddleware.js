//backend/middleware/authMiddleware.js
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
      // Get token from header
      token = req.headers.authorization.split(' ')[1]; // "Bearer <token>" -> "<token>"

      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user object to the request (excluding password) including their role
      // This makes req.user available in subsequent protected route handlers
      req.user = await User.findById(decoded.id).select('-password'); // Select everything except password

      if (!req.user) {
          // User belonging to token no longer exists
          return res.status(401).json({ success: false, message: 'Not authorized, user not found' });
      }

      // Only log role and type if user is found to prevent errors
      console.log('Backend protect middleware - Fetched user role:', req.user.role);
      console.log('Backend protect middleware - Type of fetched user role:', typeof req.user.role);
      
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
    if (!req.user || typeof req.user.role !== 'string') {
      return res.status(403).json({ success: false, message: 'Access denied. User role not available for authorization.' });
    }

     const userRole = req.user.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Forbidden: Your role ('${req.user.role}') is not authorized to access this resource.`,
      });
    }
    next(); // User has one of the allowed roles
  };
};