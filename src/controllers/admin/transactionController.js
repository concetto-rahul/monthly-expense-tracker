const moment = require("moment");
const { validationResult } = require("express-validator");

const {
  getAllTransactions,
  getAllTransactionsCount,
  addAmountData,
  saveAmountData,
} = require("../../models/transaction");

const {
  errorsMessage,
  isObjectEmpty,
} = require("../../utils/helpers/commonHelpers");

let transactionController = {};

transactionController.index = async (req, res) => {
  const { id } = req.session.userData;
  const { to_date, from_date, page } = req.query;
  const toDate = to_date || moment().startOf("month").format("YYYY-MM-DD");
  const fromDate = from_date || moment().endOf("month").format("YYYY-MM-DD");
  let data = {
    transactions: [],
    searchData: { to_date: toDate, from_date: fromDate, page },
    todaysDate: moment().format("YYYY-MM-DD"),
  };
  const limit = 10;
  let offset = 0;
  if (page > 1) {
    offset = (page - 1) * limit;
  }
  try {
    const {
      data: { totalTransactions },
    } = await getAllTransactionsCount(id, toDate, fromDate);
    const {
      data: { transactions },
    } = await getAllTransactions(id, toDate, fromDate, limit, offset);
    data.transactions = transactions;
    data.perPage = limit;
    data.currentPage = page || 1;
    data.pages = Math.ceil(totalTransactions / limit);
  } catch (error) {
    console.log("transaction error", error);
  }
  res.render("transactions", { title: "Transactions", data });
};

transactionController.saveAmountData = async (req, res) => {
  const errorsValidation = validationResult(req);
  let errors = errorsMessage(errorsValidation);
  let status = false;
  if (isObjectEmpty(errors)) {
    try {
      const saveData = {
        cat_id: req.body.cat_id,
        sub_cat_id: req.body.sub_cat_id,
        amount: req.body.amount,
        transaction_date: moment(req.body.transaction_date).format(
          "YYYY-MM-DD"
        ),
        description: req.body.description,
        add_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        add_by: req.session.userData.id,
        update_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        update_by: req.session.userData.id,
      };
      await addAmountData(saveData);
      status = true;
    } catch (err) {
      errors.allMsg = "Unable to save data. Internal server error !!";
    }
  }
  res.json({ status, errors });
};

transactionController.updateAmountData = async (req, res) => {
  const errorsValidation = validationResult(req);
  let errors = errorsMessage(errorsValidation);
  let status = false;
  if (isObjectEmpty(errors)) {
    try {
      const saveData = {
        id: req.body.t_id,
        amount: req.body.amount,
        transaction_date: moment(req.body.transaction_date).format(
          "YYYY-MM-DD"
        ),
        description: req.body.description,
        update_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        update_by: req.session.userData.id,
      };
      await saveAmountData(saveData);
      status = true;
    } catch (err) {
      errors.allMsg = "Unable to save data. Internal server error !!";
    }
  }
  res.json({ status, errors });
};

module.exports = transactionController;
