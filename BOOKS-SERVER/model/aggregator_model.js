const mongoose = require("mongoose");
const aggregatorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
  },
  restrauntId: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("aggregator", aggregatorSchema);
