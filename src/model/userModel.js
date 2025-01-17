const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    walletAddress: { type: String },
    privateAddress: { type: String }, // generated once per user
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
