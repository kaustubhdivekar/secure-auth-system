const User = require('../models/User'); // User model
const jwt = require('jsonwebtoken');    // For generating JWT
const dotenv = require('dotenv');       // To access JWT_SECRET from .env
const crypto = require('crypto');

dotenv.config({ path: '../.env' }); // Ensure .env from backend root is loaded if not already

const sendEmail = require('../utils/emailService'); // Import your email service

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
    });

    // Generate verification token
    const rawVerificationToken = crypto.randomBytes(32).toString('hex');
    // Hash the token before storing it in the DB for security
    newUser.verificationToken = crypto
      .createHash('sha256')
      .update(rawVerificationToken)
      .digest('hex');
    newUser.verificationTokenExpires = Date.now() + 24 * 60 * 60 * 1000; // Token valid for 24 hours

    // 3. Save the new user to the database
    await newUser.save();

      // Construct verification URL (frontend will handle this page)
      // IMPORTANT: Use your frontend's URL here, not backend API URL
      const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email/${rawVerificationToken}`;
      // const backendVerificationUrl = `http://localhost:5001/api/auth/verify-email/${rawVerificationToken}`;

      const emailMessage = `
        <h2>Thank you for registering with SecureAuth!</h2>
        <p>Please verify your email address by clicking the link below:</p>
        <p><a href="${verificationUrl}" target="_blank">Verify Email Address</a></p>
        <p>This link will expire in 24 hours.</p>
        <p>If you did not register for this account, please ignore this email.</p>
      `;

      await sendEmail({
        email: newUser.email,
        subject: 'Verify Your Email Address - SecureAuth App',
        html: emailMessage,
        text: `Please verify your email by visiting this link: ${verificationUrl}` // Fallback text
      });

      // Generate a token upon successful registration
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
      // Handle Mongoose validation errors
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ success: false, message: messages.join(', ') });
      }
      console.error('Registration Error:', error);
      next(error); // Pass to global error handler
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

// --- Controller for Forgot Password ---
// @desc    Initiate password reset process (send email with token)
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ success: false, message: 'Please provide an email address.' });
  }

  try {
    const user = await User.findOne({ email });

    // IMPORTANT: For security, always send a positive-sounding message,
    // whether the user exists or not, to prevent email enumeration attacks.
    if (!user) {
      // Log this attempt on the server if desired for monitoring
      console.warn(`Password reset attempt for non-existent email: ${email}`);
      return res.status(200).json({ success: true, message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // (Optional: Check if user is verified before allowing password reset)
    // if (!user.isVerified) {
    //   return res.status(400).json({ success: false, message: 'Please verify your email address first.'});
    // }

    // Generate raw reset token (sent to user) and hashed token (stored in DB)
    const rawResetToken = crypto.randomBytes(32).toString('hex');
    user.passwordResetToken = crypto
      .createHash('sha256')
      .update(rawResetToken)
      .digest('hex');
    // Set token expiry (e.g., 10-15 minutes)
    user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save({ validateBeforeSave: false });

    // Construct password reset URL (frontend handles the reset page)
    // const resetUrl = `<span class="math-inline">\{process\.env\.FRONTEND\_URL \|\| 'http\://localhost\:3000'\}/reset\-password/</span>{rawResetToken}`;
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${rawResetToken}`;

    const emailMessage = `
      <h2>Password Reset Request</h2>
      <p>You (or someone else) requested a password reset for your SecureAuth account.</p>
      <p>If this was you, click the link below to reset your password:</p>
      <p><a href="${resetUrl}" target="_blank">Reset Your Password</a></p>
      <p>This link is valid for 15 minutes.</p>
      <p>If you did not request a password reset, please ignore this email. Your password will remain unchanged.</p>
    `;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password Reset Request - SecureAuth App',
        html: emailMessage,
        text: `To reset your password, visit: ${resetUrl}`
      });
      res.status(200).json({ success: true, message: 'If an account with that email exists, a password reset link has been sent.' });
    } catch (emailError) {
      console.error('Password Reset Email Sending Error:', emailError);
      // Even if email fails, don't reveal user existence.
      // You might want to clear the reset token on the user if email fails critically
      // user.passwordResetToken = undefined;
      // user.passwordResetExpires = undefined;
      // await user.save({ validateBeforeSave: false });
      res.status(200).json({ success: true, message: 'If an account with that email exists, a password reset link has been sent. (Email sending may have issues)' });
    }

  } catch (error) {
    console.error('Forgot Password Error:', error);
    next(error);
  }
};

// --- Controller for Reset Password ---
// @desc    Reset user password after token verification
// @route   POST /api/auth/reset-password/:token
// @access  Public
exports.resetPassword = async (req, res, next) => {
  // 1. Hash the incoming token from the URL parameter
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  try {
    // 2. Find user by hashed token and ensure it's not expired
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }, // Token must be greater than current time
    });

    if (!user) {
      // For security, give a generic error to avoid token enumeration
      return res.status(400).json({ success: false, message: 'Password reset token is invalid or has expired.' });
    }

    // 3. Set the new password (password hashing happens in User model pre-save hook)
    user.password = req.body.newPassword; // newPassword is from req.body, validated by middleware
    user.passwordResetToken = undefined; // Clear the token
    user.passwordResetExpires = undefined; // Clear the expiry

    await user.save(); // Save the user with the new password

    // 4. Optionally, generate a new token for immediate login after reset
    const newToken = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in.',
      token: newToken, // Provide new token for convenience
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Reset Password Error:', error);
    next(error); // Pass to global error handler
  }
};

// @desc    Resend email verification link
// @route   POST /api/auth/resend-verification-email
// @access  Public
exports.resendVerificationEmail = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        // If email is already verified, no need to resend
        if (user.isEmailVerified) {
            return res.status(400).json({ success: false, message: 'Email is already verified.' });
        }

        // Generate a new verification token and expiry
        const verificationToken = user.getVerificationToken(); // Assuming this method generates and saves the hashed token
        await user.save(); // Save the user with the new token and expiry

        // Create the verification URL using the RAW token (for the link)
        // const verificationUrl = `${req.protocol}://${req.get('host')}/api/auth/verify-email/${verificationToken}`;
        const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email/${verificationToken}`;

        const resendEmailMessage = `
            <h2>New Email Verification Link for Your Account</h2>
            <p>You requested a new email verification link for your SecureAuth account.</p>
            <p>Please click the link below to verify your email address:</p>
            <p><a href="${verificationUrl}" target="_blank">Verify My Email Address</a></p>
            <p>This link is valid for 10 minutes.</p>
            <p>If you did not request this, please ignore this email.</p>
        `;        
      
        // Send the email (this is where you'd call your email service)
        // For testing, you'll still be looking at Ethereal or your console.
        try {
            await sendEmail({
                email: user.email,
                subject: 'New Email Verification Link for Your Account',
                html: resendEmailMessage,
                message: `Please verify your email by clicking on this link: ${verificationUrl}`,
            });
            console.log(`New Email Verification URL sent to ${user.email}: ${verificationUrl}`);
        } catch (emailError) {
            console.error('Error sending verification email:', emailError);
            // Optionally, revert the token if email sending fails to prevent a valid but unsent token
            user.emailVerificationToken = undefined;
            user.emailVerificationTokenExpiry = undefined;
            await user.save();
            return next(new Error('Failed to send verification email. Please try again later.'));
        }

        res.status(200).json({ success: true, message: 'New verification email sent. Please check your inbox.' });

    } catch (error) {
        console.error('Error in resendVerificationEmail:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

// --- Controller to Get Current Logged-in User ---
// @desc    Get current user's details (based on token)
// @route   GET /api/auth/me
// @access  Private (requires authentication)
exports.getCurrentUser = async (req, res, next) => {
  // req.user is populated by the 'protect' middleware
  try {
    // The user object (without password) is already attached by 'protect' middleware
    // If you needed to fetch more relations or do other logic, you could use req.user.id
    const user = req.user; // Already fetched and attached in protect middleware

    if (!user) { // Should not happen if protect middleware works correctly
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        firstName: user.firstName,
        lastName: user.lastName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        // Add other non-sensitive fields you want to return
      },
    });
  } catch (error) {
    console.error('Get Current User Error:', error);
    next(error);
  }
};