const User = require('../models/User'); // User model
const jwt = require('jsonwebtoken');    // For generating JWT
const dotenv = require('dotenv');       // To access JWT_SECRET from .env

dotenv.config({ path: '../.env' }); // Ensure .env from backend root is loaded if not already

// --- Helper function to generate JWT ---
const generateToken = (userId, userRole) => {
  return jwt.sign(
    { id: userId, role: userRole }, // Payload: data to store in the token
    process.env.JWT_SECRET,         // Secret key from .env file
    { expiresIn: process.env.JWT_EXPIRES_IN || '1h' } // Token expiration time
  );
};

// --- Controller for User Registration ---
// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res, next) => {
  // Input validation will be handled by middleware before this controller is reached
  const { username, email, password, role, firstName, lastName } = req.body;

  try {
    // 1. Check if user (email or username) already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: 'User already exists with this email' });
    }
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ success: false, message: 'Username is already taken' });
    }

    // 2. Create new user instance (password will be hashed by pre-save hook in User model)
    const newUser = new User({
      username,
      email,
      password, // Send plain password; model will hash it
      role: role || 'User', // Default to 'User' if not provided
      firstName,
      lastName,
      // verificationToken: crypto.randomBytes(20).toString('hex'), // For email verification later
      // verificationTokenExpires: Date.now() + 3600000 * 24 // 24 hours for verification
    });

    // 3. Save the new user to the database
    await newUser.save();

    // 4. (Optional) Send verification email here if implementing email verification

    // 5. Generate JWT for the new user (optional: some apps require email verification before login/token)
    // For now, let's generate a token upon successful registration
    const token = generateToken(newUser._id, newUser.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email (if applicable).',
      token, // Send token to client for immediate login (consider if email verification is a prerequisite)
      user: { // Send back some non-sensitive user info
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    });

  } catch (error) {
    // Mongoose validation errors can be caught here
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    console.error('Registration Error:', error);
    // Pass to global error handler or send a generic error
    next(error); // Or res.status(500).json({ success: false, message: 'Server error during registration' });
  }
};

// --- Controller for User Login ---
// @desc    Authenticate user and get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // 1. Check if email and password are provided (basic check, validator middleware does more)
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    // 2. Find user by email. Explicitly select password because it's `select: false` in schema.
    const user = await User.findOne({ email }).select('+password');

    // 3. If user not found or password doesn't match, send generic error
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' }); // Generic message
    }

    // 4. Compare entered password with stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' }); // Generic message
    }

    // 5. (Optional but recommended) Check if account is verified
    // if (!user.isVerified) {
    //   return res.status(401).json({ success: false, message: 'Account not verified. Please check your email.' });
    // }

    // 6. User authenticated, generate JWT
    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: { // Send back some non-sensitive user info
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Login Error:', error);
    next(error); // Or res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// (getCurrentUser and other controllers will be added later)