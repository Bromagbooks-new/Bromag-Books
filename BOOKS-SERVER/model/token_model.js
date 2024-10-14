const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  used: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
});

const Token = mongoose.model('Token', tokenSchema);

module.exports = Token;
