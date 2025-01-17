const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: { type: String, enum: ['SHIELD', 'TRANSFER', 'UNSHIELD'], required: true },
  fromUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // optional for transfers
  commitment: { type: String, required: true },
  nullifier: { type: String }, // optional
  amount: { type: String, required: true },
  tokenAddress: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
