const { connection } = require("../configs/mysql");
const { parseSqlResult } = require("../utils/helpers/commonHelpers");

const getAllTransactions = (userID, toDate, fromDate, limit, offset) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "select t.id,t.description,c.name as to_name,sc.name as for_name,t.amount,DATE_FORMAT(t.transaction_date,'%Y-%m-%d') as transaction_date,DATE_FORMAT(t.transaction_date,'%d/%m/%Y') as t_date from transactions as t left join expense_categories as c on c.id=t.cat_id left join expense_sub_categories as sc on sc.id=t.sub_cat_id where t.add_by=? and t.transaction_date>=? and t.transaction_date<=? order by t.transaction_date desc limit ?,?",
      [userID, toDate, fromDate, offset, limit],
      (err, rows) => {
        if (err) {
          reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
        } else {
          let transactions = parseSqlResult(rows);
          resolve({ status: 200, data: { transactions } });
        }
      }
    );
  });
};

const getTransactionsMonthYearList = (userID) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "select date_format(transaction_date, '%Y-%m-01') as dateMonthYear from transactions where amount!=0 and add_by=? group by dateMonthYear",
      userID,
      (err, rows) => {
        if (err) {
          reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
        } else {
          let monthYearList = parseSqlResult(rows);
          resolve({ status: 200, data: { monthYearList } });
        }
      }
    );
  });
};

const getAllTransactionsCount = (userID, toDate, fromDate) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "select count(t.id) as totalTransactions from transactions as t where t.add_by=? and t.transaction_date>=? and t.transaction_date<=?",
      [userID, toDate, fromDate],
      (err, rows) => {
        if (err) {
          reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
        } else {
          let data = parseSqlResult(rows);
          resolve({ status: 200, data: data[0] || 0 });
        }
      }
    );
  });
};

const saveAmountData = (saveData) => {
  const { id, amount, transaction_date, description, update_date, update_by } =
    saveData;
  return new Promise((resolve, reject) => {
    connection.query(
      "update transactions set amount=?,transaction_date=?,description=?,update_date=?,update_by=? where id=?",
      [amount, transaction_date, description, update_date, update_by, id],
      (err, rows) => {
        if (err) {
          reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
        } else {
          let { insertId } = parseSqlResult(rows);
          resolve({ status: 200, data: { id: insertId } });
        }
      }
    );
  });
};

const addAmountData = (saveData) => {
  const {
    cat_id,
    sub_cat_id,
    amount,
    transaction_date,
    description,
    add_date,
    add_by,
    update_date,
    update_by,
  } = saveData;
  return new Promise((resolve, reject) => {
    connection.query(
      "insert into transactions (cat_id,sub_cat_id,amount,transaction_date,description,add_date,add_by,update_date,update_by) values (?,?,?,?,?,?,?,?,?)",
      [
        cat_id,
        sub_cat_id,
        amount,
        transaction_date,
        description,
        add_date,
        add_by,
        update_date,
        update_by,
      ],
      (err, rows) => {
        if (err) {
          reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
        } else {
          let { insertId } = parseSqlResult(rows);
          resolve({ status: 200, data: { id: insertId } });
        }
      }
    );
  });
};

const checkTransactionID = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "select id from transactions where id=?",
      id,
      (err, rows) => {
        if (err) {
          reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
        } else {
          let transactionData = parseSqlResult(rows);
          resolve({ status: 200, data: transactionData[0] || {} });
        }
      }
    );
  });
};

module.exports = {
  getAllTransactions,
  getAllTransactionsCount,
  addAmountData,
  saveAmountData,
  checkTransactionID,
  getTransactionsMonthYearList,
};
