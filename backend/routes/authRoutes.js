const express = require('express');
const router = express.Router(); // Create an Express router instance

// Import controller functions (we'll create these next)
const {
  registerUser,
  loginUser,
  // forgotPassword, // Will add later
  // resetPassword,  // Will add later
  // verifyEmail,    // Will add later
  // getCurrentUser, // Will add later
} = require('../controllers/authController');

// Import input validation middleware (we'll create this)
const { validateRegistration, validateLogin } = require('../middleware/validationMiddleware');

// Import authentication middleware (we'll create this)
// const { protect } = require('../middleware/authMiddleware');

// --- Define Authentication Routes ---

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegistration, registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user and get token (login)
// @access  Public
router.post('/login', validateLogin, loginUser);

// @route   GET /api/auth/me (Example of a protected route to get current user)
// @desc    Get current logged-in user's details
// @access  Private (requires token)
// router.get('/me', protect, getCurrentUser);

// More routes for forgot password, reset password, email verification will be added here

module.exports = router; // Export the router to be used in server.js