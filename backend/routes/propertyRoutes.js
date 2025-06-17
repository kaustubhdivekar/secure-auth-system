// backend/routes/propertyRoutes.js

const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware'); // Assuming you have auth middleware

// GET all properties with pagination and sorting
router.get('/', propertyController.getProperties);

// GET a single property by ID
router.get('/:id', propertyController.getPropertyById);

// POST a new property (protected route, requires authentication)
router.post('/', protect, propertyController.addProperty); // `protect` middleware ensures user is logged in

module.exports = router;