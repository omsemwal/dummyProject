const mongoose = require("mongoose");

const balanceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    commitment: { type: String },
    amount: { type: String },
    tokenAddress: { type: String },
    blinding: { type: String },
    isSpent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Balance", balanceSchema);
