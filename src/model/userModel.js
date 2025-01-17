const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  privateAddress: { type: String, required: true }, // generated once per user
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
