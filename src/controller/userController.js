const User = require("../model/userModel");
const Transaction = require("../model/TransactionModel");
const Balance = require("../model/BalanceModel");

exports.createUser = async (req, res) => {
  try {
    const { walletAddress, privateAddress } = req.body;

    if (!walletAddress || !privateAddress) {
      return res.status(400).json({
        message: "Both walletAddress and privateAddress are required.",
      });
    }

    const newUser = new User({ walletAddress, privateAddress });
    const savedUser = await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully.", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const {
      type,
      fromUserId,
      toUserId,
      commitment,
      nullifier,
      amount,
      tokenAddress,
    } = req.body;

    if (!type || !fromUserId || !commitment || !amount || !tokenAddress) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newTransaction = new Transaction({
      type,
      fromUserId,
      toUserId,
      commitment,
      nullifier,
      amount,
      tokenAddress,
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json({
      message: "Transaction created successfully.",
      transaction: savedTransaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

exports.createBalance = async (req, res) => {
  try {
    const { userId, commitment, amount, tokenAddress, blinding, isSpent } =
      req.body;

    if (!userId || !commitment || !amount || !tokenAddress || !blinding) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newBalance = new Balance({
      userId,
      commitment,
      amount,
      tokenAddress,
      blinding,
      isSpent,
    });

    const savedBalance = await newBalance.save();
    res.status(201).json({
      message: "Balance created successfully.",
      balance: savedBalance,
    });
  } catch (error) {
    console.error("Error creating balance:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};
