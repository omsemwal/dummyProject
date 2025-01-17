const express = require("express");
const router = express.Router();
const { createBalance,createUser,createTransaction} = require("../controller/userController");
// const { BalanceController } = require("../controller/BalanceController");
// const {
//   TransactionController,
// } = require("../controller/TransactionController");

router.post("/user",createUser );
router.post("/Balance",createBalance);
router.post("/Transaction",createTransaction);

module.exports = router;
