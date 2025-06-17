// backend/models/Property.js

const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema({
    owner: { // Link to a User model if you have one, or just store owner's name/contact
        type: mongoose.Schema.Types.ObjectId, // If linking to a User
        ref: 'User', // Reference to your User model
        required: true
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    ownerContactNumber: { type: String, required: true },
    ownerAlternateContactNumber: { type: String },
    locality: { type: String, required: true },
    address: { type: String, required: true },
    spaceType: {
        type: String,
        enum: ['Flat', 'House', 'PG', 'Warehouse', 'Office', 'Shop'],
        required: true
    },
    petsAllowed: { type: Boolean, default: false },
    preference: {
        type: String,
        enum: ['Family', 'Bachelors', 'Any'],
        required: true
    },
    bachelorsAllowed: { // Only enabled if Preference is Bachelors or Any
        type: String,
        enum: ['Female', 'Male', 'Any'],
        default: 'Any'
    },
    type: { // Furnishing Type
        type: String,
        enum: ['Semi Furnished', 'Fully Furnished', 'Non Furnished'],
        required: true
    },
    bhk: { type: Number, min: 1, max: 5 },
    floor: { type: String }, // Could be number, or "Ground", "1st", "2nd", etc.
    nearestLandmark: { type: String },
    washroomType: {
        type: String,
        enum: ['Western', 'Indian']
    },
    coolingFacility: {
        type: String,
        enum: ['AC', 'Fan', 'Both', 'None']
    },
    carParking: { type: Boolean, default: false },
    rent: { type: Number, required: true, min: 0 },
    maintenance: { type: Number, default: 0, min: 0 },
    photos: [{ type: String, required: true }], // Array of image URLs
    squareFeetArea: { type: Number, required: true, min: 1 },
    appliances: [{ type: String }], // Array of selected appliance names
    amenities: [{ type: String }], // Array of selected amenity names
    aboutProperty: { type: String },
    googleMapLocation: { // Store coordinates for Google Map embedding
        latitude: { type: Number },
        longitude: { type: Number }
    },
    views: { type: Number, default: 0 }, // For Popularity sort
    uploadedAt: { type: Date, default: Date.now } // For Date Uploaded sort
});

// Add a text index for search functionality (optional, but good for future)
// PropertySchema.index({ '$**': 'text' });

module.exports = mongoose.model('Property', PropertySchema);