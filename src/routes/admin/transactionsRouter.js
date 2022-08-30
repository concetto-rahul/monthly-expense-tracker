const express = require("express");
const { checkSchema } = require("express-validator");

const transactionController = require("../../controllers/admin/transactionController");
const authMiddleware = require("../../middlewares/authMiddleware");
const saveAmountValidator = require("../../utils/validators/saveAmountValidator");

const transactionsRouter = express.Router();

transactionsRouter.get(
  "/transactions",
  authMiddleware,
  transactionController.index
);

transactionsRouter.post(
  "/add-transactions",
  [authMiddleware, checkSchema(saveAmountValidator.add)],
  transactionController.saveAmountData
);

transactionsRouter.post(
  "/update-transactions",
  [authMiddleware, checkSchema(saveAmountValidator.save)],
  transactionController.updateAmountData
);

module.exports = transactionsRouter;
