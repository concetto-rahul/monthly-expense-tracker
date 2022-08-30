const { connection } = require("../configs/mysql");
const { parseSqlResult } = require("../utils/helpers/commonHelpers");

const getAllCategory = () => {
  return new Promise((resolve, reject) => {
    connection.query("select id,name from expense_categories", (err, rows) => {
      if (err) {
        reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
      } else {
        let category = parseSqlResult(rows);
        resolve({ status: 200, data: { category } });
      }
    });
  });
};

const getAllSubCategory = (userID, monthYear) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "select sc.id,sc.parent_id,sc.name,IFNULL(sum(t.amount), 0.00) as amount from expense_sub_categories as sc left join transactions as t on t.sub_cat_id=sc.id and t.add_by=? and date_format(t.transaction_date, '%Y-%m')=? group by sc.id",
      [userID, monthYear],
      (err, rows) => {
        if (err) {
          reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
        } else {
          let subCategory = parseSqlResult(rows);
          resolve({ status: 200, data: { subCategory } });
        }
      }
    );
  });
};

const checkCategoryID = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "select id from expense_categories where id=?",
      id,
      (err, rows) => {
        if (err) {
          reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
        } else {
          let categoryData = parseSqlResult(rows);
          resolve({ status: 200, data: categoryData[0] || {} });
        }
      }
    );
  });
};

const checkSubCategoryID = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "select id from expense_sub_categories where id=?",
      id,
      (err, rows) => {
        if (err) {
          reject({ status: 500, error: "SOMETHING_WENT_WRONG" });
        } else {
          let categoryData = parseSqlResult(rows);
          resolve({ status: 200, data: categoryData[0] || {} });
        }
      }
    );
  });
};

module.exports = {
  getAllCategory,
  getAllSubCategory,
  checkCategoryID,
  checkSubCategoryID,
};
