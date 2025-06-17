// backend/controllers/propertyController.js

const Property = require('../models/Property');
const asyncHandler = require('express-async-handler'); // For simpler async error handling

// @desc    Get all properties with pagination and sorting
// @route   GET /api/properties
// @access  Public
const getProperties = asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 6; // Display 6 properties as per requirement
    const skip = (page - 1) * limit;

    const sortOptions = {};
    const sortBy = req.query.sortBy;
    const sortOrder = req.query.sortOrder === 'desc' ? -1 : 1; // 'asc' by default

    switch (sortBy) {
        case 'dateUploaded':
            sortOptions.uploadedAt = sortOrder;
            break;
        case 'costLowToHigh':
            sortOptions.rent = 1; // Always ascending for low to high
            break;
        case 'costHighToLow':
            sortOptions.rent = -1; // Always descending for high to low
            break;
        case 'popularity':
            sortOptions.views = -1; // Most viewed first
            break;
        default:
            sortOptions.uploadedAt = -1; // Default sort by most recent
    }

    // Add query for filters if needed (e.g., locality, spaceType)
    const query = {};

    const properties = await Property.find(query)
                                    .sort(sortOptions)
                                    .skip(skip)
                                    .limit(limit);

    const totalProperties = await Property.countDocuments(query);
    const totalPages = Math.ceil(totalProperties / limit);

    res.json({
        properties,
        currentPage: page,
        totalPages,
        totalProperties
    });
});

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
const getPropertyById = asyncHandler(async (req, res) => {

    let property;
    try {
        property = await Property.findById(req.params.id);
    } catch (dbError) {
        console.error('Backend: Error during Property.findById:', dbError.message); // THIS IS KEY!
        res.status(400); // Send a 400 for bad ID format
        throw new Error(`Invalid property ID format: ${req.params.id}`);
    }

    if (property) {
        property.views = (property.views || 0) + 1;
        await property.save();
        res.json(property);
    } else {
        console.log('Backend: Property not found for ID:', req.params.id);
        res.status(404);
        throw new Error('Property not found');
    }
});

// @desc    Add a new property
// @route   POST /api/properties
// @access  Private (Auth required)
const addProperty = asyncHandler(async (req, res) => {

    const {
        firstName, lastName, ownerContactNumber, ownerAlternateContactNumber,
        locality, address, spaceType, petsAllowed, preference, bachelorsAllowed,
        type, bhk, floor, nearestLandmark, washroomType, coolingFacility,
        carParking, rent, maintenance, photos, squareFeetArea,
        appliances, amenities, aboutProperty, googleMapLocation
    } = req.body;

    // Basic validation
    if (!firstName || !lastName || !ownerContactNumber || !locality || !address ||
        !spaceType || !preference || !type || !rent || !photos || photos.length < 5 || !squareFeetArea) {
        res.status(400);
        throw new Error('Please enter all required fields and upload at least 5 photos.');
    }

    const newProperty = new Property({
        owner: req.user._id, // Assumes `req.user` is populated by your `protect` middleware
        firstName, lastName, ownerContactNumber, ownerAlternateContactNumber,
        locality, address, spaceType, petsAllowed, preference, bachelorsAllowed: bachelorsAllowed || 'Any', // Default to Any if not provided
        type, bhk, floor, nearestLandmark, washroomType, coolingFacility,
        carParking, rent, maintenance, photos, squareFeetArea,
        appliances, amenities, aboutProperty, googleMapLocation
    });

    const createdProperty = await newProperty.save();
    res.status(201).json(createdProperty);
});

module.exports = {
    getProperties,
    getPropertyById,
    addProperty
};