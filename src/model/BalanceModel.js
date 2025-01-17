const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  commitment: { type: String, required: true },
  amount: { type: String, required: true },
  tokenAddress: { type: String, required: true },
  blinding: { type: String, required: true },
  isSpent: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Balance', balanceSchema);
