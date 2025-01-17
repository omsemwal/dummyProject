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

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-privateAddress"); // Exclude privateAddress if needed
    res.status(200).json({
      status: true,
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate("fromUserId", "walletAddress") // Populate fromUserId with walletAddress
      .populate("toUserId", "walletAddress"); // Populate toUserId with walletAddress
    res.status(200).json({
      status: true,
      message: "Transactions fetched successfully.",
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};

exports.getAllBalances = async (req, res) => {
  try {
    const balances = await Balance.find()
      .populate("userId", "walletAddress") // Populate userId with walletAddress
      .select("-blinding"); // Exclude blinding if needed
    res.status(200).json({
      status: true,
      message: "Balances fetched successfully.",
      data: balances,
    });
  } catch (error) {
    console.error("Error fetching balances:", error.message);
    res.status(500).json({ status: false, message: "Internal server error." });
  }
};
