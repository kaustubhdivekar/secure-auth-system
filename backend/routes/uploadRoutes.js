// backend/routes/uploadRoutes.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('../config/cloudinaryConfig'); // Import your cloudinary config
const path = require('path'); // Not strictly needed if only using Cloudinary, but good to keep if you have local storage fallbacks
const router = express.Router();
const asyncHandler = require('express-async-handler'); // To catch async errors

// Configure multer to store files in memory
const storage = multer.memoryStorage();

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// @desc    Upload multiple images to Cloudinary
// @route   POST /api/upload
// @access  Private (You might want to make this private, requiring authentication)
router.post('/', upload.array('photos', 10), asyncHandler(async (req, res) => { // 'photos' is the field name, 10 is max files
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ message: 'No files uploaded.' });
  }

  const uploadedUrls = [];

  for (const file of req.files) {
    try {
      // Construct the data URI string correctly using backticks (template literals)
      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(
        dataUri, // This is the first argument: the data URI string
        { // This is the second argument: the options object
          folder: 'to-let-globe-properties', // Optional: organize uploads in a specific folder in Cloudinary
          resource_type: 'image', // Ensure it's treated as an image
        }
      );
      uploadedUrls.push(result.secure_url); // Store the secure URL provided by Cloudinary
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      // Handle individual file upload errors
      // Use template literals for the error message as well
      return res.status(500).json({ message: `Failed to upload image: ${file.originalname}`, error: error.message });
    }
  }

  res.status(200).json({ message: 'Files uploaded successfully', urls: uploadedUrls });
}));

module.exports = router;