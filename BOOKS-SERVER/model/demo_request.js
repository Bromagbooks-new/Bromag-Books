const mongoose = require("mongoose");

const demoRequestSchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  location: String,
  type: String,
  designation: String,
  purpose: String,
  onlinePlatform: String
});

const DemoRequestModel = mongoose.model("demorequest", demoRequestSchema);

module.exports = {
  DemoRequestModel,
};
