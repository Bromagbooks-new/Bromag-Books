const mongoose = require("mongoose");

const userQuerySchema = mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  query: String,
});

const UserQuery = mongoose.model("user-queries", userQuerySchema);

module.exports = {
  UserQuery,
};
