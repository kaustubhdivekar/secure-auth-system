// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For password hashing
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    // General Information
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true, // Ensure usernames are unique
       trim: true,   // Remove whitespace from beginning and end
minlength: [3, 'Username must be at least 3 characters long'],
},
email: {
type: String,
required: [true, 'Email is required'],
unique: true,
trim: true,
lowercase: true, // Store emails in lowercase for consistency
// Regex for basic email validation
match: [/\S+@\S+.\S+/, 'Please use a valid email address'],
},
password: {
type: String,
required: [true, 'Password is required'],
minlength: [8, 'Password must be at least 8 characters long'],
// We won't store the password directly, but its hash.
// Validation for complexity will be handled in the controller/route logic
// or with a custom validator here if desired, but bcrypt doesn't store original.
select: false, // By default, don't return password field when querying users
},
role: {
  type: String,
  required: true,
  enum: { // Role must be one of these values
    values: ['Buyer', 'Tenant', 'Owner', 'User', 'Admin', 'Content Creator'],
    message: '{VALUE} is not a supported role',
  },
  default: 'User', // Default role if not specified
}, 

    // Account Status & Verification
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      select: false, // Don't send this out by default
    },
    verificationTokenExpires: {
      type: Date,
      select: false,
    },

    // Password Reset
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: Date,
      select: false,
    },

    // Optional: Profile Information (can be expanded)
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    // Add more role-specific fields as needed, possibly in a nested object
    // e.g., profile: { shippingAddress: String } for Buyer
  },
  {
    // Schema Options
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// --- Mongoose Middleware (Hooks) ---

// 1. Pre-save hook to hash password before saving a NEW user
//    or when the password field is modified.
userSchema.pre('save', async function (next) {
  // `this` refers to the current user document being saved
  if (!this.isModified('password')) {
    // If password hasn't been changed, move to the next middleware
    return next();
  }

  // Hash the password
  try {
    const salt = await bcrypt.genSalt(10); // Generate a salt (10 rounds is common)
    this.password = await bcrypt.hash(this.password, salt); // Hash password with salt
    next();
  } catch (error) {
    next(error); // Pass error to the next middleware/error handler
  }
});

// --- Mongoose Instance Methods ---

// 2. Method to compare entered password with hashed password in DB
userSchema.methods.comparePassword = async function (enteredPassword) {
  // `this.password` is the hashed password from the DB (needs to be selected if `select: false`)
  // Since `password` field has `select: false`, we need to ensure it's available
  // when calling this method. Or, re-fetch the user with the password field.
  // For now, assume the user object calling this method has the password.
  return await bcrypt.compare(enteredPassword, this.password);
};

// 3. Method to generate and set the email verification token
userSchema.methods.getVerificationToken = function() {
    // Generate a random 20-byte token (40 hex characters)
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to the schema field
    // Store only the hashed token in the database for security
    this.verificationToken = crypto.createHash('sha256').update(verificationToken).digest('hex');

    // Set expiry for the token (e.g., 10 minutes from now)
    // The expiry time will be in milliseconds
    this.verificationTokenExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Return the raw, unhashed token to be sent in the email
    // This is the token the user will receive in the URL
    return verificationToken;
};

// 4. Method to generate and set the password reset token
userSchema.methods.getResetPasswordToken = function() {
    // Generate a random 20-byte token (40 hex characters)
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the token and set it to the schema field
    // Store only the hashed token in the database for security
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expiry for the token (e.g., 10 minutes from now)
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Return the raw, unhashed token to be sent in the email
    // This is the token the user will receive in the URL
    return resetToken;
};

// Create and export the User model
// Mongoose will create a collection named 'users' (pluralized, lowercase)
const User = mongoose.model('User', userSchema);

module.exports = User;
