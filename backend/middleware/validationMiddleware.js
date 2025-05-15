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
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+-=[]{};':"\|,.<>\/?]).*$/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'),

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