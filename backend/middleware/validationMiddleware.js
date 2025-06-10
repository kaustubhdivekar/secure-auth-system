// backend/middleware/validationMiddleware.js
const { body, validationResult } = require('express-validator');

// Helper to format validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({ field: err.path, message: err.msg })),
    });
  }
  next(); // If no errors, proceed to the next middleware/controller
};

// Validation rules for User Registration
exports.validateRegistration = [
  // Username
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required.')
    .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters.')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores.'),

  // Email
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(), // Canonicalize email address

  // Password
   body('password')
    .notEmpty().withMessage('Password is required.')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
    .matches(/[a-z]/).withMessage('Password must contain at least one lowercase letter.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/).withMessage('Password must contain at least one special character.'),



  // Role (optional, if provided, must be valid)
  body('role')
    .optional()
    .isIn(['Buyer', 'Tenant', 'Owner', 'User', 'Admin', 'Content Creator'])
    .withMessage('Invalid role specified.'),

  // FirstName (optional)
  body('firstName')
    .optional({ checkFalsy: true }) // Treat empty strings as absent
    .trim()
    .isLength({ max: 50 }).withMessage('First name cannot exceed 50 characters.'),

  // LastName (optional)
  body('lastName')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 50 }).withMessage('Last name cannot exceed 50 characters.'),

  // After all validation rules, apply the error handler
  handleValidationErrors,
];

// Validation rules for User Login
exports.validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),

  body('password')
    .notEmpty().withMessage('Password is required.'),

  handleValidationErrors,
];

// Validation rules for Forgot Password
exports.validateForgotPassword = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Please provide a valid email address.')
    .normalizeEmail(),
  handleValidationErrors, // Apply the error handling middleware
];

// Validation rules for Reset Password
exports.validateResetPassword = [
  // body('email')
  //   .trim()
  //   .notEmpty().withMessage('Email is required.')
  //   .isEmail().withMessage('Please provide a valid email address.')
  //   .normalizeEmail(),
  body('newPassword') // Assuming the new password field in the request body is 'newPassword'
    .notEmpty().withMessage('New password is required.')
    .isLength({ min: 8 }).withMessage('New password must be at least 8 characters long.')
    .matches(/[a-z]/).withMessage('New password must contain at least one lowercase letter.')
    .matches(/[A-Z]/).withMessage('New password must contain at least one uppercase letter.')
    .matches(/\d/).withMessage('New password must contain at least one number.')
    .matches(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/).withMessage('New password must contain at least one special character.'),
  body('confirmNewPassword') // Assuming you have a confirmation field
    .notEmpty().withMessage('Confirm new password is required.')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('New password and confirm new password do not match.');
      }
      return true;
    }),
  handleValidationErrors, // Apply the error handling middleware
];

