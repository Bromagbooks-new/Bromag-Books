const mongoose = require('mongoose');

const cuisineSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  subCuisines: {
    type: [String], // Array of strings to represent sub-cuisines
    default: [],
  },
  description: {
    type: String,
    trim: true,
  },
  restaurantId: {
    type: String,
    required: true
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const Cuisine = mongoose.model('Cuisine', cuisineSchema);

module.exports = Cuisine;
