const mongoose = require('mongoose');

const portionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  actualPrice: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
    required: true,
  }
});

const aggregatorSchema = new mongoose.Schema({
  aggregator: {
    type: String,
    required: true,
  },
  portions: {
    type: [portionSchema], // Array of portions with type, actual price, and discount price
    required: true,
  }
});

const menuItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  subCuisine: {
    type: String,
    required: true,
  },
  itemType: {
    type: String,
    required: true,
    enum: ['veg', 'non-veg'], // Can add more item types if needed
  },
  quantity: {
    type: Number,
    required: true,
  },
  aggregators: {
    type: [aggregatorSchema], // Array of aggregators with portions
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  restaruntId: {
    type: String,
    required: true
  },
  availableStatus : {
    type : Boolean,
    default : true,
    enum : [true, false]
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
