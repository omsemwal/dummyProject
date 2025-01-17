const express = require("express");
const router = express.Router();
const {
  createBalance,
  createUser,
  createTransaction,
  getAllBalances,
  getAllTransactions,
  getAllUsers,
} = require("../controller/userController");
// const { BalanceController } = require("../controller/BalanceController");
// const {
//   TransactionController,
// } = require("../controller/TransactionController");

router.post("/user", createUser);
router.post("/Balance", createBalance);
router.post("/Transaction", createTransaction);
router.get("/users", getAllUsers);
router.get("/transactions", getAllTransactions);
router.get("/balances", getAllBalances);

module.exports = router;
